import { sendMessage } from 'webext-bridge/background'
import { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed')
})

console.log('Hello from background script')

browser.commands.onCommand.addListener(async (cmd) => {
  const tab = await browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => tabs[0])
  console.debug('command received', cmd, tab)
  const resp = getResponse(cmd, tab)
  if (!resp || !tab) return

  console.debug('sending message', resp, 'to tab', tab.id)
  return sendMessage(resp.cmd, resp.payload!, {
    context: 'content-script',
    tabId: tab.id!,
  })
})

function getResponse(msg: string, tab: Tabs.Tab) {
  switch (msg) {
    case 'copy-tab-url':
      // copy tab url to clipboard
      return { cmd: 'copy-text', payload: tab?.url }
    case 'copy-tab-markdown':
      // copy tab url and title in markdown format
      return {
        cmd: 'copy-text',
        payload: `[${tab?.title}](${tab?.url})`,
      }
  }
  return null
}
