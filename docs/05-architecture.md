# Architecture, Data Flow & System Topology

```mermaid
flowchart TD
    subgraph ClientBrowser [Client Browser Layer]
        DOM[Browser DOM / Window Viewport]
        AppRoot[App.jsx Application Container]
        Cursor[Cursor.jsx - Follower]
        Intro[Intro.jsx - Splash Overlay]
        Nav[Navbar.jsx - Sticky Header]
        Home[Home.jsx - Single Page View]
        Footer[Footer.jsx - Corporate Directory]
    end

    subgraph MotionEngines [Animation & Gesture Subsystems]
        Loco[Locomotive Scroll 5 - Virtual Scroll Engine]
        GSAP[GSAP ScrollTrigger Context - Pinning & Timelines]
        FM[Framer Motion - Declarative Viewport Triggers]
    end

    subgraph StaticStorage [Client Static Datasets]
        BS[(bestSellers.json)]
        PROD[(products.json)]
        COMM[(community.json)]
        FAQ[(faqData.json)]
    end

    subgraph CloudMedia [Cloud Media Distribution]
        Cloudinary[Cloudinary Global CDN]
        GoogleCDN[Google Fonts CDN]
    end

    DOM --> AppRoot
    AppRoot --> Cursor
    AppRoot --> Intro
    AppRoot --> Nav
    AppRoot --> Home
    AppRoot --> Footer

    Home --> Loco
    Home --> GSAP
    Home --> FM

    Home --> BS
    Home --> PROD
    Home --> COMM
    Home --> FAQ

    Home -.-> Cloudinary
    AppRoot -.-> GoogleCDN
```

---

## 1. High-Level Architecture Overview

The Starbucks Frontend Redesign is architected as an **Interactive Client-Side Single Page Application (SPA)** built with React 18 and Vite. It decouples the visual experience from traditional server-side rendering (SSR), offloading high-complexity animation and layout calculations directly to the client's GPU and JavaScript engine.

### Architectural Tiers:
1. **Presentation Layer**: Functional React components split into `layout/` (structural shells), `components/` (reusable UI atoms), and `pages/` (composition views).
2. **State & Gesture Engine**: React `useState` for local UI state, combined with imperative event listeners for mouse drag velocity and coordinate following.
3. **Motion & Pipeline Orchestration**:
   - **Locomotive Scroll**: Virtual scroll interceptor providing linear interpolation (`lerp: 0.1`) and multi-speed parallax.
   - **GSAP ScrollTrigger**: Viewport pin engine and sub-pixel scrub coordinator encapsulated inside `gsap.context()`.
   - **Framer Motion**: Viewport intersection observer triggering directional card and title entrances.
4. **Data Layer**: Local static JSON fixtures serving structured catalog, FAQ, and social media records.

---

## 2. Request & Rendering Lifecycles

### Lifecycle 1: Initial Page Hydration & Splash Dismissal
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser
    participant Main as main.jsx
    participant App as App.jsx
    participant Intro as Intro.jsx
    participant Home as Home.jsx

    User->>Browser: Enters Website URL
    Browser->>Main: Loads bundle via native ES Modules
    Main->>App: ReactDOM.createRoot(#root).render(<App />)
    App->>Intro: Mounts Intro with overlay active (hide=false)
    App->>Home: Mounts Home view behind overlay
    Intro->>Intro: Timer 1 (2000ms) triggers setShrinkImage(true)
    Intro->>Intro: Timer 2 (4500ms) triggers setHide(true)
    Intro-->>User: Unmasks interactive storefront with zero layout shift
```

---

### Lifecycle 2: GSAP Sticky Pinning & Timeline Scrubbing
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Viewport as Browser Scrollport
    participant ST as ScrollTrigger Instance
    participant Frame as frameRef (Pinned Image)
    participant Photos as Photo Array (photos[index])

    User->>Viewport: Scrolls downward into Features section
    Viewport->>ST: contentRef top reaches viewport top
    ST->>Frame: pin=true (applies position: fixed, pinSpacing)
    loop Each Narrative Headline
        User->>Viewport: Continues scrolling
        Viewport->>ST: Headline reaches trigger threshold (80% to 20%)
        ST->>Photos: Scrubs yPercent from 101 to 0 and autoAlpha from 1 to 0
        Photos-->>User: Smooth visual crossfade between coffee standards
    end
    Viewport->>ST: contentRef bottom reaches viewport bottom
    ST->>Frame: pin=false (releases fixed position, restores flow)
```

---

### Lifecycle 3: Mouse-Velocity Drag-to-Scroll
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Slider as Slider.jsx
    participant DOM as sliderRef Container

    User->>Slider: onMouseDown(e)
    Slider->>Slider: Sets isActive=true, records startX & scrollLeft
    User->>Slider: onMouseMove(e) with velocity
    Slider->>Slider: Computes walk = (currentX - startX) * 2
    Slider->>DOM: Updates sliderRef.current.scrollLeft = scrollLeft - walk
    DOM-->>User: Instant horizontal carousel glide
    User->>Slider: onMouseUp(e)
    Slider->>Slider: Sets isActive=false (releases drag capture)
```

---

## 3. Proposed Enterprise Data Models & ER Diagram

In a full-stack deployment, the static JSON structures would migrate to an enterprise relational/document database:

```mermaid
erDiagram
    CATEGORY ||--o{ PRODUCT : contains
    PRODUCT ||--o{ PRODUCT_CUSTOMIZATION : offers
    USER ||--o{ CART_ITEM : owns
    PRODUCT ||--o{ CART_ITEM : references
    USER ||--o{ REWARDS_TRANSACTION : accrues

    CATEGORY {
        string id PK
        string name
        string imageUrl
    }
    PRODUCT {
        string id PK
        string categoryId FK
        string name
        decimal price
        string imageUrl
        boolean isBestSeller
    }
    USER {
        string id PK
        string email
        string fullName
        int rewardStars
    }
    CART_ITEM {
        string id PK
        string userId FK
        string productId FK
        int quantity
    }
```

---

## 4. Scaling to 100x Traffic & Bottleneck Analysis

| Bottleneck Rank | System Component | Failure Mode at 100x Load | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **1** | **Asset Delivery (Cloudinary)** | Direct image hits exceed CDN egress bandwidth budgets, incurring high cloud costs. | Route image requests through a dedicated Cloudflare Edge Cache tier with aggressive `Cache-Control: public, max-age=31536000, immutable`. |
| **2** | **Client Animation Jank on Mobile** | Running Locomotive Scroll alongside GSAP ScrollTrigger on low-end mobile devices exhausts GPU memory and causes dropped frames. | Enforce feature detection: automatically disable Locomotive Scroll on mobile devices and fall back to native CSS smooth scrolling (`scroll-behavior: smooth`). |
| **3** | **Unbundled JSON Payloads** | Loading large static catalogs inside client bundles increases initial JavaScript parse and compile times (harming INP and LCP). | Migrate catalog fetching to lazy-loaded REST endpoints backed by Redis caches and Edge API routes. |
