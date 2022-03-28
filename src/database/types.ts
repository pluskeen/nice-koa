import { DataTypes } from 'sequelize';

export const STRING = DataTypes.STRING;
export const DECIMAL = DataTypes.DECIMAL;
export const TEXT = DataTypes.TEXT;
export const INTEGER = DataTypes.INTEGER;
export const DATE = DataTypes.DATE;
/**
 * 定义正数 0 ～ 4 294 967 295
 * 如果使用 UNSIGNED 并且在 where 子句后出现两列相减值小于 0 (a-b < 0)
 * linux 上的 mysql 会将负数转换成 UNSIGNED 后再进行查询
 * 转换方法：-n + 4294967295 + 1
 */
export const UNSIGNED_INT = DataTypes.INTEGER.UNSIGNED;
export const BOOLEAN = DataTypes.BOOLEAN;
