# Compact Custom Header

### Customize the Lovelace header!<br/><br/>
Inspired by a [gist by ciotlosm](https://gist.github.com/ciotlosm/1f09b330aa5bd5ea87b59f33609cc931).

<img src="https://i.imgur.com/kz0gnZm.jpg" width="500px"> 


## Features:
* Compact design.
* Hide any icon or the entire header altogether.
* Replace any icon button with a clock while keeping the buttons functionality.
* 12 or 24 hour display for time.

## Installation:

Install this card by copying both files to `www/custom-lovelace/compact-custom-header/`.

This goes into ui-lovelace.yaml under "resources:"

```
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js
  type: js
```

This goes into one of your views under "cards:" in the same file. Place as the last "card" in a view.

```
  - type: custom:compact-custom-header
```

When updating, be sure you have the latest companion script (cch_v...js) and added to a version number at the end of your lovelace resources, like so:

```
resources:
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: js
```

You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.


## Important notes:

* Place this "card" as the last card in a view. This will prevent spacing issues.

* If you find that the default header appears again (happens especially on mobile when leaving and returning to the app) include the code in each of your views.

* When changing options in your lovelace config, you may need to do a full browser refresh after to get it to display correctly. ('ctrl + shift + R' on windows). 

* Do not put inside a stack or any other container cards unless using panel view.

* To use with panel view, place as the last card of a vertical stack containing the panel card and this "card".

* When updating, be sure you have the latest companion script (cch_v...js) and have added to a version number at the end of your lovelace resources, like so:
```
resources:
- url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
  type: js
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
<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/FgwNR2l"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">If you feel I deserve it, you can buy me a coffee</span></a><br/><br/><br/>
