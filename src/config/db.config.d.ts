declare const SESSION_SECRET_KEY: string;
declare let REDIS_CONF: {
  host: string;
  port: number;
  password: string;
};
declare let MYSQL_CONF: {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
};
export { REDIS_CONF, MYSQL_CONF, SESSION_SECRET_KEY };
