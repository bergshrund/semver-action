const core = require('@actions/core')
const semver = require('./semver')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const lastVersion = await semver.getLastVersion()

    // Set outputs for other workflow steps to use
    core.setOutput('version', lastVersion)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
