export default {
  pages: [
    'pages/index/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '托管机构',
    navigationBarTextStyle: 'black'
  },
  // tabBar暂时注释，等有多个页面后再启用
  // tabBar: {
  //   color: '#666',
  //   selectedColor: '#1890ff',
  //   backgroundColor: '#fff',
  //   borderStyle: 'black',
  //   list: [
  //     {
  //       pagePath: 'pages/index/index',
  //       text: '首页',
  //       iconPath: 'assets/images/home.png',
  //       selectedIconPath: 'assets/images/home-active.png'
  //     }
  //   ]
  // },
  cloud: true,
  style: 'v2',
  sitemapLocation: 'sitemap.json'
}

