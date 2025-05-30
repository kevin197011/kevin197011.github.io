# 导航页面使用指南

## 概述

导航页面位于 `/nav/`，提供了常用链接和工具的快速访问入口。页面采用分类卡片式布局，支持自定义添加链接。

## 页面结构

导航页面分为以下几个主要分类：

1. **开发工具** - GitHub、VS Code、Docker Hub、Kubernetes文档
2. **云服务** - AWS、Azure、Google Cloud、Vercel
3. **学习资源** - MDN、Stack Overflow、DEV Community、freeCodeCamp
4. **实用工具** - JSON Formatter、Regex101、颜色工具、Base64编码
5. **监控和状态** - GitHub Status、DownDetector、Speedtest、网络诊断

## 自定义添加链接

### 1. 基础卡片结构

每个链接卡片都遵循以下结构：

```html
<div class="nav-link-card">
    <div class="nav-link-icon brand-name">
        <i class="fab fa-brand-icon"></i>
    </div>
    <div class="nav-link-content">
        <h3>链接标题</h3>
        <p>链接描述</p>
        <a href="https://example.com" target="_blank" class="nav-link-btn">
            访问 <i class="fas fa-external-link-alt"></i>
        </a>
    </div>
</div>
```

### 2. 添加新分类

要添加新的分类，在页面中添加新的 section：

```html
<!-- 新分类 -->
<section class="quick-nav-section">
    <h2 class="section-title">
        <i class="fas fa-category-icon"></i>
        分类名称
    </h2>
    <div class="nav-links-grid">
        <!-- 卡片内容 -->
    </div>
</section>
```

### 3. 自定义图标样式

每个品牌都可以有自己的颜色主题。在页面的 `<style>` 部分添加：

```css
.nav-link-icon.brand-name {
    background: linear-gradient(135deg, #color1, #color2);
    color: white;
}
```

### 4. 常用品牌图标类名

- GitHub: `fab fa-github`
- Docker: `fab fa-docker`
- AWS: `fab fa-aws`
- Microsoft: `fab fa-microsoft`
- Google: `fab fa-google`
- Stack Overflow: `fab fa-stack-overflow`
- 通用代码: `fas fa-code`
- 通用工具: `fas fa-tools`

## 示例：添加新链接

### 添加 Netlify 链接

```html
<div class="nav-link-card">
    <div class="nav-link-icon netlify">
        <i class="fas fa-rocket"></i>
    </div>
    <div class="nav-link-content">
        <h3>Netlify</h3>
        <p>JAMstack部署平台</p>
        <a href="https://netlify.com" target="_blank" class="nav-link-btn">
            访问 <i class="fas fa-external-link-alt"></i>
        </a>
    </div>
</div>
```

相应的CSS样式：

```css
.nav-link-icon.netlify {
    background: linear-gradient(135deg, #00c7b7, #00a693);
    color: white;
}
```

## 最佳实践

1. **图标选择**: 优先使用品牌官方图标，备选使用语义化图标
2. **描述文字**: 保持简洁，突出核心功能
3. **分类逻辑**: 按照使用场景和工具类型分类
4. **颜色搭配**: 尽量使用品牌色，保持视觉一致性
5. **响应式**: 所有新添加的内容都会自动适配移动端

## 维护建议

- 定期检查链接有效性
- 根据使用频率调整链接顺序
- 及时添加新的常用工具
- 保持分类的逻辑清晰

## 技术实现

- 使用CSS Grid实现响应式布局
- Font Awesome图标库提供图标支持
- CSS变量确保主题一致性
- 悬停效果增强交互体验