import express = require('express')
import bodyParser = require('body-parser')

import { ping } from './libs/controllers'

// const { ping } = controllers

class App {
  public express

  constructor(){
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    
    router.get('/ping', ping)
    this.express.use('/', router)
  }
}

export default new App().express