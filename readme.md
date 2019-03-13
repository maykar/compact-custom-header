# Compact Custom Header
**Customize the Home Assistant header!**<br/><br/>
Inspired by [a gist by ciotlosm](https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931).

<img src="https://i.imgur.com/kz0gnZm.jpg" width="500px">

## Features:
* Per user/device settings using usernames, user agents, and media queries.
* Any icon button can be hidden, made into a clock with optional date, or placed in the options menu.
* Hide tabs from user's and devices.
* Change header's background color or add a background image.
* Compact design that removes header text.

## Installation:

There are 2 methods of installation: Manual or with [Custom_Updater](https://github.com/custom-components/custom_updater). Follow only one of these methods.

[@thomasloven's lovelace guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins) is a great resource for issues and installation of cards in lovelace.

### Manual installation:
Install this card by copying both .js files to `www/custom-lovelace/compact-custom-header/`. Be sure you're using the raw files from github (button on top right when viewing code).

This goes under "resources:" in ui-lovelace.yaml (yaml mode) or by using the "Raw Config" editor while "Configuring UI" (storage mode). When updating be sure add to the version number at the end of this code.

```yaml
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: module
```

Add the following into every view under "cards:" (See important notes below for views with `panel: true`).

```yaml
- type: custom:compact-custom-header
```

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

### Installation and tracking with custom_updater:

1. Make sure the [custom_updater](https://github.com/custom-components/custom_updater) component is installed and working.
2. Configure Lovelace to load the card.

```yaml
resources:
  - url: /customcards/github/maykar/compact-custom-header.js?track=true
    type: module
```

3. Run the service `custom_updater.check_all` or click the "CHECK" button if you use the tracker-card.
4. Refresh the website.
5. Add the following into every view under "cards:" (See important notes below for views with `panel: true`).

```yaml
- type: custom:compact-custom-header
```

# Important notes:

* Hiding the header or options button will remove your ability to edit from the UI. In this case, you can restore the default header by adding "?disable_cch" to the end of your URL. Example: `http://192.168.1.42:8123/lovelace/0?disable_cch`

* To use with panel view place this card inside a "container card" with the panel card (vertical stack card, layout-card, etc.), otherwise this card isn't "displayed" and won't load. Example at the end of this readme.

* The card will automatically display when "configuring UI" to allow for editing, but is otherwise hidden.

* If hiding tabs, while in edit mode there is a new option in the options drop-down menu "Show All Tabs" to help with configuration.

## Config Caching:

Since it is required for this card to be placed on each view, caching is used so that you only need to configure the card once.

Add `- type: custom:compact-custom-header` to each view and on the first lovelace view set `main_config: true` or use the toggle in the editor. Then set all of your config in the first (main_config) view.

You may clear the cache by clicking the button on the bottom of the editor or by adding "?clear_cch_cache" to the end of your URL. Example: `http://192.168.1.42:8123/lovelace/0?clear_cch_cache`

## Config:

### You can configure almost every option using the built in editor.
|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|main_config|boolean|false||Set this to true on your first lovelace view.
|disable|boolean|false||Disable Compact Custom Header. Useful to use default header on a certain user agent.
|header|boolean|true||Display or hide the header.|
|background_color|string|||Change the header's background color. Uses any CSS that can be used with the CSS background-color property. This option must be set manually in yaml code (raw editor).
|background_image|string|||Give the header a background image. Uses any CSS that can be used with the CSS background-image property. This option must be set manually in yaml code (raw editor).
|menu|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|notifications|string|show|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|voice|string|show|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|options|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Can be "show", "hide" or "clock".|
|chevrons|boolean|false|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_chevron_left_black_48dp.png?raw=true">|Hide or show the tab's navigation chevrons.|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.|clock_date:
|clock_date|boolean|false||Adds a date below the clock.|
|date_locale|string|||By default the date format/language is set to your HA preference, this option allows you to override that with [locale codes](http://download1.parallels.com/SiteBuilder/Windows/docs/3.2/en_US/sitebulder-3.2-win-sdk-localization-pack-creation-guide/30801.htm). This option must be set manually in yaml code (raw editor). Example `date_locale: en-gb`.
|hide_tabs|string|||Comma-seperated list of tab numbers to hide. Do not use with show_tabs.|
|show_tabs|string|||Comma-seperated list of tab numbers to show, all others hidden. Do not use with hide_tabs.|
|redirect|boolean|true||Toggles auto redirecting from a hidden tab to a visible tab.|
|exception||||Allows for different configs when exceptions are met, see "Exception Config" below.

## Button Config:

Each button (menu, notifications, voice, and options) can be set as "show", "hide", and "clock". Each button except for the options button can be set to "overflow" as well. The overflow option hides the button from the header and places it inside the option button's drop-down menu.

## Exception Config:

You can have different settings depending on username, user agent, and media query. You can use any combination as well.

* **user:** This is the Home Assistant user's name, not username (if they're different). You can look to the bottom of the editor to see which to use. This option is case sensitive.
* **user_agent:** A matching word or phrase from the devices user agent. You can find this at the bottom of this cards editor or by [googling "what's my user agent"](http://www.google.com/search?q=whats+my+user+agent) on the device in question. This option is case sensitive.
* **media_query:** A valid [CSS media query](https://www.w3schools.com/css/css_rwd_mediaqueries.asp).

**If a config item is left out of an exceptions config the main config value is used.**

Under exceptions set your conditions and then set up their config below. Example:

```yaml
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
        user_agent: Mobile
        media_query: (max-width: 600px)
      config:
        options: clock
        clock_format: 12
        hide_tabs: 4,5,9
```

## Panel View Example:
Placing this card at the end of the vertical stack can help with some spacing issues.

```yaml
views:
- title: Panel View Example
  panel: true
  cards:
  - type: vertical-stack
    cards:
    - type: another-card
    - type: custom:compact-custom-header
```
