const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter {}

const em = new MyEventEmitter()

// // 监听器  监听事件
// em.once('play', (movie) => {
//   console.log(movie)
// })

// em.emit('play','封神榜')
// em.emit('play','皮卡丘')


// on全部传入  once 只传第一个
em.once('play',(movie) => {
  console.log(movie);
})

em.emit('play','封神榜')
em.emit('play','皮卡丘')