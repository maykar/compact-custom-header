# Installation

* There are 2 methods of installation: Manually or with [HACS](https://github.com/custom-components/hacs). Follow only one of these methods.
* [@thomasloven's lovelace guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins) is a great resource for installation of cards in lovelace and issues.
* You may need to have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

<details>
  <summary><b>Manual installation:</b></summary>

1. Install this card by copying both .js files to `www/custom-lovelace/compact-custom-header/`. Be sure you're using the raw files from github (button on top right when viewing code).

2. Add the code below in ui-lovelace.yaml (yaml mode) or by using the "Raw Config" editor while "Configuring UI" (storage mode). When updating be sure add to the version number at the end of this code.

```yaml
resources:
  - url: /local/custom-lovelace/compact-custom-header/compact-custom-header.js?v=0.0.1
    type: module
```

3. Add compact-custom-header as a card to **EVERY** view and all config will go in your first view, see [Config Caching](https://github.com/maykar/compact-custom-header/wiki/Installation#configuration-caching) below for more info. See panel view example below for how to the card to views with `panel: true`.

```yaml
- type: custom:compact-custom-header
```

<details>
  <summary><b>Panel View Example:</b></summary>

To use with panel view you need to place this card inside a "container card" with the panel card (vertical stack card, layout-card, etc.), otherwise this card isn't "displayed" and won't load. Placing this card at the end of the vertical stack can help with some spacing issues.

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
</details>
<details>
  <summary><b>Installation and tracking HACS:</b></summary>

1. In the HACS store search for CCH or compact-custom-header and install.

2. Configure Lovelace to load the card:

```yaml
resources:
  - url: /community_plugin/compact-custom-header/compact-custom-header.js
    type: module
```

3. Refresh the Lovelace page.

4. Add compact-custom-header as a card to **EVERY** view and all config will go in your first view, see [Config Caching](https://github.com/maykar/compact-custom-header/wiki/Installation#configuration-caching) below for more info. See panel view example below for how to the card to views with `panel: true`.

```yaml
- type: custom:compact-custom-header
```

<details>
  <summary><b>Panel View Example:</b></summary>

To use with panel view you need to place this card inside a "container card" with the panel card (vertical stack card, layout-card, etc.), otherwise this card isn't "displayed" and won't load. Placing this card at the end of the vertical stack can help with some spacing issues.

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
</details>


This card may not work on some older/unsupported browsers. User @pjv maintains a version of CCH for those cases, found here: [Lovelace Compact Custom Header for old devices](https://gist.github.com/pjv/521073b982e37418339afbf420691310). **I do not offer support for this method**.

## Configuration Caching:

Since it is required for this card to be placed on each view, caching is used so that you only need to configure the card in the first view.

Set the compact-custom-header card in the first Lovelace view as "main config" by using `main_config: true` or by using the toggle in the editor. Then set all of your config in the first (main_config) view.

**Example:**

```yaml
views:
- title: First View Example
  cards:
  - type: custom:compact-custom-header
    main_config: true
```


You may clear the cache by clicking the button on the bottom of the editor or by adding "?clear_cch_cache" to the end of your URL.

**Example:** `http://192.168.1.42:8123/lovelace/0?clear_cch_cache`