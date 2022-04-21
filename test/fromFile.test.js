const { strictEqual } = require('assert')
const { resolve } = require('path')
const assertThrows = require('assert-throws-async')
const getStream = require('get-stream')
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
    await assertThrows(async () => {
      fromFile('test.jpg')
    }, Error, /Unknown file extension/)
  })

  it('should throw an error if the media type is unknown', async () => {
    await assertThrows(async () => {
      fromFile('test.jpg', {
        extensions: {
          jpg: 'image/jpeg'
        }
      })
    }, Error, /No parser available for media type/)
  })

  it('should throw an error if the file does not exist', async () => {
    await assertThrows(async () => {
      const stream = fromFile('void.ttl')
      await getStream.array(stream)
    }, Error, /ENOENT: no such file or directory/)
  })
})
