import logger from '@/common/logger'
import { BridgeMessage } from 'webext-bridge'
import { sendMessage, onMessage } from 'webext-bridge/background'
import { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

logger.log('Hello from background script')

function init() {
  browser.runtime.onInstalled.addListener((): void => {
    logger.log('Extension installed')
  })

  // Commands (keyboard shortcuts)
  browser.commands.onCommand.addListener(async (cmd) => {
    const tab = await getCurrentTab()
    logger.debug('command received', cmd, tab)
    const resp = getResponse(cmd, tab)
    if (!resp || !tab) return

    logger.debug('sending message', resp, 'to tab', tab.id)
    return sendMessage(resp.cmd, resp.payload!, {
      context: 'content-script',
      tabId: tab.id!,
    })
  })

  // Context menu
  browser.contextMenus.create({
    id: 'copy-tab-url',
    title: 'Copy Tab URL',
    contexts: ['all'],
  })
  browser.contextMenus.create({
    id: 'copy-tab-markdown',
    title: 'Copy Tab Markdown',
    contexts: ['all'],
  })
  browser.contextMenus.onClicked.addListener(async (info) => {
    const tab = await getCurrentTab()
    const resp = getResponse(info.menuItemId as string, tab)
    if (!resp || !tab) return
    return sendMessage(resp.cmd, resp.payload!, { context: 'content-script', tabId: tab.id! })
  })

  // Popup listeners
  onMessage('copy-tab-url', responder('copy-tab-url'))
  onMessage('copy-tab-markdown', responder('copy-tab-markdown'))
}

init()

function responder(cmd: string) {
  return async (payload: BridgeMessage<string>) => {
    logger.debug('copy-tab-url', payload)
    const tab = await getCurrentTab()
    const resp = getResponse(cmd, tab)
    if (!resp || !tab) return
    return sendMessage(resp.cmd, resp.payload!, {
      context: 'content-script',
      tabId: tab.id!,
    })
  }
}

function getResponse(msg: string, tab: Tabs.Tab) {
  switch (msg) {
    case 'copy-tab-url':
      // copy tab url to clipboard
      return { cmd: msg, payload: tab?.url }
    case 'copy-tab-markdown':
      // copy tab url and title in markdown format
      return {
        cmd: msg,
        payload: `[${tab?.title}](${tab?.url})`,
      }
  }
  return null
}

async function getCurrentTab() {
  return browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => tabs[0])
}
