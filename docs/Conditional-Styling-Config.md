# **CONDITIONAL STYLING**

Conditional styling allows for simple dynamic styling of the header, buttons, and tabs depending on an entity's state.
For more complex conditions (multiple conditions for one element, using entity attributes, dynamically hiding tabs, etc.) use [conditional styling templates](#conditional-styling-templates).

<br>
<img src="https://community-home-assistant-assets.s3.dualstack.us-west-2.amazonaws.com/original/3X/c/c/cc931f63db80ac4afc4a7909bdeb02f43e3087c5.gif" width="500px"><br><br>

* On HA 0.96.0 and above it is no longer possible to modify the notifications button using CCH.
* After editing conditional styles you should always refresh the page or do a "hard refresh" (Ctrl + Shift + R)
* Conditional styles may be used inside exceptions.
* All conditional style configuration is done in yaml/raw edit mode.
* In order to keep important tab style changes visible, active tab styling is disabled when using conditional styling on tabs.
* If styling an icon, the view must already have an icon associated with it and not just a title.
<br><br>

Example:

```yaml
  conditional_styles:
    - entity: input_boolean.boolean1    # entity to watch
      condition:                     
        state: off                      # condition to match
      button:                           # type of item to style
        menu:                           # item to style
          color: yellow                 # what to style
```
<br><br>
**Entity:**

* You may use any HA entity.
* You can use "notifications" in place of an entity, this will return "true" when there are notifications and "false" otherwise.

**Condition:**

* **state:** The state of the entity to match to trigger the change. Cannot be used with `above:` or `below:`
* **above:** If the state returns a number, trigger change when above this number. Can be used with or without `below:`.
* **below:** If the state returns a number, trigger change when below this number. Can be used with or without `above:`.

**Items to style**

* **background:** You can change the header's background color or image.
* **tab:** You can change any tab's color, icon, or hide it completely.
* **button:** You can change any button's color, icon, or hide it completely.

**Styling**

* **color:** Can use any CSS value that can be used with styling config (background, tab, or button).
* **image:** Can use any CSS value that can be used with styling config (background only).
* **hide:** Set to true to hide the item (button or tab).
* **on_icon:** The [mdi icon](https://materialdesignicons.com/) to use when condition matches. Must be used with `off_icon:` (button or tab).
* **off_icon:** The [mdi icon](https://materialdesignicons.com/) to use when condition does not match. Must be used with `on_icon:` (button or tab).

<br>
Full Example:
```yaml
cch:
  conditional_styles:
    - entity: input_boolean.boolean1
      condition:
        state: off                      # When input_boolean is off...
      background: url('/local/bg.jpg')  # change background image and...
      tab:                              # change color and icon of tab 3
        3:
          on_icon: mdi:death-star
          off_icon: mdi:death-star-variant
          color: yellow
    - entity: notifications
      condition:
        state: false      # When there are no notifications...
      button:             # hide notifications button.
        notifications:
          hide: true
    - entity: input_number.slider1
      condition:          # When slider is between 10 & 20...
        above: 10
        below: 20
      tab:                # change color and icon of tab 0.
        0:
          color: yellow
          off_icon: mdi:emoticon-dead
          on_icon: mdi:emoticon-excited
```

<br><br>
## <u>Conditional Styling Templates</u>

You can use JavaScript for complex conditional styling of header background, tabs, and buttons.
Tabs and buttons can style `icon`, `color`, and `display` (display will `show` or `hide` buttons or tabs).<br><br>
**All templates must return a string.**

* Icon templates need to return a MDI icon: `"mdi:account-off"`.
* Color templates must return any valid CSS color: `"red"` or `"#ff0000"` or `"rgb(255, 0, 0)"` etc.
* Display templates must return either `"show"` or `"hide"`
* Background template must return valid background CSS color or image property: `"#000000:` or `"rgb(255, 0, 0)"` or `"url("/local/background.jpg")"` etc.

Formatting is **VERY** important here.

* After editing conditional styles you should always refresh the page or do a "hard refresh" (Ctrl + Shift + R)
* Conditional styles may be used inside exceptions.
* In order to keep important tab style changes visible, active tab styling is disabled when using conditional styling on tabs.
* If styling an icon, the view must already have an icon associated with it and not just a title.
* You can use "notifications" in place of an entity (last example below).
<br><br>

Example:<br><br>
This is just an example, you can use any valid JavaScript (return statements, ternaries, etc. would work fine as well).
```yaml
cch:
  conditional_styles:
    template:
      - background: >
          if (states["input_boolean.living_room"].state == "off") "#000";
          else if (states["input_boolean.living_room"].state == "on") "url('/local/bg.jpg')";
      - tab:
          3:
          - icon: >
              if (states["device_tracker.galaxys8"].state == "home") "mdi:account";
              else "mdi:account-off";
          - color: >  # Color for tab or button icon.
              if (states["device_tracker.galaxys8"].state == "home") "blue";
              else "#ffffff";
      - tab:
          1:
            display: >  # Show or hide buttons or tabs.
              if (states["media_player.living_room"].state == "off") "hide";
              else if (states["media_player.living_room"].state == "playing") "show";
      - button:
          menu:
            icon: >
              if (states["device_tracker.galaxys8"].state == "home") "blue";
              else if (states["device_tracker.galaxys8"].state == "not_home") "#ffffff";
      - button:
          notifications:
            display: >
              if (notifications) "show";
              else "hide";
```