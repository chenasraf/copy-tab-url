import logger from '@/common/logger'
import { onMessage } from 'webext-bridge/content-script'

  // NOTE Firefox `browser.tabs.executeScript()` requires scripts return a primitive value,
  // so we wrap the content script in an IIFE
  // prettier doesn't like this.
  ; (() => {
    logger.info('[vite-react-webext] Hello world from content script')

    onMessage('copy-text', (payload) => {
      logger.debug('copy-text', payload)
      setTimeout(async () => {
        logger.debug('Copying text', payload.data)
        navigator.clipboard.writeText(payload.data as string)
      }, 10)
      // document.execCommand('copy', false, payload.data as string)
    })
  })()
