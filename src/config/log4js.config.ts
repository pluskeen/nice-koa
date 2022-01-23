// log4js https://log4js-node.github.io/log4js-node/index.html

import path from 'path';
import log4js from 'log4js';
import { ENV } from '../utils/env';

log4js.configure({
  appenders: {
    info: {
      type: 'dateFile',
      layout: {
        type: 'pattern',
        // %p log level、%c log category、%h hostname、%m log data
        pattern: '%d{yyyy-MM-dd hh.mm.ss} %p %c %h %m'
      },
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('logs', 'info', 'info'),
      // maxLogSize: 10000000,
    },
    // 错误日志
    error: {
      type: 'dateFile',
      layout: {
        type: 'pattern',
        // %p log level、%c log category、%h hostname、%m log data
        pattern: '%d{yyyy-MM-dd hh.mm.ss} %p %c %h %m'
      },
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('logs', 'error', 'error'),
      // maxLogSize: 10000000,
    }
  },
  categories: {
    default: {appenders: ['info'], level: 'info'},
    info: {appenders: ['info'], level: 'info'},
    error: {appenders: ['error'], level: 'error'}
  }
});

/**
 * 错误日志记录方式
 * @param {*} content 日志输出内容
 */
function writeLogError(content: any) {
  if (ENV.isProd) {
    const log = log4js.getLogger("error");
    log.error(content)
  }
}

/**
 * 日志记录方式
 * @param {*} content 日志输出内容
 */
function writeLogInfo(content: any) {
  if (ENV.isProd) {
    const log = log4js.getLogger("info");
    log.info(content)
  }
}

export { writeLogInfo, writeLogError }
