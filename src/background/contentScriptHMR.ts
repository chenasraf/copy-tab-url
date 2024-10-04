import { isFirefox, isForbiddenUrl } from '@/env'

// Firefox fetch files from cache instead of reloading changes from disk,
// hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(async ({ tabId, frameId, url }) => {
  // Filter out non main window events.
  if (frameId !== 0) return

  if (isForbiddenUrl(url)) return

  console.debug('Injecting', `${isFirefox ? '' : './'}dist/contentScripts/index.global.js`)

  // inject the latest scripts
  try {
    await browser.tabs.executeScript(tabId, {
      file: `${isFirefox ? '' : '.'}/dist/contentScripts/index.global.js`,
      runAt: 'document_end',
    })
  } catch (error) {
    console.error(error)
  }
})
