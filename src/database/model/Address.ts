import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { seq } from '../seq';
import { DATE, STRING, UNSIGNED_INT } from '../types';

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  declare userId: number;
  declare address: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

// address 表
export const AddressModel = Address.init(
  {
    userId: {
      type: UNSIGNED_INT
    },
    address: {
      type: STRING,
      allowNull: false
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  {
    tableName: 'address',
    sequelize: seq
  }
);
