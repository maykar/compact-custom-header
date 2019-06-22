# Installation

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
