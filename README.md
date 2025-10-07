# Elevate Post Management App

A modern React application built with TypeScript for creating, viewing, and managing posts. The app provides a clean, responsive interface for users to interact with posts and includes features like pagination, search, and form validation.

## Features

- 📝 **Create Posts** - Add new posts with title, body, and author selection
- 👀 **View Posts** - Browse through posts with pagination and search
- 🔍 **Search & Filter** - Find posts by title or author
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Instant UI updates with optimistic updates
- 🎨 **Modern UI** - Clean design with Tailwind CSS and shadcn/ui components
- 🔒 **Type Safety** - Full TypeScript support with Zod validation

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router
- **API**: JSONPlaceholder API
- **Icons**: Lucide React

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd elevate-post
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── sonner.tsx   # Toast notifications
│   ├── inputs/          # Form input components
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── CustomSelect.tsx
│   │   └── FormField.tsx
│   ├── errors/          # Error handling components
│   │   ├── ErrorComponent.tsx
│   │   └── ErrorText.tsx
│   └── loaders/         # Loading components
│       └── LoaderOverlay.tsx
├── hooks/               # Custom React hooks
│   ├── useGetPosts.ts   # Posts data fetching
│   ├── useGetUsers.ts   # Users data fetching
│   └── useCreatePost.ts # Post creation
├── layouts/             # Layout components
│   └── Header.tsx       # App header
├── pages/               # Page components
│   ├── posts/
│   │   ├── posts.tsx    # Posts listing page
│   │   ├── create.tsx   # Create post page
│   │   └── id.tsx       # Individual post page
│   └── index.ts
├── store/               # State management
│   └── usePostsStore.ts # Zustand store with persistence
├── types/               # TypeScript type definitions
│   ├── interfaces/
│   │   ├── Post.ts      # Post interface
│   │   └── User.ts      # User interface
│   └── enums/
├── utils/               # Utility functions
│   ├── axios/           # API configuration
│   ├── validation/      # Zod schemas
│   └── index.ts
├── constants/           # App constants
│   └── routes.ts        # Route definitions
└── assets/              # Static assets
    └── bg.jpg           # Background images