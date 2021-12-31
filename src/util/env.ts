const NODE_ENV = process.env.NODE_NODE_ENV

/** 运行环境判断 */
export const ENV = {
  isDev: NODE_ENV === 'development',
  notDev: NODE_ENV !== 'development',
  isProd: NODE_ENV === 'production',
  notProd: NODE_ENV !== 'production',
  isTest: NODE_ENV === 'test',
  notTest: NODE_ENV !== 'test',
}
