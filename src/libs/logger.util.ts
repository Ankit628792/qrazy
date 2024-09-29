type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'trace'

interface LoggerConfig {
  level?: LogLevel
  enabled?: boolean
  output?: 'console'
}

class CustomLogger {
  private config: LoggerConfig

  constructor(config: LoggerConfig = {}) {
    this.config = {
      level: config.level || 'info',
      enabled: config.enabled !== undefined ? config.enabled : true,
      output: config.output || 'console'
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'trace']
    return levels.indexOf(level) >= levels.indexOf(this.config.level!)
  }

  private outputToConsole(level: LogLevel, ...messages: string[]) {
    const colorMap: Record<LogLevel, string> = {
      debug: 'gray',
      info: 'blue',
      warn: 'orange',
      error: 'red',
      trace: 'gray'
    }

    const logColor = colorMap[level] || 'black'
    const logMethod = console[level] || console.log
    const logMessage = `%c[${level.toUpperCase()}]`
    logMethod(
      logMessage,
      `background: ${logColor}; color: white; font-weight: bold;`,
      ...messages
    )
  }

  private log(level: LogLevel, ...messages: string[]) {
    if (!this.config.enabled) return

    if (this.shouldLog(level)) {
      this.outputToConsole(level, ...messages)
    }
  }

  debug(...messages: string[]) {
    this.log('debug', ...messages)
  }

  info(...messages: string[]) {
    this.log('info', ...messages)
  }

  warn(...messages: string[]) {
    this.log('warn', ...messages)
  }

  error(...messages: string[]) {
    this.log('error', ...messages)
  }

  trace(...messages: string[]) {
    this.log('trace', ...messages)
  }
}

const config: LoggerConfig = {
  level: 'debug',
  enabled: true,
  output: 'console'
}

const Logger = new CustomLogger(config)

export default Logger
