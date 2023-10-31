import { strictEqual } from 'node:assert'
import { describe, it } from 'mocha'
import fromFile from '../fromFile.js'
import * as rdfUtilsFs from '../index.js'
import toFile from '../toFile.js'

describe('rdf-utils-fs', () => {
  it('should export fromFile', () => {
    strictEqual(rdfUtilsFs.fromFile, fromFile)
  })

  it('should export toFile', () => {
    strictEqual(rdfUtilsFs.toFile, toFile)
  })
})
