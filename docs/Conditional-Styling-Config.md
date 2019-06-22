# Conditional Styling Config

Conditional styling allows for simple dynamic styling of the header, buttons, and tabs depending on an entity's state.
For more complex conditions (multiple conditions for one element, using entity attributes, dynamically hiding tabs, etc.) use [conditional styling templates](https://maykar.github.io/compact-custom-header/Conditional-Styling-Templates/).

* **After editing conditional styles you should always refresh the page or do a "hard refresh" (Ctrl + Shift + R)**
* **Conditional styles may be used inside exceptions.**
* **All conditional style configuration is done in yaml/raw edit mode.**
* **In order to keep important tab style changes visible, active tab styling is disabled when using conditional styling on tabs.**
* **If styling an icon, the view must already have an icon associated with it and not just a title.**
* **[See full example below for use.](#full-example)**

## Example:

```yaml
  conditional_styles:
    - entity: input_boolean.boolean1    # entity to watch
      condition:                     
        state: off                      # condition to match
      button:                           # type of item to style
        menu:                           # item to style
          color: yellow                 # what to style
```

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

## Full Example.
```yaml
cch:
  main_config: true
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