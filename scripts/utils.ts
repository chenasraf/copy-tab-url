import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'
import react from '@vitejs/plugin-react'
import logger from '@/common/logger'

const __dirname = import.meta.dirname
const env = import.meta.env || {}

export const fastRefresh = true

export const port = parseInt(env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = env.NODE_ENV === 'development'
export const preambleCode = react.preambleCode.replace('__BASE__', '/')

export function log(name: string, message: string) {
  logger.log(black(bgCyan(` ${name} `)), message)
}
