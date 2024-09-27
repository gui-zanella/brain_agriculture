import * as dotenv from 'dotenv';

dotenv.config();

enum NodeEnv{
    TEST = 'test',
    DEV = 'development'
}

interface Env {
    env: NodeEnv;
    // dbFileName: string;
    // dbTestFileName: string;
    port: number;
    defaultPage: number;
    defaultPageSize: number;
}


export const config: Env = {
    env: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEV,
    // dbFilename: process.env.DB_FILENAME || 'db',
    // dbTestFilename: process.env.DB_TEST_FILENAME || 'db.test',
    port: Number(process.env.APP_PORT) || 5000,
    defaultPage: 0,
    defaultPageSize: 10,
  };