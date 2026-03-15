# 🔧 Design Decisions: Mobixa

The visual and architectural identity of Mobixa is built on a "Premium Tech" philosophy—merging high-end aesthetics with industrial-grade reliability.

---

## 🌌 1. The "Obsidian" Design System
We opted for a deep-theme palette with neon accents and glassmorphism.
- **Why?**: To evoke a sense of luxury and futuristic technology, similar to modern high-end smartphone manufacturer branding.
- **Implementation**: Used high-quality HSL-tailored colors and subtle micro-animations to create a "tactile" digital experience.

## 🧩 2. Bento-Style Information Architecture
The home screen utilizes a bento-grid layout instead of traditional vertical lists.
- **Why?**: To maximize information density while maintaining visual hierarchy. It allows for showcasing "Hero" features in larger blocks and "Secondary" specs in smaller ones.
- **Result**: A layout that feels cohesive, organized, and desktop-class even on small screens.

## 📱 3. Cross-Platform Visual Parity
We aimed for 1:1 visual parity between the React web app and the Flutter mobile app.
- **Why?**: To ensure a seamless brand experience. A user switching from their desktop to their phone should feel they are using the same "engine."
- **Technique**: Component-driven design where layouts are mirrored conceptually across different frameworks.

## 🏗️ 4. API-First Backend Design
The backend was designed with a strict separation between business logic and delivery.
- **Why?**: To support multiple clients (Web, Mobile, Admin Dashboard) from a single source of truth.
- **Tooling**: TypeScript was chosen for the backend to provide strict typing, reducing runtime errors and improving developer productivity.

## ⚡ 5. Interactive 3D over Static 2D
We replaced conventional product images with real-time 3D models in the hero section.
- **Why?**: To increase user engagement and provide an at-home "store" experience where users can view products from every angle.
- **Decision**: Used the GLB format for its efficiency and native support in both `<model-viewer>` (Web) and `o3d` (Mobile).

---

## 🏗️ 6. Layered Monolith & Structural Patterns
We chose architectural patterns that prioritize developer velocity and system modularity:
- **Repository Pattern**: Chosen for the backend to ensure the business logic is never coupled to a specific database vendor. This architecture allows us to currently use the current DB as a temporary database, with plans to integrate PostgreSQL to the system as the primary DB in the future.
- **Component-Driven Development**: By building the UI as a set of atomic components, we ensured that visual changes (like glassmorphism) could be propagated across the entire app by editing a single file.
- **Separation of Concerns**: Each folder has a singular responsibility (e.g., `screens` for layout, `providers` for data management), matching the mental model of how users interact with different app layers.
