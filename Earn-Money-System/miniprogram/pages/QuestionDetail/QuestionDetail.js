// miniprogram/pages/QuestionDetail/QuestionDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    quesionTitle: "问卷标题",   //问卷标题
    topbartitleinfo: "任务标题",
    checkDetail: false, //查看详情时为true
    question_array: [],
    answer_array: [],
    answerByUser: [],
    topbartitleinfo: "任务详情",
    isUserPublisher: false,
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

  questionDetail: function(e){
    console.log(e.currentTarget.dataset.ques)
    this.setData({
      topbartitleinfo: e.currentTarget.dataset.ques,
      checkDetail: true
    })

    var temp_answer_array = []
    var len = this.data.Content.length
    for (var i = 0; i < len; i++) {
      temp_answer_array.push(this.data.Content[i][e.currentTarget.dataset.ques])
    }
    this.setData({
      answer_array: temp_answer_array
    })
  },

  back: function(e){
    if(this.data.checkDetail){
      this.setData({
        topbartitleinfo: this.data.quesionTitle,
        checkDetail: false
      })
    }
    else{
      wx.navigateBack({})
    }
  },

  cancel: function(e){
    wx.navigateBack({
    })
  },

  submitAnswers: function(e){
    console.log(e.detail)
    this.setData({
      answerByUser: []
    })
    for (var i in e.detail.value)
    {
      console.log(e.detail.value[i])
      this.data.answerByUser.push(e.detail.value[i])
    }
    console.log(this.data.answerByUser)
    var temp = []
    var temp_json = {}
    for (var i in this.data.question_array)
    {
      console.log(this.data.question_array[i])
      temp_json[this.data.question_array[i]] = this.data.answerByUser[i]
    }
    console.log(temp_json)
    
    /* 在这里更新数据库 */
    console.log(temp_json[this.data.question_array[0]])

    var that = this

    wx.cloud.callFunction({
      name: "login",
      success: function (res) {
        console.log(res.result.openid)
        var openid = res.result.openid
        console.log(that.data.mission)
        that.data.mission.Participant.push(openid)
        that.data.mission.Content.push(temp_json)
        console.log(that.data.mission)
        wx.cloud.callFunction({
          name: "updataQuestion",
          data: {
            id: that.data.mission._id,
            Participant: that.data.mission.Participant,
            Content: that.data.mission.Content
          },
          success: function(res){
            console.log(res.result)
          }
        })
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
      var getMission = res.data[0]
      console.log(getMission)

      wx.cloud.callFunction({
        name: "login",
        success: function (res) {
          console.log(res)
          var openid = res.result.openid

          var check_pub = false
          var check_re = false
          if (getMission.publisher_id == openid)
            check_pub = true

          var index = -1
          for (var i in getMission.Participant) {
            if (getMission.Participant[i] == openid)
              index = i
          }
          
          check_re = index

          that.setData({
            isUserPublisher: check_pub,
            isUserAcceptter: check_re,
            missionName: getMission.Title,
            time: getMission.Time,
            pay: getMission.Pay,
            progress: getMission.state,
            detail: getMission.Info,
            mission: getMission,
            Content: getMission.Content,
            question_array : getMission.Question,
          })
          console.log(that.data.isUserAcceptter)
          if (index != -1){
            var temp = []
            for (var i in that.data.question_array){
              console.log(that.data.question_array[i])
              console.log(getMission.Content[index][that.data.question_array[i]])
              temp.push(getMission.Content[index][that.data.question_array[i]])
            }
            that.setData({
              answer_array: temp
            })
            console.log(that.data.answer_array)
          }
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