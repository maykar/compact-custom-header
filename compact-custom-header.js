var LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;

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
  background_image: false
};

class CompactCustomHeader extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {}
    };
  }

  constructor() {
    super();
    this.firstRun = true;
  }

  setConfig(config) {
    this.config = config;
  }

  updated() {
    if (this.config && this.hass && this.firstRun) {
      this.insertScript();
    }
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }
    return html`
      <ha-card>
        <div style="display: none;"></div>
      </ha-card>
    `;
  }

  insertScript() {
    if (this.firstRun) {
      this.firstRun = false;
      this.userVars = {
        name: this.hass.user.name,
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

    window.cchConfig = { ...defaultConfig, ...this.config, ...exceptionConfig };
    run();
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
}

customElements.define("compact-custom-header", CompactCustomHeader);

// Walk the DOM to find element.
function recursiveWalk(node, element, func) {
  var done = func(node) || node.nodeName == element;
  if (done) return true;
  if ("shadowRoot" in node && node.shadowRoot) {
    done = recursiveWalk(node.shadowRoot, element, func);
    if (done) return true;
  }
  node = node.firstChild;
  while (node) {
    done = recursiveWalk(node, element, func);
    if (done) return true;
    node = node.nextSibling;
  }
}

// Style and hide buttons.
function element_style(obj, config, element, shift) {
  if (!element) {
    return;
  }
  let top = obj.edit_mode ? 240 : 111;
  let options_style =
    element.tagName === "PAPER-MENU-BUTTON"
      ? "margin-right:-5px; padding:0;"
      : "";
  if (obj.tabs && shift && !config.disable) {
    element.style.cssText = config
      ? `z-index:1; margin-top:${top}px;${options_style}`
      : "display:none";
  } else if (!config.disable) {
    element.style.cssText = config ? "" : "display:none";
  } else {
    element.style.cssText = "";
  }
}

// Revert button if previously a clock.
function remove_clock(config, element, parent) {
  if (
    config.clock != config &&
    element.shadowRoot.getElementById("cch_clock") != null
  ) {
    let clock_element = element.shadowRoot.getElementById("cch_clock");
    clock_element.parentNode.querySelector("iron-icon").style.cssText = "";
    if (config == "options") {
      parent.querySelector("paper-icon-button").style.cssText = "";
    } else {
      parent.shadowRoot.querySelector("paper-icon-button").style.cssText = "";
    }
    if (config == "notification") {
      notify_dot.style.cssText = "";
    }
    clock_element.parentNode.removeChild(clock_element);
  }
}

// Show user agent portion of card for button on element.card.
function show_user_agent(obj) {
  if (obj.card.querySelector('[id="cch_ua"]') != null) {
    if (window.cch_ua_display) {
      obj.card.querySelector('[id="cch_ua"]').style.display = "none";
      obj.card.querySelector('[id="btn_ua"]').innerHTML = "Show user agent";
      window.cch_ua_display = false;
    } else if (!window.cch_ua_display) {
      obj.card.querySelector('[id="cch_ua"]').style.display = "initial";
      obj.card.querySelector('[id="btn_ua"]').innerHTML = "Hide user agent";
      window.cch_ua_display = true;
    }
  }
}

// Display all tabs for button on element.card.
function show_all_tabs(obj) {
  if (!window.cch_tabs_display && obj.tabs) {
    for (let i = 0; i < obj.tab_count.length; i++) {
      obj.tab_count[i].style.cssText = "";
    }
    window.cch_tabs_display = true;
    obj.card.querySelector('[id="btn_tabs"]').innerHTML = "Revert all tabs";
  } else if (window.cch_tabs_display && obj.tabs) {
    for (let i = 0; i < obj.tab_count.length; i++) {
      if (config_views) {
        if (config_views.indexOf(String(i + 1)) > -1) {
          obj.tab_count[i].style.cssText = "";
        } else {
          obj.tab_count[i].style.cssText = "display:none;";
        }
      }
    }
    window.cch_tabs_display = false;
    obj.card.querySelector('[id="btn_tabs"]').innerHTML = "Show all tabs";
  }
}

function run() {
  var config_views = undefined; //window.cch_ua_views;

  var obj = {};
  obj.config = window.cchConfig;

  recursiveWalk(document, "HUI-ROOT", function(node) {
    obj.root = node.nodeName == "HUI-ROOT" ? node.shadowRoot : null;
  });

  if (obj.root) {
    obj.view = obj.root
      .querySelector("ha-app-layout")
      .querySelector('[id="view"]');
    obj.toolbars = obj.root.querySelectorAll("app-toolbar");
    obj.tabs = obj.root.querySelector("paper-tabs");
    obj.tab_count = obj.tabs.querySelectorAll("paper-tab");
    obj.raw_config = obj.root.querySelector("ha-menu-button") == null;
    obj.edit_mode =
      obj.toolbars.length > 1 &&
      obj.toolbars[1].style.cssText != "display: none;"
        ? true
        : false;
    recursiveWalk(document, "COMPACT-CUSTOM-HEADER", function(node) {
      obj.card = node.nodeName == "COMPACT-CUSTOM-HEADER" ? node : null;
    });

    // Card styling.
    let button_style = `
    margin:auto;
    margin-bottom:10px;
    background-color:var(--primary-color);
    color:var(--primary-text-color);
    border-radius:8px;
    display:inline-block;
    border:0;
    font-size:14px;
    width:30%;
    padding:10px 0 10px 0;
    outline:0 !important;
  `;
    let h2_style = `
    margin:auto auto 10px auto;
    padding:20px;
    background-color:var(--primary-color);
  `;
    let svg_style = `
    float:left;
    height:30px;
    padding:15px 5px 15px 15px;
  `;
    let div_style = `
    display: flex;
    justify-content: center;
  `;
    let path = `
    fill="var(--primary-text-color)"
    d="M12,7L17,12H14V16H10V12H7L12,7M19,
    21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,
    3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,
    21M19,19V5H5V19H19Z"
   `;
    let user_agent = `
    padding:5px;
    border:0;
    resize:none;
    width:100%;
  `;

    if (obj.card) {
      if (obj.edit_mode || obj.raw_config) {
        obj.card.style.cssText = "";
        obj.card.innerHTML = `
        <svg style="${svg_style}" viewBox="0 0 24 24">
          <path ${path}></path>
        </svg>
        <h2 style="${h2_style}">Compact Custom Header</h2>
        <div style="${div_style}">
          <button id='btn_ua' style="${button_style}"
            onclick="show_user_agent()">
            ${window.cch_ua_display ? "Hide" : "Show"} user agent</button>
          <button id='btn_tabs' style="${button_style}"
            onclick="show_all_tabs()">
            ${window.cch_tabs_display ? "Revert" : "Show"} all tabs</button>
          <button style="${button_style}"
            onclick="location.reload(true);">
            Refresh</button>
        </div>
        <div style="${div_style}">
          <textarea style="${user_agent} "id="cch_ua" rows="4" readonly>
          </textarea>
        </div>
      `;
        obj.card.parentNode.style.cssText = `
        background-color:var(--paper-card-background-color);
      `;
        if (!window.cch_ua_display) {
          obj.card.querySelector('[id="cch_ua"]').style.display = "none";
        }
        obj.card.querySelector('[id="cch_ua"]').innerHTML = navigator.userAgent;
      } else {
        // Hide card outside of edit mode.
        obj.card.style.cssText = "display:none";
        obj.card.innerHTML = "";
        // When not in edit mode hide whole column if this is the only card in it.
        if (obj.card.parentNode.children.length == 1) {
          obj.card.parentNode.style.cssText = "display:none";
        } else {
          obj.card.parentNode.style.cssText = "";
        }
      }
    }
    // Resize to update.
    window.dispatchEvent(new Event("resize"));

    // Style header and icons.
    if (!obj.config.disable && !obj.raw_config) {
      let menu_btn = obj.root.querySelector("ha-menu-button");
      let menu_icon = menu_btn.shadowRoot.querySelector("paper-icon-button");
      let menu_iron_icon = menu_icon.shadowRoot.querySelector("iron-icon");
      let notify_btn = obj.root.querySelector("hui-notifications-button");
      let notify_icon = notify_btn.shadowRoot.querySelector(
        "paper-icon-button"
      );
      let notify_iron_icon = notify_icon.shadowRoot.querySelector("iron-icon");
      var notify_dot = notify_btn.shadowRoot.querySelector(
        '[class="indicator"]'
      );
      let voice_btn = obj.root.querySelector("ha-start-voice-button");
      let voice_icon = voice_btn.shadowRoot.querySelector("paper-icon-button");
      let voice_iron_icon = voice_icon.shadowRoot.querySelector("iron-icon");
      var options_btn = obj.root.querySelector("paper-menu-button");
      let options_icon = options_btn.querySelector("paper-icon-button");
      let options_iron_icon = options_icon.shadowRoot.querySelector(
        "iron-icon"
      );

      // Hide header completely if set to false in config.
      if (!obj.config.header) {
        obj.root.querySelector("app-header").style.cssText = "display:none;";
      }

      // Remove clock from element if no longer set.
      remove_clock("notification", notify_icon, notify_btn);
      remove_clock("voice", voice_icon, voice_btn);
      remove_clock("options", options_icon, options_btn);
      remove_clock("menu", menu_icon, menu_btn);

      // Hide or show buttons.
      element_style(obj, obj.config.menu, menu_btn, true);
      element_style(obj, obj.config.notification, notify_btn, true);
      element_style(obj, obj.config.voice, voice_btn, true);
      element_style(obj, obj.config.options, options_btn, true);

      // Pad bottom for image backgrounds as we're shifted -64px.
      obj.view.style.paddingBottom = obj.config.background_image ? "64px" : "";

      // Set clock width.
      let clock_w =
        obj.config.clock_format == 12 && obj.config.clock_am_pm ? 110 : 80;

      if (obj.tabs) {
        // Add width of all visible elements on right side for tabs margin.
        let pad = 0;
        pad +=
          obj.config.notification && obj.config.clock != "notification"
            ? 45
            : 0;
        pad += obj.config.voice && obj.config.clock != "voice" ? 45 : 0;
        pad += obj.config.options && obj.config.clock != "options" ? 45 : 0;
        if (obj.config.clock && obj.config.clock != "menu") {
          pad +=
            obj.config.clock_am_pm && obj.config.clock_format == 12 ? 110 : 80;
        }
        obj.tabs.style.cssText = `margin-right:${pad}px;`;

        // Add margin to left side if menu button is the clock.
        if (obj.config.menu && obj.config.clock != "menu") {
          obj.tabs.shadowRoot.getElementById("tabsContainer").style.cssText =
            "margin-left:60px;";
        } else if (obj.config.menu && obj.config.clock == "menu") {
          obj.tabs.shadowRoot.getElementById(
            "tabsContainer"
          ).style.cssText = `margin-left:${clock_w + 15}px;`;
        }

        // Shift the header up to hide unused portion.
        obj.root.querySelector("app-toolbar").style.cssText =
          "margin-top:-64px;";

        // Hide tab bar scroll arrows to save space since we can still swipe.
        obj.tabs.shadowRoot.querySelectorAll(
          '[icon^="paper-tabs:chevron"]'
        )[0].style.cssText = "display:none;";
        obj.tabs.shadowRoot.querySelectorAll(
          '[icon^="paper-tabs:chevron"]'
        )[1].style.cssText = "display:none;";

        // Hide or show tabs.
        if (config_views && !window.cch_tabs_display) {
          for (let i = 0; i < obj.tab_count.length; i++) {
            if (config_views.indexOf(String(i)) > -1) {
              element_style(obj.config.tabs, obj.tab_count[i], false);
            } else {
              obj.tab_count[i].style.cssText = "display:none;";
            }
          }
          // If user agent hide's first tab, then redirect to new first tab.
          if (
            !window.cch_tabs_display &&
            config_views[0] > 0 &&
            obj.tab_count[0].className == "iron-selected"
          ) {
            obj.tab_count[parseInt(config_views[0])].click();
          }
        } else {
          for (let i = 0; i < obj.tab_count.length; i++) {
            element_style(obj.config.tabs, obj.tab_count[i], false);
          }
        }
      }

      // Strings to compare config to. Avoids errors while typing in edit field.
      let clock_strings = ["notification", "voice", "options", "menu"];

      // Get elements to style for clock choice.
      if (clock_strings.indexOf(obj.config.clock) > -1) {
        if (obj.config.clock == "notification") {
          var icon = notify_icon;
          var iron_icon = notify_iron_icon;
          notify_dot.style.cssText = "top:14.5px;left:-7px";
        } else if (obj.config.clock == "voice") {
          icon = voice_icon;
          iron_icon = voice_iron_icon;
        } else if (obj.config.clock == "options") {
          icon = options_icon;
          iron_icon = options_iron_icon;
        } else if (obj.config.clock == "menu") {
          icon = menu_icon;
          iron_icon = menu_iron_icon;
        }

        // If the clock element doesn't exist yet, create & insert.
        if (obj.config.clock && clock == null) {
          let create_clock = document.createElement("p");
          create_clock.setAttribute("id", "cch_clock");
          create_clock.style.cssText = `
          width:${clock_w}px;
          margin-top:2px;
          margin-left:-8px;
        `;
          iron_icon.parentNode.insertBefore(create_clock, iron_icon);
        }

        // Style clock and insert time text.
        var clock = icon.shadowRoot.getElementById("cch_clock");
        if (obj.config.clock && clock != null) {
          let clock_format = {
            hour12: obj.config.clock_format != 24,
            hour: "2-digit",
            minute: "2-digit"
          };
          let date = new Date();
          date = date.toLocaleTimeString([], clock_format);
          if (!obj.config.clock_am_pm && obj.config.clock_format == 12) {
            clock.innerHTML = date.slice(0, -3);
          } else {
            clock.innerHTML = date;
          }
          icon.style.cssText = `
          margin-right:-5px;
          width:${clock_w}px;
          text-align: center;
        `;
          iron_icon.style.cssText = "display:none;";
        }
      }
    }
    window.dispatchEvent(new Event("resize"));
  }
}
