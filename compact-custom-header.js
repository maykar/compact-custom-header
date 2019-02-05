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
  background_image: false,
  main_config: false
};

class CompactCustomHeader extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {},
      editMode: {},
      showUa: {}
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
    if (!this.editMode) {
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
            <paper-button @click="${this.toggleUserAgent}">
              ${this.showUa ? "Hide" : "Show"} user agent
            </paper-button>
          </div>
          <div style="margin-right:10px" ?hidden=${!this.showUa}>
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
          display: block;
          margin-left: auto;
          margin-right: auto;
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

    // Retrieve cached config and set as default if this card isn't parent card.
    this.cchCache = {};
    let retrievedCache = localStorage.getItem("cchCache");
    if (!this.config.main_config && retrievedCache) {
      this.config = JSON.parse(retrievedCache);
    }

    this.cchConfig = {
      ...defaultConfig,
      ...this.config,
      ...exceptionConfig
    };

    if (this.config.main_config) {
      delete this.cchConfig.main_config;
      localStorage.setItem("cchCache", JSON.stringify(this.cchConfig));
    }

    if (!this.cchConfig.disable) {
      this.run();
    }
  }

  countMatches(conditions) {
    let count = 0;
    for (const condition in conditions) {
      if (
        this.userVars[condition] == conditions[condition] ||
        (condition == "user_agent" &&
          this.userVars[condition].includes(conditions[condition])) ||
        (condition == "media_query" &&
          window.matchMedia(conditions[condition]).matches)
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
    const root = this.rootElement;
    this.editMode = root.querySelector("app-toolbar").className == "edit-mode";
    const buttons = this.getButtonElements(root);
    const tabContainer = root.querySelector("paper-tabs");
    const tabs = tabContainer.querySelectorAll("paper-tab");
    if (this.editMode) {
      if (buttons.options) {
        let show_tabs = document.createElement("paper-item");
        show_tabs.setAttribute("id", "show_tabs");
        show_tabs.addEventListener("click", () => {
          for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.cssText = "";
          }
        });
        show_tabs.innerHTML = "Show All Tabs";
        this.insertMenuItem(
          buttons.options.querySelector("paper-listbox"),
          show_tabs
        );
      }
    } else {
      const pad = this.pad;
      this.hideCard();
      this.styleHeader(root, tabContainer, pad);
      this.styleButtons(buttons);
      if (this.cchConfig.hide_tabs) {
        this.hideTabs(tabs);
      }
      if (this.cchConfig.clock) {
        this.insertClock(buttons, tabContainer, pad);
      }
    }
  }

  get rootElement() {
    try {
      return document
        .querySelector("home-assistant")
        .shadowRoot.querySelector("home-assistant-main")
        .shadowRoot.querySelector("app-drawer-layout partial-panel-resolver")
        .shadowRoot.querySelector("ha-panel-lovelace")
        .shadowRoot.querySelector("hui-root").shadowRoot;
    } catch {
      console.log("Can't find 'hui-root', going to walk the DOM to find it.");
    }
    this.recursiveWalk(document, "HUI-ROOT", node => {
      return node.nodeName == "HUI-ROOT" ? node.shadowRoot : null;
    });
  }

  getButtonElements(root) {
    const buttons = {};
    buttons.options = root.querySelector("paper-menu-button");

    if (!this.editMode) {
      buttons.menu = root.querySelector("ha-menu-button");
      buttons.voice = root.querySelector("ha-start-voice-button");
      buttons.notifications = root.querySelector("hui-notifications-button");
    }
    return buttons;
  }

  styleHeader(root, tabContainer, pad) {
    // Hide header completely if set to false in config.
    if (!this.cchConfig.header) {
      root.querySelector("app-header").style.cssText = "display:none;";
      return;
    }

    root
      .querySelector("ha-app-layout")
      .querySelector('[id="view"]').style.paddingBottom = this.cchConfig
      .background_image
      ? "64px"
      : "";

    if (tabContainer) {
      // Add margin to left side of tabs if menu is the clock.
      if (this.cchConfig.menu && this.cchConfig.clock != "menu") {
        tabContainer.style.cssText = `
          margin-left:60px;
          margin-right:${pad}px;
        `;
      }

      // Shift the header up to hide unused portion.
      root.querySelector("app-toolbar").style.cssText = "margin-top:-64px";

      // Hide tab bar scroll arrows to save space since we can still swipe.
      let chevron = tabContainer.shadowRoot.querySelectorAll(
        '[icon^="paper-tabs:chevron"]'
      );
      chevron[0].style.cssText = "display:none;";
      chevron[1].style.cssText = "display:none;";
    }
  }

  get pad() {
    // Add width of all visible elements on right side for tabs margin.
    let pad = 0;
    pad +=
      this.cchConfig.notifications && this.cchConfig.clock != "notifications"
        ? 45
        : 0;
    pad += this.cchConfig.voice && this.cchConfig.clock != "voice" ? 45 : 0;
    pad += this.cchConfig.options && this.cchConfig.clock != "options" ? 45 : 0;
    if (this.cchConfig.clock && this.cchConfig.clock != "menu") {
      pad +=
        this.cchConfig.clock_am_pm && this.cchConfig.clock_format == 12
          ? 110
          : 80;
    }
    return pad;
  }

  styleButtons(buttons) {
    for (const button in buttons) {
      if (this.cchConfig[button]) {
        buttons[button].style.cssText = `
            z-index:1;
            margin-top:111px;
            ${button == "options" ? "margin-right:-5px; padding:0;" : ""}
          `;
      } else if (this.cchConfig.options) {
        const menu_items = buttons.options.querySelector("paper-listbox");
        const id = `menu_item_${button}`;
        if (!menu_items.querySelector(`[id="${id}"]`)) {
          const wrapper = document.createElement("paper-item");
          wrapper.setAttribute("id", id);
          wrapper.innerText = button.charAt(0).toUpperCase() + button.slice(1);
          wrapper.appendChild(buttons[button]);
          wrapper.addEventListener("click", () => {
            buttons[button].shadowRoot
              .querySelector("paper-icon-button")
              .click();
          });
          this.insertMenuItem(menu_items, wrapper);
        }
      } else {
        buttons[button].style.cssText = "display: none;";
      }
    }
  }

  hideTabs(tabs) {
    // Convert hide_tab config to array
    let hidden_tabs = JSON.parse("[" + this.cchConfig.hide_tabs + "]");
    for (let i = 0; i < this.tabs.length; i++) {
      if (hidden_tabs.includes(i)) {
        tabs[i].style.cssText = "display:none;";
      }
    }
    // Check if current tab is a hidden tab.
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].className == "iron-selected" && hidden_tabs.includes(i)) {
        // Find first visable tab and navigate there.
        for (let i = 0; i < tabs.length; i++) {
          if (!hidden_tabs.includes(i)) {
            tabs[parseInt(i)].click();
            break;
          }
        }
      }
    }
  }

  hideCard() {
    // If this card is the only one in a column, hide column outside edit mode
    if (this.parentNode.children.length == 1) {
      this.parentNode.style.display = "none";
    }
    this.style.display = "none";
  }

  insertMenuItem(menu_items, element) {
    let first_item = menu_items.querySelector("paper-item");
    if (!menu_items.querySelector(`[id="${element.id}"]`)) {
      first_item.parentNode.insertBefore(element, first_item);
    }
  }

  insertClock(buttons, tabContainer, pad) {
    // Change non-plural strings for backwards compatability
    if (this.cchConfig.clock == "option") {
      this.cchConfig.clock = "options";
    } else if (this.cchConfig.clock == "notification") {
      this.cchConfig.clock = "notifications";
    }

    let clock_width =
      this.cchConfig.clock_format == 12 && this.cchConfig.clock_am_pm
        ? 110
        : 80;

    const clock_icon = (this.cchConfig.clock == "options"
      ? buttons[this.cchConfig.clock]
      : buttons[this.cchConfig.clock].shadowRoot
    ).querySelector("paper-icon-button");
    const clock_iron_icon = clock_icon.shadowRoot.querySelector("iron-icon");

    buttons.notifications.shadowRoot.querySelector(
      '[class="indicator"]'
    ).style.cssText =
      this.cchConfig.clock == "notifications" ? "top:14.5px;left:-7px" : "";

    const clock_element = document.createElement("p");
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
      tabContainer.style.cssText = `
          margin-left:${clock_width + 15}px;
          margin-right:${pad}px;
        `;
    }
    const clock = clock_icon.shadowRoot.getElementById("cch_clock");
    const clock_format = {
      hour12: this.cchConfig.clock_format != 24,
      hour: "2-digit",
      minute: "2-digit"
    };
    this.updateClock(clock, clock_format);
  }

  updateClock(clock, clock_format) {
    let date = new Date();
    date = date.toLocaleTimeString([], clock_format);
    if (!this.cchConfig.clock_am_pm && this.cchConfig.clock_format == 12) {
      clock.innerHTML = date.slice(0, -3);
    } else {
      clock.innerHTML = date;
    }
    window.setTimeout(() => this.updateClock(clock, clock_format), 60000);
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
    this.showUa = !this.showUa;
  }
}

customElements.define("compact-custom-header", CompactCustomHeader);
