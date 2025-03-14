# rdf-utils-fs

[![build status](https://img.shields.io/github/actions/workflow/status/rdf-ext/rdf-utils-fs/test.yaml?branch=master)](https://github.com/rdf-ext/rdf-utils-fs/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/rdf-utils-fs.svg)](https://www.npmjs.com/package/rdf-utils-fs)

File system utils for RDF/JS.

*Please consider switching to the [@rdfjs/io](https://github.com/rdfjs-base/io) features of [rdf-ext](https://github.com/rdf-ext/rdf-ext), as it supports the same features and is even richer in functionality.*

## Usage

Each util function can be loaded as property from the main module or by loading only the file with the same name.

### Example

Loading the function from the main module:

```javascript
import { fromFile } from 'rdf-utils-fs'
import { toFile } from 'rdf-utils-fs'
```
 
Loading the function from the file with the function name:

```javascript
import fromFile from 'rdf-utils-fs/fromFile.js'
import toFile from 'rdf-utils-fs/toFile.js'
```
 
## Functions

### fromFile(filename, options)

Returns a quad stream for the given `filename`.

### async toFile(stream, filename, options)

Writes the given quad stream to `filename`. 
