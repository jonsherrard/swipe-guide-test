const { exec } = require('node:child_process')
const { resolve } = require('node:path')

function publishDebugVersion() {
  console.info('Publishing debug version of Expo app...')

  const rootDir = resolve(__dirname, '..')
  exec(
    'eas update --channel debug --message "Debug version update" --platform all --non-interactive',
    { cwd: rootDir },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return
      }
      console.info(`Published successfully:\n${stdout}`)
    }
  )
}

publishDebugVersion()
