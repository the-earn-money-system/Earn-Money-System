// miniprogram/pages/QuestionDetail/QuestionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quesionTitle: "问卷标题",   //问卷标题
    topbartitleinfo: "任务标题",
    checkDetail: false, //查看详情时为true
    isPublisher: true,
    isAccepter: false,
    question_array: ["谁是茄子","谁是毛子"],
    answer_array: ["wdnmd","发把狙","白给"]
  },

  questionDetail: function(e){
    console.log(e.currentTarget.dataset.ques)
    this.setData({
      topbartitleinfo: e.currentTarget.dataset.ques,
      checkDetail: true
    })
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