const fs = require('fs');
const path = require('path')

module.exports = function(reqUrl, resolvedPath) {
  const lists = fs.readdirSync(resolvedPath)
  // for(let obj of lists.entries()) {
  //   console.log(obj);
  // }
  let str = '<ul>'
  for(let [index, value] of lists.entries()) {
    // console.log(value);
    let href = `${reqUrl === '/' ? '' : reqUrl}/${value}`
    let stat = fs.statSync(path.join(resolvedPath, value))
    str += `<li><a href="${href}">[${stat.isDirectory() ? 'dir' : 'file'}] ${value}</a></li>`
  }
  str += '</ul>'

  return str
}