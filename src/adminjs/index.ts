import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from './resources'
import { locale } from './locale'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'
import session from "express-session";
import connectSession from "connect-session-sequelize"
import { ADMINJS_COOKIE_PASSWORD } from '../config/environments'

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({ db : database })
store.sync()

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
  databases: [database],
  resources: adminJsResources,
  rootPath: '/admin',
  branding: brandingOptions ,
  locale: locale,
  dashboard:dashboardOptions
    
  }
)

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs, 
  authtenticationOptions, 
  null,
  {
	resave: false,
	saveUninitialized: false,
  store:store,
  secret:ADMINJS_COOKIE_PASSWORD
}
)