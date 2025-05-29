---
layout: post
title: "代码高亮和复制功能测试"
category: Test
tags: [test, code, highlight]
excerpt: "测试页面：演示代码高亮显示和一键复制功能"
---

# 代码高亮和复制功能测试 🧪

这个页面用来测试代码高亮显示和一键复制功能。

## JavaScript 代码

```javascript
// JavaScript 示例
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

const numbers = [1, 2, 3, 4, 5];
const result = calculateSum(numbers);
console.log(`总和是: ${result}`);

// 异步函数示例
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
```

## Python 代码

```python
# Python 示例
def fibonacci(n):
    """生成斐波那契数列"""
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# 生成前10个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# 列表推导式
squares = [x**2 for x in range(1, 11)]
print(f"前10个平方数: {squares}")
```

## Bash 脚本

```bash
#!/bin/bash
# Bash 脚本示例

# 设置变量
PROJECT_NAME="KkWiki"
VERSION="2.0"

# 函数定义
deploy_project() {
    echo "正在部署 $PROJECT_NAME v$VERSION..."

    # 检查依赖
    if ! command -v node &> /dev/null; then
        echo "错误: Node.js 未安装"
        exit 1
    fi

    # 构建项目
    npm install
    npm run build

    echo "部署完成!"
}

# 执行部署
deploy_project
```

## Docker 配置

```dockerfile
# Dockerfile 示例
FROM node:16-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 多阶段构建
FROM node:16-alpine AS runtime

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 设置工作目录
WORKDIR /app

# 复制应用文件
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# 切换到非root用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]
```

## YAML 配置

```yaml
# Kubernetes 部署配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kkwiki-deployment
  labels:
    app: kkwiki
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kkwiki
  template:
    metadata:
      labels:
        app: kkwiki
    spec:
      containers:
      - name: kkwiki
        image: kkwiki:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
```

## SQL 查询

```sql
-- SQL 查询示例
SELECT
    u.id,
    u.username,
    u.email,
    COUNT(p.id) as post_count,
    AVG(p.rating) as avg_rating
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.created_at >= '2024-01-01'
    AND u.status = 'active'
GROUP BY u.id, u.username, u.email
HAVING COUNT(p.id) > 5
ORDER BY avg_rating DESC, post_count DESC
LIMIT 20;

-- 创建索引
CREATE INDEX idx_posts_author_created
ON posts(author_id, created_at);

-- 更新语句
UPDATE users
SET last_login = NOW()
WHERE id = 12345;
```

## CSS 样式

```css
/* CSS 样式示例 */
:root {
    --primary-color: #00ff88;
    --secondary-color: #00d4ff;
    --background-dark: #0a0b0e;
    --text-light: #e2e8f0;
}

.code-block {
    background: var(--background-dark);
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
}

.syntax-highlight {
    position: relative;
    transition: all 0.3s ease;
}

.syntax-highlight:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);
}

@media (max-width: 768px) {
    .code-block {
        font-size: 0.8rem;
        padding: 0.75rem;
    }
}
```

## JSON 数据

```json
{
  "name": "KkWiki",
  "version": "2.0.0",
  "description": "现代化极客风格知识库",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15",
    "jest": "^28.0.0",
    "webpack": "^5.70.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/kevin197011/kevin197011.github.io.git"
  },
  "keywords": [
    "wiki",
    "documentation",
    "geek",
    "technical"
  ],
  "author": "Kk",
  "license": "MIT"
}
```

## 功能特性

✅ **已实现的功能：**

1. **语法高亮**: 支持多种编程语言的语法高亮
2. **一键复制**: 鼠标悬停显示复制按钮，点击即可复制代码
3. **语言标签**: 自动检测并显示代码语言类型
4. **行号显示**: 长代码自动显示行号
5. **响应式设计**: 在移动设备上也能良好显示

🎯 **使用说明：**

- 将鼠标悬停在代码块上即可看到复制按钮
- 点击复制按钮会将代码复制到剪贴板
- 复制成功后会显示提示消息
- 支持键盘快捷键操作

📱 **兼容性：**

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 移动设备（iOS Safari、Android Chrome）
- 支持触摸操作