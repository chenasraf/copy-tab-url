import logger from '@/common/logger'
import { onMessage } from 'webext-bridge/content-script'
import '../styles'

let toastTimeout1: NodeJS.Timeout, toastTimeout2: NodeJS.Timeout
let shadowDOM: ShadowRoot
let root: HTMLDivElement

export function contentScriptMain() {
  logger.info('[vite-react-webext] Hello world from content script')

  injectShadowRoot()

  onMessage('copy-tab-url', (payload) => {
    logger.debug('copy-text', payload)
    setTimeout(async () => {
      logger.debug('Copying text', payload.data)
      navigator.clipboard.writeText(payload.data as string)
      toast('URL Copied to Clipboard')
    }, 0)
  })
  onMessage('copy-tab-markdown', (payload) => {
    logger.debug('copy-text', payload)
    setTimeout(async () => {
      logger.debug('Copying text', payload.data)
      navigator.clipboard.writeText(payload.data as string)
      toast('Markdown Copied to Clipboard')
    }, 0)
  })
}

async function injectShadowRoot() {
  const container = document.createElement('div')
  root = document.createElement('div')
  const styleEl = document.createElement('link')
  shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
}

async function toast(text: string) {
  await dismissToast()
  const container = document.createElement('div')
  container.classList.add('container')

  const toast = document.createElement('div')
  toast.classList.add('toast')
  toast.dataset.taburlToast = 'taburl-toast'

  toast.innerText = text

  container.appendChild(toast)
  root.appendChild(container)

  logger.debug('Toast injected')

  clearTimeout(toastTimeout1)
  clearTimeout(toastTimeout2)

  return new Promise((resolve) => {
    toastTimeout1 = setTimeout(() => {
      toast.classList.add('show')
      toastTimeout2 = setTimeout(() => {
        dismissToast()
      }, 3000)
      resolve(undefined)
    }, 10)
  })
}

async function dismissToast() {
  const toast = root.querySelector('[data-taburl-toast]') as HTMLDivElement
  const container = toast?.parentElement
  clearTimeout(toastTimeout1)
  clearTimeout(toastTimeout2)

  if (!toast || !container) return
  logger.debug('Dismissing toast')
  toast.classList.remove('show')
  return new Promise((resolve) => {
    toastTimeout1 = setTimeout(() => {
      container.remove()
      logger.debug('Toast dismissed')
      resolve(undefined)
    }, 150)
  })
}
