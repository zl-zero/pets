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
    inputData:'',
    inputField:'',
    sexArray:['男','女'],
    index:'',
    varietyArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
    varietyIndex:[],
    showModel:false,
    showBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id,
        showBtn:false
      })
    }else{
      this.setData({
        showBtn:true
      })
    }
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
  tapPetsModel:function(event){
    var that = this;
    that.setData({
      inputData: event.currentTarget.dataset.val,
      inputField: event.currentTarget.dataset.field,
      showModel:true
    })
  },
  tapPetsSex:function(event){
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange:function(event){
    this.setData({
      varietyIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      varietyArray: this.data.varietyArray,
      varietyIndex: this.data.varietyIndex
    };
    data.varietyIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.varietyIndex[e.detail.column]) {
          case 0:
            data.varietyArray[1] = ['1','2','3'];
            break;
          case 1:
            data.varietyArray[1] = ['鱼', '两栖动物', '爬行动物'];
            break;
        }
        data.varietyIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  binBrithday:function(event){
    this.setData({
      birthday: event.detail.value
    })
  },
  bindHomeDate: function (event) {
    this.setData({
      homeDate: event.detail.value
    })
  },
  tapModel:function(event){
    var that = this;
    that.setData({
      showModel: false
    })
  },
  //更新保存
  tapSave:function(event){
  },
  tapCancel:function(event){
    this.setData({
      showModel:false
    })
  },
  //删除
  tapDelete:function(event){

  },
  tapSavePets:function(event){
    wx.navigateBack({
      delta:2
    })
  }

})