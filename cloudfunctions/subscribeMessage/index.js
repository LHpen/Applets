// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "dbcj-02fnh",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser:"oOTAM4-548K92B7l41ycoR6eGrdM",
      page:"index",
      templateId:"22P7cxiDz6zsPxWkIKcsfCWxSo-wXtSpYnk3n5VqKmk",
      data:{
        thing1:{
          value: "达邦抽奖小程序提醒您"
        },

        thing6:{
          value: "4天"
        },
        thing8:{
          value: "还爱中奖莫，爱秋来！"
        },
      },
    });

  return result
} 
catch (err){
  console.log(err);
  return err;
}
}