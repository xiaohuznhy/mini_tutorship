const cloud = require('wx-server-sdk');

// 关键改动：改回相对路径引用
const common = require('./common/index.js'); 

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 测试云函数主函数
exports.main = async (event, context) => {
  console.log('开始【最终版】测试 common 云函数...');

  const testResponse = common.response(200, 'common.response 调用成功');
  return {
    message: 'common 云函数作为本地文件调用测试完成',
    responseResult: testResponse,
  };
}
