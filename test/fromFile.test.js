const { strictEqual } = require('assert')
const assert = require('assert/strict')
const { resolve } = require('path')
const { isReadable } = require('isstream')
const { describe, it } = require('mocha')
const rdf = require('rdf-ext')
const fromFile = require('../fromFile')
const example = require('./support/example')

describe('fromFile', () => {
  it('should create a quad stream', async () => {
    const stream = fromFile(resolve(__dirname, 'support/example.nt'))
    stream.resume()
    strictEqual(isReadable(stream), true)
  })

  it('should forward options to parser', async () => {
    const stream = fromFile(resolve(__dirname, 'support/example.ttl'), { baseIRI: 'http://example.org/' })
    const dataset = await rdf.dataset().import(stream)
    strictEqual(dataset.toCanonical(), example().toCanonical())
  })

  it('should throw an error if the file extension is unknown', async () => {
    await assert.rejects(
      async () => {
        fromFile('test.jpg')
      },
      {
        name: 'Error',
        message: 'Unknown file extension: jpg'
      }
    )
  })

  it('should throw an error if the media type is unknown', async () => {
    await assert.rejects(
      async () => {
        fromFile('test.jpg', {
          extensions: {
            jpg: 'image/jpeg'
          }
        })
      },
      {
        name: 'Error',
        message: 'No parser available for media type: image/jpeg'
      }
    )
  })

  it('should throw an error if the file does not exist', async () => {
    await assert.rejects(
      async () => {
        const stream = fromFile('void.ttl')
        stream.resume()
      },
      {
        name: 'Error',
        message: 'ENOENT: no such file or directory'
      }
    )
  })
})