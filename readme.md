# Compact Custom Header
**Customize the Home Assistant header!**<br/><br/>
:warning: **Breaking changes and notes on version 1.0.0b0 and above:**

* Starting with version 1.0.0b0 configuration has completely changed, be sure to follow this updated readme.
* This is a major update from previous versions and everything should be considered a breaking change.
* This card should now be "type: module" in your lovelace resources.
* Update manually if updating from a version lower than 1.0.0b0.
* The compact-custom-header.lib.js file is no longer used and can be safely deleted.


<br/><br/>
Inspired by [this gist by ciotlosm](https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931).

<img src="https://i.imgur.com/kz0gnZm.jpg" width="500px">

## Features:
* Per user/device settings using usernames, user agents, and media queries.
* Any icon button can be hidden, made a clock, or put into options menu.
* Hide tabs from user's and devices.
* Compact design that removes header text.
* 12 or 24-hour display for time.

## Installation:

### Manual installation
Install this card by copying both .js files to `www/custom-lovelace/compact-custom-header/`. Be sure you're using the raw files from github (button on top right when viewing code).

This goes under "resources:" in ui-lovelace.yaml or by using the raw config editor. When updating be sure add to the version number at the end of this code.

```
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: module
```

Add the following into every view under "cards:" (See important notes below for views with `panel: true`).

```
- type: custom:compact-custom-header
```

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

### Installation and tracking with `custom_updater`

1. Make sure you've the [custom_updater](https://github.com/custom-components/custom_updater) component installed and working.
2. Configure Lovelace to load the card.

```yaml
resources:
  - url: /customcards/github/maykar/compact-custom-header.js?track=true
    type: module
```

3. Run the service `custom_updater.check_all` or click the "CHECK" button if you use the tracker-card.
4. Refresh the website.

# Important notes:

* Hiding the header or options button will remove your ability to edit from the UI. In this case, you can restore the default header by adding "?disable_cch" to the end of your URL. Example: `http://192.168.1.42:8123/lovelace/0?disable_cch`

* To use with panel view place this card inside a "container card" with the panel card (vertical stack card, layout-card, etc.), otherwise this card isn't "displayed" and won't load.

* The card will automatically display when "configuring UI" to allow for editing, but is otherwise hidden.

* If hiding tabs, while in edit mode there is a new option in the options drop-down menu "Show All Tabs" to help with configuration.

## Config Caching:

Since it is required for this card to be placed on each view, caching is used so that you only need to configure the card once. The card in your first view should be set as the main config either by using the editor or by setting `main_config: true`.

Add `- type: custom:compact-custom-header` to each view and on the first lovelace view set `main_config: true` or use the toggle in the editor. Then set all of your config in the first (main_config) view.

You may clear the cache by clicking the button on the bottom of the editor or by adding "?clear_cch_cache" to the end of your URL. Example: `http://192.168.1.42:8123/lovelace/0?clear_cch_cache`

## Config:

### If not using YAML mode you can configure everything by editing the card in the editor's UI.

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|type|string|**REQUIRED**||<code>**custom:compact-custom-header**</code>|
|main_config|boolean|false||Set this to true on your first lovelace view.
|disable|boolean|false||Disable Compact Custom Header. Useful to use default header on a certain user agent.
|header|boolean|true||Display or hide the header.|
|background_image|boolean|false||Set to true if you use a background image, otherwise the background will not fill the window.
|menu|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|notifications|string|show|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|voice|string|show|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|options|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Can be "show", "hide" or "clock".|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.|
|hide_tabs|string|||Comma-seperated list of tab numbers to hide. Do not use with show_tabs.|
|show_tabs|string|||Comma-seperated list of tab numbers to show, all others hidden. Do not use with hide_tabs.|
|exception||||Allows for different configs when exceptions are met, see "Exception Config" below.

## Button Config:

Each button (menu, notifications, voice, and options) can be set as "show", "hide", and "clock". Each button except for the options button can be set to "overflow" as well. The overflow option hides the button from the header and places it inside the options button's drop-down menu.

## Exception Config:

You can have different settings depending on username, user agent, and media query. You can use any combination as well.

* **user:** A Home Assistant username.
* **user_agent:** A matching word or phrase from the devices user agent. You can find this at the bottom of this cards editor or by [googling "what's my user agent"](http://www.google.com/search?q=whats+my+user+agent) on the device in question.
* **media_query:** A valid [CSS media query](https://www.w3schools.com/css/css_rwd_mediaqueries.asp).

**If a config item is left out of an exceptions config the main config value is used.**

Under exceptions set your conditions and then set up their config below. Example:

```
- type: 'custom:compact-custom-header'
  main_config: true
  menu: overflow
  options: clock
  voice: hide
  clock_format: 12
  exceptions:
    - conditions:
        user: maykar
      config:
        voice: show
        options: clock
        clock_format: 24
    - conditions:
        user: maykar
        user_agent: mobile
        media_query: (max-width: 600px)
      config:
        options: clock
        clock_format: 12
        hide_tabs: 4,5,9
```
