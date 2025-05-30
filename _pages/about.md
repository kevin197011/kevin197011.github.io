---
title: "关于我"
author: Kk
date: 2024-01-03
category: About
layout: post
permalink: /about/
excerpt: "了解更多关于KkWiki的创建者和这个技术分享平台的故事"
---

<style>
@keyframes avatarGlow {
    from { box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3); }
    to { box-shadow: 0 15px 40px rgba(0, 255, 255, 0.5); }
}

@keyframes gradientMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.animate-avatar-glow {
    animation: avatarGlow 3s ease-in-out infinite alternate;
}

.animate-gradient-move {
    background-size: 200% 100%;
    animation: gradientMove 3s ease-in-out infinite;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.gradient-text {
    background: linear-gradient(45deg, #00ff88, #00d4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.card-top-border {
    position: relative;
}

.card-top-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00d4ff, #ff6b6b);
    background-size: 200% 100%;
    animation: gradientMove 3s ease-in-out infinite;
}

.grid-pattern {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
}
</style>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="relative text-center py-16 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-2xl mb-12 overflow-hidden">
        <div class="absolute inset-0 grid-pattern opacity-30"></div>
        <div class="relative z-10">
            <div class="w-36 h-36 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-gray-900 font-bold text-5xl md:text-6xl animate-avatar-glow animate-float">
                <i class="fas fa-terminal"></i>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                Kk
            </h1>
            <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                全栈开发工程师 | DevOps专家 | 技术布道者<br>
                专注于云原生技术、微服务架构和开发者工具
            </p>
        </div>
    </section>

    <!-- Info Cards -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div class="card-top-border bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 animate-on-scroll">
            <i class="fas fa-code text-4xl lg:text-5xl text-cyan-400 mb-4 block"></i>
            <h3 class="text-xl lg:text-2xl font-semibold text-white mb-4">技术专长</h3>
            <p class="text-gray-300 leading-relaxed">
                深耕后端开发多年，精通云原生技术栈。擅长设计高可用、可扩展的分布式系统，
                对DevOps文化有深刻理解，致力于提升开发效率和系统稳定性。
            </p>
        </div>

        <div class="card-top-border bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 animate-on-scroll">
            <i class="fas fa-heart text-4xl lg:text-5xl text-cyan-400 mb-4 block"></i>
            <h3 class="text-xl lg:text-2xl font-semibold text-white mb-4">技术理念</h3>
            <p class="text-gray-300 leading-relaxed">
                相信技术应该为业务服务，追求简洁优雅的解决方案。
                热衷于学习新技术，乐于分享经验，希望通过技术改变世界，让开发变得更加高效和有趣。
            </p>
        </div>

        <div class="card-top-border bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 animate-on-scroll">
            <i class="fas fa-rocket text-4xl lg:text-5xl text-cyan-400 mb-4 block"></i>
            <h3 class="text-xl lg:text-2xl font-semibold text-white mb-4">当前专注</h3>
            <p class="text-gray-300 leading-relaxed">
                目前专注于云原生技术生态，包括Kubernetes、Docker、微服务架构、
                以及现代化的CI/CD流水线。同时关注人工智能在开发运维中的应用。
            </p>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <i class="fas fa-tools text-cyan-400"></i>
            技术栈
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-server"></i>
                    后端开发
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Python</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Go</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Java</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Node.js</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Ruby</span>
                </div>
            </div>

            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-cloud"></i>
                    云原生
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Kubernetes</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Docker</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Helm</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Istio</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Prometheus</span>
                </div>
            </div>

            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-database"></i>
                    数据存储
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">PostgreSQL</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">MySQL</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">MongoDB</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Redis</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Elasticsearch</span>
                </div>
            </div>

            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-cogs"></i>
                    DevOps工具
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Jenkins</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">GitLab CI</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Ansible</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Terraform</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Grafana</span>
                </div>
            </div>

            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-laptop-code"></i>
                    前端技术
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">React</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Vue.js</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">TypeScript</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Tailwind CSS</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Next.js</span>
                </div>
            </div>

            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 animate-on-scroll">
                <h4 class="text-cyan-400 text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-cloud-upload-alt"></i>
                    云平台
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">AWS</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">Azure</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">GCP</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">阿里云</span>
                    <span class="skill-tag bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm border border-cyan-400/30 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 cursor-pointer">腾讯云</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:p-8 mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <i class="fas fa-chart-bar text-cyan-400"></i>
            数据统计
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div class="p-4">
                <div class="stat-number text-4xl lg:text-5xl font-bold gradient-text mb-2">5+</div>
                <div class="text-gray-300 text-sm lg:text-base">开发经验年限</div>
            </div>
            <div class="p-4">
                <div class="stat-number text-4xl lg:text-5xl font-bold gradient-text mb-2">50+</div>
                <div class="text-gray-300 text-sm lg:text-base">技术文章</div>
            </div>
            <div class="p-4">
                <div class="stat-number text-4xl lg:text-5xl font-bold gradient-text mb-2">100+</div>
                <div class="text-gray-300 text-sm lg:text-base">开源贡献</div>
            </div>
            <div class="p-4">
                <div class="stat-number text-4xl lg:text-5xl font-bold gradient-text mb-2">10K+</div>
                <div class="text-gray-300 text-sm lg:text-base">代码提交</div>
            </div>
        </div>
    </section>

    <!-- Timeline -->
    <section class="mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <i class="fas fa-history text-cyan-400"></i>
            职业历程
        </h2>
        <div class="space-y-8">
            <div class="flex gap-6 relative timeline-item animate-on-scroll">
                <div class="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 text-sm flex-shrink-0 relative z-10">
                    <i class="fas fa-rocket"></i>
                </div>
                <div class="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div class="text-cyan-400 text-sm font-semibold mb-2">2024 - 至今</div>
                    <div class="text-white text-lg font-semibold mb-2">技术布道者</div>
                    <div class="text-gray-300 leading-relaxed">
                        专注于云原生技术推广，撰写技术博客，参与开源项目，
                        分享DevOps最佳实践，帮助团队提升技术能力。
                    </div>
                </div>
            </div>

            <div class="flex gap-6 relative timeline-item animate-on-scroll">
                <div class="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 text-sm flex-shrink-0 relative z-10">
                    <i class="fas fa-users"></i>
                </div>
                <div class="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div class="text-cyan-400 text-sm font-semibold mb-2">2022 - 2024</div>
                    <div class="text-white text-lg font-semibold mb-2">高级DevOps工程师</div>
                    <div class="text-gray-300 leading-relaxed">
                        负责企业级云原生平台建设，设计和实施CI/CD流水线，
                        建立监控告警体系，大幅提升了系统稳定性和部署效率。
                    </div>
                </div>
            </div>

            <div class="flex gap-6 relative timeline-item animate-on-scroll">
                <div class="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 text-sm flex-shrink-0 relative z-10">
                    <i class="fas fa-code"></i>
                </div>
                <div class="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div class="text-cyan-400 text-sm font-semibold mb-2">2020 - 2022</div>
                    <div class="text-white text-lg font-semibold mb-2">全栈开发工程师</div>
                    <div class="text-gray-300 leading-relaxed">
                        参与多个大型Web应用的开发，负责后端API设计和前端交互实现，
                        积累了丰富的全栈开发经验。
                    </div>
                </div>
            </div>

            <div class="flex gap-6 relative timeline-item animate-on-scroll">
                <div class="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 text-sm flex-shrink-0 relative z-10">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div class="text-cyan-400 text-sm font-semibold mb-2">2019 - 2020</div>
                    <div class="text-white text-lg font-semibold mb-2">初级开发工程师</div>
                    <div class="text-gray-300 leading-relaxed">
                        开始软件开发职业生涯，主要从事后端开发工作，
                        快速学习各种技术栈，为后续发展打下坚实基础。
                    </div>
                </div>
            </div>
        </div>

        <!-- Timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700 hidden md:block timeline-line"></div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-400/5 border border-cyan-400/20 rounded-xl p-6 lg:p-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <i class="fas fa-envelope text-cyan-400"></i>
            联系方式
        </h2>
        <p class="text-gray-300 mb-6">欢迎与我交流技术话题，讨论合作机会，或者只是打个招呼！</p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/kevin197011" target="_blank" class="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white no-underline transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:-translate-y-1">
                <i class="fab fa-github"></i>
                GitHub
            </a>
            <a href="mailto:your.email@example.com" class="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white no-underline transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:-translate-y-1">
                <i class="fas fa-envelope"></i>
                Email
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" class="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white no-underline transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:-translate-y-1">
                <i class="fab fa-twitter"></i>
                Twitter
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" class="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white no-underline transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 hover:-translate-y-1">
                <i class="fab fa-linkedin"></i>
                LinkedIn
            </a>
        </div>
    </section>
</div>

<script>
// Add scroll animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics numbers
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 30);
        });
    };

    // Use Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Start number animation for stats section
                if (entry.target.querySelector('.stat-number')) {
                    animateNumbers();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add scroll animation to elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add timeline line animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        if (index < timelineItems.length - 1) {
            const line = document.createElement('div');
            line.className = 'absolute left-4 top-8 bottom-0 w-0.5 bg-gray-700 transform translate-x-0.5';
            line.style.height = 'calc(100% + 2rem)';
            item.appendChild(line);
        }
    });

    // Skill tag click effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Can add search functionality for related articles
            const skill = this.textContent;
            console.log(`Searching for articles about: ${skill}`);
            // window.location.href = `/search?q=${encodeURIComponent(skill)}`;
        });
    });
});

// Add mouse follow effect for avatar
document.addEventListener('mousemove', function(e) {
    const avatar = document.querySelector('.animate-avatar-glow');
    if (avatar && window.innerWidth > 768) {
        const rect = avatar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;

        avatar.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});
</script>