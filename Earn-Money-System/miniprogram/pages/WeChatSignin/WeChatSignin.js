// pages/WeChatSignin/WeChatSignin.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Institude_id:0,
    user_name:0,
    head_portrait:0,
    student_id:0
  },

  getUserInfo: function(e) {
    const db = wx.cloud.database();
    var app = getApp()
    //console.log(app.globalData.openid)
    db.collection('User').where({
      user_id: app.globalData.openid
    }).get({
      success: (res) => {
        if(res.data.length) {//用户已经存在
          // 记录用户信息
          app.globalData.Institude_id = res.data.Institude_id
          //app.globalData.user_name = res.data.user_name
          //app.globalData.head_portrait = res.data.head_portrait
          app.globalData.student_id = res.data.student_id
          //app.globalData.mission_accept = res.data.mission_accept
          //app.globalData.mission_publish = res.data.mission_publish
          wx.redirectTo({
            url: '../main/main',
          })
        }
        else {              //用户不存在
          wx.redirectTo({
            url: '../Signin/Signin',
          })
        }
      },
      fail: (res) =>{
        console.log("No")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    wx.cloud.callFunction({
      name: "login",
      success: function (res) {
        getApp().globalData.openid = res.result.openid
      }
    })
    
    // 如果未授权，则授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              getApp().globalData.user_name = res.userInfo.nickName
              getApp().globalData.head_portrait = res.userInfo.avatarUrl
            }
          })
        }
      },
      fail: function(res){
        console.log("GET fail-----------------")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var time = util.formatTime(new Date())
    wx.cloud.callFunction({
      name: "updataState",
      data: {
        Time: time,
        state: "Expired"
      },
      complete: function (e) {
        console.log(e)
      }
    })
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