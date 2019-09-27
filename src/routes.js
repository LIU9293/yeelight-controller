const Router = require('koa-router')
const { getLights, toggleLight, setName, setBright } = require('./controller')
const router = new Router()

router.get('supported_coins', '/lights', getLights)
router.get('toggle', '/toggle/:id', toggleLight)
router.get('set_name', '/name/:id', setName)
router.get('toggle', '/bright/:id', setBright)

module.exports = router
