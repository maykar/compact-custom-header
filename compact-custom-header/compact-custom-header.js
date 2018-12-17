class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.title;
      this.content = document.createElement('div');
      this.content.style.padding = '5px 10px';
      card.appendChild(this.content);
      this.appendChild(card);
      this.content.innerHTML = '<h2>Compact Custom Header</h2>';
    }
    let header = format_config(this.config.header);
    let menu = format_config(this.config.menu);
    let notify = format_config(this.config.notification);
    let voice = format_config(this.config.voice);
    let options = format_config(this.config.options);
    let tabs = format_config(this.config.tabs);
    let clock = format_config(this.config.clock);
    let clock_format = format_config(this.config.clock_format);
    let clock_am_pm = format_config(this.config.clock_am_pm);
    let disable = format_config(this.config.disable);
    // Empty agent for main config at start to keep index numbers consistant.
    let user_agent = ',' + this.config.user_agent;
    user_agent = user_agent.split(',');
    let uai = 0;  // user agent index
    // Find user agent's index number to grab it's config.
    for (let i = 1; i < user_agent.length; i++) {
      let regex = new RegExp(user_agent[i], 'i');
      if (regex.test(navigator.userAgent)) {
        uai = i;
      }
    }
    // Global variables for the main script.
    window.cch_header = conf_def(header[0], header[uai], true);
    window.cch_menu = conf_def(menu[0], menu[uai], true);
    window.cch_notify = conf_def(notify[0], notify[uai], true);
    window.cch_voice = conf_def(voice[0], voice[uai], true);
    window.cch_options = conf_def(options[0], options[uai], true);
    window.cch_tabs = conf_def(tabs[0], tabs[uai], true);
    window.cch_clock = conf_def(clock[0], clock[uai], false);
    window.cch_clock_format = conf_def(clock_format[0], clock_format[uai], 12);
    window.cch_am_pm = conf_def(clock_am_pm[0], clock_am_pm[uai], true);
    window.cch_disable = conf_def(disable[0], disable[uai], false);
    // Insert the main script in head, run, remove.
    const script = document.createElement('script');
    script.src = '/local/custom-lovelace/compact-custom-header/' +
                 'compact-custom-header.lib.js?v0.1.3';
    document.head.appendChild(script).parentNode.removeChild(script);
    // Resize the window to redraw header
    window.dispatchEvent(new Event('resize'));
  }
  setConfig(config) {
    this.config = config;
  }
  getCardSize() {
    return 0;
  }
}
// Convert config options to string, strip spaces, and convert to list.
// Allows grabbing everything with a list index.
function format_config(config) {
  return String(config).replace(/\s+/g, '').split(',');
}
// Config and defaults. user-agent || main-config || default.
function conf_def(main_ua, this_ua, default_val) {
  // Check if user agent config is set.
  if (this_ua == undefined || this_ua == 'undefined' || this_ua == '') {
    // Check if main config is set.
    if (main_ua == undefined || main_ua == 'undefined' || main_ua == '') {
      // Return the cards default if both aren't set.
      return default_val;
    } else {
      // Return main config if user agent's isn't set
      let x = main_ua == 'true' || main_ua == 'false' ?
        (main_ua == 'true') : main_ua;
      return x;
    }
  } else {
    // Return user_agent's config
    let x = this_ua == 'true' || this_ua == 'false' ?
      (this_ua == 'true') : this_ua;
    return x;
  }
}
customElements.define('compact-custom-header', CompactCustomHeader);
