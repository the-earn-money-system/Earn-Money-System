// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  add_user_to_database(event)
}

async function add_user_to_database(event){
  const db = wx.cloud.database()
  db.collection('User').add({
    data: {
      user_id: app.globalData.openid,
      Institute_id: e.detail.value.instituteId,
      head_portrait: "",
      mission_accept: [],
      mission_publish: [],
      student_id: 0,
      user_name: ""
    },
    success: function (res) {
      console.log(res)
    }
  })
}