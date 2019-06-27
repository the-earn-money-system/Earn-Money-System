// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  try {
    return db.collection('User').where({
      user_id: event.user_id
    }).update({
      data: {
        Institute_id: event.Institute_id,
        head_portrait: event.head_portrait,
        student_id: event.student_id,
        user_name: event.user_name,
      }
    })
  } catch (e) {
    console.log(e)
  }
}