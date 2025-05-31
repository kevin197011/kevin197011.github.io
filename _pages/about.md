---
layout: default
title: "关于我"
permalink: /about/
description: "了解更多关于KkWiki的创建者和这个技术分享平台的故事"
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
                    <div class="terminal-title">kk@wiki:~$ whoami</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line">
                        <span class="prompt">kk@wiki:~$</span>
                        <span class="command typed-text">cat /etc/profile | grep -A 20 "# About Me"</span>
                    </div>
                    <div class="terminal-output">
                        <div class="welcome-text">
                            <p>> 全栈开发工程师 | DevOps专家 | 技术布道者</p>
                            <p>> 专注领域: <span class="highlight">云原生</span> | <span class="highlight">微服务</span> | <span class="highlight">容器化</span></p>
                            <p>> 当前状态: <span class="highlight">持续学习</span> & <span class="highlight">乐于分享</span></p>
                            <p>> 最后更新: <span class="highlight">{{ site.time | date: "%Y-%m-%d" }}</span></p>
                        </div>
                        <div class="cursor-blink">_</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 个人简介 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-user"></i>
            个人简介
        </h2>
        <div class="quick-nav-grid">
            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-terminal"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>技术专长</h3>
                        <p>深耕后端开发多年，精通云原生技术栈。擅长设计高可用、可扩展的分布式系统，对DevOps文化有深刻理解。</p>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>技术理念</h3>
                        <p>相信技术应该为业务服务，追求简洁优雅的解决方案。热衷于学习新技术，乐于分享经验和知识。</p>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>当前专注</h3>
                        <p>目前专注于云原生技术生态，包括Kubernetes、Docker、微服务架构以及现代化的CI/CD流水线。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 技术栈 -->
    <section class="tech-stack-section">
        <h2 class="section-title">
            <i class="fas fa-tools"></i>
            技术栈
            <span class="section-subtitle">我日常使用的技术和工具</span>
        </h2>

        <!-- 技术栈分类标签 -->
        <div class="tech-tabs">
            <button class="tech-tab active" data-category="all">
                <i class="fas fa-th"></i>
                全部
            </button>
            <button class="tech-tab" data-category="backend">
                <i class="fas fa-server"></i>
                后端
            </button>
            <button class="tech-tab" data-category="devops">
                <i class="fas fa-cogs"></i>
                DevOps
            </button>
            <button class="tech-tab" data-category="cloud">
                <i class="fas fa-cloud"></i>
                云服务
            </button>
            <button class="tech-tab" data-category="frontend">
                <i class="fas fa-laptop-code"></i>
                前端
            </button>
            <button class="tech-tab" data-category="database">
                <i class="fas fa-database"></i>
                数据库
            </button>
        </div>

        <!-- 技术栈网格 -->
        <div class="tech-stack-grid">
            <!-- 后端技术 -->
            <div class="tech-item" data-category="backend">
                <i class="fab fa-python"></i>
                <span>Python</span>
            </div>
            <div class="tech-item" data-category="backend">
                <div class="tech-icon">Go</div>
                <span>Go</span>
            </div>
            <div class="tech-item" data-category="backend">
                <i class="fab fa-java"></i>
                <span>Java</span>
            </div>
            <div class="tech-item" data-category="backend">
                <i class="fab fa-node-js"></i>
                <span>Node.js</span>
            </div>
            <div class="tech-item" data-category="backend">
                <div class="tech-icon">Ruby</div>
                <span>Ruby</span>
            </div>

            <!-- DevOps工具 -->
            <div class="tech-item" data-category="devops">
                <i class="fab fa-docker"></i>
                <span>Docker</span>
            </div>
            <div class="tech-item" data-category="devops">
                <div class="tech-icon">K8s</div>
                <span>Kubernetes</span>
            </div>
            <div class="tech-item" data-category="devops">
                <i class="fab fa-jenkins"></i>
                <span>Jenkins</span>
            </div>
            <div class="tech-item" data-category="devops">
                <i class="fab fa-gitlab"></i>
                <span>GitLab CI</span>
            </div>
            <div class="tech-item" data-category="devops">
                <div class="tech-icon">Ansible</div>
                <span>Ansible</span>
            </div>
            <div class="tech-item" data-category="devops">
                <div class="tech-icon">Terraform</div>
                <span>Terraform</span>
            </div>

            <!-- 云服务 -->
            <div class="tech-item" data-category="cloud">
                <i class="fab fa-aws"></i>
                <span>AWS</span>
            </div>
            <div class="tech-item" data-category="cloud">
                <i class="fab fa-microsoft"></i>
                <span>Azure</span>
            </div>
            <div class="tech-item" data-category="cloud">
                <i class="fab fa-google"></i>
                <span>GCP</span>
            </div>
            <div class="tech-item" data-category="cloud">
                <div class="tech-icon">阿里云</div>
                <span>阿里云</span>
            </div>
            <div class="tech-item" data-category="cloud">
                <div class="tech-icon">腾讯云</div>
                <span>腾讯云</span>
            </div>

            <!-- 前端技术 -->
            <div class="tech-item" data-category="frontend">
                <i class="fab fa-react"></i>
                <span>React</span>
            </div>
            <div class="tech-item" data-category="frontend">
                <i class="fab fa-vuejs"></i>
                <span>Vue.js</span>
            </div>
            <div class="tech-item" data-category="frontend">
                <div class="tech-icon">TS</div>
                <span>TypeScript</span>
            </div>
            <div class="tech-item" data-category="frontend">
                <div class="tech-icon">Tailwind</div>
                <span>Tailwind CSS</span>
            </div>
            <div class="tech-item" data-category="frontend">
                <div class="tech-icon">Next.js</div>
                <span>Next.js</span>
            </div>

            <!-- 数据库 -->
            <div class="tech-item" data-category="database">
                <div class="tech-icon">PostgreSQL</div>
                <span>PostgreSQL</span>
            </div>
            <div class="tech-item" data-category="database">
                <div class="tech-icon">MySQL</div>
                <span>MySQL</span>
            </div>
            <div class="tech-item" data-category="database">
                <div class="tech-icon">MongoDB</div>
                <span>MongoDB</span>
            </div>
            <div class="tech-item" data-category="database">
                <div class="tech-icon">Redis</div>
                <span>Redis</span>
            </div>
            <div class="tech-item" data-category="database">
                <div class="tech-icon">ES</div>
                <span>Elasticsearch</span>
            </div>
        </div>

        <!-- 技术栈统计 -->
        <div class="tech-stats">
            <div class="tech-stat-item">
                <span class="tech-stat-number" id="visible-tags-count">{{ site.data.tech_stack.size | default: 25 }}</span>
                <span class="tech-stat-label">项技术</span>
            </div>
            <div class="tech-stat-item">
                <span class="tech-stat-number">5+</span>
                <span class="tech-stat-label">年经验</span>
            </div>
            <div class="tech-stat-item">
                <span class="tech-stat-number">50+</span>
                <span class="tech-stat-label">项目经验</span>
            </div>
        </div>
    </section>

    <!-- 系统状态/统计 -->
    <section class="system-status-section">
        <h2 class="section-title">
            <i class="fas fa-chart-bar"></i>
            数据统计
        </h2>
        <div class="status-grid">
            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-calendar-alt"></i>
                    <span>开发经验</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">5+</span>
                    <span class="metric-label">年</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-file-alt"></i>
                    <span>技术文章</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">50+</span>
                    <span class="metric-label">篇</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-code-branch"></i>
                    <span>开源贡献</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">100+</span>
                    <span class="metric-label">次</span>
                </div>
                <div class="status-indicator online"></div>
            </div>

            <div class="status-card">
                <div class="status-header">
                    <i class="fas fa-commit"></i>
                    <span>代码提交</span>
                </div>
                <div class="status-metric">
                    <span class="metric-value">10K+</span>
                    <span class="metric-label">次</span>
                </div>
                <div class="status-indicator online"></div>
            </div>
        </div>
    </section>

    <!-- 职业历程 -->
    <section class="timeline-section">
        <h2 class="section-title">
            <i class="fas fa-history"></i>
            职业历程
            <span class="section-subtitle">我的技术成长轨迹</span>
        </h2>
        <div class="timeline-container">
            <div class="timeline-item">
                <div class="timeline-date">2024 - 至今</div>
                <div class="timeline-content">
                    <div class="timeline-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>技术布道者</h3>
                    <p>专注于云原生技术推广，撰写技术博客，参与开源项目，分享DevOps最佳实践，帮助团队提升技术能力。</p>
                    <div class="timeline-tags">
                        <span class="timeline-tag">云原生</span>
                        <span class="timeline-tag">技术分享</span>
                        <span class="timeline-tag">开源</span>
                    </div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-date">2022 - 2024</div>
                <div class="timeline-content">
                    <div class="timeline-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>高级DevOps工程师</h3>
                    <p>负责企业级云原生平台建设，设计和实施CI/CD流水线，建立监控告警体系，大幅提升了系统稳定性和部署效率。</p>
                    <div class="timeline-tags">
                        <span class="timeline-tag">Kubernetes</span>
                        <span class="timeline-tag">CI/CD</span>
                        <span class="timeline-tag">监控</span>
                    </div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-date">2020 - 2022</div>
                <div class="timeline-content">
                    <div class="timeline-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3>全栈开发工程师</h3>
                    <p>参与多个大型Web应用的开发，负责后端API设计和前端交互实现，积累了丰富的全栈开发经验。</p>
                    <div class="timeline-tags">
                        <span class="timeline-tag">全栈开发</span>
                        <span class="timeline-tag">API设计</span>
                        <span class="timeline-tag">前后端</span>
                    </div>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-date">2019 - 2020</div>
                <div class="timeline-content">
                    <div class="timeline-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3>初级开发工程师</h3>
                    <p>开始软件开发职业生涯，主要从事后端开发工作，快速学习各种技术栈，为后续发展打下坚实基础。</p>
                    <div class="timeline-tags">
                        <span class="timeline-tag">后端开发</span>
                        <span class="timeline-tag">学习成长</span>
                        <span class="timeline-tag">基础建设</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 联系方式 -->
    <section class="contact-section">
        <h2 class="section-title">
            <i class="fas fa-envelope"></i>
            联系方式
            <span class="section-subtitle">欢迎与我交流技术话题</span>
        </h2>
        <div class="contact-grid">
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fab fa-github"></i>
                </div>
                <div class="contact-info">
                    <h3>GitHub</h3>
                    <p>查看我的开源项目和代码贡献</p>
                    <a href="https://github.com/kevin197011" target="_blank" class="contact-link">
                        访问 GitHub <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-info">
                    <h3>Email</h3>
                    <p>技术交流、合作洽谈或问题咨询</p>
                    <a href="mailto:your.email@example.com" class="contact-link">
                        发送邮件 <i class="fas fa-paper-plane"></i>
                    </a>
                </div>
            </div>

            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fab fa-twitter"></i>
                </div>
                <div class="contact-info">
                    <h3>Twitter</h3>
                    <p>关注我的技术动态和分享</p>
                    <a href="https://twitter.com/yourusername" target="_blank" class="contact-link">
                        关注 Twitter <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>

            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fab fa-linkedin"></i>
                </div>
                <div class="contact-info">
                    <h3>LinkedIn</h3>
                    <p>职业背景和工作经历</p>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" class="contact-link">
                        查看 Profile <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<!-- 页面样式 -->
<style>
/* 时间线样式 */
.timeline-section {
    margin-bottom: var(--spacing-xl);
}

.timeline-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline-container::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-green), var(--accent-blue));
}

.timeline-item {
    position: relative;
    margin-bottom: var(--spacing-xl);
    padding-left: 80px;
}

.timeline-date {
    position: absolute;
    left: -10px;
    top: 0;
    background: var(--bg-card);
    color: var(--accent-green);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    font-size: 0.875rem;
    font-family: var(--font-mono);
    border: 1px solid var(--border-primary);
    white-space: nowrap;
}

.timeline-content {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    position: relative;
    transition: var(--transition-normal);
}

.timeline-content:hover {
    border-color: var(--accent-green);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.timeline-content::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 20px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: var(--border-primary);
}

.timeline-content:hover::before {
    border-right-color: var(--accent-green);
}

.timeline-icon {
    position: absolute;
    left: -45px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: var(--gradient-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-primary);
    font-size: 0.875rem;
    z-index: 1;
}

.timeline-content h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 1.2rem;
}

.timeline-content p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
}

.timeline-tags {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
}

.timeline-tag {
    background: var(--bg-tertiary);
    color: var(--accent-blue);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
}

/* 联系方式样式 */
.contact-section {
    margin-bottom: var(--spacing-xl);
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
}

.contact-card {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    text-align: center;
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.contact-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
    transition: var(--transition-normal);
}

.contact-card:hover::before {
    left: 0;
}

.contact-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-green);
}

.contact-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-md);
    font-size: 1.5rem;
    color: var(--bg-primary);
}

.contact-info h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 1.1rem;
}

.contact-info p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: var(--spacing-md);
    line-height: 1.5;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition-fast);
}

.contact-link:hover {
    color: var(--accent-blue);
    transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .timeline-container::before {
        left: 15px;
    }

    .timeline-item {
        padding-left: 50px;
    }

    .timeline-date {
        position: static;
        display: inline-block;
        margin-bottom: var(--spacing-sm);
    }

    .timeline-icon {
        left: -30px;
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
    }

    .timeline-content::before {
        left: -8px;
        border-width: 6px;
    }

    .contact-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .contact-card {
        padding: var(--spacing-md);
    }

    .contact-icon {
        width: 50px;
        height: 50px;
        font-size: 1.3rem;
    }
}

@media (max-width: 480px) {
    .timeline-tags {
        justify-content: center;
    }

    .timeline-tag {
        font-size: 0.7rem;
        padding: 2px var(--spacing-xs);
    }
}
</style>

<!-- 页面脚本 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面动画
    initPageAnimations();

    // 初始化技术栈交互
    initTechStackInteractions();

    // 初始化统计数字动画
    initStatsAnimation();
});

function initPageAnimations() {
    // 使用 Intersection Observer 为元素添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // 为时间线项目添加延迟动画
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.nav-card, .timeline-item, .contact-card, .status-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initTechStackInteractions() {
    // 技术栈标签切换
    const techTabs = document.querySelectorAll('.tech-tab');
    const techItems = document.querySelectorAll('.tech-item');

    techTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            techTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 获取筛选类别
            const category = tab.dataset.category;

            // 筛选技术项
            filterTechItems(category);

            // 更新统计
            updateTechStats(category);
        });
    });

    // 技术项点击效果
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const techName = item.querySelector('span').textContent;

            // 添加点击动画
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);

            // 可以在这里添加搜索相关文章的功能
            console.log(`Clicked on: ${techName}`);
        });
    });
}

function filterTechItems(category) {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            // 添加渐入动画
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, Math.random() * 200);
        } else {
            item.style.display = 'none';
        }
    });
}

function updateTechStats(category) {
    const visibleTagsCount = document.getElementById('visible-tags-count');
    const techItems = document.querySelectorAll('.tech-item');

    if (!visibleTagsCount) return;

    let count = 0;
    techItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            count++;
        }
    });

    // 数字动画
    animateNumber(visibleTagsCount, count);
}

function animateNumber(element, targetNumber) {
    const startNumber = parseInt(element.textContent) || 0;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(startNumber + (targetNumber - startNumber) * easeOut);

        element.textContent = currentNumber;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
}

function initStatsAnimation() {
    // 为状态卡片中的数字添加滚动到视图时的动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target.querySelector('.metric-value');
                if (metricValue && !metricValue.dataset.animated) {
                    const targetText = metricValue.textContent;
                    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
                    const suffix = targetText.replace(/[0-9]/g, '');

                    if (targetNumber) {
                        metricValue.dataset.animated = 'true';
                        animateMetricNumber(metricValue, targetNumber, suffix);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.status-card').forEach(card => {
        observer.observe(card);
    });
}

function animateMetricNumber(element, targetNumber, suffix) {
    let current = 0;
    const increment = targetNumber / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// 添加页面滚动进度指示器
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 初始化滚动进度条
addScrollProgress();
</script>