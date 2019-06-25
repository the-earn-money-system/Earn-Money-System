// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return await db.collection('Mission').add({
      data: {
        Info: event.Info,
        Pay: event.Pay,
        Time: event.Time,
        Title: event.Title,
        publisher_id: event.publisher_id,
        recipient_id: event.recipient_id,
        state: event.state
      }
    })
  } catch (e) {
    console.log(e)
  }
}