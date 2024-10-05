// import { useStorageLocal } from '@/hooks/useStorageLocal'
import { sendMessage } from 'webext-bridge/popup'
import './Popup.css'

const Popup = () => {
  // const [val] = useStorageLocal<string>({ key: 'copy-markdown-format' })

  const openOptionsPage = () => {
    browser.runtime.openOptionsPage()
  }

  const send = (cmd: string) => {
    sendMessage(cmd, {})
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Copy Tab URL</p>
        <p>
          <button type="button" onClick={() => send('copy-tab-url')}>
            Copy Tab URL
          </button>
        </p>
        <p>
          <button type="button" onClick={() => send('copy-tab-markdown')}>
            Copy Tab Markdown
          </button>
        </p>
        <p>
          <button type="button" onClick={openOptionsPage}>
            Options
          </button>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default Popup
