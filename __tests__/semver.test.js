const { getCurrentVersion } = require('../src/semver')
const { expect } = require('@jest/globals')

describe('semver.js', () => {
  it('returns correct semver', async () => {
    expect(getCurrentVersion()).toMatch('0.0.0')
  })
})
