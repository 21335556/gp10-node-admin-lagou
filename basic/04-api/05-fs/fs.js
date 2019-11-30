const fs = require('fs')
const promiseFS = fs.promises;

// 创建文件    异步操作
// fs.writeFile('./greeting.log','hello',(err) => {
//   if(err){
//     console.log(err.message);
//   } else {
//     console.log('文件创建成功');
//   }
// })
// console.log('tag');


// 同步操作 
// fs.writeFileSync('./greeting.log','hhhhhello')
// console.log('tag');

// 修改文件
// fs.appendFileSync('./greeting.log','\nworld')

// 读取文件
// fs.readFile('./greeting.log','utf-8',(err,text) => {
//   console.log(text.toString());
// })

// 删除文件
// fs.unlink('./greeting.log',() => {
//   console.log('删除成功');
// })

// 创建文件夹
// fs.mkdir('./logs2', () => {
//   console.log('文件夹创建成功');
// })

// 删除文件夹
// fs.rmdir('./logs', () => {
//   console.log('文件夹删除成功');
// })

// fs.mkdir('./logs', () => {
//   console.log('文件夹创建成功');
// })
// for(let i=0;i<10;i++){
//   fs.writeFileSync(`./logs/log-${i}.log`,'hello-'+i)
// }

// 读取文件夹
// fs.readdir('../',(err,dir)=>{
//   dir.forEach((value,index) => {
//     let stat = fs.statSync(`../${value}`)
//     console.log(stat.isDirectory());
//   })
// })



// function wf() {
//   return promiseFS.readFile('./greeting.log','utf-8')
// }

// async function fsControl() {
//   const rs = await wf()
//   console.log(rs)
// }

// fsControl()

// fs.watchFile('./logs/log-0.log', (current,previous) => {
//   console.log(current);
//   // console.log('我是你爸爸，你改文件里的东西了');
// })

fs.watch('./logs/log-0.log', (current,previous) => {
  console.log(current);
  // console.log('我是你爸爸，你改文件里的东西了');
})