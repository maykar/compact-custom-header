class CompactCustomHeader extends HTMLElement {
  set hass(hass) {
    window.cch_header = this.config.header == undefined ? true : this.config.header;
    window.cch_menu = this.config.menu == undefined ? true : this.config.menu;
    window.cch_notify = this.config.notification == undefined ? true : this.config.notification;
    window.cch_voice = this.config.voice == undefined ? true : this.config.voice;
    window.cch_options = this.config.options == undefined ? true : this.config.options;
    window.cch_clock = this.config.clock == undefined ? false : this.config.clock;
    window.cch_clock_format = this.config.clock_format == undefined ? 12 : this.config.clock_format;
    window.cch_am_pm = this.config.clock_am_pm == undefined ? true : this.config.clock_am_pm;

    let user_agent = this.config.user_agent || 'Mobi|Android';
    let regex = new RegExp(user_agent, 'i');

    if (regex.test(navigator.userAgent)) {
      window.cch_header = this.config.m_header == undefined ? this.config.header : this.config.m_header;
      window.cch_menu = this.config.m_menu == undefined ? this.config.menu : this.config.m_menu;
      window.cch_notify = this.config.m_notification == undefined ? this.config.notification : this.config.m_notification;
      window.cch_voice = this.config.m_voice == undefined ? this.config.voice : this.config.m_voice;
      window.cch_options = this.config.m_options == undefined ? this.config.options : this.config.m_options;
      window.cch_clock = this.config.m_clock == undefined ? this.config.clock : this.config.m_clock;
      window.cch_clock_format = this.config.m_clock_format == undefined ? this.config.clock_format : this.config.m_clock_format;
      window.cch_am_pm = this.config.m_clock_am_pm == undefined ? this.config.clock_am_pm : this.config.m_clock_am_pm;
    }

    const script = document.createElement('script');
    script.src = '/local/custom-lovelace/compact-custom-header/cch_v002.js';
    document.head.appendChild(script);
  }
  setConfig(config) {
    this.config = config;
  }
  getCardSize() {
    return 0;
  }
}
customElements.define('compact-custom-header', CompactCustomHeader);
