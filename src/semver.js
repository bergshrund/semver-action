const core = require('@actions/core')
const github = require('@actions/github')
const semver = require('semver')
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

  core.debug(`Context repo: ${context.repo.repo}`)
  core.debug(`Requiested repo: ${repository}`)

  const versions = refs
    .map(ref =>
      semver.parse(ref.ref.replace(/^refs\/tags\//g, ''), { loose: true })
    )
    .filter(version => version !== null)
    .sort((a, b) =>
      semver.rcompare(a?.version || '0.0.0', b?.version || '0.0.0')
    )

  if (versions[0] != null) {
    return versions[0]
  } else {
    return new semver.SemVer('0.0.0')
  }
}

module.exports = { getLastVersion }
