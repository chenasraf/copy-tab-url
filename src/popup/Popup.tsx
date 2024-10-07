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
    window.close()
  }

  return (
    <div className="popup">
      <header className="popup-header">
        <p>Copy Tab URL</p>
      </header>

      <main className="button-group">
        <button type="button" onClick={() => send('copy-tab-url')}>
          Copy Tab URL
        </button>

        <button type="button" onClick={() => send('copy-tab-markdown')}>
          Copy Tab Markdown
        </button>
      </main>

      <footer>
        <button type="button" onClick={openOptionsPage}>
          Options
        </button>
      </footer>
    </div>
  )
}

export default Popup
