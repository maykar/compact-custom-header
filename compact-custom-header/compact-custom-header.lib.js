// Avoid "already defined" errors when navigating away from Lovelace and back.
if (typeof doc_root == 'undefined') {
  var clock, clock_format, clock_width, doc_root, drawer_layout, hui_root, icon,
      iron_icon, love_lace, main, menu_btn_sr, menu_button, menu_icon,
      menu_icon_sr, menu_iron_icon, notify_btn_sr, notify_button, notify_icon,
      notify_icon_sr, notify_indicator, notify_iron_icon, options_button,
      options_icon, options_icon_sr, options_iron_icon, pages, shadow_root,
      tabs, tabs_sr, tabs_container, tab_chevron, voice_btn_sr, voice_button,
      tab_count, voice_icon, voice_icon_sr, voice_iron_icon, pad, proceed,
      toolbar, shift_amount, edit_mode, cch_card, column_container,
      app_layout, div_view, hui_view, column, alone, panel, container,
      container_div, card_options;
}
try {
  // Try so that if we're not on a lovelace page it won't continue to run...
  // since some elements only exist on lovelace & we insert script in doc head.
  doc_root = document.querySelector('home-assistant').shadowRoot;
  main = doc_root.querySelector('home-assistant-main').shadowRoot;
  drawer_layout = main.querySelector('app-drawer-layout');
  pages = drawer_layout.querySelector('partial-panel-resolver').shadowRoot;
  panel = pages.querySelector('[id="panel"]');
  love_lace = panel.querySelector('ha-panel-lovelace').shadowRoot;
  hui_root = love_lace.querySelector('hui-root').shadowRoot;
  app_layout = hui_root.querySelector('ha-app-layout');
  div_view = app_layout.querySelector('[id="view"]');
  proceed = true;
} catch (e) {
  proceed = false;
  console.log(e);
}
if (!window.cch_disable && !window.cch_disable && proceed) {
  // Drill through CSS to get the elements we want to style.
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
  toolbar = hui_root.querySelectorAll('app-toolbar');
  // hui_root.querySelector('[main-title]').style.cssText = 'display:none;';
  tabs = hui_root.querySelector('paper-tabs');
  tabs_sr = hui_root.querySelector('paper-tabs').shadowRoot;
  tab_count = tabs.querySelectorAll('paper-tab');
  tabs_container = tabs_sr.getElementById('tabsContainer');
  tab_chevron = tabs_sr.querySelectorAll('[icon^="paper-tabs:chevron"]');
  tab_chevron[0].style.cssText = 'display:none;';
  tab_chevron[1].style.cssText = 'display:none;';

  let card_in_panel = false;
  let card_found = false;
  let container_edit = false;

  // If outside of panel view, get column elements
  if (div_view.querySelector('hui-view') != null) {
    hui_view = div_view.querySelector('hui-view').shadowRoot;
    column_container = hui_view.querySelector('[id="columns"]');
    column = column_container.querySelectorAll('[class="column"]');
  } else {
    card_in_panel = true;
  }

  // Hide header if set to false in config
  if (!window.cch_header) {
    hui_root.querySelector('app-header').style.cssText = 'display:none;';
  }
  
  // Find the compact-custom-header card under normal circumstances.
  if (div_view.querySelector('hui-view') != null) {
    for (let i = 0; i < column.length; i++) {
      if (column[i].querySelector('compact-custom-header')) {
        cch_card = column[i].querySelector('compact-custom-header');
        // Is the card the only one in the column?
        alone = (column[i].children.length == 1);
        card_found = true;
      }
    }
  }
  
  // Card placement changes depending on location and if in edit view.
  // If inside a container card and in edit view:
  if (!card_in_panel && !card_found) {
    container_edit = (column[0].querySelector('hui-card-options') != null);
  } 
  if (!card_in_panel && !card_found && container_edit) {
    card_options = column[0].querySelector('hui-card-options');
    container = card_options.querySelector('*').shadowRoot;
    container_div = container.querySelector('div');
    cch_card = container_div.querySelector('compact-custom-header');
    alone = false;
  // If inside container card not in edit view
  } else if (!card_found && !card_in_panel) {
    container = column[0].querySelector('*').shadowRoot;
    container_div = container.querySelector('div');
    cch_card = container_div.querySelector('compact-custom-header');
    alone = false;
  // If inside panel view.
  } else if (card_in_panel){
    container = div_view.querySelector('*').shadowRoot;
    container_div = container.querySelector('div');
    cch_card = container_div.querySelector('compact-custom-header');
    alone = false;
  }

  // If multiple toolbars exist & 2nd one is displayed, edit mode is active.
  // If length is 1 then toolbar[1] doesn't exist and will error, check first.
  if (toolbar.length > 1) {
    edit_mode = toolbar[1].style.cssText != 'display: none;' ? true : false;
  } else {
    edit_mode = false;
  }
  
  if (edit_mode) {
    // Show card in edit mode.
    cch_card.style.cssText = 'display:initial';
    cch_card.parentNode.style.cssText = 'display:initial';
  } else {
    // Hide card outside of edit mode.
    cch_card.style.cssText = 'display:none';
    // Hide whole column if it only contains this card.
    cch_card.parentNode.style.cssText = alone? 'display:none' : '';
  }

  // Shift the header up to hide unused portion, but only with multiple tabs.
  // When there is only one tab the header is already collapsed.
  if (tab_count.length > 1) {
    hui_root.querySelector('app-toolbar').style.cssText = 'margin-top:-64px;';
  }
  
  // Add width of all visable elements to size the tabs container.
  pad = 20;  // Default padding.
  pad += window.cch_notify && window.cch_clock != 'notification' ? 40 : 0;
  pad += window.cch_voice && window.cch_clock != 'voice' ? 40 : 0;
  pad += window.cch_options && window.cch_clock != 'options' ? 56 : 0;
  if (window.cch_clock) {
    pad += window.cch_am_pm && window.ch_clock_format == 12 ? 30 : 0;
    pad += 60;
  }
  tabs.style.cssText = `margin-right:${pad}px;`;
  
  // Shift tab container to the right if the menu button is a clock.
  if (window.cch_menu && window.cch_clock != 'menu') {
    tabs_container.style.cssText = 'margin-left:60px;';
  } else if (window.cch_menu && window.cch_clock == 'menu') {
    tabs_container.style.cssText = `margin-left:${clock_width + 15}px;`;
  }
  
  // Hide/show buttons and tab container
  element_style(window.cch_menu, menu_button, true);
  element_style(window.cch_notify, notify_button, true);
  element_style(window.cch_voice, voice_button, true);
  element_style(window.cch_options, options_button, true);
  for (let i = 0; i < tab_count.length; i++) {
    element_style(window.cch_tabs, tab_count[i], false);
  }
  
  // Get elements to style for clock choice.
  if (window.cch_clock == 'notification') {
    icon = notify_icon;
    shadow_root = notify_icon_sr;
    iron_icon = notify_iron_icon;
    notify_indicator.style.cssText = 'top:14.5px;left:-7px';
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
  
  // Look for the inserted clock element.
  if (window.cch_clock) {
    try {
      clock = shadow_root.getElementById('cch_clock');
    } catch (e) {
      console.log(e);
    }
  }
  clock_width = window.cch_clock_format == 12 && window.cch_am_pm ? 90 : 70;
  clock_format = {
    'hour12': (window.cch_clock_format != 24),
    'hour': '2-digit',
    'minute': '2-digit'
  };
  // If the clock element doesn't exist yet, create it.
  if (window.cch_clock && clock == null) {
    let create_clock = document.createElement('p');
    create_clock.setAttribute('id','cch_clock');
    create_clock.style.cssText = `
      width:${clock_width}px;
      margin-top:2px;
      margin-left:-8px;
    `;
    iron_icon.parentNode.insertBefore(create_clock, iron_icon);
  // If the clock element exists, style it's container and hide the icon.
  } else if (window.cch_clock && clock != null) {
    icon_clock();
    icon.style.cssText = `
      margin-right:-5px;
      width:${clock_width}px;
      text-align: center;
    `;
    iron_icon.style.cssText = 'display:none;';
  }
  
  window.dispatchEvent(new Event('resize'));
}

// Style or hide buttons and tabs.
function element_style(config, element, shift) {
  if (edit_mode) {
    shift_amount = 240;
  } else {
    shift_amount = 111;
  }
  if (tab_count.length > 1 && shift) {
    element.style.cssText = config ?
      `z-index:1; margin-top:${shift_amount}px;` :
      'display:none' ;
  } else {
    element.style.cssText = config ?
      '' :
      'display:none' ;
  }
}

// Create and insert text for the clock.
function icon_clock() {
  let date = new Date();
  if (!window.cch_am_pm && window.ch_clock_format == 12) {
    clock.innerHTML = date.toLocaleTimeString([], clock_format).slice(0, -3);
  } else {
    clock.innerHTML = date.toLocaleTimeString([], clock_format);
  }
}
