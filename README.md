# Smart Notes App with AI Summary

AI-powered Smart Notes application that lets users create, manage, and summarize notes using an AI summary generator. This repository contains a Node.js/Express backend and a Vite + React frontend, and includes Docker configuration for local development and deployment.

**Quick links**
- **Backend:** [backend](backend)
- **Frontend:** [frontend](frontend)

## Features
- Create, update and delete notes
- User authentication with JWT
- AI-generated summaries for notes
- Dockerized development and production-ready setup

## Tech stack
- Backend: Node.js, Express
- Frontend: React, Vite
- Data/infra: (see `src/config` for DB/Redis setup)
- Containerization: Docker, docker-compose

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Docker & Docker Compose (for containerized setup)

## Environment
- Copy and edit environment file for backend:

```bash
cp backend/.env.example backend/.env
# then edit backend/.env to set DB, Redis and JWT secrets
```

## Setup — Local (development)

1. Install dependencies for backend and frontend:

```bash
# from repository root
cd backend
npm install

cd ../frontend
npm install
```

2. Start backend and frontend in separate terminals for development:

```bash
# start backend (development)
cd backend
npm run dev

# start frontend
cd frontend
npm run dev
```

3. Open the frontend in your browser (Vite usually serves at http://localhost:5173).

## Docker (recommended)
The project includes a `docker-compose.yml` at the repository root to run both services together.

```bash
# build and start services
docker-compose up --build

# stop and remove
docker-compose down
```

## Backend — notes for developers
- Entry point: [server.js](server.js)
- Routes: see [src/routes](backend/src/routes) (for example `authRoutes.js` and `userRoutes.js`)
- Controllers: [backend/src/controllers](backend/src/controllers) contains request handlers such as `authController.js`.
- Middleware: [backend/src/Middleware](backend/src/Middleware) contains `authMiddleware.js` and other helpers.
- Config: [backend/src/config/db.js](backend/src/config/db.js) and [backend/src/config/redisClient.js](backend/src/config/redisClient.js)

Sessions & logout
- The backend stores active JWTs in Redis (key format `token:<jwt>`). On login/signup the server saves the token with a TTL matching the JWT expiry. Logout removes the token from Redis so the token becomes invalid immediately.

When adding or inspecting authentication flows, check `backend/src/controllers/authController.js` and `backend/src/Middleware/authMiddleware.js` — the middleware validates the JWT and verifies the token exists in Redis.

Common backend scripts (package.json):

```bash
npm run dev     # run in development mode (nodemon or similar)
npm start       # run production server
```

### Important environment variables (backend/.env)
- `PORT` — port for the backend server
- `MONGO_URI` or `DATABASE_URL` — database connection string (if applicable)
- `REDIS_URL` — redis connection for caching/sessions
- `JWT_SECRET` — secret for signing JWT tokens

## Frontend — notes for developers
- Entry: [src/main.jsx](frontend/src/main.jsx)
- Pages: [frontend/src/Pages](frontend/src/Pages) (Login, Signup, List, Summary, Notfound)
- API helper: [frontend/src/Api/Api.js](frontend/src/Api/Api.js) — wrapper for HTTP requests to backend

Common frontend scripts (from `frontend/package.json`):

```bash
npm run dev     # start Vite dev server
npm run build   # build production assets
npm run preview # preview production build
```

## API Endpoints (overview)
This project exposes authentication and user-related API endpoints. The backend routes are defined under `backend/src/routes` — key endpoints include:

- `POST /api/signup` — create a new user
- `POST /api/login` — login and receive JWT

Refer to [backend/src/routes/authRoutes.js](backend/src/routes/authRoutes.js) for the precise list and request formats.

## Project structure

Top-level layout (important folders):

- `backend/` — Express API server and server-side code
- `frontend/` — React app (Vite)
- `docker-compose.yml` — runs both services together

## Troubleshooting
- If ports are in use, change `PORT` in backend `.env` or Vite port in `frontend/package.json` / `vite.config.js`.
- If Docker fails to build, verify local Node versions and that Docker is running.

## Contributing
- Open issues and pull requests are welcome. Please describe the change and include reproduction steps or screenshots where appropriate.

## License
This project does not include a license file. Add a `LICENSE` if you want to make the code permissively available.

---
If you'd like, I can also:
- add an example `.env.example` file to `backend/`,
- add detailed API documentation (request/response examples), or
- create a `CONTRIBUTING.md` and `LICENSE`.

Please tell me which additions you'd like next.
