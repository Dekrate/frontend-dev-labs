const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'films.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readFilms() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeFilms(films) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(films, null, 2));
}

app.get('/items', (req, res) => {
  res.json(readFilms());
});

app.get('/items/:id', (req, res) => {
  const films = readFilms();
  const film = films.find(f => f.id === parseInt(req.params.id));
  if (!film) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(film);
});

app.post('/items', (req, res) => {
  const { title, category, year } = req.body;
  if (!title || !category || !year) {
    return res.status(400).json({ error: 'Missing required fields: title, category, year' });
  }
  const films = readFilms();
  const newId = Math.max(...films.map(f => f.id), 0) + 1;
  const newFilm = { id: newId, title, category, year, watched: false };
  films.push(newFilm);
  writeFilms(films);
  res.status(201).json(newFilm);
});

app.delete('/items/:id', (req, res) => {
  const films = readFilms();
  const index = films.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  films.splice(index, 1);
  writeFilms(films);
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});