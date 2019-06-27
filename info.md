## 1.1.0 Breaking changes:
* CCH is no longer required to be a card and only needs added as a resource.
* Configuration happens at the root of your lovelace config in `cch:` (see links below).
* The UI editor can now be found in the options menu after selecting "Configure UI".

<br>

I've made a [quick guide](https://maykar.github.io/compact-custom-header/1_1_0_upgrade/) for the upgrade process and [updated the docs](https://maykar.github.io/compact-custom-header/) quite a bit and they can now accept PR's, so please contribute if anything is unclear or missing.

## Features:

* Compact design that removes header text.
* Per user/device settings.
* Hide tabs/buttons from user's and devices.
* Style & hide anything in the header & the header itself.
* Dynamically style header elements based on entity states/attributes.
* Add swipe navigation to Lovelace for mobile devices.
* Any button can be hidden, turned into clock with optional date, or placed in the options menu.
* Set a default/starting view.

### Before and After:
<img src="https://github.com/maykar/compact-custom-header/blob/master/example.gif?raw=true" width="400px">

### See the <a href="https://maykar.github.io/compact-custom-header/" target="_blank">Docs for installation and configuration</a>.<br>Follow the <a href="https://maykar.github.io/compact-custom-header/Troubleshooting/" target="_blank">troubleshooting guide</a> before submitting issues to github or on the forums.<br><br>
<a href="https://www.buymeacoffee.com/FgwNR2l" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a><br>

## Important Notes

* Hiding the header or the options button will remove your ability to edit from the UI.
* You can disable CCH by adding "?disable_cch" to the end of your URL.
* After using the raw config editor you will need to refresh the page to restore CCH.
* While in edit mode select "Show All Tabs" in the options menu to display hidden tabs. 
