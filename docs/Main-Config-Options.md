# **MAIN CONFIGURATION**
<br>
## <u>Configuration with the UI</u>

Enable Compact Custom Header by adding `cch:` to your existing Lovelace UI Config through the Lovelace Raw Config Editor (see examples below).

After installing and enabling CCH there will be a new item in the options menu (top right icon after selecting "Configure UI") named "CCH Settings". With the exception of styling, everything in CCH can be configured using this UI. This editor is not available when using Lovelace in YAML Mode.
<br><br>
## <u>Configuration with YAML</u>
Configuration for CCH happens in the root of your Lovelace config. You may put it wherever you like, but **DO NOT** place it inside views, resources, or anything else.<br><br>
<p style="color: green"><b>Like this:</b></p>
```yaml
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
cch:
  hide_tabs: '4,5,6,7,8'
  options: clock
views:
```
<br><p style="color: red"><b>NEVER like this:</b></p>
```
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
views:
  cch:
    hide_tabs: '4,5,6,7,8'
    options: clock
```
<br>

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|disable|boolean|false|Disable Compact Custom Header. Useful to use default header on a certain user agent.
|compact_header|boolean|true|Toggle the compacting header.
|header|boolean|true|Display or hide the header.|
|default_tab|number||Tab number, view's `title:`, or view's `path:` to start on when navigating to `/lovelace/` for the first time.
|default_tab_template|string||Javascript template for default tab. Used like [conditional styling templates](https://maykar.github.io/compact-custom-header/Conditional-Styling-Config/#conditional-styling-templates).
|kiosk_mode|boolean|false|Hides the header and turns on `disable_sidebar` for HA 0.96.0 and above. On HA versions lower than 0.96.0 this hides the header, turns off `sidebar_swipe`, and turns on `sidebar_closed`.
|disable_sidebar|boolean|false|Disable sidebar and menu button completely, only available on HA 0.96.0 and above.
|sidebar_swipe|boolean|true|Not available on HA 0.96.0 and above. Toggle ability to swipe open sidebar on mobile.
|sidebar_closed|boolean|false|Not available on HA 0.96.0 and above. If sidebar was previously open, close on load.
|hide_tabs|string||Comma-seperated list of tab numbers, view's `title:`, or view's `path:` to hide. Do not use with show_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|show_tabs|string||Comma-seperated list of tab numbers, view's `title:`, or view's `path:` to show, all others hidden. Do not use with hide_tabs.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`|
|redirect|boolean|true|Toggles auto redirecting from a hidden tab to a visible tab.|
|chevrons|boolean|false|Hide or show the tab's navigation chevrons.|
|hide_help|boolean|false|Removes "Help" item from options menu.
|hide_config|boolean|false|Removes "Configure UI" item from options menu.
|hide_unused|boolean|false|Removes "Unused Entities" item from options menu.
|edit_mode_show_tabs|boolean|false|Always show all tabs when in edit mode rather than using "show all tabs" menu item.
|exception|||Allows for different configs when exceptions are met, see [Exception Config](Exception-Config.md).

<br>
## <u>Button Config</u>

Note: On HA 0.96.0 and above it is no longer possible to modify the notifications button using CCH.

Each button (menu, notifications, voice, and options) can be set as "show", "hide", and "clock". Each button except for the options button can be set to "overflow" as well. The overflow option hides the button from the header and places it inside the option button's drop-down menu.
<br><br>

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|menu|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|notifications|string|show|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|voice|string|show|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Can be "show", "hide", "clock", or "overflow".|
|options|string|show|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Can be "show", "hide" or "clock".|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.
|clock_date|boolean|false||Adds a date below the clock.|
|date_locale|string|||By default the date format/language is set to your HA preference, this option allows you to override that with [locale codes](http://download1.parallels.com/SiteBuilder/Windows/docs/3.2/en_US/sitebulder-3.2-win-sdk-localization-pack-creation-guide/30801.htm).
<br>

## <u>Swipe Navigation Config</u>


Enable swipe navigation between Lovelace views.<br><br>
<img src="https://github.com/maykar/lovelace-swipe-navigation/blob/master/example.gif?raw=true" width="438px"><br><br><br>

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|swipe|boolean|false|Toggle swiping on or off.
|swipe_amount|number|15|Percent of the screen required for a swipe.
|swipe_animate|string|none|Animation to use between swipes. Can be `none`, `swipe`, `fade`, or `flip`
|swipe_skip|string||Comma seperated list of tabs to skip.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`<br> Tabs hidden with `hide_tabs` or `show_tabs` are automatically skipped.
|swipe_wrap|boolean|true|Toggle wrapping from first view to last and vice versa.
|swipe_prevent_default|boolean|false|Toggle the prevention of the browsers default horizontal swipe actions. Some swipe actions, like swiping from screen edge in iOS/Safari, cannot be prevented.
|swipe_skip_hidden|boolean|true|Automatically skip hidden tabs when swiping.
|swipe_groups|string|Comma seperated ranges to define groups of tabs that can be swiped. Example:`swipe_groups: "2 to 4, 6 to 8"` will only swipe on tabs between 2-4 or 6-8 but not any other tab.
