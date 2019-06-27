// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  try {
    return db.collection('Mission').where({
      _id: _.eq(event.id),
      state: _.eq("Unfinished")
    }).update({
      data: {
        recipient_id: event.recipient_id,
        state: event.state
      }
    })
  } catch (e) {
    console.log(e)
  }
}