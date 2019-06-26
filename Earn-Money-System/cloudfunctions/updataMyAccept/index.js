// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return db.collection('User').where({
      user_id: event.user_id
    }).update({
      data: {
        mission_accept: event.mission_accept
      }
    })
  } catch (e) {
    console.log(e)
  }
}