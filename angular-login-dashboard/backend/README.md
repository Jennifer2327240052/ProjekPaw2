# Backend (Express + Mongoose)

This folder contains a small Express REST API used by the Angular frontend during development.

Structure

- `server.js` — Express server and MongoDB connection.
- `models/` — Mongoose models for `Student`, `Teacher`, `Bill`, `Schedule`.
- `routes/` — REST routes for each model.
- `seed.js` — script to populate the database with sample data.

Environment

Create a `.env` file or set the `MONGO_URI` environment variable to point to your MongoDB instance. If not set, the server uses `mongodb://localhost:27017/angular_dashboard_db`.

Quick run

```bash
cd angular-login-dashboard/backend
npm install
# set MONGO_URI if needed
npm run dev
```

Seed sample data

```bash
npm run seed
```

API base URL: `http://localhost:3000/api`

Notes

- The seed script will clear existing collections for `students`, `teachers`, `bills`, and `schedules` before inserting sample data.
- For production use, add proper configuration, validation, authentication, and logging.
