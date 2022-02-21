import crypto from 'crypto';

const CRYPTO_SECRET_KEY = 'XIx)d!d53x';

/**
 * md5 加密
 * @param content 明文
 */
function md5(content: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param content 明文
 * @returns {string}
 */
export function doCrypto(content: string) {
  const str = `value=${content}&key=${CRYPTO_SECRET_KEY}`
  return md5(str)
}
