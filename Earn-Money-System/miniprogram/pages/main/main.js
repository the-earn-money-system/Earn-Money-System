var util = require('../../utils/util.js');
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
    user: null,

    user_name: "Null",
    profile_picture: null,
    account:0,
    student_id:0,
    Institute_name:"Null",

    accept_or_publish: true
  },
  submitMission: function(e){
    wx.navigateTo({
      url: '../MissionSubmit/MissionSubmit',
    })
  },

  getId: function(e){
    console.log(e.currentTarget.dataset.missionid)
    var app = getApp()
    var that = this

    const res1 = wx.cloud.callFunction({
      name: "acceptMission",
      data: {
        id: e.currentTarget.dataset.missionid,
        recipient_id: app.globalData.openid,
        state: "Accepted"
      },
      complete: function (e) {
        console.log(e.result)
        const db = wx.cloud.database()
        db.collection('Mission').get().then(res => {
          that.setData({
            all_mission_array: res.data
          })
        })
      }
    })
    
  },

  search_submit:function(e){
    var that = this
    var title = e.detail.value.search_input
    wx.cloud.callFunction({
      name: "searchMission",
      data:{
        Title: title
      },
      complete: function(res){
        console.log(res.result)
        that.setData({
          all_mission_array: res.result.data
        })
      }
    })
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

    this.setData({
      accept_or_publish: true
    })

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

    this.setData({
      accept_or_publish: false
    })

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
    if (this.data.index == 0) {         // time order
      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data
        })
      })
    } else if (this.data.index == 1) {  //pay order
      var compare=function (property){
        return function(a,b){
          var v1 = a[property];
          var v2 = b[property];
          return v1 - v2
        }
      }

      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data.sort(compare("Pay"))
        })
      })
    }
  },

  button_mainpage:function(e){
    if (this.data.index == 0) {         // time order
      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data
        })
      })
    } else if (this.data.index == 1) {  //pay order
      var compare = function (property) {
        return function (a, b) {
          var v1 = a[property];
          var v2 = b[property];
          return v1 - v2
        }
      }

      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data.sort(compare("Pay"))
        })
      })
    }
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
    var app = getApp()
    var instituteId = ""
    var that = this

  console.log(app.globalData.user)
    wx.cloud.callFunction({
      name: "getInstitude",        // 传递给云函数的参数
      data: {
        institute_id: app.globalData.user.Institute_id
      },
    }).then(res => {
      console.log(res.result.data.name)
      that.setData({
        user_name: app.globalData.user.user_name,
        account: app.globalData.user.account,
        student_id: app.globalData.user.student_id,
        profile_picture: app.globalData.user.head_portrait,
        Institute_name: res.result.data.name
      })
    })

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

  button_modify_info: function(e){
    wx.navigateTo({
      url: '../ModifyInfo/ModifyInfo',
    })
  },

  button_cancel_accept: function (e) {
    var app = getApp()
    var that = this
    console.log(e.currentTarget.dataset.missionid)
    const res1 = wx.cloud.callFunction({
      name: "acceptMission",
      data: {
        id: e.currentTarget.dataset.missionid,
        recipient_id: "",
        state: "Unfinished"
      },
      complete: function (e) {
        console.log(e.result)
        //get isUserPublisher from Server
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
      }
    })
  },

  button_cancel: function(e){
    var app = getApp()
    var that = this
    const res = wx.cloud.callFunction({
      name: "updataMissionState",
      data: {
        id: e.currentTarget.dataset.missionid,
        state: "Canceled"
      },
      complete: function (e) {
        console.log(e.result)
        //get isUserPublisher from Server
        wx.cloud.callFunction({
          name: "getPublishedMission",        // 传递给云函数的参数
          data: {
            user_id: app.globalData.openid
          },
        }).then(res => {
          that.setData({
            my_mission_array: res.result.data
          })
          console.log(res.result.data)
        })
      }
    })
  },

  button_finish: function(e){
    var app = getApp()
    var that = this
    const res = wx.cloud.callFunction({
      name: "updataMissionState",
      data: {
        id: e.currentTarget.dataset.missionid,
        state: "Finished"
      },
      complete: function (e) {
        console.log(e.result)
        //get isUserPublisher from Server
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date())
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
        var newAccount = app.globalData.user.account + 1
        console.log(newAccount)
        if (time > app.globalData.user.last) {
          wx.cloud.callFunction({
            name: "bonus",
            data: {
              user_id: app.globalData.openid,
              account: newAccount,
              last: time
            },
            complete: function (res) {
              wx.cloud.callFunction({
                name: "getUserInfo",
                data: {
                  user_id: app.globalData.openid
                },
                complete:function(res){
                  app.globalData.user = res.result.data[0]
                }
              })
            }
          })
        }
      }
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
    if (this.data.index == 0) {         // time order
      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data
        })
      })
    } else if (this.data.index == 1) {  //pay order
      var compare = function (property) {
        return function (a, b) {
          var v1 = a[property];
          var v2 = b[property];
          return v1 - v2
        }
      }

      const db = wx.cloud.database()
      db.collection('Mission').get().then(res => {
        this.setData({
          all_mission_array: res.data.sort(compare("Pay"))
        })
      })
    }
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