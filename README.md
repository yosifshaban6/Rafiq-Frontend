# Rafiq

Welcome to **Rafiq**, the platform where bold ideas meet passionate backers. We empower entrepreneurs by connecting them with a global community of supporters ready to fund the next big thing. Whether you're launching a tech product, a creative venture, or a social impact initiative, we provide a support you need to bring your startup to life.

Join us in transforming ideas into reality — one project at a time.

## Project Structure

```
  src/
  ├── assets/          # Static files like images, icons, fonts, logos
  ├── components/      # Reusable UI components (buttons, cards, navbars, etc.)
  ├── pages/           # Route-based page components (Home, Login, Projects, etc.)
  ├── layouts/         # Layout wrappers that define common page structure (e.g., navbar + footer)
  ├── services/        # API interaction logic and business services (e.g., auth, projects)
  ├── hooks/           # Custom React hooks for reusable logic (e.g., useAuth)
  ├── context/         # React Context providers for global app state management (e.g., AuthContext)
  ├── utils/           # Utility functions and helpers (e.g., validation, formatting)
  ├── router/          # React Router configuration and route definitions
  ├── App.jsx          # Root React component; renders router and main layout
  ├── main.jsx         # Application entry point; mounts App to the DOM
```

## Getting Started

### Clone this repo:

```shell
  git clone https://github.com/Rafiq-Fund/Rafiq-Frontend.git
  cd rafiq-frontend
```

### Install Dependencies:

```shell
  npm install
```

### Set Up the Development Environment:

Run the development server:

```
  npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port specified by Vite).

### Check for Linting Issues:

```shell
  npm run lint
```

This runs eslint src to check for issues across all source files.

### Auto-Fix Linting Issues:

```shell
  npm run lint:fix
```

This runs eslint src --fix to automatically fix fixable issues.

### Format Code with Prettier:

```shell
  npm run format
```

This runs `prettier --write .` to format all JavaScript and JSX files.
