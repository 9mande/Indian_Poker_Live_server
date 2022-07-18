import dotenv from 'dotenv';

dotenv.config({path: '.env'});

export default {
  port: process.env.PORT,
  mysql:{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  // winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
}

