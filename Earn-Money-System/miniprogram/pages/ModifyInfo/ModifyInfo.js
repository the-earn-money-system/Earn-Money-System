// pages/Signin/Signin.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "修改信息",
    instituteObject:null,
    instituteArray: null,
    instituteIndex: 0,
    studentid:null,
    instituteName:null,
    click:false,
    openID: ""
  },

  institutePicker: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      click: true,
      instituteIndex: e.detail.value
    })
  },

  SigninSubmitForm: function (e) {
    var app = getApp()
    var time = util.formatTime(new Date())
    if (e.detail.value.studentid==""){
      console.error("学号不能为空")
      return
    }
    

    wx.redirectTo({
      url: '../main/main',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从数据库获取学院信息
    const db = wx.cloud.database();
    var app = getApp()
    var that = this;
    var temp = null;
    var temp2 = null;
    db.collection('Institude').limit(999).get({
      success: (res) => {
        //console.log(res.data);
        temp = res.data;
        that.setData({ instituteObject: res.data});
        temp2= temp.map(a => a.name);
        that.setData({ instituteArray: temp2})
      }
    })

    wx.cloud.callFunction({
      name: "getInstitude",        // 传递给云函数的参数
      data: {
        institute_id: app.globalData.user.Institute_id
      },
    }).then(res => {
      console.log(res.result.data.name)
      that.setData({
        studentid: app.globalData.user.student_id,
        instituteName: res.result.data.name
      })
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var app = getApp();
    // wx.cloud.callFunction({
    //   name: "login",
    //   success: function(res){
    //     getApp().globalData.openid = res.result.openid
    //   }
    // })
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