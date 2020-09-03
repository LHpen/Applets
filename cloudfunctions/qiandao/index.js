// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const day = event.a+1
  const interal =event.b+15

  return {
    day,
    interal
  }
}