// 第三方模块：需要安装才能使用
// 模块查找规则：
// 首先在当前文件夹里的node_modules找，如果找不到，就到上一级目录找node_modules,逐层向上找
const request = require('request');
request('https://m.maoyan.com/ajax/moreComingList?token=&movieIds=1300417%2C1217041%2C1278145%2C1277644%2C1230121%2C1222930%2C1201711%2C1277939%2C1233318%2C1205938',(error,response,body) => {
  console.log(JSON.parse(body));
})