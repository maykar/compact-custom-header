<!-- Disable sidebar -->
<script>
let sidebar = document.getElementsByClassName("col-md-3")[0];
sidebar.parentNode.removeChild(sidebar);
document.getElementsByClassName("col-md-9")[0].style.cssText = "width:80%;display:block;margin-left:10%";
</script>
<!-- Disable sidebar -->

# **1.1.0 Breaking Changes**
<br>
**Configuration has changed in version 1.1.0**

CCH is no longer a card and all configuration happens in the root of your lovelace config. The config options remain the same so you can copy and paste your previous config from the card to the new config.
<br>
<br>
**Steps to upgrade:**

1. Visit the [Main Configuration](Main-Config-Options.md) page of these docs to see how the new config works (this page also explains how the new UI editor works).

2. Copy your previous configuration from the card and paste into `cch:` as shown in the "Configuration with YAML" section on the page from previous step.

3. Remove the CCH card from all views and the `main_config:` option from your configuration, they are no longer needed.


