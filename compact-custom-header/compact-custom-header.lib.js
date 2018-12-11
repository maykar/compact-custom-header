// Avoid "already defined" errors when navigating away from Lovelace and back.
if (typeof doc_root === 'undefined') {
  var clock, clock_format, clock_w, doc_root, drawer_layout, hui_root, icon,
      iron_icon, love_lace, main, menu_btn_sr, menu_button, menu_icon,
      menu_icon_sr, menu_iron_icon, notify_btn_sr, notify_button, notify_icon,
      notify_icon_sr, notify_indicator, notify_iron_icon, options_button,
      options_icon, options_icon_sr, options_iron_icon, pages, shadow_root,
      tabs, tabs_sr, tabs_container, tab_chevron, voice_btn_sr, voice_button,
      tab_count, voice_icon, voice_icon_sr, voice_iron_icon, pad;
}
doc_root = document.querySelector('home-assistant').shadowRoot;
main = doc_root.querySelector('home-assistant-main').shadowRoot;
drawer_layout = main.querySelector('app-drawer-layout');
pages = drawer_layout.querySelector('partial-panel-resolver').shadowRoot;
love_lace = pages.querySelector('ha-panel-lovelace').shadowRoot;
hui_root = love_lace.querySelector('hui-root').shadowRoot;

if (!window.cch_header) {
  hui_root.querySelector('app-header').style.cssText = 'display:none;';
  window.dispatchEvent(new Event('resize'));
} else {
  menu_button = hui_root.querySelector('ha-menu-button');
  menu_btn_sr = menu_button.shadowRoot;
  menu_icon = menu_btn_sr.querySelector('paper-icon-button');
  menu_icon_sr = menu_icon.shadowRoot;
  menu_iron_icon = menu_icon_sr.querySelector('iron-icon');
  voice_button = hui_root.querySelector('ha-start-voice-button');
  voice_btn_sr = voice_button.shadowRoot;
  voice_icon = voice_btn_sr.querySelector('paper-icon-button');
  voice_icon_sr = voice_icon.shadowRoot;
  voice_iron_icon = voice_icon_sr.querySelector('iron-icon');
  notify_button = hui_root.querySelector('hui-notifications-button');
  notify_btn_sr = notify_button.shadowRoot;
  notify_icon = notify_btn_sr.querySelector('paper-icon-button');
  notify_icon_sr = notify_icon.shadowRoot;
  notify_iron_icon = notify_icon_sr.querySelector('iron-icon');
  notify_indicator = notify_btn_sr.querySelector('[class="indicator"]');
  options_button = hui_root.querySelector('paper-menu-button');
  options_icon = options_button.querySelector('paper-icon-button');
  options_icon_sr = options_icon.shadowRoot;
  options_iron_icon = options_icon_sr.querySelector('iron-icon');
  tabs = hui_root.querySelector('paper-tabs');
  tabs_sr = hui_root.querySelector('paper-tabs').shadowRoot;
  tab_count = tabs.querySelectorAll('paper-tab');
  tabs_container = tabs_sr.getElementById('tabsContainer');
  tab_chevron = tabs_sr.querySelectorAll('[icon^="paper-tabs:chevron"]');
  tab_chevron[0].style.cssText = 'display:none;';
  tab_chevron[1].style.cssText = 'display:none;';
  // hui_root.querySelector('[main-title]').style.cssText = 'display:none;';

  pad = 20;
  pad += window.cch_notify && window.cch_clock != 'notification' ? 40 : 0;
  pad += window.cch_voice && window.cch_clock != 'voice' ? 40 : 0;
  pad += window.cch_options && window.cch_clock != 'options' ? 56 : 0;
  pad += window.cch_clock ? 60 : 0;
  pad += window.cch_clock && window.cch_am_pm && window.ch_clock_format == 12 ?
    30 : 0;
  tabs.style.cssText = `margin-right:${pad}px;`;

  if (tab_count.length > 1) {
    hui_root.querySelector('app-toolbar').style.cssText = 'margin-top:-64px;';
  }

  element_style(window.cch_menu, menu_button);
  element_style(window.cch_notify, notify_button);
  element_style(window.cch_voice, voice_button);
  element_style(window.cch_options, options_button);

  if (window.cch_clock == 'notification') {
    icon = notify_icon;
    shadow_root = notify_icon_sr;
    iron_icon = notify_iron_icon;
    notify_indicator.style.cssText = 'margin-right:25px;margin-top:22px;';
  } else if (window.cch_clock == 'voice') {
    icon = voice_icon;
    shadow_root = voice_icon_sr;
    iron_icon = voice_iron_icon;
  } else if (window.cch_clock == 'options') {
    icon = options_icon;
    shadow_root = options_icon_sr;
    iron_icon = options_iron_icon;
  } else if (window.cch_clock == 'menu') {
    icon = menu_icon;
    shadow_root = menu_icon_sr;
    iron_icon = menu_iron_icon;
  }

  if (window.cch_clock) {
    try {
      clock = shadow_root.getElementById('cch_clock');
    } catch (e) {
      console.log(e);
    }
  }
  clock_w = window.cch_clock_format == 12 && window.cch_am_pm ? 90 : 70;
  clock_format = {
    'hour12': (window.cch_clock_format != 24),
    'hour': '2-digit',
    'minute': '2-digit'
  };

  if (window.cch_menu && window.cch_clock != 'menu') {
    tabs_container.style.cssText = 'margin-left:60px;';
  } else if (window.cch_menu && window.cch_clock == 'menu') {
    tabs_container.style.cssText = `margin-left:${clock_w + 15}px;`;
  }

  if (window.cch_clock && clock == null) {
    let create_clock = document.createElement('p');
    create_clock.setAttribute('id','cch_clock');
    create_clock.style.cssText = `
      width:${clock_w}px;
      margin-top:2px;
      margin-left:-8px;
    `;
    iron_icon.parentNode.insertBefore( create_clock, iron_icon );
  } else if (window.cch_clock && clock != null) {
    try {
      icon_clock();
      icon.style.cssText = `
        margin-right:-5px;
        width:${clock_w}px;
        text-align: center;
      `;
      iron_icon.style.cssText = 'display:none;';
    } catch (e) {
      console.log(e);
    }
  }
  window.dispatchEvent(new Event('resize'));
}

function element_style(config, element) {
  if (tab_count.length > 1) {
    element.style.cssText = config ?
      'z-index:1; margin-top:111px;' :
      'display:none' ;
  } else {
    element.style.cssText = config ?
      '' :
      'display:none' ;
  }
}

function icon_clock() {
  let date = new Date();
  if (!window.cch_am_pm && window.ch_clock_format == 12) {
    clock.innerHTML = date.toLocaleTimeString([], clock_format).slice(0, -3);
  } else {
    clock.innerHTML = date.toLocaleTimeString([], clock_format);
  }
}
