import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../config/environments'

export const database = new Sequelize(DATABASE_URL,{
	define: {
    underscored: true
  },

})