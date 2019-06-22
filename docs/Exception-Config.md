# Exception Config

You can have different settings depending on username, user agent, and media query. You can use any combination as well.

* **user:** This is the Home Assistant user's name, not username (if they're different). You can look to the bottom of the editor to see which to use. This option is case sensitive.
* **user_agent:** A matching word or phrase from the devices user agent. You can find this at the bottom of this cards editor or by [googling "what's my user agent"](http://www.google.com/search?q=whats+my+user+agent) on the device in question. This option is case sensitive.
* **media_query:** A valid [CSS media query](https://www.w3schools.com/css/css_rwd_mediaqueries.asp).


## Exceptions Config Example:

* Under exceptions set your conditions and then set up their config below that.
* If a config item is left out of an exception's config the main config's value is used.

```yaml
cch:
  main_config: true
  menu: overflow
  options: clock
  voice: hide
  clock_format: 12
  exceptions:
    - conditions:
        user: maykar
      config:
        voice: show
        options: clock
        clock_format: 24
    - conditions:
        user: maykar
        user_agent: Mobile
        media_query: (max-width: 600px)
      config:
        options: clock
        clock_format: 12
        hide_tabs: 4,5,9
```