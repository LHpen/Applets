// pages/qiandao/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day1:0,
    integral:0,
    checked: false,
    steps: [
      {
        text: '1天',
        desc: '+15',
      },
      {
        text: '2天',
        desc: '+20',
      },
      {
        text: '3天',
        desc: '+20',
      },
      {
        text: '4天',
        desc: '+40',
      },
      {
        text: '5天',
        desc: '+25',
      },
      {
        text: '6天',
        desc: '+25',
      },
      {
        text: '7天',
        desc: '+100',
      }
      
    ]
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  // 立即签到 调运云函数
  click_qd(c){
    wx.cloud.callFunction({
      name: "qiandao",
      data:{
        a:0,
        b:0
      }

    }).then((res) => {
      console.log(res.result)
      console.log(c)
    }).catch(console.error)
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

  }
})