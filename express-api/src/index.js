import { Sequelize } from 'sequelize';
import app from './app.js';

const PORT = process.env.EXPRESS_PORT || 3001;

const sequelize = new Sequelize(
  `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
);


async function connectWithRetry(retries = 5) {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      break;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      retries -= 1;
      console.log(`Retrying... attempts left: ${retries}`);
      await new Promise(r => setTimeout(r, 2000)); // wait 2s
    }
  }
}

await connectWithRetry();
app.listen(PORT, () => {
  console.log(`DEBUG: running at http://localhost:${PORT}`);
});