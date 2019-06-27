// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  try {
    return db.collection('Mission').where({
      Time: _.lt(event.Time),
      state: _.neq("Finished").and(_.neq("Canceled")).and(_.neq("Pass"))
    }).update({
      data: {
        state: event.state
      }
    })
  } catch (e) {
    console.log(e)
  }
}