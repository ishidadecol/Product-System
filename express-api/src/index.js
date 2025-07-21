// index.js
import app from './app.js';

const PORT = process.env.EXPRESS_PORT || 3001;

app.listen(PORT, () => {
  console.log(`DEBUG: running at http://localhost:${PORT}`);
});