---
layout: default
title: "Kk'wiki - 联系我"
permalink: /contact/
description: "与我取得联系，交流技术心得或合作机会"
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
                    <div class="terminal-title">kk@wiki:~$ contact</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line">
                        <span class="prompt">kk@wiki:~$</span>
                        <span class="command typed-text">cat /etc/contact-info</span>
                    </div>
                    <div class="terminal-output">
                        <div class="welcome-text">
                            <p>> 欢迎与我交流技术心得</p>
                            <p>> 联系方式: <span class="highlight">Email</span> | <span class="highlight">GitHub</span> | <span class="highlight">社交媒体</span></p>
                            <p>> 响应时间: <span class="highlight">通常24小时内</span></p>
                            <p>> 最后在线: <span class="highlight">{{ site.time | date: "%Y-%m-%d %H:%M" }}</span></p>
                        </div>
                        <div class="cursor-blink">_</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 联系方式 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-envelope"></i>
            联系方式
        </h2>
        <div class="quick-nav-grid">
            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>邮箱联系</h3>
                        <p>技术交流、合作机会或任何问题，都可以通过邮箱与我联系。</p>
                        <a href="mailto:kevin197011@example.com" class="nav-card-link">
                            发送邮件 <i class="fas fa-paper-plane"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>GitHub</h3>
                        <p>查看我的开源项目，提交Issue或参与代码贡献，一起构建更好的工具。</p>
                        <a href="https://github.com/kevin197011" target="_blank" class="nav-card-link">
                            访问GitHub <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>技术讨论</h3>
                        <p>对文章有疑问？想要深入讨论某个技术话题？随时欢迎技术交流。</p>
                        <a href="#discussion-form" class="nav-card-link">
                            开始讨论 <i class="fas fa-arrow-down"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 社交网络 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-share-alt"></i>
            社交网络
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon github">
                    <i class="fab fa-github"></i>
                </div>
                <div class="nav-link-content">
                    <h3>GitHub</h3>
                    <p>开源项目和代码分享</p>
                    <a href="https://github.com/kevin197011" target="_blank" class="nav-link-btn">
                        关注 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon twitter">
                    <i class="fab fa-twitter"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Twitter</h3>
                    <p>技术动态和观点分享</p>
                    <a href="https://twitter.com/kevin197011" target="_blank" class="nav-link-btn">
                        关注 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon linkedin">
                    <i class="fab fa-linkedin"></i>
                </div>
                <div class="nav-link-content">
                    <h3>LinkedIn</h3>
                    <p>职业网络和行业交流</p>
                    <a href="https://linkedin.com/in/kevin197011" target="_blank" class="nav-link-btn">
                        连接 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon blog">
                    <i class="fas fa-blog"></i>
                </div>
                <div class="nav-link-content">
                    <h3>个人博客</h3>
                    <p>深度技术文章和思考</p>
                    <a href="/" class="nav-link-btn">
                        阅读 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 合作与咨询 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-handshake"></i>
            合作与咨询
        </h2>
        <div class="status-grid">
            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-comments"></i>
                    <span>技术交流</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">欢迎</span>
                    <span class="metric-label">技术问题讨论</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-code"></i>
                    <span>代码交流</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">互相学习</span>
                    <span class="metric-label">代码分享、经验交流</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-book"></i>
                    <span>学习分享</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">乐于分享</span>
                    <span class="metric-label">学习心得、技术笔记</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-users"></i>
                    <span>开源参与</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">积极参与</span>
                    <span class="metric-label">开源项目贡献</span>
                </div>
                <div class="status-indicator online"></div>
            </div>
        </div>
    </section>

    <!-- 讨论表单 -->
    <section class="quick-nav-section" id="discussion-form">
        <h2 class="section-title">
            <i class="fas fa-comments"></i>
            快速留言
        </h2>
        <div class="hero-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~$ message</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="prompt">kk@wiki:~$</span>
                    <span class="command">echo "有什么想法？在GitHub Issues留言讨论吧！"</span>
                </div>
                <div class="terminal-output">
                    <div class="welcome-text">
                        <p>> 🎯 <strong>技术问题讨论</strong>: <a href="https://github.com/kevin197011/kevin197011.github.io/issues" target="_blank" style="color: var(--accent-green);">GitHub Issues</a></p>
                        <p>> 📧 <strong>私密咨询</strong>: <a href="mailto:kevin197011@example.com" style="color: var(--accent-blue);">kevin197011@example.com</a></p>
                        <p>> 💬 <strong>即时聊天</strong>: 通过社交媒体私信</p>
                        <p>> ⏰ <strong>响应时间</strong>: 工作日通常1-2小时，周末可能稍慢</p>
                        <br>
                        <p style="font-size: 0.9em; color: var(--text-muted);">
                            💡 <em>提示：技术问题建议在GitHub Issues讨论，这样其他人也能受益</em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 状态信息 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-info-circle"></i>
            当前状态
        </h2>
        <div class="hero-terminal" style="margin-bottom: 0;">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~$ status</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="prompt">kk@wiki:~$</span>
                    <span class="command">curl -s https://api.github.com/users/kevin197011 | jq '.bio'</span>
                </div>
                <div class="terminal-output">
                    <div class="welcome-text">
                        <p>> 📚 <strong>当前学习</strong>: DevOps工具链、容器化技术</p>
                        <p>> 💡 <strong>正在探索</strong>: 云原生技术、自动化运维</p>
                        <p>> 🎯 <strong>近期目标</strong>: 整理学习笔记、分享实践经验</p>
                        <p>> 🌍 <strong>位置</strong>: 中国 (UTC+8)</p>
                        <p>> ⚡ <strong>活跃时间</strong>: 通常在晚上和周末较为活跃</p>
                        <br>
                        <p style="color: var(--accent-green);">
                            <i class="fas fa-circle" style="font-size: 0.6em; animation: pulse 2s infinite;"></i>
                            当前在线，欢迎交流！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* 联系页面特定样式 */
.nav-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.nav-link-card {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.nav-link-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
    transition: var(--transition-normal);
}

.nav-link-card:hover::before {
    left: 0;
}

.nav-link-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-green);
}

.nav-link-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    font-size: 1.5rem;
    color: var(--bg-primary);
}

.nav-link-icon.github { background: linear-gradient(135deg, #333, #24292e); }
.nav-link-icon.twitter { background: linear-gradient(135deg, #1da1f2, #0d8bd9); }
.nav-link-icon.linkedin { background: linear-gradient(135deg, #0077b5, #005582); }
.nav-link-icon.blog { background: linear-gradient(135deg, var(--accent-green), var(--accent-blue)); }

.nav-link-content h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 1.1rem;
}

.nav-link-content p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    font-size: 0.9rem;
    line-height: 1.5;
}

.nav-link-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: var(--transition-fast);
}

.nav-link-btn:hover {
    color: var(--accent-blue);
    transform: translateX(4px);
}

.nav-link-btn i {
    font-size: 0.8rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .nav-links-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .nav-link-card {
        padding: var(--spacing-md);
    }

    .nav-link-icon {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
    }
}
</style>
