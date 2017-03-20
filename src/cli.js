#!/usr/bin/env node

import 'babel-polyfill'
import camelcase from 'camelcase'
import meow from 'meow'
import * as commands from './commands'
import { createLogger } from './logger'

const cli = meow(`
  Usage
    $ gear compile <source dir> -d <output dir>
    $ gear type-check <source dir>

  Options
    -d, --out-dir <output dir>    Set output directory.
    --flow <transformation>       Set babel plugin to use, like 'runtime' or
                                  'strip-types' (default).
    --help                        Print this help.
    -w, --watch                   Watch files, recompile on change.

  Visit https://github.com/andywer/gear for more information.
`, {
  alias: {
    d: 'out-dir',
    w: 'watch'
  }
})

const [ commandName, ...args ] = cli.input
const command = commandName ? commands[ camelcase(commandName.toLowerCase()) ] : null

if (!commandName || cli.flags.help) {
  cli.showHelp()
} else if (command) {
  command(args, cli.flags, createLogger())
} else {
  throw new Error(`Unknown command: ${commandName}`)
}
