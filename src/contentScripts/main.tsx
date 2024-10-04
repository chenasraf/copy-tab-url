// import App from './App'
// import * as ReactDOM from 'react-dom/client'
import { onMessage } from 'webext-bridge/content-script'

  // Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
  ; (() => {
    console.info('[vite-react-webext] Hello world from content script')

    onMessage('copy-text', (payload) => {
      console.debug('copy-text', payload)
      setTimeout(async () => {
        console.debug('Copying text', payload.data)
        navigator.clipboard.writeText(payload.data as string)
      }, 10)
      // document.execCommand('copy', false, payload.data as string)
    })

    // mount component to context window
    try {
      // const container = document.createElement('div')
      // const root = document.createElement('div')
      // const styleEl = document.createElement('link')
      // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
      // styleEl.setAttribute('rel', 'stylesheet')
      // styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
      // shadowDOM.appendChild(styleEl)
      // shadowDOM.appendChild(root)
      // document.body.appendChild(container)
      // const reactRoot = ReactDOM.createRoot(root)
      // reactRoot.render(<App />)
      console.info('[vite-react-webext] Component mounted')
    } catch (error) {
      console.error('Error mounting component', error)
    }
  })()
