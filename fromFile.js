import { createReadStream } from 'node:fs'
import { extname } from 'node:path'
import formats from '@rdfjs/formats'
import defaults from './defaults.js'

function fromFile (filename, { extensions, ...options } = {}) {
  const combinedExtensions = {
    ...defaults.extensions,
    ...extensions
  }

  const extension = extname(filename).split('.').pop()
  const mediaType = combinedExtensions[extension]

  if (!mediaType) {
    throw new Error(`Unknown file extension: ${extension}`)
  }

  const parser = formats.parsers.get(mediaType)

  if (!parser) {
    throw new Error(`No parser available for media type: ${mediaType}`)
  }

  return parser.import(createReadStream(filename), options)
}

export default fromFile
