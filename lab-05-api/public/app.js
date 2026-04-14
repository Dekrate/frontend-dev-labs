const API_URL = '/items';

const form = document.getElementById('addForm');
const tableBody = document.getElementById('tableBody');
const countSpan = document.getElementById('count');
const messageDiv = document.getElementById('message');

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 4000);
}

function renderFilm(film) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${film.id}</td>
    <td>${film.title}</td>
    <td>${film.category}</td>
    <td>${film.year}</td>
    <td class="${film.watched ? 'watched-true' : 'watched-false'}">${film.watched ? '[X]' : '[ ]'}</td>
    <td>
      <button class="btn btn-delete" data-id="${film.id}">DEL</button>
    </td>
  `;
  return tr;
}

function renderFilms(films) {
  tableBody.innerHTML = '';
  films.forEach(film => {
    tableBody.appendChild(renderFilm(film));
  });
  countSpan.textContent = `(${films.length} items)`;
}

async function loadFilms() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const films = await response.json();
    renderFilms(films);
  } catch (error) {
    showMessage(`FAILED TO LOAD: ${error.message}`, 'error');
  }
}

async function addFilm(title, category, year) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, year })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    const newFilm = await response.json();
    tableBody.appendChild(renderFilm(newFilm));
    updateCount();
    showMessage(`ADDED: ${newFilm.title}`, 'success');
  } catch (error) {
    showMessage(`ADD FAILED: ${error.message}`, 'error');
  }
}

async function deleteFilm(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const btn = row.querySelector('.btn-delete');
      if (btn && parseInt(btn.dataset.id) === id) {
        row.remove();
      }
    });
    updateCount();
    showMessage('DELETED SUCCESSFULLY', 'success');
  } catch (error) {
    showMessage(`DELETE FAILED: ${error.message}`, 'error');
  }
}

function updateCount() {
  const rows = tableBody.querySelectorAll('tr');
  countSpan.textContent = `(${rows.length} items)`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value.trim();
  const year = document.getElementById('year').value.trim();
  if (title && category && year) {
    addFilm(title, category, parseInt(year));
    form.reset();
  }
});

tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const id = parseInt(e.target.dataset.id);
    deleteFilm(id);
  }
});

loadFilms();