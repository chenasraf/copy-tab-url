import logger from '@/common/logger'
import { onMessage } from 'webext-bridge/content-script'

  // NOTE Firefox `browser.tabs.executeScript()` requires scripts return a primitive value,
  // so we wrap the content script in an IIFE
  // prettier doesn't like this.
  ; (() => {
    let toastTimeout1: NodeJS.Timeout, toastTimeout2: NodeJS.Timeout
    logger.info('[vite-react-webext] Hello world from content script')

    injectCSS()

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
      toast.dataset.taburlToast = 'taburl-toast'

      toast.innerText = 'URL Copied to Clipboard'

      container.appendChild(toast)
      document.body.appendChild(container)

      logger.debug('Toast injected')

      clearTimeout(toastTimeout1)
      clearTimeout(toastTimeout2)

      toastTimeout1 = setTimeout(() => {
        toast.classList.add('show')

        toastTimeout2 = setTimeout(() => {
          dismissToast()
        }, 3000)
      }, 10)
    }

    function dismissToast() {
      const toast = document.querySelector('[data-taburl-toast]') as HTMLDivElement
      const container = toast?.parentElement
      clearTimeout(toastTimeout1)
      clearTimeout(toastTimeout2)

      if (!toast || !container) return
      logger.debug('Dismissing toast')
      toast.classList.remove('show')
      toastTimeout1 = setTimeout(() => {
        container.remove()
        logger.debug('Toast dismissed')
      }, 150)
    }

    function injectCSS() {
      if (document.getElementById('taburl-toast-style')) return
      const style = document.createElement('style')
      style.id = 'taburl-toast-style'
      style.innerHTML = `
        [data-taburl-toast] {
          background: rgb(24, 24, 24);
          color: rgb(255, 255, 255);
          font-family: Helvetica, Arial, sans-serif;
          font-size: 14px;
          padding: 12px;
          border-radius: 1em;
          transition: all 150ms ease-in-out;
          opacity: 0;
          transform: rotate3d(0, 3, 1, 10deg) translateY(-10px);
        }

        [data-taburl-toast].show {
          opacity: 1;
          transform: none;
        }
      `
      document.head.appendChild(style)
    }
  })()
