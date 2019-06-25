// pages/MissionDetail/MissionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      topbartitleinfo:"任务详情",
      isUserPublisher:true,
      disabled:true,
      missionName:"Temp",
      time:"temp",
      pay:"temp",
      progress:"temp",
      detail:"temp",

      compileButton:false
  },
  // 重新编辑任务信息
  recompileMission: function(e){
    this.setData({compileButton: true})
    this.setData({ disabled: false })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  recompileMissionForm: function(e){
    console.log(e.detail.value)
    this.setData({ compileButton: false })
    this.setData({ disabled: true })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get isUserPublisher from Server
    //isUserPublisher == fromServer()
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