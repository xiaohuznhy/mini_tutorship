// 本地存储封装
import Taro from '@tarojs/taro'

/**
 * 设置存储
 */
export const setStorage = (key, value) => {
  try {
    Taro.setStorageSync(key, value)
    return true
  } catch (error) {
    console.error('存储失败:', error)
    return false
  }
}

/**
 * 获取存储
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const value = Taro.getStorageSync(key)
    return value !== '' ? value : defaultValue
  } catch (error) {
    console.error('获取存储失败:', error)
    return defaultValue
  }
}

/**
 * 删除存储
 */
export const removeStorage = (key) => {
  try {
    Taro.removeStorageSync(key)
    return true
  } catch (error) {
    console.error('删除存储失败:', error)
    return false
  }
}

/**
 * 清空存储
 */
export const clearStorage = () => {
  try {
    Taro.clearStorageSync()
    return true
  } catch (error) {
    console.error('清空存储失败:', error)
    return false
  }
}

/**
 * 获取token
 */
export const getToken = () => {
  return getStorage('token')
}

/**
 * 设置token
 */
export const setToken = (token) => {
  return setStorage('token', token)
}

/**
 * 删除token
 */
export const removeToken = () => {
  return removeStorage('token')
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return getStorage('userInfo')
}

/**
 * 设置用户信息
 */
export const setUserInfo = (userInfo) => {
  return setStorage('userInfo', userInfo)
}

export default {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo
}

