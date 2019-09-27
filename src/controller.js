const { infoStore, yeeStore } = require('./store')

async function updateInstance (id) {
  const light = await yeeStore[id].sync()
  infoStore[id] = {
    name: light.name,
    id: id,
    ct: light.ct,
    colorMode: light.colorMode,
    on: light.power === 'on',
    bright: light.bright,
    music: light.music_on,
    rgb: light.rgb,
    name: light.name,
  }
}

async function getLights (ctx) {
  try {
    return ctx.ok(Object.values(infoStore))
  } catch (error) {
    console.log(error)
    return ctx.internalServerError(error.message)
  }
}

async function toggleLight (ctx) {
  try {
    const { id } = ctx.params

    if (!yeeStore[id]) return ctx.badRequest({ error: `id ${id} is not found` })


    yeeStore[id].toggle()
    await updateInstance(id)

    return ctx.ok(infoStore[id])
  } catch (error) {
    console.log(error)
    return ctx.internalServerError(error.message)
  }
}

async function setName (ctx) {
  try {
    const { id } = ctx.params
    const { name } = ctx.query

    if (!yeeStore[id]) return ctx.badRequest({ error: `id ${id} is not found` })

    yeeStore[id].set_name(name)
    await updateInstance(id)

    return ctx.ok(infoStore[id])
  } catch (error) {
    console.log(error)
    return ctx.internalServerError(error.message)
  }
}

async function setBright (ctx) {
  try {
    const { id } = ctx.params
    const { bright } = ctx.query

    if (!yeeStore[id]) return ctx.badRequest({ error: `id ${id} is not found` })

    yeeStore[id].set_bright(parseInt(bright))
    await updateInstance(id)

    return ctx.ok(infoStore[id])
  } catch (error) {
    console.log(error)
    return ctx.internalServerError(error.message)
  }
}

module.exports = {
  getLights,
  setName,
  setBright,
  toggleLight
}