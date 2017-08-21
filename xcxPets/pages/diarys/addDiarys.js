// addDiarys.js
const qiniuUploader = require("../../utils/qiniuUploader");
const config = require("../../utils/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lifePhoto:'',
    lifeVideo:'',
    showIV:0
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tapIV:function(event){
    var that = this;
    var upTokens = '';
    wx.request({
      url: config.QINIU_URL,
      method: 'POST',
      success: function (res) {
        upTokens = res.data.upToken
      }
    });
    // wx.showActionSheet({
    //   itemList: ['上传照片','上传视频'],
    //   itemColor:"#54DDB7",
    //   success:function(res){
    //     switch(res.tapIndex){
    //       case 0:
            wx.chooseImage({
              count: 1,
              success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths[0];

                // 七牛上传
                qiniuUploader.upload(tempFilePaths, (res) => {
                  that.setData({
                    lifePhoto: res.imageURL,
                    showIV:1
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
        //     break;
        //   case 1:
        //     wx.chooseVideo({
        //       sourceType: ['camera'],
        //       maxDuration:10,
        //       success:function(res){
        //         var rempFilePath = res.tempFilePath;
        //         // 七牛上传
        //         qiniuUploader.upload(rempFilePath, (res) => {
        //           that.setData({
        //             lifeVideo: res.imageURL,
        //             showIV: 2
        //           });
        //         }, (error) => {
        //           console.error('error: ' + JSON.stringify(error));
        //         }, {
        //             region: 'SCN', // 华北区
        //             uptoken: upTokens,
        //             domain: 'http://ooavmk7e1.bkt.clouddn.com/'
        //           });
        //       }
        //     })  
        //     break;
        // }
      // }
    // })
  },
  /**
   * 预览图片
   */
  tapPreviewImg:function(event){
    var that = this;
    wx.previewImage({
      urls: [that.data.lifePhoto]
    })
  }
})