# Lab 05 - REST API

## What
Express.js API with in-memory film collection + browser client.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items | All films |
| GET | /items/:id | Single film |
| POST | /items | Add film (needs title, category, year) |
| DELETE | /items/:id | Remove film |

## Run
```bash
npm install
node server.js
```
Open http://localhost:3000

## Test
```powershell
.\test-api.ps1           # basic tests
.\test-api-aggressive.ps1 # validation, edge cases, concurrency
```

## Data
5 films by default in data/films.json.
