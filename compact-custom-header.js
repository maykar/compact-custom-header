const defaultConfig = {
  header: true,
  menu: true,
  notification: true,
  voice: true,
  options: true,
  tabs: true,
  clock: '',
  clock_format: 12,
  clock_am_pm: true,
  disable: false,
  dir: '/local/custom-lovelace/compact-custom-header/',
  background_image: false
}

let first_run = true
let user_vars;

class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    this._hass = hass
    if (!this.content) {
      const card = document.createElement('ha-card')
      this.content = document.createElement('div')
      this.content.style.cssText = 'display: none;'
      card.appendChild(this.content)
      this.appendChild(card)
    }
    if (first_run) {
      this.insertScript()
      console.log('hass insert script')
    }
  }

  setConfig(config) {
    this.config = config
    if (!first_run) {
      this.insertScript()
      console.log('config insert script')
    }
  }

  insertScript() {
    if (first_run) {
      user_vars = this._hass.user.name + ' ' + navigator.userAgent
      first_run = false
      console.log('set uservars')
    }
    let exceptionConfig = {}
    let highestMatch = 0

    this.config.exceptions.forEach(exception => {
      const matches = countMatches(exception.conditions, user_vars)
      if (matches > highestMatch) {
        highestMatch = matches
        exceptionConfig = exception.config
      }
    })

    window.cchConfig = { ...defaultConfig, ...this.config, ...exceptionConfig }
    const script = document.createElement('script')
    script.src =
      window.cchConfig.dir + 'compact-custom-header.lib.js?v0.2.9d03'
    document.head.appendChild(script).parentNode.removeChild(script)
    console.log(window.cchConfig.clock)
  }

  getCardSize() {
    return 0
  }
}

function countMatches(conditions, agents) {
  let count = 0
  for (condition in conditions) {
    if (agents.includes(conditions[condition])) {
      count++
    } else {
      return 0
    }
  }
  return count
}

customElements.define('compact-custom-header', CompactCustomHeader)
