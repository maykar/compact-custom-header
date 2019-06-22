# Main Config Options

## UI Configuration
Unless you use Lovelace in "YAML mode" you can edit CCH's config from the UI. From the options menu select "Configure UI", there will now be a new item in the options menu "CCH Settings".<br><br>You can configure every option using the built in card editor with the exception of `date_locale`, `default_tab`, styling options, and conditional styling options.<br><br>
<img src="https://i.imgur.com/Toe4qDl.gif" width="514px"><br>

## YAML Configuration
Configuration for this card happens in the root of your Lovelace config. You may put it wherever you like, but do not put it inside views, resources, or anything else. It needs to be at the root of your configuration. Example:
```yaml
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
cch:
  hide_tabs: '4,5,6,7,8'
  options: clock
views:
```

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|disable|boolean|false|Disable Compact Custom Header. Useful to use default header on a certain user agent.
|header|boolean|true|Display or hide the header.|
|chevrons|boolean|false|Hide or show the tab's navigation chevrons.|
|clock_format|number|12|12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true|Display or hide the AM/PM indicator on 12 hour clock.
|clock_date|boolean|false|Adds a date below the clock.|
|date_locale|string||By default the date format/language is set to your HA preference, this option allows you to override that with [locale codes](http://download1.parallels.com/SiteBuilder/Windows/docs/3.2/en_US/sitebulder-3.2-win-sdk-localization-pack-creation-guide/30801.htm). This option must be set manually in yaml code (raw editor). Example `date_locale: en-gb`.
|hide_tabs|string||Comma-seperated list of tab numbers to hide. Do not use with show_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|show_tabs|string||Comma-seperated list of tab numbers to show, all others hidden. Do not use with hide_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|redirect|boolean|true|Toggles auto redirecting from a hidden tab to a visible tab.|
|sidebar_swipe|boolean|true|Toggle ability to swipe open sidebar on mobile.
|sidebar_closed|boolean|false|If sidebar was previously open, close on load.
|kiosk_mode|boolean|false|Turns off `sidebar_swipe`, turns on `sidebar_closed`, and hides the header.
|default_tab|number||Tab number to start on when navigating to `/lovelace/` for the first time.
|hide_help|boolean|false|Removes "Help" item from options menu.
|exception|||Allows for different configs when exceptions are met, see [Exception Config](https://maykar.github.io/compact-custom-header/Exception-Config/).

## Button Config:

Each button (menu, notifications, voice, and options) can be set as "show", "hide", and "clock". Each button except for the options button can be set to "overflow" as well. The overflow option hides the button from the header and places it inside the option button's drop-down menu.

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|menu|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|notifications|string|show|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|voice|string|show|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|options|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Can be "show", "hide" or "clock".|

## Swipe Navigation Config

You can enable swipe navigation between your Lovelace views.<br>
<img src="https://github.com/maykar/lovelace-swipe-navigation/blob/master/example.gif?raw=true" width="350px">

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|swipe|boolean|false|Toggle swiping on or off.
|swipe_amount|number|15|Percent of the screen required for a swipe.
|swipe_animate|string|none|Animation to use between swipes. Can be `none`, `swipe`, `fade`, or `flip`
|swipe_skip|list||Comma seperated list of tabs to skip.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`<br> Tabs hidden with `hide_tabs` or `show_tabs` are automatically skipped.
|swipe_wrap|boolean|true|Toggle wrapping from first view to last and vice versa.
|swipe_prevent_default|boolean|false|Toggle the prevention of the browsers default horizontal swipe actions. Some swipe actions, like swiping from screen edge in iOS/Safari, cannot be prevented.
