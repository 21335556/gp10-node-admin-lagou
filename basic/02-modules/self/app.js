const name = 'gp10'
if(name === 'gp10') {
  var { greeting } = require('./gp10-hello-world/gp10')
  var hello = require('./gp10-hello-world/gp10')
} else {
  var { greeting } = require('./gp10-hello-world/gp11')
}

console.log(greeting().sayName());
console.log(hello.greeting().sayName());