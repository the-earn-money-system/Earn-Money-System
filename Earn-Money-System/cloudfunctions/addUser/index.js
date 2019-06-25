// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return add_user_to_database(event)
}

async function add_user_to_database(event){
  const state = false
  const db = wx.cloud.database()
  db.collection('Mission').add({
    data:{
      user_id: event.openid,
      Institude_id: event.Institude_id,
      head_portrait: event.head_portrait,
      mission_accept: event.mission_accept,
      mission_publish: event.mission_publish,
      student_id: event.student_id,
      user_name: event.user_name
    },
    success: function(res){
      state = true
      return res
    }
  })
  return state
}