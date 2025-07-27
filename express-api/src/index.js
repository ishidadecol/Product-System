import app from './app.js';
import { connectWithRetry } from './database.js';

const PORT = process.env.EXPRESS_PORT || 8081;

//TRY TO CONNECT TO DATABASE
await connectWithRetry();

app.listen(PORT, () => {
  console.log(`DEBUG: running at http://localhost:${PORT}`);
});