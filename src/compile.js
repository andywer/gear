const execa = require('execa')

const DEFAULT_BABEL_PLUGINS = [
  '@andywer/babel-plugin-transform-dctypes-comments'
]
const DEFAULT_BABEL_PRESETS = [
  'babel-preset-env'
]
const DEFAULT_FLOW_PLUGIN = 'babel-plugin-transform-flow-strip-types'

module.exports = compile

function compile (args, flags, logger) {
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
  const plugins = getBabelPlugins(flags)
  const presets = DEFAULT_BABEL_PRESETS

  return invokeBabel([ sourceDirPath, '-d', outDir, ...additionalBabelOptions ], { plugins, presets })
}

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

function getBabelPlugins (flags) {
  const plugins = DEFAULT_BABEL_PLUGINS

  if (flags.flow) {
    plugins.push(`babel-plugin-transform-flow-${flags.flow}`)
  } else {
    plugins.push(DEFAULT_FLOW_PLUGIN)
  }

  return plugins
}

function invokeBabel (options, { plugins, presets }) {
  const pluginsOption = `--plugins=${plugins.join(',')}`
  const presetsOption = `--presets=${presets.join(',')}`

  return execa('babel', options.concat([ pluginsOption, presetsOption ]))
}
