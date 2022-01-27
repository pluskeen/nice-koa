import Sequelize from 'sequelize';

export const STRING = Sequelize.STRING;
export const DECIMAL = Sequelize.DECIMAL;
export const TEXT = Sequelize.TEXT;
export const INTEGER = Sequelize.INTEGER;
/**
 * 定义正数 0 ～ 4 294 967 295
 * 如果使用 UNSIGNED 并且在 where 子句后出现两列相减值小于 0 (a-b < 0)
 * linux 上的 mysql 会将负数转换成 UNSIGNED 后再进行查询
 * 转换方法：-n + 4294967295 + 1
 */
export const UNSIGNED_INT = Sequelize.INTEGER.UNSIGNED;
export const BOOLEAN = Sequelize.BOOLEAN;
