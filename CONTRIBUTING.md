# Contributing to Open Source Finder

First off, thank you for considering contributing to Open Source Finder! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct] (CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other projects**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Improvements to docs

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. Ensure the code builds successfully
4. Make sure your code lints (run `npm run lint`)
5. Update documentation if needed

## Development Setup

### Prerequisites

- Node.js 18+
- npm
- Git

### Setup Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/oss-repo-finder.git
   cd oss-repo-finder
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your GITHUB_TOKEN (optional but recommended)
   ```

3. **Set up the frontend**

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

4. **Run in development mode**

   Terminal 1 (Backend):

   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):

   ```bash
   cd frontend
   npm run dev
   ```

5. **Verify everything works**

   ```bash
   # Check code style
   cd backend
   npm run lint

   # Frontend linting
   cd ../frontend
   npm run lint
   ```

   Note: You don't need to run `npm run build` - the CI/CD pipeline will do that automatically!

## Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update the .env.example** files if you add new environment variables
3. **Follow the code style** - we use Prettier for formatting
4. **Write meaningful commit messages**
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit first line to 72 characters
   - Reference issues and pull requests

### Commit Message Format

```
feat: Add repository sorting by stars

- Implement sort dropdown in SearchForm
- Add sort logic to API service
- Update backend to handle sort parameter

Closes #123
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new code
- Define types for all function parameters and return values
- Use interfaces for object shapes
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names

### Code Organization

**Backend:**

```
src/
├── config/       # Configuration and environment
├── middleware/   # Express/Fastify middleware
├── routes/       # HTTP route handlers
├── services/     # Business logic
└── types/        # TypeScript type definitions
```

**Frontend:**

```
src/
├── components/   # React components
├── config/       # Configuration
├── hooks/        # Custom React hooks
├── services/     # API communication
└── types/        # TypeScript type definitions
```

### Git Branch Naming

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `refactor/what-changed` - Code refactoring

## Questions?

Feel free to open an issue with your question, or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README.md. Thank you for your contributions! 🙏
