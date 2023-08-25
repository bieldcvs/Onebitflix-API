import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import { database } from './database'
import { adminJs, adminJsRouter } from './adminjs'
import { router } from './routes'
import cors from "cors";



const app = express()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})