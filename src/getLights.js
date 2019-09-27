const yeeLight = require('yeelight2')
const { infoStore, yeeStore } = require('./store')

function getLights () {
  yeeLight.discover(light => {
    infoStore[light.id] = {
      name: light.name,
      id: light.id,
      ct: light.ct,
      colorMode: light.colorMode,
      on: light.power === 'on',
      bright: light.bright,
      music: light.music_on,
      rgb: light.rgb,
      name: light.name,
    }

    yeeStore[light.id] = light
  })

  console.log(`--- get lights succeed ---`)
}

module.exports = getLights