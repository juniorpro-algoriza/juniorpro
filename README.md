# SAWIHA Frontend

Professional platform for managing junior learning paths and contributions.

## 📖 Documentation

- [**Architect Overview**](./docs/ARCHITECT_OVERVIEW.md) - Tech stack and architecture.
- [**Implementation Guide**](./docs/IMPLEMENTATION_GUIDE.md) - Step-by-step guide for developers.
- [**Reminders**](./docs/REMINDERS.md) - Important project notes.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```
2. **Setup environment**:
   Copy `.env.example` to `.env.local` and add the required variables.
3. **Run the development server**:
   ```bash
   pnpm dev
   ```

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [CVA](https://cva.style/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (Server), [Jotai](https://jotai.org/) (Client)
- **API Integration**: Custom typed fetch integrated with OpenAPI/Swagger Schema
- **Components**: Headless UI, Lucide Icons, Motion Animations
