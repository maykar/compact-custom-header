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

class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card')
      this.content = document.createElement('div')
      this.content.style.cssText = 'display: none;'
      card.appendChild(this.content)
      this.appendChild(card)
    }

    const userVars = hass.user.name + ' ' + navigator.userAgent
    let exceptionConfig = {}
    let highestMatch = 0

    this.config.exceptions.forEach(exception => {
      const matches = countMatches(exception.conditions, userVars)
      if (matches > highestMatch) {
        highestMatch = matches
        exceptionConfig = exception.config
      }
    })

    window.cchConfig = { ...defaultConfig, ...this.config, ...exceptionConfig }

    const script = document.createElement('script')
    script.src =
      window.cchConfig.dir + 'compact-custom-header.lib.js?v0.2.9d02'
    document.head.appendChild(script).parentNode.removeChild(script)
  }

  setConfig(config) {
    this.config = config
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
