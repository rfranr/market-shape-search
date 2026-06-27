import { app } from './app.js';
import { config } from './shared/config.js';

const port: number = config.port;

app.listen(port, (): void => {
  console.log(`BFF escoltant a http://localhost:${port}`);
});
