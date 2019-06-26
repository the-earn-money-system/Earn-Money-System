Page({

  /**
   * 页面的初始数据
   */
  data: {
    topbartitleinfo: "首页",
    search: "",
    array:["按时间排序","按价格排序"],
    index:0,
    visible_main:"display:block",
    visible_all_mission:"display:flex",
    visible_my_mission:"display:none",
    visible_info:"display:none",
    // mission_array:[{mission:"1",info:"任务1"}
    //               ,{mission:"2",info:"任务2"}
    //               ,{mission: "3",info: "任务3" }
    //               ,{mission: "4",info: "任务4" }],
    mission_array:[{title:"任务1"}
                 ,{title:"任务2"}
                 ,{title:"任务3" }
                 ,{title:"任务4" }],
    all_mission_array:[],
    my_mission_array:[],
    user: null
  },
  submitMission: function(e){
    wx.navigateTo({
      url: '../MissionSubmit/MissionSubmit',
    })
  },

  getId: function(e){
    console.log(e.currentTarget.dataset.missionid)
  },

  search_submit:function(e){
    console.log("submit:",e.detail.value)
  },

  bindPickerChange:function(e){
    this.setData({ 
      index: e.detail.value
    })
  },

  button_quit:function(e){
    console.log("quit")
  },

  mission_accept:function(e){
    var app = getApp()
    var that = this
    var mission = []
    wx.cloud.callFunction({
      name: "getAcceptedMission",        // 传递给云函数的参数
      data: {
        user_id: app.globalData.openid
      },
    }).then(res =>{
      that.setData({
        my_mission_array: res.result.data
      })
      console.log(res.result.data)
    })
  },

  mission_release:function(e){
    var app = getApp()
    var that = this
    var mission = []
    wx.cloud.callFunction({
      name: "getPublishedMission",        // 传递给云函数的参数
      data: {
        user_id: app.globalData.openid
      },
    }).then(res =>{
      that.setData({
        my_mission_array: res.result.data
      })
      console.log(res.result.data)
    })
  },

  order_select:function(e){
    console.log("order")
  },

  button_mainpage:function(e){
    const db = wx.cloud.database()
    db.collection('Mission').get().then(res => {
      this.setData({
        all_mission_array: res.data
      })
    })
    this.setData({
      visible_main:"display:block",
      visible_info:"display:none",
      visible_all_mission:"display:flex",
      visible_my_mission:"display:none"
    })
  },

  button_my_mission:function(e){
    var app = getApp()
    var that = this
    var mission = []
    wx.cloud.callFunction({
      name: "getAcceptedMission",        // 传递给云函数的参数
      data: {
        user_id: app.globalData.openid
      },
    }).then(res => {
      that.setData({
        my_mission_array: res.result.data
      })
      console.log(res.result.data)
    })

    this.setData({
      visible_main: "display:block",
      visible_info: "display:none",
      visible_all_mission: "display:none",
      visible_my_mission: "display:flex"
    })
  },

  button_my_info:function(e){
    this.setData({
      visible_main: "display:none",
      visible_info: "display:block",
      visible_all_mission: "display:none",
      visible_my_mission: "display:none"
    })
  },

  mission_info:function(e){
    var app = getApp()
    app.globalData.mission_id = e.currentTarget.dataset.missionid
    wx.navigateTo({
      url: '../MissionDetail/MissionDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    wx.cloud.callFunction({
      name: "login",
      complete: function(res){
        app.globalData.openid = res.result.openid
        console.log(res.result.openid)
      }
    })
    
    wx.cloud.callFunction({
      name: "getUserInfo",
      data:{
        user_id: app.globalData.openid
      },
      complete: function (res) {
        app.globalData.user = res.result.data[0]
        console.log(app.globalData.user)
      }
    })

    const db = wx.cloud.database()
    db.collection('Mission').get().then(res => {
      this.setData({
        all_mission_array: res.data
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