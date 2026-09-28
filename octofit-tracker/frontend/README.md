# OctoFit Tracker Frontend

The React 19 and Vite presentation tier provides routed views for activities, the leaderboard, teams, users, and workouts.

## API configuration

For a Codespaces frontend, `VITE_CODESPACE_NAME` must be defined with the Codespace name (not a URL). Add it to `octofit-tracker/frontend/.env.local`, for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use `.env.example` as a starting point. Restart Vite after changing environment variables. When `VITE_CODESPACE_NAME` is unset, the frontend falls back to `http://localhost:8000` for local development.

The frontend calls the API on port 8000. The API must allow cross-origin requests from the frontend origin (`https://<codespace-name>-5173.app.github.dev` in Codespaces or `http://localhost:5173` locally).

## Run

```sh
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
