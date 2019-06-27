// pages/MissionSubmit/MissionSubmit.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "发布任务",
    time: "2019-06-26",
    starttime: "2019-06-26",
    mission: null
  },
  
  backToHome: function (e) {
    wx.redirectTo({
      url: '../main/main',
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  missionSubmit: function (e) {
    console.log(e.detail.value)
    if(e.detail.value.title==""){
      console.error("Title can not be empty")
      return
    }

    var app = getApp()
    var pay = e.detail.value.pay

    if (pay > app.globalData.user.account){
      wx.showToast({
        title: "积分不足",
        icon: "none",
        duration: 2000
      })
      return
    }
    var time_temp = this.data.time
    if(e.detail.value.time != "")
      time_temp = e.detail.value.time

    wx.cloud.callFunction({
      name: "login",
      success: function (res) {
        var openid = res.result.openid
        wx.cloud.callFunction({
          name: "addMission",
          data: {
            Title: e.detail.value.title,
            Time: time_temp,
            Pay: e.detail.value.pay,
            Info: e.detail.value.info,
            publisher_id: openid,
            state: "Unfinished",
            recipient_id: ""
          },
          complete: function (res) {
            console.log(res)
            app.globalData.user.account = app.globalData.user.account - pay
            wx.cloud.callFunction({
              name: "addAccount",
              data: {
                user_id: openid,
                account: app.globalData.user.account
              },
              complete: function (e) {
                console.log(e)
              }
            })
          }
        })
      }
    })
    

    wx.redirectTo({
      url: '../MissonSubmitComplete/MissonSubmitComplete',
    })
  },

  missionReset: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      starttime: util.formatTime(new Date())
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