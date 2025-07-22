import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
);

export async function connectWithRetry(retries = 5) {
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
