// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return [db.collection('Mission').doc(event.id).update({
      data: {
        recipient_id: event.recipient_id
      }
    }),
      db.collection('User').where({
        _openid: event._openid
      }).update({
        data: {
          mission_accept: event.mission_accept
        }
      }),]
  } catch (e) {
    console.log(e)
  }
}