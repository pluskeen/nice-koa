import { Options, Sequelize } from 'sequelize';
import { MYSQL_CONF } from '../config/db.config';
import { ENV } from '../utils/env';

const {host, user, password, database} = MYSQL_CONF
const config: Options = {
  host,
  dialect: 'mysql'
}

// 测试环境使用
if (ENV.isTest) {
  // 不打印 SQL 语句
  config.logging = () => {
  }
}

// 线上环境使用
if (ENV.isProd) {
  config.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小的连接数量
    idle: 10000 // 10s 内没有被使用，则释放
  }
}

// 测试连接
// seq.authenticate()
//   .then(() => {
//     console.log('ok');
//   })
//   .catch(() => {
//     console.log('err');
//   })

export const seq = new Sequelize(database, user, password, config)
