const core = require('@actions/core')
const semver = require('./semver')

/**
 * The main function for the action.
 * @returns {Promise} Resolves when the action is complete.
 */
async function run() {
  try {
    let version
    const semVer = core.getInput('semver', { required: true })
    const releaseType = core.getInput('releaseType', { required: true })
    const token = core.getInput('github_token') || null

    if (token !== null) {
      version = await semver.getLastVersion()
    } else {
      version = semver.increment(semVer, releaseType)
    }
    core.setOutput('version', version?.version)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
