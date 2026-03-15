# 🧠 Engineering Lessons: Mobixa

Building a high-performance, cross-platform e-commerce ecosystem like Mobixa provided several critical technical insights into modern software architecture and user experience.

---

## 🚀 1. Real-time 3D Rendering in Mobile
Integrating the `O3D` (Google Model Viewer) engine into a Flutter application taught us that:
- **Resource Management**: 3D assets must be highly optimized (GLB format) to maintain 60FPS on mobile devices.
- **Asynchronous Loading**: Eager loading strategies are essential to prevent UI "jank" during asset initialization.
- **Camera Calibration**: Mapping 3D coordinates (Theta, Phi, Radius) to a 2D screen requires precise mathematical alignment to ensure the product remains the focal point.

## 🎨 2. Bento-Grid & Glassmorphism at Scale
Implementing a non-standard UI layout like the Bento-Grid required:
- **Flexible Constraints**: Moving away from static `GridView` to dynamic `Column`/`Row` combinations to handle various aspect ratios without overflow.
- **Visual Weight**: Balancing glassmorphism (blur/opacity) with readability. Using `withValues(alpha: ...)` instead of deprecated methods ensured future-proof Flutter code.

## 🔄 3. State Management & Data Sync
Ensuring the Web and Mobile platforms stayed in sync taught us:
- **Single Source of Truth**: Centralizing mock data during the prototyping phase before transitioning to a unified MongoDB backend.
- **Serialization Patterns**: Maintaining consistent JSON structures across TypeScript and Dart to simplify future API integration.

## 🛠️ 4. Handling Environment Complexity
Developing a full-stack system involving Node.js, React, and Flutter simultaneously reinforced:
- **Permission Management**: The critical importance of `AndroidManifest.xml` configuration (Internet permissions, Cleartext traffic) for fetching remote assets.
- **Build Optimization**: Leveraging Vite's fast HMR for the web while managing complex Gradle builds for the mobile app.

## 📈 5. Scalability Decisions (The Database Strategy)
The decision to use the current database as a temporary DB for the system was driven by rapid prototyping needs:
- **Future Integration**: In the future, PostgreSQL will be integrated to the system as the primary DB to provide robust, relational data integrity and complex querying capabilities.
- **Temporary Solution**: The current DB serves as a flexible, temporary data store while the core relational schema is finalized for PostgreSQL.

---

## 🏗️ 6. Folder Architecture & Code Patterns
The system follows a strict modular structure to ensure maintainability:
- **Repository Pattern (Backend)**: By abstracting the database layer into `storage.ts`, we've made the system "DB-agnostic." This allows for seamless migration to PostgreSQL in the future, while currently using the current DB as a temporary database.
- **Provider State Management (Mobile)**: Using centralized providers allows us to decouple UI state from the view layer, ensuring the 3D model engine remains performant and responsive.
- **Atomic-Lite Design (Web)**: Structuring the React app into `components` (atoms) and `pages` (organisms) kept the logic footprint small, enabling the high-density bento-grid to render with zero layout shift.
