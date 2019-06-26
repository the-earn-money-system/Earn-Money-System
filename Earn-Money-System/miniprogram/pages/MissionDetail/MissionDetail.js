// pages/MissionDetail/MissionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      topbartitleinfo:"任务详情",
      isUserPublisher:true,
      isUserAcceptter: false,
      disabled:true,
      missionName:"Temp",
      time:"temp",
      pay:"temp",
      progress:"temp",
      detail:"temp",
      mission: null,

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

    this.setData({
      missionName: e.detail.value.missionName,
      time: e.detail.value.time,
      pay: e.detail.value.pay,
      detail: e.detail.value.detail
    })
    console.log(this.data)
  },

  buttonSubmit: function(e){
    if(this.data.isUserPublisher){  //当用户为发布者，按钮用于提交修改
      const res1 = wx.cloud.callFunction({
        name: "updataMission",
        data: {
          id: this.data.mission._id,
          Info: this.data.detail,
          Pay: this.data.pay,
          Time: this.data.time,
          Title: this.data.missionName,
          publisher_id: this.data.mission.publisher_id,
          recipient_id: this.data.mission.recipient_id,
          state: this.data.progress
        },
        complete: function(e){
          console.log(e.result)
        }
      })
    }
    else if (this.data.isUserAcceptter) {    //当用户为接收者,按钮用于提交任务
      const res = wx.cloud.callFunction({
        name: "updataMissionState",
        data: {
          id: this.data.mission._id,
          state: this.data.progress
        },
        complete: function (e) {
          console.log(e.result)
        }
      })
    }
    else {    //当用户不为发起者，也不为接受者，按钮用于接受任务
      var app = getApp()
      app.globalData.user.mission_accept.push(this.data.mission._id)
      const res1 = wx.cloud.callFunction({
        name: "acceptMission",
        data: {
          id: this.data.mission._id,
          recipient_id: app.globalData.openid
        },
        complete: function (e) {
          console.log(e.result)
        }
      })
      const res2 = wx.cloud.callFunction({
        name: "updataMyAccept",
        data:{
          user_id: app.globalData.openid,
          mission_accept: app.globalData.user.mission_accept
        },
        complete: function(e){
          console.log(e.result)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get isUserPublisher from Server
    var db = wx.cloud.database()
    var app = getApp()

    db.collection('Mission').where({
      _id: app.globalData.mission_id
    }).get().then(res => {
      console.log(res)

      var check_pub = false
      var check_re = false
      if (res.data[0].publisher_id == app.globalData.openid)
        check_pub = true
      if (res.data[0].recipient_id == app.globalData.openid)
        check_re = true

      this.setData({
        isUserPublisher: check_pub,
        isUserAcceptter: check_re,
        missionName: res.data[0].Title,
        time: res.data[0].Time,
        pay: res.data[0].Pay,
        progress: res.data[0].state,
        detail: res.data[0].Info,
        mission: res.data[0]
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