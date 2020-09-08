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
        desc: '+5',
      },
      {
        text: '2天',
        desc: '+5',
      },
      {
        text: '3天',
        desc: '+10',
      },
      {
        text: '4天',
        desc: '+15',
      },
      {
        text: '5天',
        desc: '+20',
      },
      {
        text: '6天',
        desc: '+30',
      },
      {
        text: '7天',
        desc: '+40',
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

  // 签到消息订阅
  qiandao_dy() {
    const that = this
    
    // 保存模板id 集合
    const tmplIds = [
      "22P7cxiDz6zsPxWkIKcsfCWxSo-wXtSpYnk3n5VqKmk"
    ];

    // 调起客户端小程序订阅消息界面
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success: res => {
        console.log("订阅消息API调用成功：",res)

        // 查询是否订阅过
        that.addMessages().then( id =>{
          tmplIds.map(function(item,index) {
          // 如果同意订阅就执行
            if (res[item] === "accept"){
              console.log("该模板ID用户同意授权",item)
              that.subscribeNum(item,id)
            }
          })
        })
      },
      fail(res){
        console.log("订阅消息API调用失败：",res)

      }
    })
  },

// 查询用户订阅过的订阅消息
    async addMessages(){
      const db = wx.cloud.database()

      // 指定查询条件获取集合数据
    const messages = await db.collection('messages').where({
      _openid:'{openid}'
    }).get()
      
      //如果用户没有订阅过订阅消息，就创建一条记录
    if(messages.data.length == 0){
      var newMsg = await db.collection('messages').add({
        data:{
          templs:[]
        }
      })
    }
    // 如果有数据就返回第一个数组数据,如果没则创建
    var id = messages.data[0]?messages.data[0]:newMsg._id

    return id
    },

    async subscribeNum(item,id){
        //注意传入的item是遍历，id为addMessages的id
        const db = wx.cloud.database()
        const _ = db.command;
        const subs = await db.collection('messages').where({
        _openid:'{openid}',
        'templs':db.command.elemMatch({
          templateId:item
        })
      }).get()

      console.log('用户订阅列表',subs)

        //如果用户之前没有订阅过订阅消息就创建一个订阅消息的记录


        if(subs.data.length == 0 ) {
          db.collection('messages').doc(id).update({
            data: {
              templs:db.command.push({
                each:[{templateId:item, //订阅 
                  page:"",
                  data:{},
                  status:1,
                  subStyle:"daily",
                  done:false,
                  subNum:1
                }],
                position:2
              })
            }
          })
        } else {
          db.collection('messages').where({
            _id:id,
            "templs.templateId":item
          })
          .update({
            data:{
              "templs.$.subNum":db.command.inc(1)
            }
          })
        }
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