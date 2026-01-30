// 认证相关工具函数
import Taro from '@tarojs/taro'
import { getToken, getUserInfo } from './storage'

/**
 * 检查是否已登录
 */
export const isLoggedIn = () => {
  const token = getToken()
  const userInfo = getUserInfo()
  return !!(token && userInfo)
}

/**
 * 检查用户角色
 */
export const checkRole = (requiredRoles) => {
  const userInfo = getUserInfo()
  if (!userInfo || !userInfo.role) {
    return false
  }
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userInfo.role)
  }
  
  return userInfo.role === requiredRoles
}

/**
 * 检查是否是管理员
 */
export const isAdmin = () => {
  return checkRole('admin')
}

/**
 * 检查是否是教师
 */
export const isTeacher = () => {
  return checkRole('teacher')
}

/**
 * 检查是否是家长
 */
export const isParent = () => {
  return checkRole('parent')
}

/**
 * 退出登录
 */
export const logout = () => {
  Taro.removeStorageSync('token')
  Taro.removeStorageSync('userInfo')
  Taro.reLaunch({
    url: '/pages/login/index'
  })
}

/**
 * 需要登录的页面守卫
 */
export const requireAuth = () => {
  if (!isLoggedIn()) {
    Taro.reLaunch({
      url: '/pages/login/index'
    })
    return false
  }
  return true
}

/**
 * 需要特定角色的页面守卫
 */
export const requireRole = (roles) => {
  if (!requireAuth()) {
    return false
  }
  
  if (!checkRole(roles)) {
    Taro.showToast({
      title: '无权限访问',
      icon: 'none'
    })
    return false
  }
  
  return true
}

export default {
  isLoggedIn,
  checkRole,
  isAdmin,
  isTeacher,
  isParent,
  logout,
  requireAuth,
  requireRole
}

