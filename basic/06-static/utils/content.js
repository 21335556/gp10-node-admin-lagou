const fs = require('fs');
const path = require('path');
const dir = require('./dir')
const file = require('./file')

function content(reqUrl, public) {
  const resolvedPath = path.join(public,reqUrl)

  const isExists = fs.existsSync(resolvedPath)

  if(!isExists) {
    return '[404] source not found.'
  } else {
    // console.log(0);
    let stat = fs.statSync(resolvedPath)
    if(stat.isDirectory()) {
      return dir(reqUrl, resolvedPath)
    } else {
      return file(resolvedPath)
    }
  }
}

module.exports = content