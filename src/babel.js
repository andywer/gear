const execa = require('execa')

const DEFAULT_FLOW_PLUGIN = 'babel-plugin-transform-flow-strip-types'

getBabelPlugins :: Object => string[]

export function getBabelPlugins (flags) {
  const plugins = []

  if (flags.flow) {
    plugins.push(`babel-plugin-transform-flow-${flags.flow}`)
  } else {
    plugins.push(DEFAULT_FLOW_PLUGIN)
  }

  return plugins
}

invokeBabel :: (string[], { plugins: string[], presets: string[] }) => Promise<Object>

export function invokeBabel (options, { plugins, presets }) {
  const pluginsOption = `--plugins=${plugins.join(',')}`
  const presetsOption = `--presets=${presets.join(',')}`

  return execa('babel', options.concat([ pluginsOption, presetsOption ]))
}
