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

## Important notes:

* Hiding the header or the options button will remove your ability to edit from the UI.
* You can disable CCH by adding "?disable_cch" to the end of your URL.
* After using the raw config editor you will need to refresh the page to restore CCH.
* While in edit mode select "Show All Tabs" in the options menu to display hidden tabs.

### Breaking Changes:

|Version|Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Breaking Change|
|:-|:-|:-|
|1.0.2b9|Apr. 6, 2019|**“background _image”** and **“background_color”** have been replaced with just “background”.
|1.0.0b0|Feb. 10, 2019|Complete rewrite of card. Card is now **"type: module"** and most config options have changed.
|0.2.8|Jan. 22, 2019|**Tab numbering** in config options now starts at 0 to match Lovelace URLs.
