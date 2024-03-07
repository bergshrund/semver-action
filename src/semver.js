const core = require('@actions/core')
const github = require('@actions/github')

const context = github.context

async function getLastVersion() {
  const repository = core.getInput('repository') || context.repo.repo
  const token = core.getInput('github_token', { required: true })

  const octokit = github.getOctokit(token)

  const { data: refs } = await octokit.rest.git.listMatchingRefs({
    owner: context.repo.owner,
    repo: repository,
    ref: 'tags/'
  })

  core.debug(`Result: ${refs}`)
  return '0.0.0'
}

module.exports = { getLastVersion }
