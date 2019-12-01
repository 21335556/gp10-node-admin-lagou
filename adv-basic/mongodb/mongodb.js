const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/animal', { useNewUrlParser: true })

const Cat = mongoose.model('woman', { name: String })

const kitty = new Cat({name: 'hello kitty'})

// kitty.save().then((result) => {
//   console.log(result);
// })

Cat.update({ name: 'hello kitty' }, { name: 'xiaobai' }, (res) => {
  console.log(res);
})