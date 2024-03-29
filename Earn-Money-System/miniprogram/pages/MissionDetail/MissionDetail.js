// pages/MissionDetail/MissionDetail.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      topbartitleinfo:"任务详情",
      isUserPublisher:true,
      isUserAcceptter: false,
      isQuestionAcceptter: -1,  //是否填写过问卷
      disabled:true,
      missionName:"Temp",
      time:"temp",
      pay:0,
      progress:"temp",
      detail:"temp",
      mission: null,
      starttime: "2019-06-26",
      MissionType: {"Question": "问卷调查", "Mission": "普通任务"},
      mission_type: "Question",

      compileButton:false
  },
  
  // 重新编辑任务信息
  recompileMission: function(e){
    this.setData({compileButton: true})
    this.setData({ disabled: false })
  },

  //查看详情
  checkQuestion: function(e){
    wx.navigateTo({
      url: '../QuestionDetail/QuestionDetail',
    })
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
    var that = this
    if(this.data.isUserPublisher){  //当用户为发布者，按钮用于提交修改
      if(this.data.mission.state != "Finished"){
        var app = getApp()
        var that = this
        var pay = Number(that.data.mission.Pay) - Number(this.data.pay)

        if ((app.globalData.user.account + pay) < 0){
          
          wx.showToast({
            title: "积分不足",
            icon: "none",
            duration: 2000
          })
          var db = wx.cloud.database()
          var app = getApp()

          db.collection('Mission').where({
            _id: app.globalData.mission_id
          }).get().then(res => {
            console.log(res)
            var getMission = res.data[0]

            wx.cloud.callFunction({
              name: "login",
              success: function (res) {
                var openid = res.result.openid
                var check_pub = false
                var check_re = false
                if (getMission.publisher_id == openid)
                  check_pub = true
                if (getMission.recipient_id == openid)
                  check_re = true

                that.setData({
                  isUserPublisher: check_pub,
                  isUserAcceptter: check_re,
                  missionName: getMission.Title,
                  time: getMission.Time,
                  pay: getMission.Pay,
                  progress: getMission.state,
                  detail: getMission.Info,
                  mission: getMission,
                })
              }
            })
          })
          return
        }

          console.log(pay)
          console.log("add")
          console.log(app.globalData.user.account)

          var time = util.formatTime(new Date())
          if(this.data.mission.state == "Expired"){
            if (this.data.time < time)
              this.data.progress = "Expired"
            else{
              if (this.data.mission.recipient_id == "")
                this.data.progress = "Unfinished"
              else
                this.data.progress = "Accepted"
            }
          }

          console.log(this.data.time)
          console.log(time)
          console.log(this.data.time < time)

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
              //get isUserPublisher from Server
              var db = wx.cloud.database()

              app.globalData.user.account = app.globalData.user.account + pay
              console.log(app.globalData.user.account)

              wx.cloud.callFunction({
                name: "login",
                success: function (res) {
                  var openid = res.result.openid
                  wx.cloud.callFunction({
                    name: "addAccount",
                    data: {
                      user_id: openid,
                      account: app.globalData.user.account
                    },
                    complete: function (e) {
                      console.log(e)
                    }
                  })
                }
              })
              

              db.collection('Mission').where({
                _id: app.globalData.mission_id
              }).get().then(res => {
                console.log(res)
                var getMission = res.data[0]

                wx.cloud.callFunction({
                  name: "login",
                  success: function (res) {
                    var openid = res.result.openid
                    var check_pub = false
                    var check_re = false
                    if (getMission.publisher_id == openid)
                      check_pub = true
                    if (getMission.recipient_id == openid)
                      check_re = true

                    that.setData({
                      isUserPublisher: check_pub,
                      isUserAcceptter: check_re,
                      missionName: getMission.Title,
                      time: getMission.Time,
                      pay: getMission.Pay,
                      progress: getMission.state,
                      detail: getMission.Info,
                      mission: getMission
                    })
                  }
                })
                
              })
            }
          })

          wx.redirectTo({
            url: '../main/main',
          })
      }
      else{     //验收
        var app = getApp()
        var that = this
        const res = wx.cloud.callFunction({
          name: "updataMissionState",
          data: {
            id: this.data.mission._id,
            state: "Pass"
          },
          complete: function (e) {
            console.log(e.result)

            var pay = Number(that.data.mission.Pay)

            wx.cloud.callFunction({
              name: "getUserInfo",
              data: {
                user_id: that.data.mission.recipient_id
              },
              complete: function (e) {
                e.result.data[0].account = e.result.data[0].account + pay

                wx.cloud.callFunction({
                  name: "addAccount",
                  data: {
                    user_id: e.result.data[0].user_id,
                    account: e.result.data[0].account
                  },
                  complete: function (e) {
                    console.log(e.result)
                  }
                })
              }
            })
          }
              
        })
      }
      wx.redirectTo({
        url: '../main/main',
      })
    }

    else if (this.data.isUserAcceptter) {    //当用户为接收者,按钮用于提交任务
      var app = getApp()
      var that = this
      const res = wx.cloud.callFunction({
        name: "updataMissionState",
        data: {
          id: this.data.mission._id,
          state: "Finished"
        },
        complete: function (e) {
          console.log(e.result)

          //get isUserPublisher from Server
          var db = wx.cloud.database()

          db.collection('Mission').where({
            _id: app.globalData.mission_id
          }).get().then(res => {
            console.log(res)
            var getMission = res.data[0]

            wx.cloud.callFunction({
              name: "login",
              success: function (res) {
                var openid = res.result.openid
                var check_pub = false
                var check_re = false
                if (getMission.publisher_id == openid)
                  check_pub = true
                if (getMission.recipient_id == openid)
                  check_re = true

                that.setData({
                  isUserPublisher: check_pub,
                  isUserAcceptter: check_re,
                  missionName: getMission.Title,
                  time: getMission.Time,
                  pay: getMission.Pay,
                  progress: getMission.state,
                  detail: getMission.Info,
                  mission: getMission
                })
              }
            })
            
          })
        }
      })
    }
    else {    //当用户不为发起者，也不为接受者，按钮用于接受任务
      var app = getApp()
      var that = this
      if(that.data.mission_type == "Question")
      {
        app.globalData.mission_id = this.data.mission._id
        wx.navigateTo({
          url: '../QuestionDetail/QuestionDetail',
        })
      }
      else{
        const res = wx.cloud.callFunction({
          name: "acceptMission",
          data: {
            id: that.data.mission._id,
            recipient_id: app.globalData.openid,
            state: "Accepted"
          },
          complete: function (e) {
            console.log(e.result)
            //get isUserPublisher from Server
            var db = wx.cloud.database()
            var app = getApp()

            db.collection('Mission').where({
              _id: app.globalData.mission_id
            }).get().then(res => {
              console.log(res)
              var getMission = res.data[0]

              wx.cloud.callFunction({
                name: "login",
                success: function (res) {
                  var openid = res.result.openid
                  var check_pub = false
                  var check_re = false
                  if (getMission.publisher_id == openid)
                    check_pub = true
                  if (getMission.recipient_id == openid)
                    check_re = true

                  that.setData({
                    isUserPublisher: check_pub,
                    isUserAcceptter: check_re,
                    missionName: getMission.Title,
                    time: getMission.Time,
                    pay: getMission.Pay,
                    progress: getMission.state,
                    detail: getMission.Info,
                    mission: getMission
                  })
                }
              })

            })
          }
        })
      }
      } 
  },

  buttonCancle: function(e){
    if (this.data.isUserPublisher & (this.data.mission.state != "Canceled")) {  //当用户为发布者，按钮用于取消发布
      var that = this
      const res = wx.cloud.callFunction({
        name: "updataMissionState",
        data: {
          id: this.data.mission._id,
          state: "Canceled"
        },
        complete: function (e) {
          console.log(e.result)
          //get isUserPublisher from Server
          var db = wx.cloud.database()
          var app = getApp()

          var pay = Number(that.data.mission.Pay)
          app.globalData.user.account = app.globalData.user.account + pay

          wx.cloud.callFunction({
            name: "login",
            success: function (res) {
              var openid = res.result.openid
              wx.cloud.callFunction({
                name: "addAccount",
                data: {
                  user_id: openid,
                  account: app.globalData.user.account
                },
                complete: function (e) {
                  console.log(e)
                }
              })
            }
          })
          

          db.collection('Mission').where({
            _id: app.globalData.mission_id
          }).get().then(res => {
            console.log(res)
            var getMission = res.data[0]

            wx.cloud.callFunction({
              name: "login",
              success: function (res) {
                var openid = res.result.openid
                var check_pub = false
                var check_re = false
                if (getMission.publisher_id == openid)
                  check_pub = true
                if (getMission.recipient_id == openid)
                  check_re = true

                that.setData({
                  isUserPublisher: check_pub,
                  isUserAcceptter: check_re,
                  missionName: getMission.Title,
                  time: getMission.Time,
                  pay: getMission.Pay,
                  progress: getMission.state,
                  detail: getMission.Info,
                  mission: getMission
                })
              }
            })

            
          })
        }
      })
    }
    else if (this.data.isUserAcceptter) {    //当用户为接收者,按钮用于取消接受
      var that = this
      const res1 = wx.cloud.callFunction({
        name: "acceptMission",
        data: {
          id: this.data.mission._id,
          recipient_id: "",
          state: "Unfinished"
        },
        complete: function (e) {
          console.log(e.result)
          //get isUserPublisher from Server
          var db = wx.cloud.database()
          var app = getApp()

          db.collection('Mission').where({
            _id: app.globalData.mission_id
          }).get().then(res => {
            console.log(res)

            wx.navigateTo({
              url: '../main/main',
            })
          })
        }
      })
    }
    else {    //当用户不为发起者，也不为接受者，无按钮
    }
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
      console.log(res)
      var getMission = res.data[0]

      wx.cloud.callFunction({
        name: "login",
        success: function (res) {
          var openid = res.result.openid

          var check_pub = false
          var check_re = false
          if (getMission.publisher_id == openid)
            check_pub = true
          if (getMission.recipient_id == openid)
            check_re = true

          var index = -1
          for (var i in getMission.Participant) {
            if (getMission.Participant[i] == openid)
              index = i
          }

          that.setData({
            isUserPublisher: check_pub,
            isUserAcceptter: check_re,
            isQuestionAcceptter: index,
            missionName: getMission.Title,
            time: getMission.Time,
            pay: getMission.Pay,
            progress: getMission.state,
            detail: getMission.Info,
            mission: getMission,
            mission_type: getMission.type
          })
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