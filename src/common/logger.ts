type ConsoleFunctions = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof Console]: Console[K] extends (...args: infer A) => void ? A : never
}
export class Logger {
  enabled = true

  use(method: keyof ConsoleFunctions, ...args: unknown[]) {
    if (!this.enabled) return
    // eslint-disable-next-line no-unused-vars
    const callable = console[method] as (...args: unknown[]) => void
    callable(...args)
  }

  log(...args: unknown[]) {
    this.use('log', ...args)
  }
  debug(...args: unknown[]) {
    this.use('debug', ...args)
  }
  info(...args: unknown[]) {
    this.use('info', ...args)
  }
  warn(...args: unknown[]) {
    this.use('warn', ...args)
  }
  error(...args: unknown[]) {
    this.use('error', ...args)
  }
}

export const logger = new Logger()
export default logger
