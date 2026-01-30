const cloud = require('wx-server-sdk');
const common = require('@xiaohuznhy/common');
const jwt = require('jsonwebtoken');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// JWT 密钥，实际项目中应从更安全的地方获取
const JWT_SECRET = 'your_jwt_secret_key'; // TODO: Replace with a secure secret

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, code } = event;

  switch (action) {
    case 'login':
      return await login(code);
    default:
      return common.response(400, '无效的操作类型');
  }
};

/**
 * 用户登录或注册
 * @param {string} code - wx.login 获取的 code
 */
async function login(code) {
  if (!code) {
    return common.response(400, '缺少 code 参数');
  }

  try {
    // 1. 使用 code 换取 openid 和 session_key
    const { result } = await cloud.openapi.auth.code2Session({
      code: code
    });

    if (!result || !result.openid) {
      return common.response(500, '获取 openid 失败');
    }

    const { openid } = result;

    // 2. 查询用户是否存在
    const userRes = await db.collection('users').where({ openid: openid }).get();
    let userInfo;

    if (userRes.data.length > 0) {
      // 2.1 用户已存在，直接获取用户信息
      userInfo = userRes.data[0];
      console.log('用户已存在:', userInfo);
    } else {
      // 2.2 用户不存在，自动注册（创建新用户）
      const newUser = {
        openid: openid,
        tenant_id: null, 
        role: 'parent', 
        name: '微信用户', 
        avatar: '', 
        phone: null,
        created_at: new Date(),
        updated_at: new Date()
      };
      const addUserRes = await db.collection('users').add({
        data: newUser
      });
      userInfo = { ...newUser, _id: addUserRes._id };
      console.log('新用户注册成功:', userInfo);
    }

    // 3. 生成 JWT token
    const token = jwt.sign(
      {
        openid: userInfo.openid,
        tenant_id: userInfo.tenant_id,
        role: userInfo.role,
        _id: userInfo._id
      },
      JWT_SECRET,
      { expiresIn: '7d' } 
    );

    // 4. 返回 token 和用户信息
    const { _id, ...safeUserInfo } = userInfo;
    return common.response(200, '登录成功', {
      token,
      userInfo: safeUserInfo
    });

  } catch (error) {
    console.error('登录失败:', error);
    return common.response(500, '登录失败: ' + error.message);
  }
}
