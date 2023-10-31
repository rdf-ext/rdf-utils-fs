import { createWriteStream } from 'node:fs'
import { extname } from 'node:path'
import { promisify } from 'node:util'
import formats from '@rdfjs/formats-common'
import { finished } from 'readable-stream'
import defaults from './defaults.js'

function toFile (stream, filename, { extensions = defaults.extensions, ...options } = {}) {
  const extension = extname(filename).split('.').pop()
  const mediaType = extensions[extension]

  if (!mediaType) {
    throw new Error(`Unknown file extension: ${extension}`)
  }

  const serializer = formats.serializers.get(mediaType)

  if (!serializer) {
    throw new Error(`No serializer available for media type: ${mediaType}`)
  }

  const output = createWriteStream(filename)

  serializer.import(stream, options).pipe(output)

  return promisify(finished)(output)
}

export default toFile
