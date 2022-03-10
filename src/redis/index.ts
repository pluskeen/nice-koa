import redis from 'redis';
import { REDIS_CONF } from '../config/db.config'

/** redis客户端 */
const redisClient = redis.createClient({
  socket: {port: REDIS_CONF.port, host: REDIS_CONF.host,},
  password: REDIS_CONF.password
})

redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param key key
 * @param val value
 * @param timeout 过期时间，单位秒
 */
export function set(key: string, val: any, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  return redisClient.set(key, val, {EX: timeout})
}

/**
 * redis get
 * @param key key
 */
export function get(key: string) {
  return new Promise((resolve, reject) => {
    redisClient.get(key)
      .then(val => {
        if (val == null) {
          resolve(val)
          return
        }
        try {
          resolve(JSON.parse(val))
        } catch (ex) {
          resolve(val)
        }
      })
      .catch(err => reject(err))
  })
}
