import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'
import react from '@vitejs/plugin-react'

const __dirname = import.meta.dirname
const env = import.meta.env || process.env || {}

export const fastRefresh = true

export const port = parseInt(env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = env.NODE_ENV === 'development' || env.MODE === 'development' || env.DEV
export const preambleCode = react.preambleCode.replace('__BASE__', '/')

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
