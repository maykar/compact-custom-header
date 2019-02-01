const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

let firstRun = true;

const defaultConfig = {
  header: true,
  menu: true,
  notification: true,
  voice: true,
  options: true,
  tabs: true,
  clock_format: 12,
  clock_am_pm: true,
  disable: false,
  dir: "/local/custom-lovelace/compact-custom-header/",
  background_image: false
};

class CompactCustomHeader extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {}
    };
  }

  setConfig(config) {
    this.config = config;
  }

  updated() {
    if (this.config && this.hass && firstRun) {
      this.insertScript();
    }
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }
    return html`
      <ha-card><div style="display: none;"></div></ha-card>
    `;
  }

  insertScript() {
    if (firstRun) {
      firstRun = false;
      this.userVars = {
        name: this.hass.user.name,
        user_agent: navigator.userAgent
      };
    }
    let exceptionConfig = {};
    let highestMatch = 0;

    this.config.exceptions.forEach(exception => {
      const matches = this.countMatches(exception.conditions);
      if (matches > highestMatch) {
        highestMatch = matches;
        exceptionConfig = exception.config;
      }
    });

    window.cchConfig = { ...defaultConfig, ...this.config, ...exceptionConfig };
    const script = document.createElement("script");
    script.src =
      window.cchConfig.dir + "compact-custom-header.lib.js?v0.2.9d03";
    document.head.appendChild(script).parentNode.removeChild(script);
  }

  countMatches(conditions) {
    let count = 0;
    for (let condition in conditions) {
      if (this.userVars[condition] == conditions[condition]) {
        count++;
      } else {
        return 0;
      }
    }
    return count;
  }

  getCardSize() {
    return 0;
  }
}

customElements.define("compact-custom-header", CompactCustomHeader);
