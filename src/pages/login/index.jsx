import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Login extends Component {
  handleLogin = async () => {
    try {
      // 微信登录
      const res = await Taro.login()
      if (res.code) {
        // 调用云函数登录
        const loginRes = await Taro.cloud.callFunction({
          name: 'auth',
          data: {
            action: 'login',
            code: res.code
          }
        })
        
        if (loginRes.result.code === 200) {
          // 保存token
          Taro.setStorageSync('token', loginRes.result.data.token)
          Taro.setStorageSync('userInfo', loginRes.result.data.userInfo)
          
          // 登录成功，重新启动到首页
          Taro.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          Taro.showToast({
            title: loginRes.result.message || '登录失败',
            icon: 'none'
          })
        }
      }
    } catch (error) {
      console.error('登录失败:', error)
      Taro.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
    }
  }

  render() {
    return (
      <View className='login'>
        <Button type='primary' onClick={this.handleLogin}>
          微信登录
        </Button>
      </View>
    )
  }
}

