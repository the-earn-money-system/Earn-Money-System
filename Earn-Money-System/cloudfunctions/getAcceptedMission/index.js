// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  const db = cloud.database()
  try {
    return db.collection('Mission').where({
      recipient_id: event.user_id
    }).get()
  } catch (e) {
    console.log(e)
  }
}