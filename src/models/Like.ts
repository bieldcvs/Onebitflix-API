import { DataTypes, Model } from 'sequelize'
import { database } from '../database';

export interface Like{
  userId:number
  courseId:number

}

export interface LikeInstance extends Model<Like>,Like{}

export const Like = database.define<LikeInstance, Like>('Like', {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})