const core = require('@actions/core')
const semver = require('./semver')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const version = '0.0.0'
    const repository = core.getInput('repository', { required: true })
    const token = core.getInput('github_token', { required: true })

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Checking ${repository} repository ...`)

    // Set outputs for other workflow steps to use
    core.setOutput('version', semver.getCurrentVersion())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
