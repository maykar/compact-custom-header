var LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;

const defaultConfig = {
  header: true,
  menu: true,
  notifications: true,
  voice: true,
  options: true,
  tabs: true,
  clock_format: 12,
  clock_am_pm: true,
  disable: false,
  background_image: false
};

class CompactCustomHeader extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {},
      edit_mode: {},
      show_ua: {}
    };
  }

  constructor() {
    super();
    this.firstRun = true;
    this.edit_mode = false;
  }

  setConfig(config) {
    this.config = config;
  }

  updated() {
    if (this.config && this.hass && this.firstRun) {
      this.buildConfig();
    }
  }

  render() {
    if (!this.config || !this.hass || !this.edit_mode) {
      return html``;
    }
    return html`
      ${this.renderStyle()}
      <ha-card>
        <div>
          <svg viewBox="0 0 24 24">
            <path
              d="M12,7L17,12H14V16H10V12H7L12,7M19,
              21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,
              3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,
              21M19,19V5H5V19H19Z"
            ></path>
          </svg>
          <h2>Compact Custom Header</h2>
          <div>
            <paper-button @click="${this.toggle_user_agent}">
              ${this.show_ua ? "Hide" : "Show"} user agent
            </paper-button>
            <paper-button @click="${this.show_all_tabs}">
              ${window.cch_tabs_display ? "Revert" : "Show"} all tabs
            </paper-button>
            <paper-button @click="${this.refresh}">
              Refresh
            </paper-button>
          </div>
          <div ?hidden=${!this.show_ua}>
            <textarea class="user_agent" rows="4" readonly>
              ${navigator.userAgent}
            </textarea>
          </div>
        </div>
      </ha-card>
    `;
  }

  renderStyle() {
    return html`
      <style>
        [hidden] {
          display: none;
        }
        h2 {
          margin: auto auto 10px auto;
          padding: 20px;
          background-color: var(--primary-color);
          color: var(--text-primary-color);
        }
        svg {
          float: left;
          height: 30px;
          padding: 15px 5px 15px 15px;
          fill: var(--text-primary-color);
        }
        .user_agent {
          padding: 5px;
          border: 0;
          resize: none;
          width: 100%;
        }
      </style>
    `;
  }

  buildConfig() {
    if (this.firstRun) {
      this.firstRun = false;
      this.userVars = {
        user: this.hass.user.name,
        user_agent: navigator.userAgent
      };
    }
    let exceptionConfig = {};
    let highestMatch = 0;
    if (this.config.exceptions) {
      this.config.exceptions.forEach(exception => {
        const matches = this.countMatches(exception.conditions);
        if (matches > highestMatch) {
          highestMatch = matches;
          exceptionConfig = exception.config;
        }
      });
    }
    this.cchConfig = { ...defaultConfig, ...this.config, ...exceptionConfig };
    this.run();
  }

  countMatches(conditions) {
    let count = 0;
    for (const condition in conditions) {
      if (
        this.userVars[condition] == conditions[condition] ||
        (condition == "user_agent" &&
          this.userVars[condition].includes(conditions[condition]))
      ) {
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

  run() {
    let config_views = undefined; // Will be replacing this & refactoring views config to "hide_tabs"
    let root;
    let card;

    this.recursiveWalk(document, "HUI-ROOT", function(node) {
      root = node.nodeName == "HUI-ROOT" ? node.shadowRoot : null;
    });

    if (root) {
      this.tab_container = root.querySelector("paper-tabs");
      this.tabs = this.tab_container.querySelectorAll("paper-tab");
      this.raw_config_mode = root.querySelector("ha-menu-button") == null;
      this.edit_mode =
        root.querySelectorAll("app-toolbar")[0].className == "edit-mode";

      // Style header and icons.
      if (!this.cchConfig.disable && !this.raw_config_mode) {
        this.button = {};
        this.button.menu = root.querySelector("ha-menu-button");
        this.button.voice = root.querySelector("ha-start-voice-button");
        this.button.options = root.querySelector("paper-menu-button");
        this.button.notifications = root.querySelector(
          "hui-notifications-button"
        );

        // Hide header completely if set to false in config.
        if (!this.cchConfig.header) {
          root.querySelector("app-header").style.cssText = "display:none;";
        }

        // Hide or show buttons.
        this.elementStyle(this.cchConfig.menu, this.button.menu, true);
        this.elementStyle(
          this.cchConfig.notifications,
          this.button.notifications,
          true
        );
        this.elementStyle(this.cchConfig.voice, this.button.voice, true);
        this.elementStyle(this.cchConfig.options, this.button.options, true);

        // Pad bottom for image backgrounds as we're shifted -64px.
        root
          .querySelector("ha-app-layout")
          .querySelector('[id="view"]').style.paddingBottom = this.cchConfig
          .background_image
          ? "64px"
          : "";

        if (this.tab_container) {
          // Add width of all visible elements on right side for tabs margin.
          let pad = 0;
          pad +=
            this.cchConfig.notifications &&
            this.cchConfig.clock != "notifications"
              ? 45
              : 0;
          pad +=
            this.cchConfig.voice && this.cchConfig.clock != "voice" ? 45 : 0;
          pad +=
            this.cchConfig.options && this.cchConfig.clock != "options"
              ? 45
              : 0;
          if (this.cchConfig.clock && this.cchConfig.clock != "menu") {
            pad +=
              this.cchConfig.clock_am_pm && this.cchConfig.clock_format == 12
                ? 110
                : 80;
          }
          this.tab_container.style.cssText = `margin-right:${pad}px;`;

          // Shift the header up to hide unused portion.
          root.querySelector("app-toolbar").style.cssText = "margin-top:-64px;";

          // Hide tab bar scroll arrows to save space since we can still swipe.
          let chevron = this.tab_container.shadowRoot.querySelectorAll(
            '[icon^="paper-tabs:chevron"]'
          )
          chevron[0].style.cssText = "display:none;";
          chevron[1].style.cssText = "display:none;";

          // Hide or show tabs.
          if (config_views && !window.cch_tabs_display) {
            for (let i = 0; i < this.tabs.length; i++) {
              if (config_views.indexOf(String(i)) > -1) {
                this.elementStyle(this.cchConfig.tabs, this.tabs[i], false);
              } else {
                this.tabs[i].style.cssText = "display:none;";
              }
            }
            // If user agent hide's first tab, then redirect to new first tab.
            if (
              !window.cch_tabs_display &&
              config_views[0] > 0 &&
              this.tabs[0].className == "iron-selected"
            ) {
              this.tabs[parseInt(config_views[0])].click();
            }
          } else {
            for (let i = 0; i < this.tabs.length; i++) {
              this.elementStyle(this.cchConfig.tabs, this.tabs[i], false);
            }
          }
        }
      }
      if (this.cchConfig.clock) this.insertClock()
      window.dispatchEvent(new Event("resize"));
    }
  }

  insertClock() {
    let clock_width =
      this.cchConfig.clock_format == 12 && this.cchConfig.clock_am_pm
        ? 110
        : 80;

    if (!this.raw_config_mode && !this.edit_mode && this.clock == null) {
      let clock_icon;
      let clock_iron_icon;

      if (this.cchConfig.clock == "options") {
        clock_icon = this.button[this.cchConfig.clock].querySelector(
            "paper-icon-button"
          );
      } else {
        clock_icon = this.button[this.cchConfig.clock].shadowRoot.querySelector(
            "paper-icon-button"
          );
      }
      clock_iron_icon = clock_icon.shadowRoot.querySelector("iron-icon");

      this.button.notifications.shadowRoot.querySelector(
          '[class="indicator"]'
        ).style.cssText = this.cchConfig.clock == "notifications"
          ? "top:14.5px;left:-7px"
          : '';

      let clock_element = document.createElement("p");
      clock_element.setAttribute("id", "cch_clock");
      clock_element.style.cssText = `
        width:${clock_width}px;
        margin-top:2px;
        margin-left:-8px;
      `;
      clock_icon.style.cssText = `
        margin-right:-5px;
        width:${clock_width}px;
        text-align: center;
      `;
      clock_iron_icon.parentNode.insertBefore( clock_element, clock_iron_icon );
      clock_iron_icon.style.cssText = "display:none;";

      this.clock = clock_icon.shadowRoot.getElementById("cch_clock");
      this.updateClock();
    }

    if (this.tab_container) {
      // Add margin to left side of tabs if menu is the clock.
      if (this.cchConfig.menu && this.cchConfig.clock != "menu") {
        this.tab_container.shadowRoot.getElementById(
          "tabsContainer"
        ).style.cssText = "margin-left:60px;";
      } else if (this.cchConfig.menu && this.cchConfig.clock == "menu") {
        this.tab_container.shadowRoot.getElementById(
          "tabsContainer"
        ).style.cssText = `margin-left:${clock_width + 15}px;`;
      }
    }
  }

  updateClock() {
    let clock_format = {
      hour12: this.cchConfig.clock_format != 24,
      hour: "2-digit",
      minute: "2-digit"
    };
    let date = new Date();
    date = date.toLocaleTimeString([], clock_format);
    if (!this.cchConfig.clock_am_pm && this.cchConfig.clock_format == 12) {
      this.clock.innerHTML = date.slice(0, -3);
    } else {
      this.clock.innerHTML = date;
    }
    var t = window.setTimeout(() => this.updateClock(), 60000);
  }

  // Walk the DOM to find element.
  recursiveWalk(node, element, func) {
    var done = func(node) || node.nodeName == element;
    if (done) return true;
    if ("shadowRoot" in node && node.shadowRoot) {
      done = this.recursiveWalk(node.shadowRoot, element, func);
      if (done) return true;
    }
    node = node.firstChild;
    while (node) {
      done = this.recursiveWalk(node, element, func);
      if (done) return true;
      node = node.nextSibling;
    }
  }

  // Style and hide buttons.
  elementStyle(config, element, shift) {
    if (!element) {
      return;
    }
    let top = this.edit_mode ? 240 : 111;
    let options_style =
      element.tagName === "PAPER-MENU-BUTTON"
        ? "margin-right:-5px; padding:0;"
        : "";
    if (this.tab_container && shift && !config.disable) {
      element.style.cssText = config
        ? `z-index:1; margin-top:${top}px;${options_style}`
        : "display:none";
    } else if (!config.disable) {
      element.style.cssText = config ? "" : "display:none";
    } else {
      element.style.cssText = "";
    }
  }

  refresh() {
    location.reload(true);
  }

  // Toggle user agent portion of card for button on element.card.
  toggle_user_agent() {
    this.show_ua = !this.show_ua;
  }

  // Display all tabs for button on element.card.
  show_all_tabs() {
    if (!window.cch_tabs_display && this.tab_container) {
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].style.cssText = "";
      }
      window.cch_tabs_display = true;
      window.cchCard.querySelector('[id="btn_tabs"]').innerHTML =
        "Revert all tabs";
    } else if (window.cch_tabs_display && this.tab_container) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (config_views) {
          if (config_views.indexOf(String(i + 1)) > -1) {
            this.tabs[i].style.cssText = "";
          } else {
            this.tabs[i].style.cssText = "display:none;";
          }
        }
      }
      window.cch_tabs_display = false;
      window.cchCard.querySelector('[id="btn_tabs"]').innerHTML =
        "Show all tabs";
    }
  }
}

customElements.define("compact-custom-header", CompactCustomHeader);
