import { ENV } from '../utils/env';

const SESSION_SECRET_KEY = 'Us_x3g5!4&';

let REDIS_CONF = {
  host: '119.91.234.186',
  port: 6379,
  password: 'Fuxiang520.'
}

let MYSQL_CONF = {
  host: '119.91.234.186',
  port: '3306',
  user: 'payne',
  password: '1235x!',
  database: 'payne_cool'
}

if (ENV.isProd) {
  // 线上 redis 配置
  REDIS_CONF = {
    port: 6379,
    host: '119.91.234.186',
    password: 'Fuxiang520.'
  }
  // 线上 mysql 配置
  MYSQL_CONF = {
    host: '119.91.234.186',
    port: '3306',
    user: 'payne',
    password: '1235x!',
    database: 'payne_cool'
  }
}

export {
  REDIS_CONF,
  MYSQL_CONF,
  SESSION_SECRET_KEY
}
