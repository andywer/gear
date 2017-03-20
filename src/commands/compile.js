import { getBabelPlugins, invokeBabel } from '../babel'
import type { Logger } from '../logger'

const DEFAULT_BABEL_PLUGINS = [
  '@andywer/babel-plugin-transform-dctypes-comments'
]
const DEFAULT_BABEL_PRESETS = [
  'babel-preset-env'
]

compile :: (string[], Object, Logger) => Promise<*>

export default compile

async function compile (args, flags, logger) {
  const [ sourceDirPath, ...unhandledSourceDirs ] = args
  const { outDir } = flags

  if (!sourceDirPath) {
    throw new Error(`No source directory passed.`)
  } else if (unhandledSourceDirs.length > 0) {
    throw new Error(`Can only compile a single source directory.`)
  }

  if (Array.isArray(outDir)) {
    throw new Error(`More than a single output directory is not permitted.`)
  }

  const additionalBabelOptions = getAdditionalBabelOptions(flags)
  const plugins = DEFAULT_BABEL_PLUGINS.concat(getBabelPlugins(flags))
  const presets = DEFAULT_BABEL_PRESETS

  await invokeBabel([ sourceDirPath, '-d', outDir, ...additionalBabelOptions ], { plugins, presets })

  logger.success(`Compiled`)
}

getAdditionalBabelOptions :: Object => string[]

function getAdditionalBabelOptions (flags) {
  const additionalOptions = []

  if (flags.watch) {
    additionalOptions.push('--watch')
  }

  // TODO: Other useful options:
  // --source-maps
  // --copy-files

  return additionalOptions
}
