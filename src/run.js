import execa from 'execa'
import path from 'path'

run :: (string, string[]) => Promise<Object>

export default function run (cmd, args) {
  const localCmd = path.join(__dirname, '..', 'node_modules', '.bin', cmd)
  return execa(localCmd, args)
}
