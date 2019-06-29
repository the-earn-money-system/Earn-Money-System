// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return db.collection('Mission').doc(event.id).get({
      type: event.type
    })
  } catch (e) {
    console.log(e)
  }
}