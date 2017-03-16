const execa = require('execa')

const DEFAULT_FLOW_PLUGIN = 'babel-plugin-transform-flow-strip-types'

module.exports = {
  getBabelPlugins,
  invokeBabel
}

function getBabelPlugins (flags) {
  const plugins = []

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
