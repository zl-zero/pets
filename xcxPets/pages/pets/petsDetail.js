// petsDetail.js
const qiniuUploader = require("../../utils/qiniuUploader");
const config = require("../../utils/config");

// 初始化七牛相关参数
function initQiniu() {
  
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    petsPhoto:'',
    nick:'',
    sex:'',
    variety:'',
    weight:'',
    birthday:'',
    homeDate:'',
    showModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  /**
   * 更新信息
   */
  tapPetsPhoto:function(event){
    var that = this;
    var upTokens = '';
    wx.request({
      url: config.QINIU_URL,
      method: 'POST',
      success: function (res) {
        upTokens = res.data.upToken
      }
    });
    if(that.data.upTokens!=''){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0];

          // 七牛上传
          qiniuUploader.upload(tempFilePaths, (res) => {
            that.setData({
              petsPhoto: res.imageURL
            });
          }, (error) => {
            console.error('error: ' + JSON.stringify(error));
          }, {
              region: 'SCN', // 华北区
              uptoken: upTokens,
              domain: 'http://ooavmk7e1.bkt.clouddn.com/'
            });
        }
      })
    }
  },
  tapPetsNick:function(event){
    var that = this;
    that.setData({
      showModel:true
    })
  },
  tapModel:function(event){
    var that = this;
    that.setData({
      showModel: false
    })
  }
})