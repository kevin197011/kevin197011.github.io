---
layout: default
title: "导航"
permalink: /nav/
description: "常用链接和工具导航"
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
                    <div class="terminal-title">kk@wiki:~$ bookmarks</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line">
                        <span class="prompt">kk@wiki:~$</span>
                        <span class="command typed-text">cat bookmarks.json | jq .</span>
                    </div>
                    <div class="terminal-output">
                        <div class="welcome-text">
                            <p>> 个人导航和常用链接</p>
                            <p>> 分类管理: <span class="highlight">工具</span> | <span class="highlight">文档</span> | <span class="highlight">学习</span></p>
                            <p>> 快速访问: <span class="highlight">一键直达</span></p>
                            <p>> 最后更新: <span class="highlight" id="nav-update">{{ site.time | date: "%Y-%m-%d" }}</span></p>
                        </div>
                        <div class="cursor-blink">_</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 开发工具 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-code"></i>
            开发工具
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon github">
                    <i class="fab fa-github"></i>
                </div>
                <div class="nav-link-content">
                    <h3>GitHub</h3>
                    <p>代码托管和协作平台</p>
                    <a href="https://github.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon vscode">
                    <i class="fas fa-code"></i>
                </div>
                <div class="nav-link-content">
                    <h3>VS Code Online</h3>
                    <p>在线代码编辑器</p>
                    <a href="https://vscode.dev" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon docker">
                    <i class="fab fa-docker"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Docker Hub</h3>
                    <p>容器镜像仓库</p>
                    <a href="https://hub.docker.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon k8s">
                    <i class="fas fa-dharmachakra"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Kubernetes</h3>
                    <p>容器编排平台文档</p>
                    <a href="https://kubernetes.io" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 云服务 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-cloud"></i>
            云服务
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon aws">
                    <i class="fab fa-aws"></i>
                </div>
                <div class="nav-link-content">
                    <h3>AWS Console</h3>
                    <p>Amazon Web Services</p>
                    <a href="https://console.aws.amazon.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon azure">
                    <i class="fab fa-microsoft"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Azure Portal</h3>
                    <p>Microsoft Azure</p>
                    <a href="https://portal.azure.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon gcp">
                    <i class="fab fa-google"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Google Cloud</h3>
                    <p>Google Cloud Platform</p>
                    <a href="https://console.cloud.google.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon vercel">
                    <i class="fas fa-rocket"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Vercel</h3>
                    <p>前端部署平台</p>
                    <a href="https://vercel.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 学习资源 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-graduation-cap"></i>
            学习资源
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon docs">
                    <i class="fas fa-book"></i>
                </div>
                <div class="nav-link-content">
                    <h3>MDN Web Docs</h3>
                    <p>Web开发权威文档</p>
                    <a href="https://developer.mozilla.org" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon stackoverflow">
                    <i class="fab fa-stack-overflow"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Stack Overflow</h3>
                    <p>程序员问答社区</p>
                    <a href="https://stackoverflow.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon devto">
                    <i class="fas fa-dev"></i>
                </div>
                <div class="nav-link-content">
                    <h3>DEV Community</h3>
                    <p>开发者社区</p>
                    <a href="https://dev.to" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon freecodecamp">
                    <i class="fab fa-free-code-camp"></i>
                </div>
                <div class="nav-link-content">
                    <h3>freeCodeCamp</h3>
                    <p>免费编程学习</p>
                    <a href="https://freecodecamp.org" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- AI工具 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-brain"></i>
            AI工具
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon chatgpt">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="nav-link-content">
                    <h3>ChatGPT</h3>
                    <p>OpenAI的对话AI助手</p>
                    <a href="https://chat.openai.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon claude">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Claude</h3>
                    <p>Anthropic的AI助手</p>
                    <a href="https://claude.ai" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon midjourney">
                    <i class="fas fa-image"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Midjourney</h3>
                    <p>AI图像生成工具</p>
                    <a href="https://midjourney.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon perplexity">
                    <i class="fas fa-search-plus"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Perplexity</h3>
                    <p>AI搜索引擎</p>
                    <a href="https://perplexity.ai" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon copilot">
                    <i class="fas fa-code"></i>
                </div>
                <div class="nav-link-content">
                    <h3>GitHub Copilot</h3>
                    <p>AI编程助手</p>
                    <a href="https://github.com/features/copilot" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon huggingface">
                    <i class="fas fa-database"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Hugging Face</h3>
                    <p>AI模型平台</p>
                    <a href="https://huggingface.co" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon colab">
                    <i class="fas fa-flask"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Google Colab</h3>
                    <p>AI开发环境</p>
                    <a href="https://colab.research.google.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon cursor">
                    <i class="fas fa-cursor"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Cursor</h3>
                    <p>AI代码编辑器</p>
                    <a href="https://cursor.sh" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 实用工具 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-tools"></i>
            实用工具
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon json">
                    <i class="fas fa-code"></i>
                </div>
                <div class="nav-link-content">
                    <h3>JSON Formatter</h3>
                    <p>JSON格式化和验证</p>
                    <a href="https://jsonformatter.curiousconcept.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon regex">
                    <i class="fas fa-search"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Regex101</h3>
                    <p>正则表达式测试</p>
                    <a href="https://regex101.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon color">
                    <i class="fas fa-palette"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Coolors</h3>
                    <p>颜色搭配生成器</p>
                    <a href="https://coolors.co" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon convert">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Base64 Encode</h3>
                    <p>Base64编码解码</p>
                    <a href="https://www.base64encode.org" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 监控和状态 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-chart-line"></i>
            监控和状态
        </h2>
        <div class="nav-links-grid">
            <div class="nav-link-card">
                <div class="nav-link-icon status">
                    <i class="fas fa-heartbeat"></i>
                </div>
                <div class="nav-link-content">
                    <h3>GitHub Status</h3>
                    <p>GitHub服务状态</p>
                    <a href="https://www.githubstatus.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon downdetector">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="nav-link-content">
                    <h3>DownDetector</h3>
                    <p>网站宕机检测</p>
                    <a href="https://downdetector.com" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon speed">
                    <i class="fas fa-tachometer-alt"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Speedtest</h3>
                    <p>网络速度测试</p>
                    <a href="https://www.speedtest.net" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="nav-link-card">
                <div class="nav-link-icon ping">
                    <i class="fas fa-satellite"></i>
                </div>
                <div class="nav-link-content">
                    <h3>Ping.eu</h3>
                    <p>网络诊断工具</p>
                    <a href="https://ping.eu" target="_blank" class="nav-link-btn">
                        访问 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* 导航页面专用样式 */
.nav-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.nav-link-card {
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 12px;
    padding: var(--spacing-lg);
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
    display: flex;
    gap: var(--spacing-md);
}

.nav-link-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-accent);
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.nav-link-card:hover::before {
    opacity: 1;
}

.nav-link-card:hover {
    border-color: var(--accent-green);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.1);
}

.nav-link-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

/* 品牌颜色 */
.nav-link-icon.github {
    background: linear-gradient(135deg, #24292e, #0366d6);
    color: white;
}

.nav-link-icon.vscode {
    background: linear-gradient(135deg, #007acc, #0e639c);
    color: white;
}

.nav-link-icon.docker {
    background: linear-gradient(135deg, #2496ed, #0db7ed);
    color: white;
}

.nav-link-icon.k8s {
    background: linear-gradient(135deg, #326ce5, #2962ff);
    color: white;
}

.nav-link-icon.aws {
    background: linear-gradient(135deg, #ff9900, #ff6600);
    color: white;
}

.nav-link-icon.azure {
    background: linear-gradient(135deg, #0078d4, #0053a0);
    color: white;
}

.nav-link-icon.gcp {
    background: linear-gradient(135deg, #4285f4, #1a73e8);
    color: white;
}

.nav-link-icon.vercel {
    background: linear-gradient(135deg, #000000, #333333);
    color: white;
}

.nav-link-icon.docs {
    background: linear-gradient(135deg, #83b692, #5a9fd4);
    color: white;
}

.nav-link-icon.stackoverflow {
    background: linear-gradient(135deg, #f48024, #f48024);
    color: white;
}

.nav-link-icon.devto {
    background: linear-gradient(135deg, #000000, #1e1e1e);
    color: white;
}

.nav-link-icon.freecodecamp {
    background: linear-gradient(135deg, #006400, #28a745);
    color: white;
}

.nav-link-icon.json,
.nav-link-icon.regex,
.nav-link-icon.color,
.nav-link-icon.convert {
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
    color: white;
}

.nav-link-icon.status {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
}

.nav-link-icon.downdetector {
    background: linear-gradient(135deg, #ffc107, #fd7e14);
    color: white;
}

.nav-link-icon.speed {
    background: linear-gradient(135deg, #6f42c1, #e83e8c);
    color: white;
}

.nav-link-icon.ping {
    background: linear-gradient(135deg, #17a2b8, #20c997);
    color: white;
}

/* AI工具品牌颜色 */
.nav-link-icon.chatgpt {
    background: linear-gradient(135deg, #10a37f, #1a7f64);
    color: white;
}

.nav-link-icon.claude {
    background: linear-gradient(135deg, #d4763a, #c65c2a);
    color: white;
}

.nav-link-icon.midjourney {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
}

.nav-link-icon.perplexity {
    background: linear-gradient(135deg, #20bcc0, #1aa5a9);
    color: white;
}

.nav-link-icon.copilot {
    background: linear-gradient(135deg, #24292e, #586069);
    color: white;
}

.nav-link-icon.huggingface {
    background: linear-gradient(135deg, #ff9a00, #ff7f00);
    color: white;
}

.nav-link-icon.colab {
    background: linear-gradient(135deg, #f9ab00, #e8710a);
    color: white;
}

.nav-link-icon.cursor {
    background: linear-gradient(135deg, #000000, #2d2d2d);
    color: white;
}

.nav-link-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.nav-link-content h3 {
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.nav-link-content p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0 0 var(--spacing-md) 0;
    line-height: 1.4;
}

.nav-link-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color var(--transition-fast);
    align-self: flex-start;
}

.nav-link-btn:hover {
    color: var(--accent-blue);
}

.nav-link-btn i {
    font-size: 0.75rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .nav-links-grid {
        grid-template-columns: 1fr;
    }

    .nav-link-card {
        padding: var(--spacing-md);
    }

    .nav-link-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
}

@media (max-width: 480px) {
    .nav-link-card {
        flex-direction: column;
        text-align: center;
    }

    .nav-link-icon {
        align-self: center;
    }
}
</style>