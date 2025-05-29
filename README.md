# KkWiki - 现代化极客风格知识库 🚀

[![Jekyll](https://img.shields.io/badge/Jekyll-4.0+-brightgreen.svg)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个专为技术人员设计的现代化知识库，采用极客风格界面，提供优雅的技术文档浏览体验。

## ✨ 特色功能

### 🎨 现代化设计
- **极客风格主题**: 暗色背景配合绿色科技感元素
- **响应式布局**: 完美适配桌面和移动设备
- **动画效果**: 流畅的交互动画和视觉反馈
- **网格背景**: 赛博朋克风格的背景效果

### 🔍 智能搜索
- **全文搜索**: 支持标题、内容、分类搜索
- **快捷键支持**: `Ctrl+K` 快速打开搜索
- **键盘导航**: 支持方向键和回车键导航
- **实时结果**: 输入即时显示搜索结果

### 📱 用户体验
- **侧边栏导航**: 分层级的文档分类导航
- **阅读进度**: 文章阅读进度可视化
- **目录生成**: 自动生成文章目录
- **浮动按钮**: 返回顶部、快速笔记等功能

### 🛠️ 开发体验
- **Jekyll驱动**: 基于Jekyll静态网站生成器
- **模块化CSS**: 采用CSS自定义属性的主题系统
- **TypeScript风格**: 现代化的JavaScript代码结构
- **SEO优化**: 完整的元数据和结构化数据

## 📚 内容分类

### DevOps
- CI/CD流水线设计与实现
- Docker容器化最佳实践
- Kubernetes集群管理
- 基础设施即代码(IaC)
- 监控和日志系统

### 系统管理
- Linux系统运维
- Windows服务器管理
- 网络配置与安全
- 性能优化与故障排除

### 网络技术
- Netcat网络工具详解
- Nmap网络扫描技术
- 代理服务器配置
- 网络安全实践

## 🚀 快速开始

### 环境要求
- Ruby 2.7+
- Jekyll 4.0+
- Node.js (可选，用于额外工具)

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/your-username/kevin197011.github.io.git
cd kevin197011.github.io

# 安装依赖
bundle install

# 启动开发服务器
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --incremental

# 访问 http://localhost:4000
```

### 添加新文章
```bash
# 在 _posts 目录下创建新的Markdown文件
# 文件名格式: YYYY-MM-DD-title.md

---
layout: post
title: "你的文章标题"
category: "分类名称"
tags: ["标签1", "标签2"]
excerpt: "文章摘要"
---

你的文章内容...
```

## 🎯 项目结构

```
kevin197011.github.io/
├── _layouts/           # 页面模板
│   ├── default.html    # 基础布局
│   ├── home.html       # 首页布局
│   └── post.html       # 文章页布局
├── _includes/          # 组件模板
│   ├── head.html       # HTML头部
│   └── footer.html     # 页脚
├── _posts/             # 文章内容
│   ├── 2024-03-13-devops.md
│   ├── 2024-03-13-tinyproxy.md
│   ├── 2024-03-14-nc.md
│   ├── 2024-03-14-windows-cmd.md
│   └── 2024-07-13-nmap.md
├── assets/             # 静态资源
│   ├── css/
│   │   ├── cyber-style.css     # 主题样式
│   │   └── components.css      # 组件样式
│   └── js/
│       └── cyber-ui.js         # 交互脚本
├── _config.yml         # Jekyll配置
└── index.md           # 首页内容
```

## 🎨 主题定制

### 颜色变量
```css
:root {
    --bg-primary: #0a0b0e;        /* 主背景色 */
    --text-primary: #e2e8f0;      /* 主文字色 */
    --accent-green: #00ff88;      /* 强调绿色 */
    --accent-blue: #00d4ff;       /* 强调蓝色 */
    /* 更多变量... */
}
```

### 字体设置
- **等宽字体**: JetBrains Mono (代码和终端)
- **无衬线字体**: Inter (正文内容)

## 💡 使用技巧

### 快捷键
- `Ctrl+K`: 打开搜索模态框
- `F`: 切换全屏模式
- `Esc`: 关闭模态框

### 搜索语法
- 直接输入关键词进行全文搜索
- 支持中英文混合搜索
- 搜索结果会高亮显示匹配内容

### 移动端适配
- 侧边栏在移动端会自动折叠
- 支持触摸手势操作
- 优化的移动端阅读体验

## 📈 性能优化

- **CSS**: 使用自定义属性实现主题切换
- **JavaScript**: 模块化代码结构，按需加载
- **字体**: 使用字体显示优化，减少布局偏移
- **图片**: 支持懒加载（可扩展）
- **缓存**: 合理的HTTP缓存策略

## 🔧 技术栈

- **静态生成器**: Jekyll 4.0+
- **模板引擎**: Liquid
- **样式**: CSS3 + 自定义属性
- **脚本**: 原生JavaScript (ES6+)
- **图标**: Font Awesome 6.4
- **字体**: Google Fonts (Inter + JetBrains Mono)
- **部署**: GitHub Pages

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

欢迎提交Issue和Pull Request来帮助改进这个项目！

### 贡献方式
1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📊 统计信息

- **文章数量**: 5篇技术文档
- **总代码行数**: 3000+ 行
- **技术分类**: 4个主要分类
- **支持设备**: 桌面、平板、手机全平台

---

**KkWiki** - 为技术人员打造的现代化知识库 🚀

访问地址: [https://kevin197011.github.io](https://kevin197011.github.io)