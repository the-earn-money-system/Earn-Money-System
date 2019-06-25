// pages/Signin/Signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "登录",
    instituteArray: ['数据科学与计算机学院', '管理学院', '护理学院', '中山医学院'],
    objectArray: [
      { id: 0, name: '数据科学与计算机学院' },
      { id: 1, name: '管理学院' },
      { id: 2, name: '护理学院' },
      { id: 3, name: '中山医学院' }
    ],
    instituteIndex: 0
  },

  institutePicker: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      instituteIndex: e.detail.value
    })
  },

  SigninSubmitForm: function (e) {
    console.log(e.detail.value);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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