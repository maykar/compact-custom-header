# Compact Custom Header

* [**Installation**](../Installation)
* [**Troubleshooting**](../Troubleshooting)
* [**Main Config**](../Main-Config-Options)
  * [**Swipe Nav Config**](../Swipe-Navigation): Enable and configure swipe navigation.
  * [**Exception Config**](../Exception-Config): Per user/device config.
  * [**Styling Config**](../Styling-Config): Style the header.
  * [**Conditional Styling Config**](../Conditional-Styling-Config): Conditionally Style the header.
  * [**Conditional Styling Templates**](../Conditional-Styling-Templates): Complex Conditional styling.

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

### Breaking Changes:

|Version|Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Breaking Change|
|:-|:-|:-|
|1.0.2b9|Apr. 6, 2019|**“background _image”** and **“background_color”** have been replaced with just “background”.
|1.0.0b0|Feb. 10, 2019|Complete rewrite of card. Card is now **"type: module"** and most config options have changed.
|0.2.8|Jan. 22, 2019|**Tab numbering** in config options now starts at 0 to match Lovelace URLs.