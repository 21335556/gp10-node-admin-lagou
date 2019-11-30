const fs = require('fs')

module.exports = function(resolvedPath) {
  return fs.readFileSync(resolvedPath, 'binary')
}