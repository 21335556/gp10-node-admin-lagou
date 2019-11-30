const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip()

const readStream = fs.createReadStream('./log-1.log')
const writeStream = fs.createWriteStream('./log-n.log')

// readStream.pipe(writeStream)     // 复制
readStream.pipe(gzip).pipe(writeStream)   // 压缩