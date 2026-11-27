# TeamSync

TeamSync is a role-based team workspace for administrators and employees. The repository contains a React/Vite frontend and an Express/MongoDB API in one Git repository.

## Project structure

```text
.
├── src/                 # React frontend
├── backend/             # Express API
│   ├── src/
│   ├── docs/            # OpenAPI and HTML API reference
│   └── server.js
└── README.md
```

The frontend runs on Vite at `http://localhost:5173`. The backend listens on port `4000` by default.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB connection string
- ImageKit credentials for profile image uploads

## Configure the backend

Create `backend/.env` (do not commit this file):

```env
PORT=4000
MONGO_URL=mongodb://127.0.0.1:27017/teamsync
ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-another-long-random-secret
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_END=https://ik.imagekit.io/your-imagekit-id
```

`FRONTEND_URL` is an allowed CORS origin. The backend also allows the development origins `http://localhost:5173` and `http://localhost:3000`, plus the currently configured production frontend origin.

## Run locally

Open two terminals from the repository root.

Terminal 1, start the API:

```bash
cd backend
npm install
npm start
```

Terminal 2, start the frontend:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API health response is at `http://localhost:4000/`; the API reference is at `http://localhost:4000/api-reference`, and Swagger UI is at `http://localhost:4000/api-docs`.

By default the frontend uses the deployed API URL. To use the local backend, create a root `.env.local` file:

```env
VITE_API_URL=http://localhost:4000
```

The frontend appends `/api` to this value. Restart the Vite server after changing environment variables.

## Available commands

From the repository root (frontend):

```bash
npm run dev       # Start Vite development server
npm run lint      # Run ESLint on the frontend
npm run build     # Build the frontend for production
npm run preview   # Preview the production build
```

From `backend/`:

```bash
npm start         # Start the Express API
```

The backend package does not currently have an automated test suite.

## Application areas

- Authentication: registration, login, session refresh, and logout using HTTP-only cookies
- Role-based navigation and route protection for admins and employees
- Employees: directory and employee creation
- Departments: department creation and listing
- Tasks: task creation, list filters, pagination, assignment, status changes, deletion, details, kanban view, and analytics
- Dashboard: workspace summary cards and recent tasks
- Documents: sample frontend documents with search, category filters, preview, and sample text downloads
- Chats: frontend navigation and page; the API reference currently does not define messaging endpoints
- Shared light/dark theme and toast notifications

Document samples are frontend-only placeholders. Chat messaging is not connected to a backend API. The backend currently mounts authentication, employee, task, dashboard, and department routes.

## API and authentication notes

The API base URL is configured in `src/config/axiosInstance.jsx` and can be overridden using `VITE_API_URL`. The frontend sends requests with credentials enabled. Keep the frontend origin in the backend CORS allowlist and configure the same origin in `FRONTEND_URL` for deployments.

API documentation files are in `backend/docs/`. Never commit `.env`, access secrets, database credentials, or private ImageKit keys.
