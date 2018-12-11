class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    let header = String(
      this.config.header).replace(/\s+/g, '').split(',');
    let menu = String(
      this.config.menu).replace(/\s+/g, '').split(',');
    let notify = String(
      this.config.notification).replace(/\s+/g, '').split(',');
    let voice = String(
      this.config.voice).replace(/\s+/g, '').split(',');
    let options = String(
      this.config.options).replace(/\s+/g, '').split(',');
    let clock = String(
      this.config.clock).replace(/\s+/g, '').split(',');
    let clock_format = String(
      this.config.clock_format).replace(/\s+/g, '').split(',');
    let clock_am_pm = String(
      this.config.clock_am_pm).replace(/\s+/g, '').split(',');

    let user_agent = ',' + this.config.user_agent;
    user_agent = user_agent.split(',');
    let agent = 0;
    for (let i = 0; i < user_agent.length; i++) {
      let regex = new RegExp(user_agent[i], 'i');
      if (regex.test(navigator.userAgent)) {
        agent = i;
      }
    }
    window.cch_header = config_default(
      header[0], header[agent], true, true);
    window.cch_menu = config_default(
      menu[0], menu[agent], true, true);
    window.cch_notify = config_default(
      notify[0], notify[agent], true, true);
    window.cch_voice = config_default(
      voice[0], voice[agent], true, true);
    window.cch_options = config_default(
      options[0], options[agent], true, true);
    window.cch_clock = config_default(
      clock[0], clock[agent], false, false);
    window.cch_clock_format = config_default(
      clock_format[0], clock_format[agent], 12, false);
    window.cch_am_pm = config_default(
      clock_am_pm[0], clock_am_pm[agent], true, true);
    const script = document.createElement('script');
    script.src = '/local/custom-lovelace/compact-custom-header/' +
                 'compact-custom-header.lib.js?v0.0.3009';
    document.head.appendChild(script);
    window.dispatchEvent(new Event('resize'));
  }
  setConfig(config) {
    this.config = config;
  }
  getCardSize() {
    return 0;
  }
}

function config_default(default_agent, this_agent, default_value, is_bool) {
  if (this_agent == undefined) {
    if (default_agent == undefined) {
      return default_value;
    } else {
      let x = is_bool ? (default_agent == 'true') : default_agent;
      return x;
    }
  } else {
    let x = is_bool ? (this_agent == 'true') : this_agent;
    return x;
  }
}

customElements.define('compact-custom-header', CompactCustomHeader);
