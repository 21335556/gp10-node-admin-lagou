// 内置模块 : 开箱即用 fs
// 第一步： 定义模块
// 第二步： 暴露接口
// 第三步： 引用模块
const fs = require('fs');
// 回调函数： 错误有限的回调函数 （第一个参数是 err）
fs.writeFile('./hello.txt','hi!\n',(err) => {
  if(err) {
    console.log(err.message);
  } else {
    console.log('文件创建成功');
  }
})