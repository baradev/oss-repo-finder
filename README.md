# Open Source Finder

A full-stack application for discovering open source repositories on GitHub. Built with React, TypeScript, and Fastify.

## Features

- 🔍 Search repositories by language and keywords
- ⭐ Sort by stars, recently updated, or help-wanted issues
- 🎨 Clean, responsive UI
- 🚀 Fast backend API
- 📦 Well-architected codebase following best practices

## Project Structure

```
open-source-finder/
├── backend/              # Fastify API server
│   ├── src/
│   │   ├── config/      # Environment configuration
│   │   ├── middleware/  # Error handling, validation
│   │   ├── routes/      # API route handlers
│   │   ├── services/    # Business logic layer
│   │   ├── types/       # TypeScript type definitions
│   │   └── server.ts    # Application entry point
│   └── .env.example     # Environment variables template
│
└── frontend/            # React + Vite application
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── config/      # Frontend configuration
    │   ├── hooks/       # Custom React hooks
    │   ├── services/    # API client layer
    │   ├── types/       # TypeScript type definitions
    │   └── App.tsx      # Main application component
    └── .env.example     # Environment variables template
```

## Architecture Highlights

### Backend

- **Layered Architecture**: Routes → Services → External APIs
- **Dependency Injection**: Config and services as singletons
- **Error Handling**: Centralized error handler middleware
- **Type Safety**: Full TypeScript with strict mode
- **Environment Config**: Validated configuration at startup

### Frontend

- **Component Composition**: Small, focused components
- **Custom Hooks**: Reusable stateful logic (`useRepositories`)
- **Service Layer**: Centralized API communication
- **Type Safety**: Shared types between components
- **Clean Separation**: UI, logic, and API clearly separated

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- (Optional) GitHub Personal Access Token for higher API rate limits

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd open-source-finder
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env and add your GITHUB_TOKEN (optional)
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install

   # Create environment file
   cp .env.example .env
   # Default values should work for local development
   ```

### Running the Application

1. **Start the backend** (from `backend/` directory)
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3001`

2. **Start the frontend** (from `frontend/` directory, in a new terminal)
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Building for Production

**Backend:**
```bash
cd backend
npm run build    # Compiles TypeScript to dist/
npm start        # Runs the compiled code
```

**Frontend:**
```bash
cd frontend
npm run build    # Builds optimized production bundle to dist/
npm run preview  # Preview the production build
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `HOST` | Server host | `0.0.0.0` |
| `NODE_ENV` | Environment | `development` |
| `GITHUB_TOKEN` | GitHub API token (optional) | - |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` |

## GitHub API Token

To get higher rate limits from GitHub API:

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. No scopes needed for public repository search
4. Add to `backend/.env` as `GITHUB_TOKEN=your_token_here`

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- ESLint

**Backend:**
- Node.js
- Fastify
- TypeScript
- GitHub API

## Best Practices Implemented

- ✅ Environment variable management
- ✅ Layered architecture (separation of concerns)
- ✅ TypeScript with strict mode
- ✅ Error handling middleware
- ✅ Component composition
- ✅ Custom React hooks
- ✅ Service layer pattern
- ✅ Type-safe API contracts
- ✅ Configuration validation

## Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run production server

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

ISC
