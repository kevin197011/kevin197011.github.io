---
layout: default
title: "设计草稿"
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
                            <span class="progress-text">进度: 65%</span>
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
                        <p>云原生微服务架构设计，包含服务发现、配置管理、监控告警。</p>
                        <div class="project-meta">
                            <span class="status-badge planning">规划中</span>
                            <span class="progress-text">架构设计阶段</span>
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
                        <p>将AI助手集成到开发流程中，提供智能代码生成和技术文档支持。</p>
                        <div class="project-meta">
                            <span class="status-badge research">研究中</span>
                            <span class="progress-text">技术调研阶段</span>
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
                            <span class="progress-label">项目进度</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%"></div>
                            </div>
                            <span class="progress-value">75%</span>
                        </div>
                        <div class="progress-item">
                            <span class="progress-label">加载状态</span>
                            <div class="progress-bar">
                                <div class="progress-fill animated" style="width: 45%"></div>
                            </div>
                            <span class="progress-value">45%</span>
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
                    <span>API Gateway</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Kong</span>
                    <span class="metric-label">统一入口</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-users"></i>
                    <span>User Service</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Go</span>
                    <span class="metric-label">用户管理</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-database"></i>
                    <span>Database</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">PostgreSQL</span>
                    <span class="metric-label">主数据库</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-memory"></i>
                    <span>Cache</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Redis</span>
                    <span class="metric-label">缓存层</span>
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
                    <span>代码生成</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">Beta</span>
                    <span class="metric-label">智能代码补全</span>
                </div>
                <div class="status-indicator research"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-file-alt"></i>
                    <span>文档生成</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">计划</span>
                    <span class="metric-label">自动API文档</span>
                </div>
                <div class="status-indicator planning"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-bug"></i>
                    <span>代码审查</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">研究</span>
                    <span class="metric-label">智能Bug检测</span>
                </div>
                <div class="status-indicator research"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-comments"></i>
                    <span>智能问答</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">原型</span>
                    <span class="metric-label">技术咨询助手</span>
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
                    <p>> 🔥 <strong>代码质量评估工具</strong>: 集成多种静态分析引擎</p>
                    <p>> 📚 <strong>云原生实践模板</strong>: 最佳实践模板库</p>
                    <p>> 🎯 <strong>文档协作平台</strong>: 支持实时编辑</p>
                    <p>> 🚀 <strong>DevOps工具链</strong>: 一站式CI/CD解决方案</p>
                    <p>> 🤖 <strong>智能运维监控</strong>: 支持异常预测</p>
                    <br>
                    <p style="color: var(--accent-green);">
                        <i class="fas fa-plus"></i>
                        持续收集新想法中...
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