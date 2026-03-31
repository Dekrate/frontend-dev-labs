const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

const MEDALS = ['🥇', '🥈', '🥉'];

const players = [
  { name: 'Marcin', elo: 1567, matches: 124, wins: 47 },
  { name: 'Jan', elo: 1423, matches: 89, wins: 34 },
  { name: 'Anna', elo: 1689, matches: 156, wins: 102 }
];

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const validatePlayer = (player) => {
  if (player.elo < 1000 || player.elo > 2500) {
    throw new ValidationError(`ELO ${player.elo} out of range (1000-2500)`);
  }
  if (player.wins > player.matches) {
    throw new ValidationError(`Wins (${player.wins}) cannot exceed matches (${player.matches})`);
  }
};

const calculateWinrate = (player) => {
  validatePlayer(player);
  if (player.matches === 0) return 0;
  return Math.round((player.wins / player.matches) * 100);
};

const sortByElo = (players) => [...players].sort((a, b) => b.elo - a.elo);

const getTopPlayer = (players) => sortByElo(players)[0];

const addMatch = (player, won) => {
  validatePlayer(player);
  player.matches++;
  if (won) player.wins++;
  validatePlayer(player);
  return player;
};

const displayStats = (player, rank = 0) => {
  const winrate = calculateWinrate(player);
  const medal = rank < 3 ? MEDALS[rank] : '  ';
  const checkmark = winrate >= 50 ? `${COLORS.green}✓${COLORS.reset}` : '';
  const nameColor = rank === 0 ? COLORS.yellow : COLORS.cyan;
  
  console.log(
    `${medal} ${nameColor}${player.name.padEnd(8)}${COLORS.reset} ` +
    `(ELO: ${COLORS.bold}${player.elo}${COLORS.reset}) | ` +
    `${player.matches} mecze | ` +
    `${COLORS.bold}${winrate}%${COLORS.reset} winrate ${checkmark}`
  );
};

const findPlayer = (name) => {
  const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!player) {
    throw new ValidationError(`Player "${name}" not found`);
  }
  return player;
};

const parseBoolean = (value) => {
  if (value === undefined) throw new ValidationError('Missing win/loss argument');
  const normalized = value.toLowerCase().trim();
  if (['true', '1', 'yes', 'won', 'win'].includes(normalized)) return true;
  if (['false', '0', 'no', 'lost', 'loss', 'lose'].includes(normalized)) return false;
  throw new ValidationError(`Invalid boolean value: "${value}"`);
};

const showUsage = () => {
  console.log(`${COLORS.bold}Padel Console Tracker${COLORS.reset}\n`);
  console.log('Usage:');
  console.log(`  ${COLORS.cyan}node app.js list${COLORS.reset}              - List all players`);
  console.log(`  ${COLORS.cyan}node app.js top${COLORS.reset}               - Show top player`);
  console.log(`  ${COLORS.cyan}node app.js add-match <name> <won>${COLORS.reset} - Add match result`);
  console.log(`\nExamples:`);
  console.log(`  node app.js add-match Marcin true`);
  console.log(`  node app.js add-match Jan false`);
};

const commands = {
  list: () => {
    sortByElo(players).forEach((player, idx) => displayStats(player, idx));
  },
  
  top: () => {
    const top = getTopPlayer(players);
    displayStats(top, 0);
  },
  
  'add-match': () => {
    const playerName = process.argv[3];
    const result = process.argv[4];
    
    if (!playerName) throw new ValidationError('Player name required');
    
    const player = findPlayer(playerName);
    const won = parseBoolean(result);
    
    addMatch(player, won);
    
    const outcome = won ? `${COLORS.green}won${COLORS.reset}` : `${COLORS.red}lost${COLORS.reset}`;
    console.log(`Match recorded: ${player.name} ${outcome}`);
    console.log(`New stats:`);
    displayStats(player);
  }
};

const main = () => {
  const command = process.argv[2];
  
  if (!command || command === '--help' || command === '-h') {
    showUsage();
    process.exit(0);
  }
  
  const handler = commands[command];
  if (!handler) {
    console.error(`${COLORS.red}Unknown command: "${command}"${COLORS.reset}`);
    showUsage();
    process.exit(1);
  }
  
  try {
    handler();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`${COLORS.red}Error: ${error.message}${COLORS.reset}`);
      process.exit(1);
    }
    throw error;
  }
};

main();
