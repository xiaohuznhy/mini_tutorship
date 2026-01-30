// 统一请求封装
import Taro from '@tarojs/taro'

/**
 * 统一请求方法
 * @param {string} name - 云函数名称
 * @param {object} data - 请求数据
 * @param {object} options - 请求选项
 */
export const request = async (name, data = {}, options = {}) => {
  try {
    // 获取token
    const token = Taro.getStorageSync('token')
    
    // 构建请求参数
    const requestData = {
      ...data,
      token // 携带token
    }

    // 调用云函数
    const res = await Taro.cloud.callFunction({
      name,
      data: requestData,
      ...options
    })

    // 处理响应
    if (res.result) {
      // 如果返回的是统一格式
      if (res.result.code !== undefined) {
        if (res.result.code === 200) {
          return res.result.data
        } else {
          // 业务错误
          const errorMsg = res.result.message || '请求失败'
          
          // 如果是未授权，清除token并跳转登录
          if (res.result.code === 401 || res.result.code === 403) {
            Taro.removeStorageSync('token')
            Taro.removeStorageSync('userInfo')
            Taro.reLaunch({
              url: '/pages/login/index'
            })
          }
          
          Taro.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 2000
          })
          
          throw new Error(errorMsg)
        }
      } else {
        // 直接返回结果
        return res.result
      }
    } else {
      throw new Error('请求失败，未返回结果')
    }
  } catch (error) {
    console.error('请求失败:', error)
    
    // 网络错误
    if (error.errMsg && error.errMsg.includes('fail')) {
      Taro.showToast({
        title: '网络错误，请检查网络连接',
        icon: 'none',
        duration: 2000
      })
    }
    
    throw error
  }
}

/**
 * GET请求（通过云函数）
 */
export const get = (name, data = {}) => {
  return request(name, { ...data, method: 'GET' })
}

/**
 * POST请求（通过云函数）
 */
export const post = (name, data = {}) => {
  return request(name, { ...data, method: 'POST' })
}

export default request

