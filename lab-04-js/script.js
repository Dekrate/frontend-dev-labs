'use strict';

const POINTS_TO_WIN_SET = 11;
const POINTS_MARGIN = 2;
const SETS_TO_WIN_MATCH = 2;

const state = {
  score1: 0,
  score2: 0,
  sets1: 0,
  sets2: 0,
  matchComplete: false
};

const elements = {
  score1: document.querySelector('#score1'),
  score2: document.querySelector('#score2'),
  sets: document.querySelector('#sets'),
  scoreboard: document.querySelector('#scoreboard'),
  message: document.querySelector('#message'),
  addP1: document.querySelector('#add-p1'),
  addP2: document.querySelector('#add-p2'),
  newSetBtn: document.querySelector('#new-set'),
  newMatchBtn: document.querySelector('#new-match')
};

const updateDisplay = () => {
  elements.score1.textContent = state.score1;
  elements.score2.textContent = state.score2;
  elements.sets.textContent = `${state.sets1}:${state.sets2}`;
  
  elements.scoreboard.classList.toggle('match-over', state.matchComplete);
  
  if (state.matchComplete) {
    const winner = state.sets1 > state.sets2 ? 'Marcin' : 'Opponent';
    showMessage(`${winner} wins the match!`);
  }
};

const showMessage = (text) => {
  elements.message.textContent = text;
  elements.message.style.display = 'block';
};

const hideMessage = () => {
  elements.message.style.display = 'none';
};

const checkSetWin = () => {
  const diff = Math.abs(state.score1 - state.score2);
  const maxScore = Math.max(state.score1, state.score2);
  
  if (maxScore >= POINTS_TO_WIN_SET && diff >= POINTS_MARGIN) {
    if (state.score1 > state.score2) {
      state.sets1++;
    } else {
      state.sets2++;
    }
    
    state.score1 = 0;
    state.score2 = 0;
    
    if (state.sets1 >= SETS_TO_WIN_MATCH || state.sets2 >= SETS_TO_WIN_MATCH) {
      state.matchComplete = true;
    }
    
    return true;
  }
  return false;
};

const addPoint = (player) => {
  if (state.matchComplete) return;
  
  if (player === 'player1') {
    state.score1++;
  } else {
    state.score2++;
  }
  
  checkSetWin();
  updateDisplay();
};

const newSet = () => {
  if (state.matchComplete) return;
  
  state.score1 = 0;
  state.score2 = 0;
  hideMessage();
  updateDisplay();
};

const newMatch = () => {
  state.score1 = 0;
  state.score2 = 0;
  state.sets1 = 0;
  state.sets2 = 0;
  state.matchComplete = false;
  hideMessage();
  updateDisplay();
};

const handleKeyboard = (e) => {
  const key = e.key.toLowerCase();
  
  switch (key) {
    case 'a':
    case 'arrowleft':
      e.preventDefault();
      addPoint('player1');
      break;
    case 'd':
    case 'arrowright':
      e.preventDefault();
      addPoint('player2');
      break;
    case 's':
      e.preventDefault();
      newSet();
      break;
    case 'r':
      e.preventDefault();
      newMatch();
      break;
  }
};

elements.addP1.addEventListener('click', () => addPoint('player1'));
elements.addP2.addEventListener('click', () => addPoint('player2'));
elements.newSetBtn.addEventListener('click', newSet);
elements.newMatchBtn.addEventListener('click', newMatch);
document.addEventListener('keydown', handleKeyboard);

updateDisplay();
