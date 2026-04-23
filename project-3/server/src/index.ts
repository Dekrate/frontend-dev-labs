import { app, initApp } from './app';

const PORT = process.env.PORT ?? 3000;

async function main() {
  await initApp();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});
