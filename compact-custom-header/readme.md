# Compact Custom Header

### Customize the Lovelace header!<br/><br/>
Inspired by [this gist by ciotlosm](https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931).

<img src="https://i.imgur.com/kz0gnZm.jpg" width="500px"> 


## Features:
* Per device settings using user agents.
* Hide any icon or the entire header altogether.
* Replace any icon button with a clock while keeping the buttons functionality.
* Compact design.
* Removes header text.
* 12 or 24 hour display for time.

## Installation:

Install this card by copying both .js files to `www/custom-lovelace/compact-custom-header/`.

This goes into ui-lovelace.yaml under "resources:"

```
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v0
  type: js
```

This goes into one of your views under "cards:" in the same file. Place as the last "card" in a view.

```
  - type: custom:compact-custom-header
```

When updating, if not using [custom-updater](https://github.com/custom-components/custom_updater), be sure add to a version number at the end of your lovelace resources, like so:

```
resources:
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: js
```
To use with [custom-updater](https://github.com/custom-components/custom_updater) add this url to it's "card_urls:" section:
```
https://raw.githubusercontent.com/maykar/custom-lovelace/master/tracker.json
```
You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.


## Important notes:

* Place this "card" as the last card in a view to prevent spacing issues.

* If you find that the default header appears again (happens especially on mobile when leaving and returning to the app) include the code in each of your views.

* When changing options in your lovelace config, you may need to do a full browser refresh after to get it to display correctly. ('ctrl + shift + R' on windows). A cache clear might help as well.

* Do not put inside a stack or any other container cards unless using panel view.

* The clock will only display if you have set an icon to be the clock in the config.

* To use with panel view, place as the last card of a vertical stack containing the panel card and this "card" like so:
```
    views:
      - id: home
        icon: mdi:home
        title: 'Home'
        panel: true
        cards:
        - type: vertical-stack
          cards:
          - type: weather-forecast
            entity: weather.yweather
          - type: custom:compact-custom-header
```

# Config:

|NAME|TYPE|DEFAULT|ICON|DESCRIPTION|
|-|-|-|-|-|
|type|string|**REQUIRED**||<code>**custom:compact-custom-header**</code>|
|header|boolean|true||Display or hide the header.|
|menu|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/navigation/2x_web/ic_menu_black_18dp.png?raw=true">|Display or hide the menu icon|
|notification|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_notifications_black_18dp.png?raw=true">|Display or hide the notification icon |
|voice|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/av/2x_web/ic_mic_black_18dp.png?raw=true">|Display or hide the voice icon|
|options|boolean|true|<img src="https://github.com/google/material-design-icons/blob/master/navigation/ios/ic_more_vert_36pt.imageset/ic_more_vert_36pt.png?raw=true">|Display or hide the options icon|
|clock|string|no default||Change icon to clock. Choices are menu, notification, voice, and options.|
|clock_format|number|12||12 or 24 hour clock format. Choices are 12 or 24.|
|clock_am_pm|boolean|true||Display or hide the AM/PM indicator on 12 hour clock.|
|user_agent|string|no default||Use a different config per device using user agent info. More on this below.

## Example Config:
Example shows some default values for illustration purposes, it is unnecessary to define options that have the desired effect as default.
```
      - type: custom:compact-custom-header
        notification: true
        menu: true
        options: false
        voice: false
        clock: notification
        clock_format: 12
        clock_am_pm: true
        header: true
```

## User Agent Config:

You can have a different set of settings per device by using user agent. To find the user agent of a device [search on google for "get user agent"](http://www.google.com/search?q=get+user+agent) on the device. This is my result on my phone:

<img src="https://i.imgur.com/BWs8zj8.jpg" width="300px">

I could choose a few things here like "Mobile" if I wanted to use a custom header for all mobile, or "Android" if I wanted to get just android devices, but instead I want to have one for only my phone so I'll use the model number from the results "SM-G955U".

I'll add "user_agent: SM-G955U" to my configuration, but I'll add my wifes phone as well (model number "NHG47Q"). So I'll use "user_agent: SM-G955U, NHG47Q". Seperate each different user agent with a comma.

Then in any config option you just add a new option after a comma. These options happen in order, the first one being the default, the second being the first user_agent in config, the third being the second user_agent in config and so on. If any option is not set or empty it will fall back to the first option or default. So "true, , false" with the second option empty is essentially "true,true,false" and just "true" will be true for all user agents.

Here's a config showing the default view with menu button shown and "notifications" as a 24 hour clock,<br>
my phone "SM-G955U" with menu button hidden and "options" as a 12 hour clock with AM/PM shown,<br>
and my wifes phone "NHG47Q" with menu button shown and "menu" as a 12 hour clock without AM/PM.

```
      - type: custom:compact-custom-header
        user_agent: SM-G955U, NHG47Q
        menu: true, false, true
        clock: notification, options, menu
        clock_format: 24, 12, 12
        clock_am_pm: false, true, false
```

<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a><br/><br/><br/>
