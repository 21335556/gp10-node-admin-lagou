var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true })

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error'))

module.exports = db