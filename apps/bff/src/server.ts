import { app } from './app.js';

const port: number = Number(process.env.PORT ?? 3001);

app.listen(port, (): void => {
  console.log(`BFF escoltant a http://localhost:${port}`);
});
