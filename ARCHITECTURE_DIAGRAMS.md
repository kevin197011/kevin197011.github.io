# 架构图功能使用指南

本文档介绍如何在Jekyll博客中为文章添加架构图功能。

## 功能概述

架构图功能允许在**文章页面**显示相关的系统架构图，支持：
- 在文章的front matter中定义Mermaid图表
- 在文章页面顶部显示架构图
- 支持显示/隐藏切换功能
- 支持明暗主题自动切换
- 响应式设计，适配移动设备

## 使用方法

### 1. 在文章中添加架构图

在文章的front matter中添加`diagram`字段，使用Mermaid语法定义图表：

```yaml
---
layout: post
title: "文章标题"
date: 2024-12-31
category: DevOps
tags: [标签1, 标签2]
author: 作者
excerpt: "文章摘要"
diagram: |
  graph TB
      A[开始] --> B[处理]
      B --> C[结束]

      style A fill:#00d4ff
      style B fill:#00ff88
      style C fill:#ff6b6b
---
```

### 2. 架构图显示效果

当文章包含`diagram`字段时，会在文章标题下方自动显示一个架构图区域，包含：
- 📊 架构图标题和展示区域
- 👁️ 显示/隐藏切换按钮
- 🎨 自动适配明暗主题
- 📱 移动端优化显示

### 3. 支持的图表类型

#### 流程图 (Flowchart)
```yaml
diagram: |
  graph TB
      A[开始] --> B{判断}
      B -->|是| C[执行A]
      B -->|否| D[执行B]
      C --> E[结束]
      D --> E
```

#### 序列图 (Sequence Diagram)
```yaml
diagram: |
  sequenceDiagram
      participant A as 客户端
      participant B as 服务器
      participant C as 数据库

      A->>B: 发送请求
      B->>C: 查询数据
      C-->>B: 返回结果
      B-->>A: 响应数据
```

#### 类图 (Class Diagram)
```yaml
diagram: |
  classDiagram
      class Animal {
          +String name
          +int age
          +makeSound()
      }
      class Dog {
          +String breed
          +bark()
      }
      class Cat {
          +bool indoor
          +meow()
      }
      Animal <|-- Dog
      Animal <|-- Cat
```

#### 状态图 (State Diagram)
```yaml
diagram: |
  stateDiagram-v2
      [*] --> 待处理
      待处理 --> 处理中: 开始处理
      处理中 --> 已完成: 处理成功
      处理中 --> 失败: 处理失败
      失败 --> 待处理: 重试
      已完成 --> [*]
```

#### 甘特图 (Gantt Chart)
```yaml
diagram: |
  gantt
      title 项目时间线
      dateFormat YYYY-MM-DD
      section 设计阶段
      需求分析    :done, req, 2024-01-01, 2024-01-10
      系统设计    :done, design, after req, 15d
      section 开发阶段
      前端开发    :active, frontend, 2024-01-25, 30d
      后端开发    :backend, after design, 25d
      section 测试阶段
      单元测试    :test1, after backend, 10d
      集成测试    :test2, after test1, 10d
```

#### Git图 (Git Graph)
```yaml
diagram: |
  gitgraph
      commit id: "Initial"
      branch develop
      checkout develop
      commit id: "Feature A"
      commit id: "Feature B"
      checkout main
      merge develop
      commit id: "Release v1.0"
```

#### 实体关系图 (ER Diagram)
```yaml
diagram: |
  erDiagram
      USER {
          int id PK
          string username
          string email
          datetime created_at
      }
      POST {
          int id PK
          int user_id FK
          string title
          text content
          datetime published_at
      }
      CATEGORY {
          int id PK
          string name
          string slug
      }

      USER ||--o{ POST : "writes"
      POST }o--|| CATEGORY : "belongs to"
```

### 4. 高级配置示例

#### 复杂的系统架构图
```yaml
diagram: |
  graph TB
      subgraph "用户层"
          Web[Web应用]
          Mobile[移动应用]
          API[API客户端]
      end

      subgraph "接入层"
          LB[负载均衡器]
          CDN[CDN服务]
          WAF[Web防火墙]
      end

      subgraph "应用层"
          App1[应用服务器1]
          App2[应用服务器2]
          App3[应用服务器3]
      end

      subgraph "服务层"
          Auth[认证服务]
          Cache[缓存服务]
          Queue[消息队列]
      end

      subgraph "数据层"
          Master[(主数据库)]
          Slave[(从数据库)]
          NoSQL[(NoSQL数据库)]
      end

      Web --> CDN
      Mobile --> LB
      API --> WAF
      CDN --> LB
      WAF --> LB
      LB --> App1
      LB --> App2
      LB --> App3
      App1 --> Auth
      App2 --> Cache
      App3 --> Queue
      Auth --> Master
      Cache --> Slave
      Queue --> NoSQL
      Master --> Slave

      style Web fill:#e1f5fe
      style Mobile fill:#e8f5e8
      style API fill:#fff3e0
      style LB fill:#f3e5f5
      style Master fill:#ffebee
      style Slave fill:#f1f8e9
```

## 样式自定义

### 主题适配
架构图会自动适配网站的明暗主题：
- 🌙 **暗色主题**: 使用深色背景和亮色文字
- ☀️ **亮色主题**: 使用浅色背景和深色文字

### 颜色配置
可以为图表元素自定义颜色：
```yaml
diagram: |
  graph TB
      A[开始] --> B[处理]
      B --> C[结束]

      style A fill:#00d4ff,stroke:#fff,stroke-width:2px,color:#fff
      style B fill:#00ff88,stroke:#fff,stroke-width:2px,color:#000
      style C fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
```

## 最佳实践

### 1. 图表设计原则
- ✅ 保持图表简洁清晰
- ✅ 使用有意义的节点标签
- ✅ 合理安排图表层次结构
- ✅ 适当使用颜色区分不同类型的组件

### 2. 性能优化
- ✅ 避免过于复杂的图表（节点数量建议 < 20）
- ✅ 使用子图组织复杂的架构
- ✅ 合理控制图表尺寸

### 3. 可访问性
- ✅ 提供清晰的图表说明
- ✅ 使用有意义的alt文本
- ✅ 确保颜色对比度足够

## 故障排除

### 常见问题

#### 1. 图表不显示
- 检查front matter中`diagram`字段格式是否正确
- 确认Mermaid语法是否有错误
- 检查浏览器控制台是否有JavaScript错误

#### 2. 样式显示异常
- 确认CSS变量是否正确定义
- 检查主题切换是否正常工作
- 验证响应式样式是否生效

#### 3. 性能问题
- 简化复杂图表结构
- 减少图表中的节点数量
- 考虑分解为多个小图表

## 技术实现

### 依赖项
- **Mermaid.js**: v10.6.1+ 用于图表渲染
- **Jekyll**: 静态站点生成器
- **CSS变量**: 主题系统支持

### 浏览器支持
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

---

通过以上配置，你可以为每篇文章添加专业的架构图，提升技术文档的可读性和专业性。如有问题，请参考[Mermaid官方文档](https://mermaid.js.org/)获取更多语法帮助。