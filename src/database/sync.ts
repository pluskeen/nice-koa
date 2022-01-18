import { seq } from './seq';

import './model'

// 测试连接
seq.authenticate()
  .then(() => {
    console.log('连接 ok')
  })
  .catch(() => {
    console.log('连接 err')
  })

// 执行同步
// force: true 清空，重新建表
seq.sync({force: true})
  .then(() => {
    console.log('sync ok')
    process.exit()
  })
