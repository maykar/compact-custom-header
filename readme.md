# Compact Custom Header & Custom User/Device Views

### Customize the Home Assistant header!<br/><br/>
Inspired by [this gist by ciotlosm](https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931).

<img src="https://i.imgur.com/kz0gnZm.jpg" width="500px"> 

<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a><br/><br/><br/>

## Features:
* Per user/device views and settings using usernames or user agents.
* Hide any item or the entire header altogether.
* Replace any icon button with a clock while keeping the buttons functionality.
* Notifications & indicator still display if notification icon is a clock
* Compact design.
* Removes header text.
* 12 or 24 hour display for time.

## Installation:

Install this card by copying both .js files to `www/custom-lovelace/compact-custom-header/`.

This goes into under "resources:" in ui-lovelace.yaml or using the raw config editor.

```
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v0
  type: js
```

This goes into one of your views under "cards:" in the same file, this works best when added to each view.

```
  - type: custom:compact-custom-header
```

When updating, if not using [custom-updater](https://github.com/custom-components/custom_updater), be sure add to a version number at the end of your lovelace resources, like so:

```
resources:
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: js
```
You can use [custom-updater](https://github.com/custom-components/custom_updater) to update this card with no additional configuration.

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

# Config:

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|type|string|**REQUIRED**||<code>**custom:compact-custom-header**</code>|
|header|boolean|true||Display or hide the header.|
|menu|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Display or hide the menu icon|
|notification|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Display or hide the notification icon |
|voice|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Display or hide the voice icon|
|options|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Display or hide the options icon|
|tabs|boolean|true||Display or hide the tabs/views|
|clock|string|no default||Change icon to clock. Choices are menu, notification, voice, and options.|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.|
|user_agent|string|no default||Use a different config per device using username or user agent info. More on this below.
|user_agent_views|list|no default||Hide/show tabs depending on username or user agent. More info below.
|disable|boolean|false||Disable Compact Custom Header. To use default header on a certain user agent.
|dir|string|'/www/custom-lovelace/compact-custom-header/'||Directory that contains this card.
|background_image|boolean|false||Set to true if you use a background image, otherwise the background will not fill the window.

## Example
<b>Do not just copy and paste this example</b>, build your own using the config options above.
Be sure to read the important notes section and the user agent/views sections.
```
- type: custom:compact-custom-header
  header: true
  menu: false
  notification: true
  voice: false
  options: true
  tabs: false
  clock: notification
  clock_format: 12
  clock_am_pm: true
  disable: false
  background_image: true
  user_agent: maykar, mobile
  user_agent_views:
    - 0,1,2,3,4
    - 1,2,4
```
## Important notes:

* Works best when the card is added to each view with the same settings. You can try only adding this card in the first view, but if you have issues add it to each (when the browser refreshes on a page without this card, it won't load. This usually only happens on mobile devices when exiting and returning to the browser app).

* When using user_agent_views and hiding this cards view for an agent, be sure to add this card to the agents new first view or else it will not load.

* To use with panel view place this card inside a "container card" with the panel card (stack cards, layout-card, etc.), otherwise this card isn't "displayed" and won't load. An example would be placing this card in a vertical stack with the card in the panel view.

* The clock will only display if you have set an icon to be the clock in the config.

* When changing config options, you may need to refresh the page or by doing a [hard refresh](https://en.wikipedia.org/wiki/Wikipedia:Bypass_your_cache) with the cards "refresh" button or manually to get everything to display properly. You may even need to clear your cache.

* If you notice your cards shifting when changing views, place this card in a vertical stack with another card in the view.

* Avoid using ```header: false``` unless you're using yaml mode. Otherwise you'll have no way to edit your config other than either deleting this cards files or editing .storage (which you shouldn't do). Wait for expanding tab feature, coming soon.

## Card:

The card will automatically display when "configuring ui" in lovelace and has a few features to help with config.

<img src="https://i.imgur.com/yjKLd9l.jpg" width="400px">

* Show your current devices user agent information for easy copy and paste to config.
* Show all tabs so that when using a device where tabs are hidden, you can temporarily show all to allow for easy configuration.
* The refresh button will do a "hard refresh", refreshing the page ignoring cache. Helps when changing config options and things don't display correctly and will load new code after an update of the card.

## User Agent (or Username) Config:

You can have a different set of settings per device by using username or user agent. To find the user agent you can click "show user agent" on the card when configuring the lovelace ui or by [googling "get user agent"](http://www.google.com/search?q=get+user+agent) on the device. This is the result from my phone:

<img src="https://i.imgur.com/BWs8zj8.jpg" width="300px">

You could choose a few things here like "Mobile" if you wanted to use a custom header for all mobile devices, or "Android" if you wanted all android devices, or even a HA username like "maykar" but instead lets use the model number from the results "SM-G955U".

Add "SM-G955U" to "user_agent" in your config and lets add my wifes username as well "thewife". So we'll use ```user_agent: SM-G955U, thewife```. Seperate each user agent with a comma.

Then in any config option add a new option after a comma. These options happen in order, the first one being the default, the second being the first user_agent in config, the third being the second user_agent in config and so on.

If any option is not set or empty it will fall back to the first option or default. So ```true, , false``` with the second option empty is essentially ```true, true, false``` and just ```true``` will be true for all user agents. If a device matches more than one user agent, for example: ```user_agent: Mobile, Android``` then the last matched user agent is the one used, so in this case ```Android```.

Here's an example config showing:<br>

|User Agent|Config
|-|-
|**default** |menu button shown and "notifications" as a 24 hour clock,<br>
|**my phone "SM-G955U"** |menu button hidden and "options" as a 12 hour clock with AM/PM shown,<br>
|**wife's username "thewife"** |menu button shown and "menu" as a 12 hour clock without AM/PM.


```
- type: custom:compact-custom-header
  user_agent: SM-G955U, thewife
  menu: true, false
  clock: notification, options, menu
  clock_format: 24, 12, 12
  clock_am_pm: false, true  # don't need to set a third, will fall back to the first option (false) when not set
```

## User Agent (or Username) Views:

You can set what tabs are shown/hidden depending on username or user agent. This option follows the same user agent rules explained above.<br><br>Start each view with a hyphen and seperate each tab number with a comma. View numbering starts at zero. If the first visible tab is not tab 0, like ```- 2,3,4``` then the user agent's device is automatically redirected to the first visible tab, in this case tab 2. To avoid issues, add this card with the same config options in each view or, at the very least, the starting views for each user agent. Example:

```
- type: custom:compact-custom-header
  user_agent: thewife, NHG47Q
  user_agent_views:
    - 0,1,2,3,4   # Default view.
    - 2,3,4     # The user thewife's view. Will automatically redirect from first view to second.
    - 0,1,4       # NHG47Q's view.
```
