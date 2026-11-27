# TeamSync

TeamSync is a team workspace with separate administrator and employee experiences. The repository includes a React frontend and an Express API backed by MongoDB.

## Repository layout

```text
team-sync/
├── frontend/                # React/Vite application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                 # Express API, MongoDB models, and API docs
│   ├── docs/
│   ├── src/
│   ├── server.js
│   └── package.json
└── README.md
```

The frontend and backend are sibling folders. Each has its own `package.json` and installs dependencies separately.

## Requirements

- Node.js and npm
- A MongoDB database
- ImageKit account credentials (needed for profile image uploads)

## Backend configuration

Create `backend/.env` locally. Do not commit secrets.

```env
PORT=4000
MONGO_URL=mongodb://127.0.0.1:27017/teamsync
ACCESS_TOKEN_SECRET=use-a-long-random-secret
REFRESH_TOKEN_SECRET=use-a-different-long-random-secret
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_END=https://ik.imagekit.io/your-imagekit-id
```

`FRONTEND_URL` adds the frontend origin to the backend CORS allowlist. The backend also currently allows `http://localhost:5173`, `http://localhost:3000`, and the configured DigitalOcean frontend origin. For another deployment origin, update the CORS allowlist in `backend/src/app.js` or configure the allowlist through environment variables before deploying.

## Frontend configuration

The frontend defaults to the deployed TeamSync API. To point it at the local backend, create `.env.local` in the repository root:

```env
VITE_API_URL=http://localhost:4000
```

The frontend adds `/api` to this value and sends requests with cookies enabled. Restart Vite after changing environment variables.

## Run the project locally

Install and start the backend in one terminal:

```bash
cd backend
npm install
npm start
```

Create `backend/.env` before starting it. By default, the API listens on port `4000` and connects to the MongoDB URL in `MONGO_URL`.

Install and start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173>.

## Useful URLs

| URL | Purpose |
| --- | --- |
| `http://localhost:5173` | Frontend development app |
| `http://localhost:4000/` | Backend health response |
| `http://localhost:4000/api-reference` | HTML API reference |
| `http://localhost:4000/api-docs` | Swagger UI |
| `http://localhost:4000/api-docs/openapi.json` | OpenAPI JSON |

## Available commands

Run frontend commands from `frontend/`:

```bash
npm run dev       # Start Vite with hot reload
npm run lint      # Lint frontend files
npm run build     # Create the production frontend bundle in dist/
npm run preview   # Serve the production bundle locally
```

Run backend commands from `backend/`:

```bash
npm start         # Start the API server
```

The backend currently has no automated test suite; its `test` script is a placeholder.

## Features

- Registration, login, logout, current-user lookup, and access-token refresh
- Cookie-based authentication and protected routes
- Role-specific navigation and access for administrators and employees
- Employee directory and employee creation
- Department listing and creation
- Task creation, assignment, filtering, pagination, status changes, deletion, detail view, kanban view, and analytics
- Dashboard summary cards and recent tasks
- Shared theme controls and toast notifications
- Documents interface with sample records, search, category filters, preview, and sample text downloads
- Chat navigation and interface shell

The Documents page uses frontend sample data; it does not upload or retrieve real files. The API currently has no chat/messaging endpoints, so chat is not a live messaging feature. The backend mounts API route groups for auth, employees, tasks, dashboard, and departments.

## API route groups

All API routes are under `/api` and require authentication unless their route specifically permits public access. See the API docs for request/response schemas and role permissions.

| Prefix | Area |
| --- | --- |
| `/api/auth` | Register, login, logout, current user, refresh token |
| `/api/employee` | Employee listing, details, create, update, delete, profile image upload |
| `/api/tasks` | Task list/create/details, kanban, analytics, assignment, status, delete |
| `/api/dashboard` | Dashboard statistics |
| `/api/departments` | Department listing, creation, management |

## Authentication and deployment notes

- The frontend Axios client uses `withCredentials: true`; backend CORS must allow the exact frontend origin and credentials.
- Set `VITE_API_URL` in `frontend/.env.local` to the API origin, without a trailing `/api` (for example `https://api.example.com`). The client appends `/api`.
- Set `FRONTEND_URL` to the deployed frontend origin and ensure it is present in the backend CORS allowlist.
- Set secure, unique access and refresh token secrets in each environment.
- Configure production cookie settings and HTTPS for deployed frontend/backend origins.
- Never commit `.env` files, database credentials, token secrets, or private ImageKit keys.

## Seed scripts

`backend/insert.js` and `backend/insertTasks.js` are database seed scripts. Inspect their contents and confirm the configured database before running them; they modify database records.
