---
layout: default
title: "Kk'wiki - 设计草稿"
permalink: /design/draft/
description: "项目设计草稿和原型展示 - 探索创新想法的实验室"
---

<div class="home-page">
    <!-- 页面标题 -->
    <section class="hero-section">
        <div class="hero-content">
            <div class="hero-terminal">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="btn-close"></span>
                        <span class="btn-minimize"></span>
                        <span class="btn-maximize"></span>
                    </div>
                    <div class="terminal-title">kk@wiki:~$ design --draft</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line">
                        <span class="prompt">kk@wiki:~$</span>
                        <span class="command typed-text">ls -la ./drafts/ | grep prototype</span>
                    </div>
                    <div class="terminal-output">
                        <div class="welcome-text">
                            <p>> 设计实验室 & 原型展示</p>
                            <p>> 状态: <span class="highlight">持续迭代</span> | <span class="highlight">概念验证</span></p>
                            <p>> 包含: <span class="highlight">UI设计</span> | <span class="highlight">系统架构</span> | <span class="highlight">创新想法</span></p>
                            <p>> 最后更新: <span class="highlight">{{ site.time | date: "%Y-%m-%d" }}</span></p>
                        </div>
                        <div class="cursor-blink">_</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 进行中的项目 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-rocket"></i>
            进行中的项目
        </h2>
        <div class="quick-nav-grid">
            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>UI组件库</h3>
                        <p>基于现代设计语言的可复用组件系统，支持暗黑/亮色主题切换。</p>
                        <div class="project-meta">
                            <span class="status-badge working">开发中</span>
                            <span class="progress-text">初期阶段</span>
                        </div>
                        <a href="#ui-components" class="nav-card-link">
                            查看原型 <i class="fas fa-arrow-down"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-sitemap"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>微服务架构</h3>
                        <p>简单的微服务架构设计练习，学习服务拆分和容器化部署。</p>
                        <div class="project-meta">
                            <span class="status-badge planning">学习中</span>
                            <span class="progress-text">概念验证阶段</span>
                        </div>
                        <a href="#microservices" class="nav-card-link">
                            查看架构 <i class="fas fa-arrow-down"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>AI助手集成</h3>
                        <p>探索AI工具在日常开发中的应用，提高代码编写和文档整理效率。</p>
                        <div class="project-meta">
                            <span class="status-badge research">探索中</span>
                            <span class="progress-text">工具试用阶段</span>
                        </div>
                        <a href="#ai-integration" class="nav-card-link">
                            查看方案 <i class="fas fa-arrow-down"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- UI组件原型 -->
    <section class="quick-nav-section" id="ui-components">
        <h2 class="section-title">
            <i class="fas fa-cubes"></i>
            UI组件原型
        </h2>
        <div class="hero-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">components.preview</div>
            </div>
            <div class="terminal-body">
                <!-- 按钮组件示例 -->
                <div class="component-demo">
                    <h4>按钮组件</h4>
                    <div class="button-group">
                        <button class="btn-primary">Primary</button>
                        <button class="btn-secondary">Secondary</button>
                        <button class="btn-success">Success</button>
                        <button class="btn-warning">Warning</button>
                        <button class="btn-danger">Danger</button>
                    </div>
                </div>

                <!-- 进度条组件示例 -->
                <div class="component-demo">
                    <h4>进度条组件</h4>
                    <div class="progress-demos">
                        <div class="progress-item">
                            <span class="progress-label">学习进度</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 30%"></div>
                            </div>
                            <span class="progress-value">30%</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">练习完成</span>
                            <div class="progress-bar">
                                <div class="progress-fill animated" style="width: 15%"></div>
                            </div>
                            <span class="progress-value">15%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 微服务架构 -->
    <section class="quick-nav-section" id="microservices">
        <h2 class="section-title">
            <i class="fas fa-project-diagram"></i>
            微服务架构设计
        </h2>
        <div class="status-grid">
            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-globe"></i>
                    <span>Web入口</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Nginx</span>
                    <span class="metric-label">反向代理</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-users"></i>
                    <span>后端服务</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Node.js</span>
                    <span class="metric-label">API服务</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-database"></i>
                    <span>数据存储</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">MySQL</span>
                    <span class="metric-label">关系数据库</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-box"></i>
                    <span>容器化</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Docker</span>
                    <span class="metric-label">应用打包</span>
                </div>
                <div class="status-indicator online"></div>
            </div>
        </div>
    </section>

    <!-- AI集成方案 -->
    <section class="quick-nav-section" id="ai-integration">
        <h2 class="section-title">
            <i class="fas fa-robot"></i>
            AI助手集成方案
        </h2>
        <div class="status-grid">
            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-code"></i>
                    <span>代码辅助</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">试用中</span>
                    <span class="metric-label">代码补全工具</span>
                </div>
                <div class="status-indicator research"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-file-alt"></i>
                    <span>文档整理</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">学习中</span>
                    <span class="metric-label">markdown生成</span>
                </div>
                <div class="status-indicator planning"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-search"></i>
                    <span>代码检查</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">探索中</span>
                    <span class="metric-label">静态分析工具</span>
                </div>
                <div class="status-indicator research"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-question-circle"></i>
                    <span>技术问答</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">想法</span>
                    <span class="metric-label">知识库助手</span>
                </div>
                <div class="status-indicator prototype"></div>
            </div>
        </div>
    </section>

    <!-- 想法池 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-lightbulb"></i>
            想法池
        </h2>
        <div class="hero-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~$ ideas --list</div>
            </div>
            <div class="terminal-body">
                <div class="welcome-text">
                    <p>> 📝 <strong>个人博客优化</strong>: 提升网站加载速度和SEO</p>
                    <p>> 🔧 <strong>开发工具集合</strong>: 常用开发工具的整理和分享</p>
                    <p>> 📚 <strong>学习笔记系统</strong>: 更好的知识管理方式</p>
                    <p>> 🐳 <strong>Docker实践</strong>: 容器化应用部署练习</p>
                    <p>> 📊 <strong>数据可视化</strong>: 简单的图表展示工具</p>
                    <br>
                    <p style="color: var(--accent-green);">
                        <i class="fas fa-lightbulb"></i>
                        记录学习过程中的想法...
                    </p>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* 设计草稿页面特定样式 */
.project-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: var(--spacing-sm) 0;
}

.status-badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-badge.working {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid #22c55e;
}

.status-badge.planning {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
    border: 1px solid #3b82f6;
}

.status-badge.research {
    background: rgba(168, 85, 247, 0.2);
    color: #a855f7;
    border: 1px solid #a855f7;
}

.progress-text {
    font-size: 0.8rem;
    color: var(--text-muted);
}

/* 组件演示样式 */
.component-demo {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-secondary);
}

.component-demo h4 {
    color: var(--accent-green);
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
}

.button-group {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-success, .btn-warning, .btn-danger {
    padding: var(--spacing-xs) var(--spacing-md);
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition-fast);
}

.btn-primary { background: var(--accent-blue); color: white; }
.btn-secondary { background: var(--text-muted); color: white; }
.btn-success { background: #22c55e; color: white; }
.btn-warning { background: #f59e0b; color: white; }
.btn-danger { background: #ef4444; color: white; }

/* 进度条样式 */
.progress-demos {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.progress-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.progress-label {
    min-width: 80px;
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
    transition: width 0.5s ease;
}

.progress-fill.animated {
    animation: progressPulse 2s infinite;
}

@keyframes progressPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.progress-value {
    min-width: 40px;
    text-align: right;
    font-size: 0.8rem;
    color: var(--text-muted);
}

/* 状态指示器 */
.status-indicator.research {
    background: #a855f7;
}

.status-indicator.planning {
    background: #3b82f6;
}

.status-indicator.prototype {
    background: #f59e0b;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .button-group {
        justify-content: center;
    }

    .progress-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }

    .progress-bar {
        width: 100%;
    }
}
</style>