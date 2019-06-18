# Swipe Nav Config

You can enable swipe navigation between your Lovelace views. For now this can only be configured in yaml/raw edit mode.

## Config:

|NAME|TYPE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|swipe|boolean|false|Toggle swiping on or off.
|swipe_amount|number|15|Percent of the screen required for a swipe.
|swipe_animate|string|none|Animation to use between swipes. Can be `none`, `swipe`, `fade`, or `flip`
|swipe_skip|list||Comma seperated list of tabs to skip.<br>e.g.,`5,6,7,8,13,15` Can also use ranges like this `5 to 8,13,15`<br> Tabs hidden with `hide_tabs` or `show_tabs` are automatically skipped.
|swipe_wrap|boolean|true|Toggle wrapping from first view to last and vice versa.
|swipe_prevent_default|boolean|false|Toggle the prevention of the browsers default horizontal swipe actions. Some swipe actions, like swiping from screen edge in iOS/Safari, cannot be prevented.