# **STYLING CONFIGURATION**

Style configuration can be done in yaml, raw edit mode, or from your [HA theme](#theme-variables).
<br><br>

|NAME|DESCRIPTION|
|-|-|
|background|Change the header's background color or image. Uses any CSS that can be used with the CSS [background-color property](https://www.w3schools.com/cssref/pr_background-color.asp), [background-image property](https://www.w3schools.com/cssref/pr_background-image.asp), or [background property](https://www.w3schools.com/cssref/css3_pr_background.asp). Examples: `background: "#000"` or even `background: url("paper.gif")`.
|all_buttons_color|Set all buttons to one color. Acts as a fallback, if set to red and a button is set to blue with button_color then all buttons will be red except for that button.
|button_color|Set the color of a single button. See example below.
|all_tabs_color|Set all tabs to one color. Acts as a fallback, if set to red and one tab is set to blue with tab_color then all tabs will be red except for that one tab.
|tab_color|Set the color of a single tab. See example below.
|notify_indicator_color|Sets the color of the new notification indicator.
|notify_text_color|Sets the color of the number of new notifications inside the indicator.
|active_tab_color|Sets the color of the current tab's icon.
|conditional_styles|Dynamically change styles depending on an entity's state, see [Conditional Styling](../Conditional-Styling-Config/).

<br>
<b>Notes on styling config:</b>

* On HA 0.96.0 and above it is no longer possible to modify the notifications button using CCH.
* If using hex colors `#ffffff` be sure to enclose in quotes `"#ffffff"`.
* You may use any [valid CSS for colors](https://www.w3schools.com/cssref/pr_text_color.asp).
* You can use styling in your exceptions as well and have different themes per user/device.

<br>
## <u>Example</u>
<img src="https://i.imgur.com/t6VMKHf.png" width="400px"><br>

```yaml
cch:
  # background image with transparency and background color transparent
  background: transparent url("https://goo.gl/M3Dsf2")
  all_buttons_color: green # color of all buttons unless set in button_color
  button_color:
    menu: rgb(255,192,203)
    notifications: yellow
    voice: white
    options: red
  all_tabs_color: red # color of all tabs unless set in tab_color
  tab_color:
    0: green
    1: red
    2: blue
  tab_indicator_color: yellow # indicator under current tab
  notify_indicator_color: "#00FFFF" # the notifications indicator
  notify_text_color: brown # number inside notifications indicator
  chevrons: false
  options: clock
  clock_am_pm: true
  clock_date: true
  clock_format: 12
  date_locale: en-gb
```

## <u>Theme Variables</u>
You can also style CCH from your HA theme's YAML to make it easier to share and lighter on your lovelace config. All styling options are available with the exception of single tab colors. Options set in the Lovelace config will override the themes values.
<br>
<br>
Example:<br>

```yaml
  cch-background: url("https://goo.gl/M3Dsf2")
  cch-all-buttons-color: blue
  cch-button-color-menu: green
  cch-button-color-notifications: yellow
  cch-button-color-voice: black
  cch-button-color-options: red
  cch-all-tabs-color: red
  cch-tab-indicator-color: yellow
  cch-active-tab-color: blue
  cch-notify-indicator-color: "#00FFFF"
  cch-notify-text-color: brown
```