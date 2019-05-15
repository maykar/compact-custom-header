# Compact Custom Header
Customize the Home Assistant header!<br><br>
<a href="https://www.buymeacoffee.com/FgwNR2l" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/black_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a><br>
### See the [Wiki for installation and configuration.](https://github.com/maykar/compact-custom-header/wiki)<br>
### Follow the [troubleshooting guide](https://github.com/maykar/compact-custom-header/wiki/Troubleshooting) before submitting issues here or on the forums.
## Features:
* Compact design that removes header text.
* Style or hide anything in the header.
* Conditionally style the header based on the state of entities.
* Per user/device settings using usernames, user agents, and media queries.
* Hide tabs/buttons from user's and devices.
* Any icon button can be hidden, made into a clock with optional date, or placed in the options menu.
* Set a default view.
* Add swipe navigation between views.<br><br>

**Before:**<br>
<img src="https://i.imgur.com/GnT85b0.png?2" width="400px"><br>
**After:**<br>
<img src="https://i.imgur.com/LeKHDCh.png?1" width="400px"><br>

**Conditional Styling Demo:**<br>
<img src="https://community-home-assistant-assets.s3.dualstack.us-west-2.amazonaws.com/original/3X/c/c/cc931f63db80ac4afc4a7909bdeb02f43e3087c5.gif" width="400px"><br>

## Important notes:

* Hiding the header or options button will remove your ability to edit from the UI. In this case, you can restore the default header by adding "?disable_cch" to the end of your URL. Example: `http://192.168.1.42:8123/lovelace/0?disable_cch`
* The card will automatically display when "configuring UI" to allow for editing, but is otherwise hidden.
* If hiding tabs, while in edit mode there is a new option in the options drop-down menu "Show All Tabs" to help with configuration.
* If conditionally styling a tab's icon, make sure that the tab is already an icon and not just a title.
* To use with panel view place this card inside a "container card" with the panel card (vertical stack card, layout-card, etc.), otherwise this card isn't "displayed" and won't load. Example below.
<details>
  <summary><b>Panel View Example:</b></summary>

Placing this card at the end of the vertical stack can help with some spacing issues.

```yaml
views:
- title: Panel View Example
  panel: true
  cards:
  - type: vertical-stack
    cards:
    - type: another-card
    - type: custom:compact-custom-header
```
</details>
