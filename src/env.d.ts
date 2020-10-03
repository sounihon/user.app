declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE_NAME: string;
    SERVER_PORT: string;
    JWT_SECRET: string;
  }
}
