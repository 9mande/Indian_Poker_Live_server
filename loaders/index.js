import expressLoader from './express.js';
import mysqlLoader from './mysql.js';
import Logger from './logger.js';

export default async (app) => {
  const mysqlConnection = await mysqlLoader();
  Logger.info('DB loaded and connected');
  
  await expressLoader(app);
  console.log('Express loaded');

}