const koa = require('koa')
const cors =  require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const respond = require('koa-respond')
const getLights = require('./src/getLights')
const router = require('./src/routes')

const app = new koa()

async function go () {
  app.on('error', (err, ctx) => {
    console.log('server error', err, ctx)
  })

  getLights()
  
  app.use(helmet())
  app.use(cors())
  app.use(bodyParser())
  app.use(respond())

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(process.env.PORT || 3000, () => {
    console.log(`server starts on port ${process.env.PORT || 3000}`)
  })
}

go()

