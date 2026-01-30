// 公共云函数 - 提供通用工具函数和中间件

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

/**
 * 租户上下文注入中间件
 * 从用户信息中获取tenant_id和role，注入到event中
 */
exports.tenantAuth = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext

  if (!OPENID) {
    return {
      errCode: 401,
      errMsg: '未获取到用户openid'
    }
  }

  try {
    // 查询用户租户信息
    const userRes = await db.collection('users')
      .where({
        openid: OPENID
      })
      .field({
        tenant_id: true,
        role: true,
        _id: false
      })
      .get()

    if (!userRes.data.length) {
      return {
        errCode: 403,
        errMsg: '用户未授权，请先登录'
      }
    }

    // 注入租户上下文
    event.tenant_id = userRes.data[0].tenant_id
    event.user_role = userRes.data[0].role // admin/teacher/parent
    event.openid = OPENID

    return event
  } catch (error) {
    console.error('租户认证失败:', error)
    return {
      errCode: 500,
      errMsg: '租户认证失败: ' + error.message
    }
  }
}

/**
 * 统一响应格式
 */
exports.response = (code = 200, message = 'success', data = null) => {
  return {
    code,
    message,
    data,
    timestamp: new Date().toISOString()
  }
}

/**
 * 记录操作日志
 */
exports.logOperation = async (context, action, details) => {
  try {
    await db.collection('audit_logs').add({
      data: {
        tenant_id: context.tenant_id,
        openid: context.openid,
        role: context.user_role,
        action: action,              // 操作类型：create/update/delete/read
        resource: details.resource,   // 资源类型：student/schedule/payment
        resource_id: details.id || '',      // 资源ID
        before: details.before || null,      // 修改前的数据
        after: details.after || null,         // 修改后的数据
        ip: context.ip || '',
        user_agent: context.userAgent || '',
        timestamp: new Date(),
        result: details.result || 'success'        // 操作结果：success/failure
      }
    })
  } catch (error) {
    console.error('记录操作日志失败:', error)
    // 日志记录失败不影响主流程，只打印错误
  }
}

/**
 * 验证权限
 */
exports.checkPermission = (userRole, requiredRoles) => {
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles]
  }
  return requiredRoles.includes(userRole)
}

