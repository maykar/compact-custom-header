class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    let header = format_config(this.config.header);
    let menu = format_config(this.config.menu);
    let notify = format_config(this.config.notification);
    let voice = format_config(this.config.voice);
    let options = format_config(this.config.options);
    let clock = format_config(this.config.clock);
    let clock_format = format_config(this.config.clock_format);
    let clock_am_pm = format_config(this.config.clock_am_pm);
    let user_agent = ',' + this.config.user_agent;
    user_agent = user_agent.split(',');
    let ua = 0;
    for (let i = 0; i < user_agent.length; i++) {
      let regex = new RegExp(user_agent[i], 'i');
      if (regex.test(navigator.userAgent)) {
        ua = i;
      }
    }
    window.cch_header = conf_def(header[0], header[ua], true);
    window.cch_menu = conf_def(menu[0], menu[ua], true);
    window.cch_notify = conf_def(notify[0], notify[ua], true);
    window.cch_voice = conf_def(voice[0], voice[ua], true);
    window.cch_options = conf_def(options[0], options[ua], true);
    window.cch_clock = conf_def(clock[0], clock[ua], false);
    window.cch_clock_format = conf_def(clock_format[0], clock_format[ua], 12);
    window.cch_am_pm = conf_def(clock_am_pm[0], clock_am_pm[ua], true);
    const script = document.createElement('script');
    script.src = '/local/custom-lovelace/compact-custom-header/' +
                 'compact-custom-header.lib.js?v0.0.5';
    document.head.appendChild(script).parentNode.removeChild(script);
    window.dispatchEvent(new Event('resize'));
  }
  setConfig(config) {
    this.config = config;
  }
  getCardSize() {
    return 0;
  }
}
// Config to string, to list, and strip spaces.
function format_config(config) {
  return String(config).replace(/\s+/g, '').split(',');
}
// Configuration and defaults. User-agent > main-config > default.
function conf_def(main_ua, this_ua, default_val) {
  if (this_ua == undefined) {
    if (main_ua == undefined) {
      return default_val;
    } else {
      let x = main_ua == 'true' || main_ua == 'false' ?
        (main_ua == 'true') : main_ua;
      return x;
    }
  } else {
    let x = this_ua == 'true' || this_ua == 'false' ?
      (this_ua == 'true') : this_ua;
    return x;
  }
}
customElements.define('compact-custom-header', CompactCustomHeader);
