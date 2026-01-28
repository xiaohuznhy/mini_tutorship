import { Component } from 'react'
import './app.scss'

class App extends Component {
  componentDidMount() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-2g93u64x5c6ccb04', // 云开发环境ID
        traceUser: true
      })
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return this.props.children
  }
}

export default App

