import crypto from 'crypto'
import type PkgType from '../package.json'
import { isDev, port, r, preambleCode } from '../scripts/utils'
import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 2,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    browser_action: {
      default_icon: './assets/icon-512.png',
      default_popup: './dist/popup/index.html',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
      chrome_style: false,
    },
    background: {
      page: './dist/background/index.html',
      persistent: false,
    },
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },
    permissions: [
      'tabs',
      'storage',
      'activeTab',
      'clipboardWrite',
      'contextMenus',
      'http://*/',
      'https://*/',
    ],
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*'],
        js: ['./dist/contentScripts/index.global.js'],
      },
    ],
    web_accessible_resources: ['dist/contentScripts/style.css'],
    commands: {
      'copy-tab-url': {
        suggested_key: {
          default: 'Ctrl+Shift+U',
          mac: 'Command+Shift+U',
        },
        description: 'Copy the current tab URL',
      },
      'copy-tab-markdown': {
        suggested_key: {
          default: 'Ctrl+Shift+M',
          mac: 'Command+Shift+M',
        },
        description: 'Copy the current tab URL and title in Markdown format',
      },
    },
  }

  if (isDev) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')

    const preambleCodeHash = crypto.createHash('sha256').update(preambleCode).digest('base64')

    // this is required on dev for Vite script to load
    manifest.content_security_policy = `script-src 'self' 'sha256-${preambleCodeHash}' http://localhost:${port}; object-src 'self'`
  }

  return manifest
}
