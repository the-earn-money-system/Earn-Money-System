// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return select_user_mission(event)
}

async function select_user_mission(event){
  const state = false
  const db = wx.cloud.database()
  const mission = []
  for(var id in event_missionId){
    db.collection("mission").doc(id).get({
      success: function(res) {
        mission.push(res.data)
      }
    })
  }
  return mission
}