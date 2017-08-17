//index.js
const config = require("../../utils/config");
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  //跳转我的爱宠
  tapPetsList:function(event){
    wx.navigateTo({
      url: '../pets/petsList',
    })
  },
  //跳转健康提醒
  tapHealthList:function(event){
    wx.navigateTo({
      url: '../heaths/heathsList',
    })
  },
  //添加页面跳转
  tapAdd:function(event){
    switch(event.currentTarget.dataset.val){
      case config.ADD_PETS:
        wx.navigateTo({
          url: '../pets/petsDetail',
        });
        break;
      case config.ADD_DIARYS:
        wx.navigateTo({
          url: '../diarys/addDiarys',
        });
        break;
    }
  }
})
