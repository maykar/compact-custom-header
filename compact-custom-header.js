const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

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
    this.editMode = false;
  }

  static async getConfigElement() {
    await import("./compact-custom-header-editor.js");
    return document.createElement("compact-custom-header-editor");
  }

  static getStubConfig() {
    return {};
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
            <paper-button @click="${this.toggleUserAgent}">
              ${this.show_ua ? "Hide" : "Show"} user agent
            </paper-button>
          </div>
          <div ?hidden=${!this.show_ua}>
            <textarea class="user_agent" rows="4" readonly>
                    ${navigator.userAgent}
                  </textarea
            >
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

    if (!this.cchConfig.disable) this.run();
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
    this.getElements();
    this.hideCard();
    if (this.editMode) this.insertMenuItems();
    if (!this.rawConfigMode && !this.editMode) {
      this.styleHeader();
      if (this.cchConfig.clock) this.insertClock();
    }
  }

  getElements() {
    let root;
    let card;
    // Find hui-root in DOM
    if (!root) {
      this.recursiveWalk(document, "HUI-ROOT", function(node) {
        root = node.nodeName == "HUI-ROOT" ? node.shadowRoot : null;
      });
    }
    this.root = root;
    // Find this card's element in hui-root
    if (!card) {
      this.recursiveWalk(root, "COMPACT-CUSTOM-HEADER", function(node) {
        card = node.nodeName == "COMPACT-CUSTOM-HEADER" ? node : null;
      });
    }
    this.card = card;
    this.button = {};
    this.rawConfigMode = root.querySelector("ha-menu-button") == null;
    this.editMode = root.querySelector("app-toolbar").className == "edit-mode";
    this.button.options = root.querySelector("paper-menu-button");
    this.tabContainer = root.querySelector("paper-tabs");
    this.tabs = this.tabContainer.querySelectorAll("paper-tab");

    if (!this.rawConfigMode && !this.editMode) {
      this.button.menu = root.querySelector("ha-menu-button");
      this.button.voice = root.querySelector("ha-start-voice-button");
      this.button.notifications = root.querySelector(
        "hui-notifications-button"
      );
    }
  }

  styleHeader() {
    // Hide header completely if set to false in config.
    if (!this.cchConfig.header) {
      this.root.querySelector("app-header").style.cssText = "display:none;";
      return;
    }

    this.root
      .querySelector("ha-app-layout")
      .querySelector('[id="view"]').style.paddingBottom = this.cchConfig
      .background_image
      ? "64px"
      : "";

    if (this.tabContainer) {
      // Add width of all visible elements on right side for tabs margin.
      this.pad = 0;
      this.pad +=
        this.cchConfig.notifications &&
        this.cchConfig.clock != "notifications"
          ? 45
          : 0;
      this.pad +=
        this.cchConfig.voice && this.cchConfig.clock != "voice" ? 45 : 0;
      this.pad +=
        this.cchConfig.options && this.cchConfig.clock != "options" ? 45 : 0;
      if (this.cchConfig.clock && this.cchConfig.clock != "menu") {
        this.pad +=
          this.cchConfig.clock_am_pm && this.cchConfig.clock_format == 12
            ? 110
            : 80;
      }

      // Add margin to left side of tabs if menu is the clock.
      if (this.cchConfig.menu && this.cchConfig.clock != "menu") {
        this.tabContainer.style.cssText = `
          margin-left:60px;
          margin-right:${this.pad}px;
        `;
      }

      // Shift the header up to hide unused portion.
      this.root.querySelector("app-toolbar").style.cssText = "margin-top:-64px;";

      // Hide tab bar scroll arrows to save space since we can still swipe.
      let chevron = this.tabContainer.shadowRoot.querySelectorAll(
        '[icon^="paper-tabs:chevron"]'
      );
      chevron[0].style.cssText = "display:none;";
      chevron[1].style.cssText = "display:none;";
    }
  this.styleButtons();
  this.hideTabs();
  }

  styleButtons() {
    if (!this.editMode) {
      for (const button in this.button) {
        if (this.cchConfig[button]) {
          this.button[button].style.cssText = `
            z-index:1;
            margin-top:111px;
            ${button == "options" ? "margin-right:-5px; padding:0;" : ""}
          `;
        } else {
          this.button[button].style.cssText = "display: none;";
        }
      }
    }
  }

  hideTabs() {
    if (this.cchConfig.hide_tabs && !this.editMode) {
      // Convert hide_tab config to array
      let hidden_tabs = JSON.parse("[" + this.cchConfig.hide_tabs + "]");
      for (let i = 0; i < this.tabs.length; i++) {
        if (hidden_tabs.includes(i)) {
          this.tabs[i].style.cssText = "display:none;";
        }
      }
      // Check if current tab is a hidden tab.
      for (let i = 0; i < this.tabs.length; i++) {
        if (
          this.tabs[i].className == "iron-selected" &&
          hidden_tabs.includes(i)
        ) {
          // Find first visable tab and navigate there.
          for (let i = 0; i < this.tabs.length; i++) {
            if (!hidden_tabs.includes(i)) {
              this.tabs[parseInt(i)].click();
              break;
            }
          }
        }
      }
    }
  }

  hideCard() {
    // If this card is the only one in a column, hide column outside edit mode
    if (this.card.parentNode.children.length == 1 && !this.editMode) {
      this.card.parentNode.style.cssText = "display:none";
    } else {
      this.card.parentNode.style.cssText = "";
    }
    if (!this.editMode) {
      this.card.style.cssText = "display:none";
    } else {
      this.card.style.cssText = "";
    }
    
  }

  insertMenuItems() {
    if (this.editMode && this.button.options) {
      let menu_items = this.button.options.querySelector("paper-listbox");
      let first_item = menu_items.querySelector("paper-item");
      if (!menu_items.querySelector('[id="show_tabs"]')) {
        let show_tabs = document.createElement("paper-item");
        let tabs = this.tabs;
        show_tabs.setAttribute("id", "show_tabs");
        show_tabs.addEventListener("click", function() {
          for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.cssText = "";
          }
        });
        show_tabs.innerHTML = "Show All Tabs";
        first_item.parentNode.insertBefore(show_tabs, first_item);
      }
    }
  }

  insertClock() {
    let clock_width =
      this.cchConfig.clock_format == 12 && this.cchConfig.clock_am_pm
        ? 110
        : 80;

    if (!this.rawConfigMode && !this.editMode && this.clock == null) {
      let clock_icon;
      let clock_iron_icon;

      clock_icon =
        this.cchConfig.clock == "options"
          ? this.button[this.cchConfig.clock]
          : this.button[this.cchConfig.clock].shadowRoot;
      clock_icon = clock_icon.querySelector("paper-icon-button");
      clock_iron_icon = clock_icon.shadowRoot.querySelector("iron-icon");

      this.button.notifications.shadowRoot.querySelector(
        '[class="indicator"]'
      ).style.cssText =
        this.cchConfig.clock == "notifications" ? "top:14.5px;left:-7px" : "";

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
      clock_iron_icon.parentNode.insertBefore(clock_element, clock_iron_icon);
      clock_iron_icon.style.cssText = "display:none;";

      if (this.cchConfig.menu && this.cchConfig.clock == "menu") {
        this.tabContainer.style.cssText = `
          margin-left:${clock_width + 15}px;
          margin-right:${this.pad}px;
        `;
      }
      this.clock = clock_icon.shadowRoot.getElementById("cch_clock");
      this.updateClock();
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
    let done = func(node) || node.nodeName == element;
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

  // Toggle user agent portion of card for button on element.card.
  toggleUserAgent() {
    this.show_ua = !this.show_ua;
  }
}

customElements.define("compact-custom-header", CompactCustomHeader);
