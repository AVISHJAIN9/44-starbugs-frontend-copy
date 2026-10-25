import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
  defineConfig({
    title: 'Starbucks Frontend Redesign Docs',
    description: 'High-Performance Interactive Starbucks UX Architecture, React 18, GSAP & Framer Motion Documentation',
    base: '/',
    appearance: 'dark',
    cleanUrls: true,
    lastUpdated: true,

    themeConfig: {
      siteTitle: 'Starbucks UX Docs',
      logo: '/starbucks.svg',
      search: {
        provider: 'local',
      },
      outline: [2, 3],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/AVISHJAIN9/starbugs-frontend-copy-1' },
      ],
      nav: [
        { text: 'Guide', link: '/00a-project-analysis' },
        { text: 'Features', link: '/01-features' },
        { text: 'API Reference', link: '/03-api-reference' },
        { text: 'Comparisons', link: '/04-tech-comparisons' },
        { text: 'System Design', link: '/system-design/' },
        { text: 'Interview Q&A', link: '/09-interview-qa' },
        { text: 'Spoken Scripts', link: '/14-say-it-out-loud' },
      ],
      sidebar: [
        {
          text: 'Project Overview',
          collapsed: false,
          items: [
            { text: 'Table of Contents', link: '/README' },
            { text: '00. Project Type & Pre-Check', link: '/00-project-type' },
            { text: '00a. Deep Project Analysis', link: '/00a-project-analysis' },
            { text: '00b. 30s & 2m Pitches', link: '/00b-project-pitch' },
            { text: '00. Full Project Map & Audits', link: '/00-project-map' },
          ],
        },
        {
          text: 'Features (F1 - F12)',
          collapsed: false,
          items: [
            { text: 'Feature Inventory Overview', link: '/01-features' },
            { text: 'F1: Splash Intro & Logo Reveal Engine', link: '/features/f1-splash-intro-engine' },
            { text: 'F2: Custom Interactive Cursor', link: '/features/f2-custom-interactive-cursor' },
            { text: 'F3: Multi-Layer Parallax Hero', link: '/features/f3-locomotive-parallax-hero' },
            { text: 'F4: Best Sellers Interactive Showcase', link: '/features/f4-interactive-best-sellers-showcase' },
            { text: 'F5: Drag-to-Scroll Product Sliders', link: '/features/f5-drag-scroll-product-sliders' },
            { text: 'F6: GSAP ScrollTrigger Pinned Split', link: '/features/f6-gsap-scrolltrigger-pinned-split' },
            { text: 'F7: Mobile Split Feature Cards', link: '/features/f7-mobile-split-feature-cards' },
            { text: 'F8: Bidirectional Infinite Marquee', link: '/features/f8-infinite-bidirectional-social-marquee' },
            { text: 'F9: Accordion FAQ Engine', link: '/features/f9-interactive-faq-accordion' },
            { text: 'F10: Responsive Navbar & Store Finder', link: '/features/f10-responsive-navbar-and-store-locator' },
            { text: 'F11: Brand Footer & Newsletter', link: '/features/f11-brand-footer-and-newsletter' },
            { text: 'F12: Reusable Framer Motion Observer', link: '/features/f12-reusable-framer-viewport-observer' },
          ],
        },
        {
          text: 'Architecture & Implementation',
          collapsed: false,
          items: [
            { text: '02. Step-by-Step Rebuild Order', link: '/02-build-order' },
            { text: '03. Static Data APIs & Schema', link: '/03-api-reference' },
            { text: '04. Tech Choice Comparisons', link: '/04-tech-comparisons' },
            { text: '05. Architecture & Lifecycles', link: '/05-architecture' },
            { text: '06. Security & OWASP Audit', link: '/06-security' },
            { text: '07. Proposed AI Barista Engine', link: '/07-ai-integration' },
            { text: '08. Engineering Quality & DevOps', link: '/08-quality-and-ops' },
          ],
        },
        {
          text: 'System Design Deep Dive',
          collapsed: true,
          items: [
            { text: 'System Design Curriculum Index', link: '/system-design/' },
            { text: '14.1 Requirements & Capacity Estimation', link: '/system-design/01-requirements-and-estimation' },
            { text: '14.2 Architecture Styles & Patterns', link: '/system-design/02-architecture-styles' },
            { text: '14.3 Networking, CDN & Asset Delivery', link: '/system-design/03-networking-and-communication' },
            { text: '14.4 Load Balancing & Frontend HA', link: '/system-design/04-load-balancing-and-scaling' },
            { text: '14.5 Databases, Storage & Cloud Asset Stores', link: '/system-design/05-databases-and-storage' },
            { text: '14.6 Multi-Tier Caching & Asset Caching', link: '/system-design/06-caching' },
            { text: '14.7 Messaging, Async Queues & Webhooks', link: '/system-design/07-messaging-queues-async' },
            { text: '14.8 Concurrency, State Race Conditions & Sync', link: '/system-design/08-consistency-concurrency-distributed' },
            { text: '14.9 Reliability, Resilience & Graceful Degradation', link: '/system-design/09-reliability-and-resilience' },
            { text: '14.10 API Gateway, Throttling & Client Rate Limiting', link: '/system-design/10-api-design-rate-limiting' },
            { text: '14.11 Security Architecture, CSP & XSS Shielding', link: '/system-design/11-security-architecture' },
            { text: '14.12 Search & AI Recommendation Engine', link: '/system-design/12-search-and-ai-architecture' },
            { text: '14.13 Real-Time Order & Location Presence', link: '/system-design/13-real-time-systems' },
            { text: '14.14 Observability, Core Web Vitals & RUM', link: '/system-design/14-observability-and-operations' },
            { text: '14.15 Performance Engineering & Animation 60 FPS', link: '/system-design/15-performance-engineering' },
            { text: '14.16 Cost, Cloud Budgets & Build vs Buy', link: '/system-design/16-cost-and-tradeoffs' },
            { text: '14.17 Classic System Design Problems Adapted', link: '/system-design/17-classic-questions' },
            { text: '14.18 Architectural Decision Records (ADR)', link: '/system-design/decisions' },
          ],
        },
        {
          text: 'Interview Mastery & Reference',
          collapsed: false,
          items: [
            { text: '09. 160 Interview Questions & Answers', link: '/09-interview-qa' },
            { text: '10. Code Audit & Prioritized Gaps', link: '/10-gaps-and-improvements' },
            { text: '11. Technical Glossary', link: '/11-glossary' },
            { text: '12. Developer Confirm List', link: '/12-confirm-list' },
            { text: '13. Master 275-Item Checklist', link: '/13-master-checklist' },
            { text: '14. Say It Out Loud Scripts', link: '/14-say-it-out-loud' },
          ],
        },
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2026 Avish Jain. Starbucks Frontend Redesign Documentation.',
      },
    },
    mermaid: {
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#0a0a0a',
        mainBkg: '#121212',
        nodeBorder: '#00a76f',
        lineColor: '#00c684',
        textColor: '#f7f7f7',
      },
    },
  })
);
