// miniprogram/pages/QuestionDetail/QuestionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "任务详情",
    isUserPublisher: true,
    isUserAcceptter: -1,
    disabled: true,
    missionName: "Temp",
    time: "temp",
    pay: 0,
    progress: "temp",
    detail: "temp",
    mission: null,
    starttime: "2019-06-26",
    Content: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get isUserPublisher from Server
    var db = wx.cloud.database()
    var app = getApp()
    var that = this

    this.setData({
      starttime: util.formatTime(new Date())
    })

    db.collection('Mission').where({
      _id: app.globalData.mission_id
    }).get().then(res => {
      console.log(res)
      var getMission = res.data[0]

      wx.cloud.callFunction({
        name: "login",
        success: function (res) {
          var openid = res.result.openid

          var check_pub = false
          var check_re = false
          if (getMission.publisher_id == openid)
            check_pub = true

          check_re = getMission.Participant.indexOf(openid)

          that.setData({
            isUserPublisher: check_pub,
            isUserAcceptter: check_re,
            missionName: getMission.Title,
            time: getMission.Time,
            pay: getMission.Pay,
            progress: getMission.state,
            detail: getMission.Info,
            mission: getMission,
            Content: getMission.Content
          })
        }
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})