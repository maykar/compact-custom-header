# Main Config Options

**You can configure every option using the built in card editor with the exception of `date_locale`, `default_tab`, styling options, and conditional styling options.**

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|main_config|boolean|false||Set this to true on your first lovelace view.
|disable|boolean|false||Disable Compact Custom Header. Useful to use default header on a certain user agent.
|header|boolean|true||Display or hide the header.|
|menu|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|notifications|string|show|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|voice|string|show|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|options|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Can be "show", "hide" or "clock".|
|chevrons|boolean|false|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_chevron_left_black_48dp.png?raw=true">|Hide or show the tab's navigation chevrons.|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.
|clock_date|boolean|false||Adds a date below the clock.|
|date_locale|string|||By default the date format/language is set to your HA preference, this option allows you to override that with [locale codes](http://download1.parallels.com/SiteBuilder/Windows/docs/3.2/en_US/sitebulder-3.2-win-sdk-localization-pack-creation-guide/30801.htm). This option must be set manually in yaml code (raw editor). Example `date_locale: en-gb`.
|hide_tabs|string|||Comma-seperated list of tab numbers to hide. Do not use with show_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|show_tabs|string|||Comma-seperated list of tab numbers to show, all others hidden. Do not use with hide_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|redirect|boolean|true||Toggles auto redirecting from a hidden tab to a visible tab.|
|sidebar_swipe|boolean|true||Toggle ability to swipe open sidebar on mobile.
|sidebar_closed|boolean|false||If sidebar was previously open, close on load.
|kiosk_mode|boolean|false||Turns off `sidebar_swipe`, turns on `sidebar_closed`, and hides the header.
|default_tab|number|||Tab number to start on when navigating to `/lovelace/` for the first time.
|exception||||Allows for different configs when exceptions are met, see [Exception Config](https://github.com/maykar/compact-custom-header/wiki/Exception-Config).

### Button Config:

Each button (menu, notifications, voice, and options) can be set as "show", "hide", and "clock". Each button except for the options button can be set to "overflow" as well. The overflow option hides the button from the header and places it inside the option button's drop-down menu.