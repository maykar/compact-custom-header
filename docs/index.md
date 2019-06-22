# Compact Custom Header
Customize the header and add enhancements to Lovelace.

## Features:

* Compact design that removes header text.
* Per user/device settings.
* Style & hide anything in the header & the header itself.
* Dynamically style header elements based on entity states/attributes.
* Add swipe navigation to Lovelace for mobile devices.
* Any button can be hidden, turned into clock with optional date, or placed in the options menu.
* Hide tabs/buttons from user's and devices.
* Set a default/starting view.

## Installation

* There are 2 methods of installation: Manually or with [HACS](https://github.com/custom-components/hacs). Follow only one of these methods.
* [@thomasloven's lovelace guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins) is a great resource for installation of cards in lovelace and issues.

<details>
  <summary><b>Manual installation:</b></summary>

1. Install by copying both .js files to `www/custom-lovelace/compact-custom-header/`. [Be sure you're using the raw files from github](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins#2-download-the-plugin).

2. Add the code below in ui-lovelace.yaml (yaml mode) or by using the "Raw Config" editor while "Configuring UI" (storage mode). When updating be sure add to the version number at the end of this code.

```yaml
resources:
  - url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
    type: module
```
3. Refresh the page.
</details>
<details>
  <summary><b>Installation and tracking HACS:</b></summary>

1. In the HACS store search for "CCH" or "compact-custom-header" and install.

2. Configure Lovelace to load the card:

```yaml
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
```

3. Refresh the page.
</details>


CCH may not work on some older/unsupported browsers. User @pjv maintains a version of CCH for those cases, found here: [Lovelace Compact Custom Header for old devices](https://gist.github.com/pjv/521073b982e37418339afbf420691310). **I do not offer support for this method**.


## Important notes:

* Hiding the header or the options button will remove your ability to edit from the UI.
* You can disable CCH by adding "?disable_cch" to the end of your URL.
* After using the raw config editor you will need to refresh the page to restore CCH.
* While in edit mode select "Show All Tabs" in the options menu to display hidden tabs.

### Breaking Changes:

|Version|Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Breaking Change|
|:-|:-|:-|
|1.1.0|Not yet released| Configuration has changed. No longer required to use CCH as a card. More info here.
|1.0.2b9|Apr. 6, 2019|**“background _image”** and **“background_color”** have been replaced with just “background”.
|1.0.0b0|Feb. 10, 2019|Complete rewrite of card. Card is now **"type: module"** and most config options have changed.
|0.2.8|Jan. 22, 2019|**Tab numbering** in config options now starts at 0 to match Lovelace URLs.
