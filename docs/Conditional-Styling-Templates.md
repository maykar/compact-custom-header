# Conditional Styling Templates

You can use JavaScript for complex conditional styling of header background, tabs, and buttons.
Tabs and buttons can style `icon`, `color`, and `display` (display will `show` or `hide` buttons or tabs).<br><br>
**All templates must return a string.**
* Icon templates need to return a MDI icon: `"mdi:account-off"`.
* Color templates must return any valid CSS color: `"red"` or `"#ff0000"` or `"rgb(255, 0, 0)"` etc.
* Display templates must return either `"show"` or `"hide"`
* Background template must return any valid background CSS color or image property: `"#000000:` or `"rgb(255, 0, 0)"` or `"url("/local/background.jpg")"` etc.

Formatting is **VERY** important here.

* **After editing conditional styles you should always refresh the page or do a "hard refresh" (Ctrl + Shift + R)**
* **Conditional styles may be used inside exceptions.**
* **All conditional style configuration is done in yaml/raw edit mode.**
* **In order to keep important tab style changes visible, active tab styling is disabled when using conditional styling on tabs.**
* **If styling an icon, the view must already have an icon associated with it and not just a title.**
<br><br>



Example:<br>
**This is just an example, you can use whatever JavaScript you prefer (e.g., You can use return statements, ternaries, etc. if you'd like).**
```yaml
cch:
  main_config: true
  conditional_styles:
    template:
      - background: >  # Style the header's background can use CSS colors or background images.
          if (states["input_boolean.living_room"].state == "off") "#000";
          else if (states["input_boolean.living_room"].state == "on") "url('/local/bg.jpg')";
      - tab:
          3:  # Number of the tab to style.
          - icon: >  # MDI icon for tab or button.
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
          menu:  # Button to style. `menu`, `notifications`, `options`, or `voice`.
            icon: >
              if (states["device_tracker.galaxys8"].state == "home") "blue";
              else if (states["device_tracker.galaxys8"].state == "not_home") "#ffffff";
```