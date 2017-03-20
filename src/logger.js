import chalk from 'chalk'
import figures from 'figures'

export type Logger = {
  log: (msg: string) => void,
  success: (msg: string) => void,
  error: (msg: string) => void
}

createLogger :: () => Logger

export function createLogger () {
  const logger = Object.assign(
    {},
    console,
    {
      success (message) {
        logger.log(chalk.green(`${figures.tick} ${message}`))
      }
    }
  )

  return logger
}
