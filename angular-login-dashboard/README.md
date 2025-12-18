# AngularLoginDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Backend (local development)

This repository includes a simple Express + Mongoose backend in `backend/` used by the frontend during development.

Quick start (from repository root):

```bash
cd angular-login-dashboard/backend
npm install
# Optionally set MONGO_URI to point to your MongoDB (default: mongodb://localhost:27017/angular_dashboard_db)
# Example (Windows PowerShell):
# $env:MONGO_URI = 'mongodb://127.0.0.1:27017/angular_dashboard_db'

# Run the API server
npm run dev

# Seed sample data (will clear and insert sample students/teachers/bills/schedules)
npm run seed
```

API base URL: `http://localhost:3000/api`

Endpoints:
- `GET /api/students` — list students
- `POST /api/students` — create student
- `PUT /api/students/:id` — update student
- `DELETE /api/students/:id` — delete student

Same pattern exists for `/api/teachers`, `/api/bills`, and `/api/schedules`.
