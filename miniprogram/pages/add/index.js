// pages/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    two:'1',
    value: '',
    value1: '',
    checked: true,
    show1: false,
    action1: [
      { name: '微信好友' },
      { name: '微信群' },
      { name: '公众号'}
    ],
    info_name:"微信好友"

  },
  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
  toggleActionSheet1(event) {
    console.log(event)
    this.setData(
      {info_name:event.detail.name}
    );
    this.toggle('show1');
  },
  onClose() {
    this.setData({ show1: false });
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChange1(event) {
    this.setData({
      two: event.detail,
    });
  },
  onChange2({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });

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