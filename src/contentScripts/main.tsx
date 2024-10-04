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
        injectToast()
      }, 10)
    })

    async function injectToast() {
      if (document.querySelector('[data-taburl-toast]')) {
        dismissToast()
        await new Promise((resolve) => setTimeout(resolve, 160))
      }
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '10px'
      container.style.right = '10px'
      container.style.zIndex = '999999'
      container.style.perspective = '100px'

      const toast = document.createElement('div')
      toast.dataset.taburlToast = 'taburlToast'
      toast.style.background = 'rgb(24, 24, 24)'
      toast.style.color = 'rgb(255, 255, 255)'
      toast.style.fontFamily = 'Helvetica, Arial, sans-serif'
      toast.style.fontSize = '14px'
      toast.style.padding = '12px'
      toast.style.borderRadius = '1em'
      toast.style.transition = 'all 150ms ease-in-out'
      toast.style.opacity = '0'
      toast.style.transform = 'rotate3d(0, 3, 1, 10deg) translateY(-10px)'

      toast.innerText = 'URL Copied to Clipboard'

      container.appendChild(toast)
      document.body.appendChild(container)

      logger.debug('Toast injected')

      setTimeout(() => {
        toast.style.opacity = '1'
        toast.style.transform = ''

        setTimeout(() => {
          dismissToast()
        }, 3000)
      }, 10)
    }

    function dismissToast() {
      const toast = document.querySelector('[data-taburl-toast]') as HTMLDivElement
      const container = toast?.parentElement
      if (!toast || !container) return
      logger.debug('Dismissing toast')
      toast.style.opacity = '0'
      toast.style.transform = 'rotate3d(0, 3, 1, 10deg) translateY(-10px)'
      setTimeout(() => {
        container.remove()
        logger.debug('Toast dismissed')
      }, 150)
    }
  })()
