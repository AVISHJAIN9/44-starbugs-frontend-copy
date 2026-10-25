# 14.4 Load Balancing & Frontend High Availability

```mermaid
flowchart TD
    UserTraffic[Incoming User Traffic - Peak 4,000 RPS] --> CloudflareLB[Cloudflare Anycast Global Load Balancer]
    CloudflareLB --> EdgeGeo1[US-East Edge Cluster]
    CloudflareLB --> EdgeGeo2[EU-West Edge Cluster]
    CloudflareLB --> EdgeGeo3[AP-South Edge Cluster]

    EdgeGeo1 --> L7Proxy[NGINX / Envoy Layer 7 Reverse Proxy]
    L7Proxy --> AppPod1[Node.js Server Pod 1]
    L7Proxy --> AppPod2[Node.js Server Pod 2]
    L7Proxy --> AppPod3[Node.js Server Pod N (HPA Autoscaling)]
```

---

## 1. What It Is in Plain Words
Load balancing distributes incoming client requests across multiple backend server instances and regional data centers, ensuring no single server becomes overwhelmed and eliminating single points of failure (SPOFs).

---

## 2. Current Implementation in Codebase
- **Client Execution**: Currently, 100% of the UI rendering workload is executed on the user's local device. Static asset hosting (e.g., Vercel, Netlify, GitHub Pages) handles load balancing transparently across their global multi-tenant Edge networks.
- **SPOF Risk**: The primary external dependency is Cloudinary (`res.cloudinary.com`). If Cloudinary suffers an outage, transparent hero cups and customer community images fail to render.

---

## 3. Load Balancing Algorithms Comparison

| Algorithm | Mechanism | Best Use Case | Drawbacks in Stateful Apps |
| :--- | :--- | :--- | :--- |
| **Round Robin** | Cycles sequentially through server list. | Identical stateless servers with uniform request workloads. | Uneven server loads if some requests involve heavy AI parsing. |
| **Least Connections** | Directs traffic to the server currently handling the fewest active connections. | Long-lived WebSocket connections for kitchen status. | Slightly higher routing state overhead. |
| **IP Hash** | Hashes client IP to assign user to a dedicated server. | Sticky sessions where local server memory stores user cart. | Cache skew when thousands of mobile users share a single cellular carrier gateway IP. |
| **Weighted Round Robin** | Allocates more requests to beefier hardware nodes. | Mixed bare-metal and cloud container clusters. | Requires manual server capacity weighting. |

---

## 4. Single Points of Failure & Remediation

| SPOF Detected | Failure Impact | Enterprise Remediation Blueprint |
| :--- | :--- | :--- |
| **Single Third-Party CDN (Cloudinary)** | Site renders broken image icons if Cloudinary edge fails. | Implement dual-origin asset fallback: AWS S3 + Cloudflare Images as primary, with Cloudinary as secondary. |
| **Monolithic Single Region Origin** | Regional power grid failure causes complete checkout outage. | Multi-Region Active-Active deployment across AWS `us-east-1` and `us-west-2` using Route 53 latency routing. |
| **Client Full-Page Reload on Resize** | User loses cart state and scroll position if mobile address bar resizes window. | Replace `window.location.reload()` with debounced `ScrollTrigger.refresh()` (Fix Bug 1). |

---

## 5. 30-Second Interview Answer
> "At Starbucks scale, we employ a multi-tier load balancing strategy: Layer 4 Anycast routing at the global DNS level to direct traffic to the nearest geographic edge, followed by Layer 7 Envoy proxies performing least-connections routing across autoscaling Kubernetes pods. We eliminate single points of failure by deploying multi-region active-active clusters and implementing multi-CDN origin fallbacks for all high-resolution menu assets."
