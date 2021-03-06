// addHeaths.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick: '',
    heathsArray: ['洗澡', '剪指甲'],
    index:'',
    dates:'',
    dateTimes:'',
    daysArray: ['提前1天提醒', '提前2天提醒','提前3天提醒'],
    dayIndex:''
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
  
  },
  tapPets:function(){
    wx.navigateTo({
      url: '/pages/pets/petsList?heaths=1',
    })
  },
  tapPetsHeaths: function (event){
    this.setData({
      index: event.detail.value
    })
  },
  tapDateChanges:function(event){
    this.setData({
      dates: event.detail.value
    })
  },
  tapDateTimeChanges:function(event){
    this.setData({
      dateTimes: event.detail.value
    })
  },
  tapDaysChanges:function(event){
    this.setData({
      dayIndex: event.detail.value
    })
  }
})