import { contentScriptMain } from './content_script'

  // NOTE Firefox `browser.tabs.executeScript()` requires scripts return a primitive value,
  // so we wrap the content script in an IIFE
  // prettier doesn't like this.
  ; (() => {
    contentScriptMain()
  })()
