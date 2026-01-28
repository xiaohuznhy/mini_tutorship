# 托管机构SaaS小程序

## 项目简介

专为学生课后托管/补习机构设计的微信小程序SaaS系统。

## 技术栈

- **前端框架**: Taro 3.6 + React 18
- **UI组件库**: Vant WeUI（待集成）
- **后端**: 微信云开发（云函数 + 云数据库 + 云存储）

## 项目结构

```
mini_tutorship/
├── src/                    # 源代码目录
│   ├── pages/              # 页面
│   │   ├── index/          # 首页
│   │   └── login/          # 登录页
│   ├── components/         # 组件（待创建）
│   ├── utils/              # 工具函数（待创建）
│   ├── services/           # API服务（待创建）
│   ├── store/              # 状态管理（待创建）
│   ├── config/             # 配置文件（待创建）
│   ├── app.js              # 应用入口
│   └── app.scss            # 全局样式
├── cloudfunctions/          # 云函数（待创建）
├── config/                 # Taro配置
├── package.json            # 项目配置
└── project.config.json     # 小程序配置
```

## 开发步骤

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 配置云开发环境

1. 在微信开发者工具中创建云开发环境
2. 获取云开发环境ID
3. 修改 `src/app.js` 中的 `env: 'your-env-id'` 为实际环境ID

### 3. 配置小程序AppID

修改 `project.config.json` 中的 `appid` 字段

### 4. 启动开发

```bash
npm run dev:weapp
```

### 5. 在微信开发者工具中打开

1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择 `mini_tutorship/dist` 目录
4. 输入AppID

## 开发计划

详见 `../tutorship/开发实施计划.md`

## 注意事项

1. 首次运行前需要安装依赖：`npm install`
2. 需要配置云开发环境ID
3. 需要配置小程序AppID
4. 网络问题可能导致依赖安装失败，请检查网络配置

