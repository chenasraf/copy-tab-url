// var process
import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'
import react from '@vitejs/plugin-react'
const __dirname = import.meta.dirname
console.debug('process', global)
// process = global.process || {}
const env = import.meta.env || {}
// const env = process.env || import.meta.env || {}

export const fastRefresh = true

export const port = parseInt(env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = env.NODE_ENV !== 'production'
export const preambleCode = react.preambleCode.replace('__BASE__', '/')

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
