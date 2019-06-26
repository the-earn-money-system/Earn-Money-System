// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try{
    return await db.collection('User').add({
      data: {
        user_id: event.user_id,
        Institute_id: event.Institute_id,
        head_portrait: event.head_portrait,
        mission_accept: event.mission_accept,
        mission_publish: event.mission_publish,
        student_id: event.student_id,
        user_name: event.user_name,
        account: event.account,
        last: event.last
      }
    })
  }catch (e){
    console.log(e)
  }
}
