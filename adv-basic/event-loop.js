Promise.resolve().then(() => {
  console.log('resolve1');
})
// const p = new Promise((resolve,reject) => {
//   console.log('promise-1')
//   resolve()
// })
// p.then(() => {
//   console.log('promise-2');
// })

process.nextTick(function () {
  console.log('tick1');
  process.nextTick(function () {
    console.log('tick2');
  });
  process.nextTick(function () {
    console.log('tick3');
  })
  Promise.resolve().then(() => {
    console.log('resolve2');
  })
})

Promise.resolve().then(() => {
  console.log('resolve2');
})

process.nextTick(function () {
  console.log('tick4');
})

Promise.resolve().then(() => {
  console.log('resolve3');
})

process.nextTick(function () {
  console.log('tick5');
})


// 判断执行顺序