import '../styles'
import './Options.css'
import { useOptions } from '@/hooks/useOptions'
import React from 'react'

const Options = () => {
  const { options, setOption } = useOptions()

  const setBtnLabel = React.useCallback(
    (index: number, value: string) => {
      const customButtons = [...options.customButtons]
      customButtons[index].label = value
      setOption('customButtons', customButtons)
    },
    [options.customButtons],
  )
  const setBtnFormat = React.useCallback(
    (index: number, value: string) => {
      const customButtons = [...options.customButtons]
      customButtons[index].format = value
      setOption('customButtons', customButtons)
    },
    [options.customButtons],
  )

  const addButton = React.useCallback(
    () => setOption('customButtons', [...options.customButtons, { label: '', format: '' }]),
    [options.customButtons],
  )
  const removeButton = React.useCallback(
    (index: number) => {
      const customButtons = [...options.customButtons]
      customButtons.splice(index, 1)
      setOption('customButtons', customButtons)
    },
    [options.customButtons],
  )

  return (
    <div className="options">
      <header className="options-header">
        <p>Copy Tab URL Options</p>
        <p className="options-header-subtitle">Changes are automatically saved.</p>
      </header>
      <main>
        <div className="options-section">
          <p className="options-section-title">Custom Buttons</p>
          <p className="options-section-subtitle">Add custom buttons to the popup.</p>
        </div>
        <button onClick={addButton}>Add Button</button>
        <div className="options-section custom-buttons-section">
          {options.customButtons.map((btn, i) => (
            <div className="custom-button-item" key={i}>
              <div className="custom-button-inputs">
                <label>
                  <div>Button Label</div>
                  <input
                    value={btn.label}
                    placeholder="Check this out!"
                    onChange={(e) => setBtnLabel(i, e.target.value)}
                  />
                </label>
                <label>
                  <div>Output Format</div>
                  <input
                    value={btn.format}
                    placeholder="[Check this out!](https://example.com/{url})"
                    onChange={(e) => setBtnFormat(i, e.target.value)}
                  />
                </label>
              </div>
              <div>
                <button className="remove-button" onClick={() => removeButton(i)}>
                  Remove Button
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Options
