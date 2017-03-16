import execa from 'execa'
import fs from 'mz/fs'
import path from 'path'
import supportsColor from 'supports-color'
import { getBabelPlugins, invokeBabel } from '../babel'

const DEFAULT_BABEL_PLUGINS = [
  '@andywer/babel-plugin-transform-dctypes-to-flow'
]
const DEFAULT_BABEL_PRESETS = []

typeCheck :: (string[], Object) => Promise<*>

export default typeCheck

async function typeCheck (args, flags) {
  const [ sourceDirPath, ...unhandledSourceDirs ] = args

  if (!sourceDirPath) {
    throw new Error(`No source directory passed.`)
  } else if (unhandledSourceDirs.length > 0) {
    throw new Error(`Can only check a single source directory.`)
  }

  const plugins = DEFAULT_BABEL_PLUGINS.concat(getBabelPlugins(flags)).filter(noStripTypes)
  const presets = DEFAULT_BABEL_PRESETS

  const tempDirPath = path.join(sourceDirPath, '..', '.flowcheck')

  if (!await exists(tempDirPath)) {
    await fs.mkdir(tempDirPath)
  }
  if (!await exists(path.join(tempDirPath, '.flowconfig'))) {
    await createFlowConfig(path.join(tempDirPath, '.flowconfig'))
  }
  await invokeBabel([ sourceDirPath, '-d', tempDirPath ], { plugins, presets })

  // Dirty, dirty hack:
  // It seems flow is sometimes still operating on the previous file contents, so we delay...
  await new Promise(resolve => setTimeout(resolve, 250))
  await invokeFlow(tempDirPath)
}

noStripTypes :: string => bool

function noStripTypes (pluginName) {
  return !pluginName.endsWith('flow-strip-types')
}

createFlowConfig :: string => Promise<*>

function createFlowConfig (filePath) {
  // TODO: The node_modules/ path(s) should be rather dynamic
  const content = `
    [include]
    ../node_modules/
  `
  return fs.writeFile(filePath, content, { encoding: 'utf8' })
}

invokeFlow :: string => Promise<Object>

function invokeFlow (dirPath) {
  // Flow's auto color detection will always disable colors when invoked using execa
  const colorOptions = supportsColor
    ? [ '--color', 'always' ]
    : [ ]

  return execa('flow', [ 'check', dirPath, ...colorOptions ])
}

exists :: string => Promise<bool>

async function exists (path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}
