import { strictEqual, throws } from 'node:assert'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'mocha'
import shell from 'shelljs'
import toFile from '../toFile.js'
import * as example from './support/example.js'

describe('toFile', () => {
  shell.mkdir('-p', 'tmp')

  it('should be a function', () => {
    strictEqual(typeof toFile, 'function')
  })

  it('should create a quad stream', async () => {
    const filename = 'tmp/test.nt'
    await toFile(example.defaultGraph().toStream(), filename)
    const content = (await readFile(filename)).toString().trim()
    const expected = (await readFile(new URL('support/example.nt', import.meta.url).pathname)).toString().trim()

    strictEqual(content, expected)
  })

  it('should throw an error if the file extension is unknown', () => {
    throws(() => {
      toFile(example.defaultGraph().toStream(), 'test.jpg')
    })
  })

  it('should throw an error if the media type is unknown', () => {
    throws(() => {
      toFile(example.defaultGraph().toStream(), 'test.jpg', {
        extensions: {
          jpg: 'image/jpeg'
        }
      })
    })
  })
})
