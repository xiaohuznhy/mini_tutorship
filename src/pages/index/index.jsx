import { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Text>托管机构SaaS小程序</Text>
        <Text>欢迎使用！</Text>
      </View>
    )
  }
}

