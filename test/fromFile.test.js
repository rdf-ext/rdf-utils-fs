import { strictEqual, throws } from 'node:assert'
import { isReadableStream } from 'is-stream'
import { describe, it } from 'mocha'
import rdf from 'rdf-ext'
import fromFile from '../fromFile.js'
import * as example from './support/example.js'

describe('fromFile', () => {
  it('should create a quad stream', async () => {
    const stream = fromFile(new URL('support/example.nt', import.meta.url).pathname)

    stream.resume()

    strictEqual(isReadableStream(stream), true)
  })

  it('should forward options to parser', async () => {
    const stream = fromFile(new URL('support/example.ttl', import.meta.url).pathname, { baseIRI: 'http://example.org/' })
    const dataset = await rdf.dataset().import(stream)

    strictEqual(dataset.toCanonical(), example.defaultGraph().toCanonical())
  })

  it('should combine extensions with default', async () => {
    const extensions = {
      trig: 'application/trig'
    }

    const stream = fromFile(new URL('support/example.nt', import.meta.url).pathname, { extensions })
    const dataset = await rdf.dataset().import(stream)

    strictEqual(dataset.toCanonical(), example.defaultGraph().toCanonical())
  })

  const commonExtensions = [
    ['json', example.defaultGraph],
    ['jsonld', example.namedGraph],
    ['n3', example.defaultGraph],
    ['trig', example.namedGraph],
    ['nq', example.namedGraph]
  ]
  for (const [extension, expected] of commonExtensions) {
    it(`should load ${extension} out of the box`, async () => {
      const stream = fromFile(new URL(`support/example.${extension}`, import.meta.url).pathname)
      const dataset = await rdf.dataset().import(stream)

      strictEqual(dataset.toCanonical(), expected().toCanonical())
    })
  }

  it('should throw an error if the file extension is unknown', () => {
    throws(() => {
      fromFile('test.jpg')
    })
  })

  it('should throw an error if the media type is unknown', () => {
    throws(() => {
      fromFile('test.jpg', {
        extensions: {
          jpg: 'image/jpeg'
        }
      })
    })
  })
})
