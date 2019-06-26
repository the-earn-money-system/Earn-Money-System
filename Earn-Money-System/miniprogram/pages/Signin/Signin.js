// pages/Signin/Signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "注册",
    instituteObject:null,
    instituteArray: null,
    instituteIndex: 0,
    openID: ""
  },

  institutePicker: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      instituteIndex: e.detail.value
    })
  },

  SigninSubmitForm: function (e) {
    var app = getApp()
    if (e.detail.value.studentid==""){
      console.error("学号不能为空")
      return
    }
    wx.cloud.callFunction({
      name: "addUser",
      data: {
        user_id: app.globalData.openid,
        Institute_id: e.detail.value.instituteId,
        head_portrait: app.globalData.head_portrait,
        mission_accept: [],
        mission_publish: [],
        student_id: e.detail.value.studentid,
        user_name: app.globalData.user_name,
        account: 10
      },
      complete: function (res) {
        console.log(res)
      }
    })

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