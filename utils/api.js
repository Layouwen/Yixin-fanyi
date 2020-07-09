import md5 from './md5.min.js'

const appid = '20200709000516281'
const key = 'bv5s0hps5Evra8WGDcw6'

function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        console.log('res.data')
        console.log(res.data)
        console.log('res.data.trans_result')
        console.log(res.data.trans_result)
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
console.log('fuck')
          wx.showToast({
            title: '翻译失败bbbb',
            icon: 'none',
            duration: 3000
          })
        }   
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败aaaaa' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate