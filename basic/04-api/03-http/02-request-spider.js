const https = require('https')
const cheerio = require('cheerio')

const options = {
  protocal: 'https',
  host: 'www.microsoftstore.com.cn',
  port: 443,
  method: 'GET',
  path: '/'
}

function filterData(dataSource) {
  let $ = cheerio.load(dataSource)
  let arr = []
  $('.productChannels .productChannel .mainContainer').eq(0).each((index,value) => {
    arr.push({
      title: $(value).find('h3').attr('title'),
      img: $(value).find('img').attr('data-src'),
      price: $(value).find('.price strong').eq(0).text()
    })
  })
  console.log(arr);
}

const app = https.request(options, (res) => {
  let result = '';
  res.on('data', (chunk) => {
    result += chunk
  })

  res.on('error', (e) => {
    console.log(e.message);
  })

  res.on('end', () => {
    filterData(result)
  })

})

app.end()









// const https = require('https')
// const cheerio = require('cheerio')

// const options = {
//   protocol: 'https:',
//   host: 'www.microsoftstore.com.cn',
//   port:443,
//   method:'GET',
//   path:'/'
// }

// function filterData(dataSource) {
//   let $ = cheerio.load(dataSource);
//   // console.log($);
//   let arr = [];
//   $('.productChannels .productChannel .mainContainer').eq(0).each((index,value) => {
//     arr.push({
//       title:$(value).find('h3').attr('title'),
//       img:$(value).find('img').attr('data-src'),
//       price:$(value).find('.price strong').eq(0).text()
//     })
//   })
//   console.log(arr);
// }


// const app = https.request(options, (res) => {
//   let result = ''
//   res.on('data', (chunk) => {
//     result += chunk
//   })

//   res.on('error', (e) => {
//     console.log(e.message);
//   })

//   res.on('end', () => {
//     filterData(result)
//   })
// })

// app.end()