// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    const mission = []
    for (var id in event_missionId) {
      db.collection("mission").doc(id).get({
        success: function (res) {
          mission.push(res.data)
        }
      })
    }
    return mission
  } catch (e) {
    console.log(e)
  }
}