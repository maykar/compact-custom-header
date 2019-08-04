<!-- Disable sidebar -->
<script>
let sidebar = document.getElementsByClassName("col-md-3")[0];
sidebar.parentNode.removeChild(sidebar);
document.getElementsByClassName("col-md-9")[0].style.cssText = "width:80%;display:block;margin-left:10%";
</script>
<!-- Disable sidebar -->

# **TROUBLESHOOTING**
<br>
**Many issues are solved by clearing your cache and refreshing the page.**

**CCH may not function on some older or unsupported browsers/devices (like Fire tablets using WebView).<br>I maintain a version for these cases found here:**
[CCH for legacy devices](https://github.com/maykar/compact-custom-header/issues/185)

**To be sure that CCH is the source of the issue, disable it and see if the issue persists. The easiest way to do this is to remove or comment out CCH in `resources:`.**
<br><br>
Please, read through these docs and search the [HA forum thread](https://community.home-assistant.io/t/compact-custom-header) and [Github issues](https://github.com/maykar/compact-custom-header/issues?utf8=%E2%9C%93&q=is%3Aissue) (open and closed) before posting issues on the forums or Github.

Be sure to read ["Important Notes"](https://maykar.github.io/compact-custom-header/#important-notes) and ["Breaking Changes"](https://maykar.github.io/compact-custom-header/#breaking-changes) for important info and changes you may have missed.

[@thomasloven's lovelace guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins) is a great resource for installation of custom cards and solutions to common problems.

When posting issues on Github or HA's forums always include:

* The browser you are using
* Home Assistant version
* The config & resources section of your Lovelace code for CCH
* Any errors in the HA logs and in your browser’s Dev-Tools (F12) pertaining to this card
