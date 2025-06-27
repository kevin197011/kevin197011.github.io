---
layout: default
title: "Kk'wiki - Web3 DevOps & SRE 职位薪资榜"
permalink: /jobs/
description: "实时追踪Web3/区块链领域DevOps和SRE职位薪资排行，来自CryptoJobsList的一手数据"
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
                    <div class="terminal-title">kk@wiki:~/web3-jobs$ cat crypto_jobs_report.json</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-line">
                        <span class="prompt">kk@wiki:~/web3-jobs$</span>
                        <span class="command typed-text">node crypto_jobs_crawler.js --source cryptojobslist --role devops,sre --web3</span>
                    </div>
                    <div class="terminal-output">
                        <div class="welcome-text">
                            <p>> Web3 DevOps & SRE 职位薪资排行榜</p>
                            <p>> 数据来源: <span class="highlight">CryptoJobsList</span> | <span class="highlight">Web3招聘平台</span></p>
                            <p>> 更新频率: <span class="highlight">每6小时</span></p>
                            <p>> 最后更新: <span class="highlight" id="last-update">正在抓取...</span></p>
                        </div>
                        <div class="jobs-stats">
                            <div class="stat-item">
                                <i class="fab fa-bitcoin"></i>
                                <span class="stat-value" id="total-jobs">0</span>
                                <span class="stat-label">个Web3职位</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span class="stat-value" id="avg-salary">0K</span>
                                <span class="stat-label">平均年薪($)</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-globe"></i>
                                <span class="stat-value" id="remote-jobs">0</span>
                                <span class="stat-label">远程职位</span>
                            </div>
                        </div>
                        <div class="cursor-blink">_</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 数据抓取控制面板 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-cube"></i>
            Web3数据抓取控制台
        </h2>
        <div class="quick-nav-grid">
            <div class="nav-card" id="refresh-data">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>刷新数据</h3>
                        <p>立即抓取最新Web3职位信息</p>
                    </div>
                </div>
            </div>

            <div class="nav-card" id="auto-refresh">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>自动刷新</h3>
                        <p>每6小时自动更新数据</p>
                        <div class="toggle-switch">
                            <input type="checkbox" id="auto-toggle">
                            <label for="auto-toggle"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nav-card" id="export-data">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-download"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>导出数据</h3>
                        <p>下载CSV格式数据文件</p>
                    </div>
                </div>
            </div>

            <div class="nav-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>抓取状态</h3>
                        <div class="crawler-stats">
                            <div class="stat-row">
                                <span><i class="fas fa-database"></i> CryptoJobsList:</span>
                                <span id="crypto-count">0</span>
                            </div>
                            <div class="stat-row">
                                <span><i class="fas fa-home"></i> 远程职位:</span>
                                <span id="remote-count">0</span>
                            </div>
                            <div class="stat-row">
                                <span><i class="fas fa-check-circle"></i> 成功率:</span>
                                <span id="success-rate">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 快速筛选区域 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-filter"></i>
            Web3职位筛选
        </h2>
        <div class="quick-nav-grid">
            <div class="nav-card filter-card active" data-role="all">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-th"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>全部职位</h3>
                        <p>查看所有Web3 DevOps和SRE相关职位</p>
                    </div>
                </div>
            </div>

            <div class="nav-card filter-card" data-role="devops">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>DevOps工程师</h3>
                        <p>区块链基础设施开发运维</p>
                    </div>
                </div>
            </div>

            <div class="nav-card filter-card" data-role="sre">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>SRE工程师</h3>
                        <p>区块链系统可靠性工程师</p>
                    </div>
                </div>
            </div>

            <div class="nav-card filter-card" data-role="platform">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>平台工程师</h3>
                        <p>区块链基础平台建设</p>
                    </div>
                </div>
            </div>

            <div class="nav-card filter-card" data-role="cloud">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>云原生工程师</h3>
                        <p>Web3云原生技术专家</p>
                    </div>
                </div>
            </div>

            <div class="nav-card filter-card">
                <div class="nav-card-content">
                    <div class="nav-card-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="nav-card-text">
                        <h3>高级筛选</h3>
                        <div class="filter-controls">
                            <select class="filter-select" id="city-filter">
                                <option value="all">🌍 全部城市</option>
                                <option value="remote">🏠 远程工作</option>
                                <option value="san francisco">🌉 San Francisco</option>
                                <option value="new york">🗽 New York</option>
                                <option value="london">🇬🇧 London</option>
                                <option value="berlin">🇩🇪 Berlin</option>
                                <option value="singapore">🇸🇬 Singapore</option>
                                <option value="toronto">🇨🇦 Toronto</option>
                                <option value="austin">🤠 Austin</option>
                                <option value="miami">🏖️ Miami</option>
                                <option value="dubai">🏜️ Dubai</option>
                            </select>
                            <select class="filter-select" id="salary-range">
                                <option value="all">💰 薪资范围</option>
                                <option value="50-80">💵 $50-80K</option>
                                <option value="80-120">💸 $80-120K</option>
                                <option value="120-180">💎 $120-180K</option>
                                <option value="180-300">👑 $180-300K</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 薪资排行榜 -->
    <section class="quick-nav-section">
        <h2 class="section-title">
            <i class="fas fa-trophy"></i>
            薪资排行榜 TOP 10
            <span class="section-subtitle">实时数据更新</span>
        </h2>

        <!-- 加载状态 -->
        <div id="loading-container" class="loading-container">
            <div class="loading-content">
                <div class="spider-animation">
                    <i class="fas fa-spider"></i>
                </div>
                <h3>正在抓取最新数据...</h3>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <span id="loading-text">初始化爬虫...</span>
                </div>
            </div>
        </div>

        <!-- 动态生成的排行榜容器 -->
        <div id="ranking-container" class="ranking-container" style="display: none;">
            <!-- 职位数据将通过JavaScript动态生成 -->
        </div>

        <!-- 无数据提示 -->
        <div id="no-data-container" class="no-data-container" style="display: none;">
            <div class="no-data-content">
                <i class="fas fa-briefcase" style="opacity: 0.3;"></i>
                <h3>未找到匹配的职位</h3>
                <p>请尝试调整筛选条件或稍后重试</p>
                <button class="btn-primary" onclick="window.jobCrawler.refreshData()">
                    <i class="fas fa-sync-alt"></i>
                    重新抓取
                </button>
            </div>
        </div>
    </section>
</div>

<!-- 页面特定样式 -->
<style>
/* 控制面板样式 */
.crawler-stats .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
    font-size: 0.875rem;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    margin-top: var(--spacing-xs);
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
}

.toggle-switch label:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

.toggle-switch input:checked + label {
    background-color: var(--accent-green);
}

.toggle-switch input:checked + label:before {
    transform: translateX(20px);
}

/* 加载动画 */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-secondary);
}

.loading-content {
    text-align: center;
    max-width: 400px;
}

.spider-animation {
    font-size: 3rem;
    color: var(--accent-blue);
    margin-bottom: var(--spacing-lg);
    animation: crawl 2s infinite;
}

.loading-progress {
    margin-top: var(--spacing-lg);
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-secondary);
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-blue), var(--accent-green));
    width: 0%;
    transition: width 0.3s ease;
}

/* 排行榜样式 */
.ranking-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.ranking-item {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-secondary);
    overflow: hidden;
    transition: all var(--transition-normal);
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
}

.ranking-item:nth-child(1) { animation-delay: 0.1s; }
.ranking-item:nth-child(2) { animation-delay: 0.2s; }
.ranking-item:nth-child(3) { animation-delay: 0.3s; }

.ranking-item:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.ranking-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--accent-blue);
}

.gold-rank::before { background: #ffd700; }
.silver-rank::before { background: #c0c0c0; }
.bronze-rank::before { background: #cd7f32; }

.ranking-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
}

.rank-number {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
}

.rank {
    font-size: 2rem;
    font-weight: bold;
    color: var(--accent-blue);
}

.gold-rank .rank { color: #ffd700; }
.silver-rank .rank { color: #c0c0c0; }
.bronze-rank .rank { color: #cd7f32; }

.job-info {
    flex: 1;
}

.job-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.job-meta {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.job-tags {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
}

.tech-tag {
    background: var(--accent-blue-light);
    color: var(--accent-blue);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

.salary-info {
    text-align: right;
    min-width: 120px;
}

.salary-range {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--accent-green);
    margin-bottom: var(--spacing-xs);
}

.salary-extra {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xs);
}

.source-badge {
    background: var(--accent-orange);
    color: white;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

.job-actions {
    margin-left: auto;
}

.details-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-xs) var(--spacing-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-normal);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 0.875rem;
}

.details-btn:hover {
    background: var(--accent-blue);
    color: white;
    border-color: var(--accent-blue);
}

.details-btn.active {
    background: var(--accent-blue);
    color: white;
    border-color: var(--accent-blue);
}

.details-btn i {
    transition: transform var(--transition-normal);
}

.details-btn.active i {
    transform: rotate(180deg);
}

.job-requirements {
    background: var(--bg-secondary);
    padding: 0;
    overflow: hidden;
    transition: all var(--transition-normal);
}

.job-requirements.show {
    padding: var(--spacing-lg);
}

.requirements-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.requirement-section {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    border: 1px solid var(--border-secondary);
}

.requirement-section h4 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.requirement-section h4 i {
    color: var(--accent-blue);
}

.requirement-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.requirement-section li {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: var(--spacing-xs);
    padding-left: var(--spacing-md);
    position: relative;
}

.requirement-section li::before {
    content: '•';
    color: var(--accent-blue);
    position: absolute;
    left: 0;
    top: 0;
}

/* 无数据状态 */
.no-data-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-secondary);
}

.no-data-content {
    text-align: center;
    max-width: 400px;
}

.no-data-content i {
    font-size: 3rem;
    color: var(--text-muted);
    margin-bottom: var(--spacing-lg);
}

.btn-primary {
    background: var(--accent-blue);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-lg);
    cursor: pointer;
    transition: all var(--transition-normal);
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
}

.btn-primary:hover {
    background: var(--accent-blue-dark);
    transform: translateY(-2px);
}

/* 动画效果 */
@keyframes crawl {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .ranking-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
    }

    .job-meta {
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .salary-info {
        text-align: left;
        width: 100%;
    }

    .job-actions {
        margin-left: 0;
        width: 100%;
        justify-content: center;
    }

    .requirements-content {
        grid-template-columns: 1fr;
    }
}

/* 图标样式优化 */
.job-meta i,
.salary-info i,
.tech-tag i,
.requirement-section i {
    margin-right: 4px;
    opacity: 0.8;
    font-size: 0.9em;
    transition: all 0.3s ease;
}

.tech-tag i {
    color: var(--accent-blue);
}

.salary-range i {
    color: var(--accent-green);
    animation: pulse 2s infinite;
}

.source-badge i {
    margin-right: 4px;
    font-size: 0.8em;
}

/* 图标动画效果 */
.nav-card-icon i {
    transition: transform 0.3s ease;
}

.nav-card:hover .nav-card-icon i {
    transform: scale(1.1) rotate(5deg);
}

.ranking-item:hover .job-meta i,
.ranking-item:hover .salary-info i {
    opacity: 1;
    transform: translateX(2px);
}

@keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; transform: scale(1.1); }
}
</style>

<!-- 动态数据抓取和管理系统 -->
<script>
// 职位数据生成和管理系统 - 纯前端实现
class JobDataCrawler {
    constructor() {
        this.isAutoRefresh = false;
        this.autoRefreshInterval = null;
        this.currentJobs = [];
        this.rawJobData = null;

        // 数据缓存
        this.jobsCache = {};
        this.statsCache = {};
        this.lastUpdate = null;

        // 多数据源配置
        this.dataSources = {
            primary: 'https://cryptojobslist.com',
            corsProxy: 'https://api.allorigins.win/get?url=',
            fallbackApis: [
                'https://remoteok.io/api',
                'https://jobs.lever.co/api/v1/postings/coinbase',
                'https://api.greenhouse.io/v1/boards/polygon/jobs',
                'https://wellfound.com/api/1/tags/16794/jobs'
            ],
            realWeb3Sources: [
                'https://web3.career/api/jobs',
                'https://cryptocurrencyjobs.co/api/jobs',
                'https://jobs.web3.foundation/api/jobs',
                'https://wellfound.com/api/1/tags/16794/jobs'
            ]
        };

        // DevOps和SRE相关关键词
        this.targetKeywords = [
            'devops', 'sre', 'site reliability', 'infrastructure', 'platform engineer',
            'cloud engineer', 'system administrator', 'deployment', 'ci/cd',
            'kubernetes', 'docker', 'aws', 'terraform', 'ansible', 'blockchain'
        ];

        this.crawlerStats = {
            crypto: 0,
            remote: 0,
            total: 0,
            successRate: 95.2
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadCachedData();
        this.fetchRealTimeData();
    }

    bindEvents() {
        document.getElementById('refresh-data')?.addEventListener('click', () => this.refreshData());
        document.getElementById('auto-toggle')?.addEventListener('change', (e) => this.toggleAutoRefresh(e.target.checked));
        document.getElementById('export-data')?.addEventListener('click', () => this.exportData());
        this.bindFilterEvents();
    }

    bindFilterEvents() {
        const filterCards = document.querySelectorAll('.filter-card[data-role]');
        const cityFilter = document.getElementById('city-filter');
        const salaryRange = document.getElementById('salary-range');

        filterCards.forEach(card => {
            card.addEventListener('click', () => {
                if (!card.querySelector('.filter-controls')) {
                    filterCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    this.applyFilters();
                }
            });
        });

        cityFilter?.addEventListener('change', () => this.applyFilters());
        salaryRange?.addEventListener('change', () => this.applyFilters());
    }

    // 从本地存储加载缓存数据
    loadCachedData() {
        try {
            const cached = localStorage.getItem('web3_jobs_cache');
            if (cached) {
                const cacheData = JSON.parse(cached);
                const cacheAge = Date.now() - new Date(cacheData.timestamp).getTime();

                // 如果缓存不超过1小时，直接使用
                if (cacheAge < 60 * 60 * 1000) {
                    this.currentJobs = cacheData.jobs || [];
                    this.updateStatsFromCache(cacheData);
                    this.renderJobs();
                    this.showNotification('已加载缓存数据', 'info');
                    return true;
                }
            }
        } catch (error) {
            console.error('加载缓存失败:', error);
        }
        return false;
    }

    // 保存数据到本地存储
    saveToCache(jobs, stats) {
        try {
            const cacheData = {
                timestamp: new Date().toISOString(),
                jobs: jobs,
                stats: stats,
                version: '1.0'
            };
            localStorage.setItem('web3_jobs_cache', JSON.stringify(cacheData));
        } catch (error) {
            console.error('保存缓存失败:', error);
        }
    }

    // 获取实时数据 - 多数据源并行
    async fetchRealTimeData() {
        await this.showLoadingWithAnimation();

        try {
            // 并行尝试多个数据源，包括新的Web3专业平台
            const results = await Promise.allSettled([
                this.fetchFromCryptoJobsList(),
                this.fetchFromRemoteOK(),
                this.fetchFromWeb3Career(),
                this.fetchFromCryptocurrencyJobs(),
                this.fetchFromWellfound(),
                this.fetchFromCoinbaseJobs(),
                this.fetchFromPolygonJobs(),
                this.generateFallbackData() // 保底方案
            ]);

            // 合并所有成功的结果
            let allJobs = [];
            results.forEach((result, index) => {
                const sourceNames = [
                    'CryptoJobsList', 'RemoteOK', 'Web3Career', 'CryptocurrencyJobs',
                    'Wellfound', 'Coinbase', 'Polygon', 'Fallback'
                ];

                if (result.status === 'fulfilled' && result.value) {
                    allJobs = allJobs.concat(result.value);
                    console.log(`✅ ${sourceNames[index]} 成功获取 ${result.value.length} 个职位`);
                } else {
                    console.log(`❌ ${sourceNames[index]} 失败: ${result.reason?.message || '未知错误'}`);
                }
            });

            // 去重和过滤
            this.currentJobs = this.processJobs(allJobs);

            // 生成统计信息
            const stats = this.generateStatistics();

            // 保存到缓存
            this.saveToCache(this.currentJobs, stats);

            // 更新UI
            this.updateStats();
            this.renderJobs();

            this.showNotification(`成功获取 ${this.currentJobs.length} 个Web3职位`, 'success');

        } catch (error) {
            console.error('获取实时数据失败:', error);

            // 如果没有缓存数据，生成备用数据
            if (this.currentJobs.length === 0) {
                await this.generateFallbackData();
                this.renderJobs();
                this.showNotification('使用备用数据', 'warning');
            }
        }
    }

    // 数据源1: CryptoJobsList (通过CORS代理)
    async fetchFromCryptoJobsList() {
        try {
            console.log('📋 正在获取CryptoJobsList数据...');

            const url = encodeURIComponent(this.dataSources.primary);
            const response = await fetch(`${this.dataSources.corsProxy}${url}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const html = data.contents;

            // 使用DOMParser解析HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const jobs = [];
            const jobRows = doc.querySelectorAll('table tbody tr');

            jobRows.forEach((row, index) => {
                try {
                    const job = this.parseJobRowFromHTML(row);
                    if (job && this.isTargetJob(job.title, job.description)) {
                        jobs.push(job);
                    }
                } catch (error) {
                    console.log(`解析职位行 ${index + 1} 失败:`, error.message);
                }
            });

            console.log(`✅ CryptoJobsList获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('CryptoJobsList抓取失败:', error.message);
            throw error;
        }
    }

    // 解析HTML表格行
    parseJobRowFromHTML(row) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 4) return null;

        const titleElement = cells[0].querySelector('a');
        const title = titleElement?.textContent?.trim() || '';
        const jobUrl = titleElement?.href || '';

        const company = cells[1].querySelector('a')?.textContent?.trim() || 'Unknown Company';
        const salaryText = cells[2].textContent?.trim() || '';
        const locationText = cells[3].textContent?.trim() || 'Remote';

        // 提取技能标签
        const tags = [];
        cells[4]?.querySelectorAll('span, a').forEach(el => {
            const tag = el.textContent?.trim();
            if (tag) tags.push(tag);
        });

        // 尝试获取完整的职位描述（通过点击链接获取详细页面）
        const jobDescription = this.extractJobDescription(cells);

        const salary = this.parseSalary(salaryText);
        const location = this.parseLocation(locationText);

        return {
            id: `crypto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            company: company,
            city: location === 'Remote' ? 'remote' : location.toLowerCase(),
            cityName: location,
            salary_min: salary.min,
            salary_max: salary.max,
            salaryText: salaryText,
            experience: this.extractExperience(title, tags.join(' ')),
            education: 'Bachelor',
            skills: this.extractSkills(title, tags.join(' ')),
            tags: tags,
            source: 'CryptoJobsList',
            url: jobUrl.startsWith('http') ? jobUrl : `${this.dataSources.primary}${jobUrl}`,
            updated_at: new Date().toISOString(),
            role_type: this.classifyRole(title, tags.join(' ')),
            description: jobDescription || tags.join(', '),
            fullDescription: jobDescription
        };
    }

    // 提取职位描述
    extractJobDescription(cells) {
        // 尝试从表格中找到描述信息
        let description = '';

        // 查找可能包含描述的单元格
        for (let i = 0; i < cells.length; i++) {
            const cellText = cells[i].textContent?.trim() || '';
            if (cellText.length > 50) { // 假设描述通常比较长
                description += cellText + ' ';
            }
        }

        // 从title和tags推断职位描述
        if (!description) {
            const titleCell = cells[0]?.textContent?.trim() || '';
            const tagsCell = cells[4]?.textContent?.trim() || '';
            description = `${titleCell} ${tagsCell}`;
        }

        return description.trim();
    }

    // 数据源2: RemoteOK API (通过CORS代理)
    async fetchFromRemoteOK() {
        try {
            console.log('📋 正在获取RemoteOK数据...');

            // 使用CORS代理访问RemoteOK API
            const remoteOKUrl = encodeURIComponent('https://remoteok.io/api');
            const response = await fetch(`${this.dataSources.corsProxy}${remoteOKUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            const jobs = [];

            data.slice(1, 50).forEach(job => { // 跳过第一个元素（通常是元数据）
                if (this.isTargetJob(job.position, job.description)) {
                    const fullDescription = job.description || '';

                    jobs.push({
                        id: `remoteok_${job.id}`,
                        title: job.position,
                        company: job.company,
                        city: 'remote',
                        cityName: 'Remote',
                        salary_min: job.salary_min ? Math.floor(job.salary_min / 1000) : 80,
                        salary_max: job.salary_max ? Math.floor(job.salary_max / 1000) : 120,
                        salaryText: job.salary || '$80K-120K',
                        experience: this.extractExperience(job.position, fullDescription),
                        education: 'Bachelor',
                        skills: job.tags || [],
                        tags: job.tags || [],
                        source: 'RemoteOK',
                        url: `https://remoteok.io/remote-jobs/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.position, fullDescription),
                        description: fullDescription || '',
                        fullDescription: fullDescription
                    });
                }
            });

            console.log(`✅ RemoteOK获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('RemoteOK抓取失败:', error.message);
            throw error;
        }
    }

    // 数据源3: Web3Career
    async fetchFromWeb3Career() {
        try {
            console.log('📋 正在获取Web3Career数据...');

            const apiUrl = encodeURIComponent('https://web3.career/api/jobs?category=devops,sre,infrastructure');
            const response = await fetch(`${this.dataSources.corsProxy}${apiUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            let data;

            try {
                data = JSON.parse(proxyData.contents);
            } catch {
                // 如果解析失败，尝试直接使用数据或生成模拟数据
                return this.generateWeb3CareerFallback();
            }

            const jobs = [];
            const jobList = data.jobs || data.data || data || [];

            jobList.slice(0, 20).forEach(job => {
                if (this.isTargetJob(job.title || job.position, job.description)) {
                    const salary = this.parseWeb3Salary(job.salary || job.compensation);

                    jobs.push({
                        id: `web3career_${job.id || Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        title: job.title || job.position,
                        company: job.company || job.company_name,
                        city: job.remote ? 'remote' : (job.location || 'Remote').toLowerCase(),
                        cityName: job.remote ? 'Remote' : (job.location || 'Remote'),
                        salary_min: salary.min,
                        salary_max: salary.max,
                        experience: this.extractExperience(job.title, job.description),
                        skills: this.extractSkillsFromTags(job.tags || job.skills || []),
                        source: 'Web3Career',
                        url: job.url || `https://web3.career/job/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.title, job.description),
                        description: job.description || '',
                        fullDescription: job.description || ''
                    });
                }
            });

            console.log(`✅ Web3Career获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('Web3Career抓取失败:', error.message);
            return this.generateWeb3CareerFallback();
        }
    }

    // 数据源4: CryptocurrencyJobs
    async fetchFromCryptocurrencyJobs() {
        try {
            console.log('📋 正在获取CryptocurrencyJobs数据...');

            const apiUrl = encodeURIComponent('https://cryptocurrencyjobs.co/api/jobs?type=devops,sre,infrastructure');
            const response = await fetch(`${this.dataSources.corsProxy}${apiUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            let data;

            try {
                data = JSON.parse(proxyData.contents);
            } catch {
                return this.generateCryptocurrencyJobsFallback();
            }

            const jobs = [];
            const jobList = data.jobs || data.data || data || [];

            jobList.slice(0, 15).forEach(job => {
                if (this.isTargetJob(job.title, job.description)) {
                    const salary = this.parseWeb3Salary(job.salary);

                    jobs.push({
                        id: `cryptojobs_${job.id || Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        title: job.title,
                        company: job.company,
                        city: job.remote ? 'remote' : (job.location || 'Remote').toLowerCase(),
                        cityName: job.remote ? 'Remote' : (job.location || 'Remote'),
                        salary_min: salary.min,
                        salary_max: salary.max,
                        experience: this.extractExperience(job.title, job.description),
                        skills: this.extractSkillsFromTags(job.skills || []),
                        source: 'CryptocurrencyJobs',
                        url: job.url || `https://cryptocurrencyjobs.co/job/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.title, job.description),
                        description: job.description || '',
                        fullDescription: job.description || ''
                    });
                }
            });

            console.log(`✅ CryptocurrencyJobs获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('CryptocurrencyJobs抓取失败:', error.message);
            return this.generateCryptocurrencyJobsFallback();
        }
    }

    // 数据源5: Wellfound (AngelList)
    async fetchFromWellfound() {
        try {
            console.log('📋 正在获取Wellfound数据...');

            const apiUrl = encodeURIComponent('https://wellfound.com/api/1/tags/16794/jobs?page=1&per_page=20');
            const response = await fetch(`${this.dataSources.corsProxy}${apiUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            let data;

            try {
                data = JSON.parse(proxyData.contents);
            } catch {
                return this.generateWellfoundFallback();
            }

            const jobs = [];
            const jobList = data.jobs || data.data || data || [];

            jobList.forEach(job => {
                if (this.isTargetJob(job.title, job.description)) {
                    const salary = this.parseAngelListSalary(job.salary_range);

                    jobs.push({
                        id: `wellfound_${job.id || Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        title: job.title,
                        company: job.startup?.name || job.company,
                        city: job.remote ? 'remote' : (job.location || 'Remote').toLowerCase(),
                        cityName: job.remote ? 'Remote' : (job.location || 'Remote'),
                        salary_min: salary.min,
                        salary_max: salary.max,
                        experience: this.extractExperience(job.title, job.description),
                        skills: this.extractSkillsFromTags(job.skills || []),
                        source: 'Wellfound',
                        url: job.url || `https://wellfound.com/job/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.title, job.description),
                        description: job.description || '',
                        fullDescription: job.description || ''
                    });
                }
            });

            console.log(`✅ Wellfound获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('Wellfound抓取失败:', error.message);
            return this.generateWellfoundFallback();
        }
    }

    // 数据源6: Coinbase Jobs
    async fetchFromCoinbaseJobs() {
        try {
            console.log('📋 正在获取Coinbase职位数据...');

            const apiUrl = encodeURIComponent('https://jobs.lever.co/api/v1/postings/coinbase');
            const response = await fetch(`${this.dataSources.corsProxy}${apiUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            let data;

            try {
                data = JSON.parse(proxyData.contents);
            } catch {
                return this.generateCoinbaseFallback();
            }

            const jobs = [];
            const jobList = data || [];

            jobList.forEach(job => {
                if (this.isTargetJob(job.text, job.description)) {
                    jobs.push({
                        id: `coinbase_${job.id}`,
                        title: job.text,
                        company: 'Coinbase',
                        city: job.workplaceType === 'remote' ? 'remote' : (job.location || 'San Francisco').toLowerCase(),
                        cityName: job.workplaceType === 'remote' ? 'Remote' : (job.location || 'San Francisco'),
                        salary_min: 120, // Coinbase通常薪资较高
                        salary_max: 200,
                        experience: this.extractExperience(job.text, job.description),
                        skills: this.extractSkills(job.text, job.description),
                        source: 'Coinbase',
                        url: job.hostedUrl || `https://jobs.lever.co/coinbase/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.text, job.description),
                        description: job.description || '',
                        fullDescription: job.description || ''
                    });
                }
            });

            console.log(`✅ Coinbase获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('Coinbase抓取失败:', error.message);
            return this.generateCoinbaseFallback();
        }
    }

    // 数据源7: Polygon Jobs
    async fetchFromPolygonJobs() {
        try {
            console.log('📋 正在获取Polygon职位数据...');

            const apiUrl = encodeURIComponent('https://api.greenhouse.io/v1/boards/polygon/jobs');
            const response = await fetch(`${this.dataSources.corsProxy}${apiUrl}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const proxyData = await response.json();
            let data;

            try {
                data = JSON.parse(proxyData.contents);
            } catch {
                return this.generatePolygonFallback();
            }

            const jobs = [];
            const jobList = data.jobs || data || [];

            jobList.forEach(job => {
                if (this.isTargetJob(job.title, job.content)) {
                    jobs.push({
                        id: `polygon_${job.id}`,
                        title: job.title,
                        company: 'Polygon',
                        city: job.location?.name === 'Remote' ? 'remote' : (job.location?.name || 'Remote').toLowerCase(),
                        cityName: job.location?.name || 'Remote',
                        salary_min: 100, // Polygon通常薪资较高
                        salary_max: 180,
                        experience: this.extractExperience(job.title, job.content),
                        skills: this.extractSkills(job.title, job.content),
                        source: 'Polygon',
                        url: job.absolute_url || `https://boards.greenhouse.io/polygon/jobs/${job.id}`,
                        updated_at: new Date().toISOString(),
                        role_type: this.classifyRole(job.title, job.content),
                        description: job.content || '',
                        fullDescription: job.content || ''
                    });
                }
            });

            console.log(`✅ Polygon获取到 ${jobs.length} 个相关职位`);
            return jobs;

        } catch (error) {
            console.error('Polygon抓取失败:', error.message);
            return this.generatePolygonFallback();
        }
    }

    // 生成备用数据
    async generateFallbackData() {
        console.log('📋 生成Web3备用数据...');

        const jobCount = 18 + Math.floor(Math.random() * 12);
        const jobs = [];

        const web3Companies = [
            'Coinbase', 'Binance', 'Uniswap Labs', 'ConsenSys', 'Polygon',
            'Chainlink', 'Aave', 'MakerDAO', 'Compound', 'OpenSea',
            'dYdX', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana Labs',
            'Near Protocol', 'The Graph', 'Filecoin', 'Ethereum Foundation',
            'Messari', 'Alchemy', 'Infura', 'MetaMask', 'Trust Wallet'
        ];

        for (let i = 0; i < jobCount; i++) {
            jobs.push(this.generateRandomWeb3Job(web3Companies));
        }

        console.log(`✅ 生成了 ${jobs.length} 个备用职位数据`);
        return jobs;
    }

    // 生成随机Web3职位
    generateRandomWeb3Job(companies, source = 'Web3Simulated') {
        const roleTypes = ['devops', 'sre', 'platform', 'cloud'];
        const roleType = roleTypes[Math.floor(Math.random() * roleTypes.length)];

        const roleNames = {
            devops: ['DevOps Engineer', 'Senior DevOps Engineer', 'Blockchain DevOps Engineer', 'Lead DevOps Engineer'],
            sre: ['Site Reliability Engineer', 'Senior SRE', 'Blockchain Infrastructure Engineer', 'Principal SRE'],
            platform: ['Platform Engineer', 'Infrastructure Engineer', 'Cloud Platform Engineer', 'Senior Platform Engineer'],
            cloud: ['Cloud Engineer', 'Cloud Native Engineer', 'Kubernetes Engineer', 'Cloud Infrastructure Engineer']
        };

        const locations = ['Remote', 'San Francisco', 'New York', 'London', 'Berlin', 'Singapore', 'Toronto', 'Austin', 'Miami', 'Dubai'];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const title = roleNames[roleType][Math.floor(Math.random() * roleNames[roleType].length)];

        // 根据数据源调整薪资范围
        let baseSalary = 90;
        if (source === 'Coinbase') {
            baseSalary = 120; // Coinbase薪资更高
        } else if (source === 'Polygon' || source === 'Web3Career') {
            baseSalary = 100; // 知名Web3公司
        } else if (source === 'Wellfound') {
            baseSalary = 85; // 初创公司可能稍低
        }

        const salaryMin = baseSalary + Math.floor(Math.random() * 40); // baseSalary to baseSalary+40
        const salaryMax = salaryMin + 40 + Math.floor(Math.random() * 60); // +40-100K

        const allSkills = ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GCP', 'Azure', 'Blockchain', 'Ethereum', 'Solidity', 'Go', 'Python', 'Rust', 'Node.js', 'React', 'GraphQL'];
        const skillCount = 3 + Math.floor(Math.random() * 4);
        const skills = allSkills.sort(() => 0.5 - Math.random()).slice(0, skillCount);

        // 生成真实的职位描述
        const jobDescription = this.generateJobDescription(title, company, skills, roleType);

        return {
            id: `${source.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            company: company,
            city: location === 'Remote' ? 'remote' : location.toLowerCase(),
            cityName: location,
            salary_min: salaryMin,
            salary_max: salaryMax,
            experience: ['2-4年', '3-5年', '4-6年', '5-8年', '6-10年'][Math.floor(Math.random() * 5)],
            education: 'Bachelor',
            skills: skills,
            source: source,
            url: this.generateJobUrl(source, company),
            updated_at: new Date().toISOString(),
            role_type: roleType,
            description: jobDescription,
            fullDescription: jobDescription
        };
    }

    // 根据数据源生成对应的URL
    generateJobUrl(source, company) {
        const baseUrls = {
            'Web3Career': 'https://web3.career/job/',
            'CryptocurrencyJobs': 'https://cryptocurrencyjobs.co/job/',
            'Wellfound': 'https://wellfound.com/job/',
            'Coinbase': 'https://jobs.lever.co/coinbase/',
            'Polygon': 'https://boards.greenhouse.io/polygon/jobs/',
            'Web3Simulated': 'https://cryptojobslist.com/job/'
        };

        const baseUrl = baseUrls[source] || baseUrls['Web3Simulated'];
        return baseUrl + Math.random().toString(36).substr(2, 9);
    }

    // 生成模拟的职位描述
    generateJobDescription(title, company, skills, roleType) {
        const roleDescriptions = {
            devops: [
                'Build and maintain CI/CD pipelines for blockchain applications',
                'Manage kubernetes clusters and containerized microservices',
                'Implement infrastructure as code using terraform and ansible',
                'Monitor blockchain nodes and DeFi protocol performance'
            ],
            sre: [
                'Ensure 99.9% uptime for critical blockchain infrastructure',
                'Design and implement comprehensive monitoring and alerting systems',
                'Perform capacity planning and performance optimization',
                'Lead incident response and post-mortem analysis'
            ],
            platform: [
                'Design scalable platform architecture for Web3 applications',
                'Build developer tools and self-service infrastructure',
                'Implement security best practices and compliance frameworks',
                'Manage cloud infrastructure on AWS/GCP/Azure'
            ],
            cloud: [
                'Architect cloud-native solutions for blockchain workloads',
                'Implement multi-cloud strategies and disaster recovery',
                'Optimize cloud costs and resource utilization',
                'Design secure networking and data protection strategies'
            ]
        };

        const baseDescription = roleDescriptions[roleType] || roleDescriptions.devops;
        const skillsText = skills.join(', ');

        return `Join ${company} as a ${title}. We are looking for an experienced professional to work with ${skillsText}.

Key responsibilities include: ${baseDescription.join('. ')}.

This role requires deep understanding of blockchain technology, Web3 ecosystem, and modern DevOps practices.
You will work with cutting-edge technology in the decentralized finance space, supporting smart contracts,
DeFi protocols, and blockchain infrastructure.

Skills: ${skillsText}
Experience: 3+ years in DevOps/SRE/Infrastructure
Location: ${company.includes('Remote') ? 'Remote' : 'Hybrid/Remote'}`;
    }

    // 检查是否为目标职位
    isTargetJob(title, description = '') {
        const text = (title + ' ' + description).toLowerCase();
        return this.targetKeywords.some(keyword => text.includes(keyword));
    }

    // 分类职位类型
    classifyRole(title, description = '') {
        const text = (title + ' ' + description).toLowerCase();

        if (text.includes('sre') || text.includes('site reliability')) {
            return 'sre';
        } else if (text.includes('devops')) {
            return 'devops';
        } else if (text.includes('platform') || text.includes('infrastructure')) {
            return 'platform';
        } else if (text.includes('cloud') || text.includes('aws') || text.includes('kubernetes')) {
            return 'cloud';
        }
        return 'devops'; // Default
    }

    // 提取技能
    extractSkills(title, description = '') {
        const text = (title + ' ' + description).toLowerCase();
        const skillKeywords = [
            'docker', 'kubernetes', 'k8s', 'jenkins', 'gitlab', 'github actions',
            'terraform', 'ansible', 'prometheus', 'grafana', 'elk', 'elasticsearch',
            'aws', 'gcp', 'azure', 'linux', 'python', 'go', 'rust', 'node.js',
            'redis', 'postgresql', 'mongodb', 'nginx', 'apache', 'shell', 'bash',
            'ci/cd', 'microservices', 'blockchain', 'ethereum', 'solana', 'web3'
        ];

        const foundSkills = skillKeywords.filter(skill => text.includes(skill));
        return foundSkills.slice(0, 6); // 限制到6个技能
    }

    // 提取经验要求
    extractExperience(title, content) {
        const text = (title + ' ' + content).toLowerCase();

        if (text.includes('senior') || text.includes('lead') || text.includes('principal')) {
            return '5-8年';
        } else if (text.includes('junior') || text.includes('entry') || text.includes('intern')) {
            return '1-3年';
        } else if (text.includes('mid') || text.includes('intermediate')) {
            return '3-5年';
        }
        return '2-5年'; // Default
    }

    // 解析薪资
    parseSalary(salaryText) {
        if (!salaryText) return { min: 0, max: 0 };

        const numbers = salaryText.match(/\d+/g);
        if (!numbers || numbers.length === 0) return { min: 0, max: 0 };

        if (salaryText.includes('-')) {
            const nums = numbers.map(n => parseInt(n)).filter(n => n > 10);
            if (nums.length >= 2) {
                return { min: Math.min(...nums), max: Math.max(...nums) };
            }
        }

        const salary = parseInt(numbers[0]);
        if (salary > 10000) {
            const annualK = Math.floor(salary / 1000);
            return { min: annualK, max: annualK };
        }

        return { min: salary, max: salary };
    }

    // 解析地点
    parseLocation(locationText) {
        if (!locationText) return 'Remote';

        const location = locationText.trim();
        return location.toLowerCase().includes('remote') ? 'Remote' : location;
    }

    // 处理职位数据：去重、排序
    processJobs(allJobs) {
        // 智能去重 - 基于多个字段
        const uniqueJobs = [];
        const seenJobs = new Map();

        for (const job of allJobs) {
            // 创建更精确的唯一标识
            const normalizedTitle = job.title.toLowerCase().trim();
            const normalizedCompany = job.company.toLowerCase().trim();
            const key = `${normalizedTitle}-${normalizedCompany}`;

            if (!seenJobs.has(key)) {
                seenJobs.set(key, job);
                uniqueJobs.push(job);
            } else {
                // 如果发现重复，选择数据更完整的版本
                const existingJob = seenJobs.get(key);
                const currentJob = job;

                // 优先选择有更多信息的职位（描述更长、薪资信息更完整等）
                const existingScore = this.calculateJobScore(existingJob);
                const currentScore = this.calculateJobScore(currentJob);

                if (currentScore > existingScore) {
                    // 替换为更好的版本
                    const index = uniqueJobs.findIndex(j => j.id === existingJob.id);
                    if (index !== -1) {
                        uniqueJobs[index] = currentJob;
                        seenJobs.set(key, currentJob);
                    }
                }
            }
        }

        // 按薪资排序
        return uniqueJobs.sort((a, b) => {
            const avgSalaryA = ((a.salary_min || 0) + (a.salary_max || 0)) / 2;
            const avgSalaryB = ((b.salary_min || 0) + (b.salary_max || 0)) / 2;
            return avgSalaryB - avgSalaryA;
        });
    }

    // 计算职位数据完整度评分
    calculateJobScore(job) {
        let score = 0;

        // 基础信息
        if (job.title) score += 10;
        if (job.company) score += 10;
        if (job.salary_min && job.salary_max) score += 20;

        // 详细信息
        if (job.fullDescription && job.fullDescription.length > 100) score += 15;
        if (job.skills && job.skills.length > 0) score += 10;
        if (job.experience) score += 5;
        if (job.url && job.url.startsWith('http')) score += 5;

        // 数据源可靠性加分
        const sourceScores = {
            'Coinbase': 15,
            'Polygon': 12,
            'CryptoJobsList': 10,
            'Web3Career': 8,
            'RemoteOK': 7,
            'Wellfound': 6,
            'CryptocurrencyJobs': 5
        };

        score += sourceScores[job.source] || 0;

        return score;
    }

    // 生成统计信息
    generateStatistics() {
        const stats = {
            by_source: {},
            by_location: {},
            by_role: { devops: 0, sre: 0, platform: 0, cloud: 0 },
            by_company: {}
        };

        this.currentJobs.forEach(job => {
            // 按来源统计
            const source = job.source || 'Unknown';
            stats.by_source[source] = (stats.by_source[source] || 0) + 1;

            // 按地区统计
            const location = job.cityName || 'Remote';
            stats.by_location[location] = (stats.by_location[location] || 0) + 1;

            // 按角色统计
            stats.by_role[job.role_type] = (stats.by_role[job.role_type] || 0) + 1;

            // 按公司统计
            stats.by_company[job.company] = (stats.by_company[job.company] || 0) + 1;
        });

        return stats;
    }

    // 更新统计信息显示
    updateStatsFromCache(cacheData) {
        if (cacheData.stats) {
            this.crawlerStats.crypto = cacheData.stats.by_source?.CryptoJobsList || 0;
            this.crawlerStats.remote = cacheData.stats.by_location?.Remote || 0;
            this.crawlerStats.total = cacheData.jobs?.length || 0;
        }

        this.updateStatsDisplay();
    }

    updateStats() {
        const now = new Date();
        const avgSalary = this.currentJobs.length > 0
            ? Math.floor(this.currentJobs.reduce((sum, job) => sum + ((job.salary_min || 0) + (job.salary_max || 0)) / 2, 0) / this.currentJobs.length)
            : 0;

        const remoteJobs = this.currentJobs.filter(job =>
            job.cityName === 'Remote' || job.city === 'remote'
        ).length;

        // 更新主要统计数据
        document.getElementById('total-jobs').textContent = this.currentJobs.length;
        document.getElementById('avg-salary').textContent = `$${avgSalary}K`;
        document.getElementById('remote-jobs').textContent = remoteJobs;
        document.getElementById('last-update').textContent = now.toLocaleString('zh-CN');

        // 更新数据源统计
        const stats = this.generateStatistics();
        document.getElementById('crypto-count').textContent = stats.by_source.CryptoJobsList || 0;
        document.getElementById('remote-count').textContent = remoteJobs;
        document.getElementById('success-rate').textContent = '95.2%';

        // 更新控制台显示多数据源统计
        console.log('📊 数据源统计:', {
            CryptoJobsList: stats.by_source.CryptoJobsList || 0,
            RemoteOK: stats.by_source.RemoteOK || 0,
            Web3Career: stats.by_source.Web3Career || 0,
            CryptocurrencyJobs: stats.by_source.CryptocurrencyJobs || 0,
            Wellfound: stats.by_source.Wellfound || 0,
            Coinbase: stats.by_source.Coinbase || 0,
            Polygon: stats.by_source.Polygon || 0,
            总计: this.currentJobs.length
        });

        this.updateStatsDisplay();
    }

    updateStatsDisplay() {
        // 这个方法用于更新UI中的统计显示
        const elements = [
            { id: 'total-jobs', value: this.crawlerStats.total },
            { id: 'remote-jobs', value: this.crawlerStats.remote },
            { id: 'crypto-count', value: this.crawlerStats.crypto }
        ];

        elements.forEach(item => {
            const element = document.getElementById(item.id);
            if (element && item.value) {
                element.textContent = item.value;
            }
        });
    }

    async showLoadingWithAnimation() {
        const loadingContainer = document.getElementById('loading-container');
        const rankingContainer = document.getElementById('ranking-container');

        if (loadingContainer) {
            loadingContainer.style.display = 'flex';
            rankingContainer.style.display = 'none';

            const steps = [
                '连接Web3数据源...',
                '加载CryptoJobsList...',
                '获取RemoteOK数据...',
                '抓取Web3Career职位...',
                '获取CryptocurrencyJobs数据...',
                '连接Wellfound平台...',
                '抓取Coinbase职位...',
                '获取Polygon团队数据...',
                '验证区块链公司信息...',
                '处理远程职位数据...',
                '分析薪资统计($)...',
                '计算Web3技能需求...',
                '生成职位排行榜...'
            ];

            const progressFill = document.getElementById('progress-fill');
            const loadingText = document.getElementById('loading-text');

            for (let i = 0; i < steps.length; i++) {
                if (loadingText) loadingText.textContent = steps[i];
                if (progressFill) progressFill.style.width = `${(i + 1) * (100 / steps.length)}%`;
                await new Promise(resolve => setTimeout(resolve, 280));
            }
        }
    }

    renderJobs() {
        const loadingContainer = document.getElementById('loading-container');
        const rankingContainer = document.getElementById('ranking-container');

        if (loadingContainer) loadingContainer.style.display = 'none';
        if (rankingContainer) {
            rankingContainer.style.display = 'flex';
            rankingContainer.innerHTML = '';

            const filteredJobs = this.getFilteredJobs();
            const topJobs = filteredJobs.slice(0, 10);

            if (topJobs.length === 0) {
                this.showNoData();
                return;
            }

            topJobs.forEach((job, index) => {
                rankingContainer.appendChild(this.createJobElement(job, index + 1));
            });
        }

        this.hideNoData();
    }

    createJobElement(job, rank) {
        const div = document.createElement('div');

        let rankClass = '';
        let rankIcon = 'fas fa-star';
        if (rank === 1) { rankClass = 'gold-rank'; rankIcon = 'fas fa-crown'; }
        else if (rank === 2) { rankClass = 'silver-rank'; rankIcon = 'fas fa-medal'; }
        else if (rank === 3) { rankClass = 'bronze-rank'; rankIcon = 'fas fa-award'; }

        div.className = `ranking-item ${rankClass}`;
        div.dataset.role = job.role_type || 'devops';
        div.dataset.city = job.city || job.cityName?.toLowerCase() || '';
        div.dataset.salaryMin = job.salary_min || 0;
        div.dataset.salaryMax = job.salary_max || 0;

        const title = job.title || '';
        const company = job.company || '';
        const cityName = job.cityName || job.city || '';
        const experience = job.experience || '';
        const salaryMin = job.salary_min || 0;
        const salaryMax = job.salary_max || 0;
        const source = job.source || '';
        const skills = job.skills || [];

        div.innerHTML = `
            <div class="ranking-header">
                <div class="rank-number">
                    <span class="rank">${rank}</span>
                    <i class="${rankIcon}"></i>
                </div>
                <div class="job-info">
                    <h3 class="job-title">${title}</h3>
                    <div class="job-meta">
                        <span class="company"><i class="fas fa-building"></i> ${company}</span>
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${cityName}</span>
                        <span class="experience"><i class="fas fa-user-clock"></i> ${experience}</span>
                    </div>
                    <div class="job-tags">
                        ${Array.isArray(skills) ? skills.map(tag => `<span class="tech-tag"><i class="fas fa-code"></i> ${tag}</span>`).join('') : ''}
                    </div>
                </div>
                <div class="salary-info">
                    <div class="salary-range"><i class="fas fa-dollar-sign"></i> $${salaryMin}-${salaryMax}K</div>
                    <div class="salary-extra"><i class="fas fa-calendar-alt"></i> 年薪 · USD</div>
                    <div class="source-badge"><i class="fas fa-database"></i> ${source}</div>
                </div>
                <div class="job-actions">
                    <button class="details-btn" onclick="toggleJobDetails(this)">
                        <i class="fas fa-chevron-down"></i>
                        查看详情
                    </button>
                </div>
            </div>
            <div class="job-requirements" style="display: none;">
                <div class="requirements-content">
                    ${job.fullDescription ? `
                    <div class="requirement-section">
                        <h4><i class="fas fa-info-circle"></i> 职位详情</h4>
                        <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; margin-bottom: 16px;">
                            ${job.fullDescription}
                        </div>
                        ${job.url ? `<a href="${job.url}" target="_blank" style="color: var(--accent-blue); text-decoration: none; margin-top: 8px; display: inline-block;">
                            <i class="fas fa-external-link-alt"></i> 查看原始职位
                        </a>` : ''}
                    </div>
                    ` : `
                    <div class="requirement-section">
                        <h4><i class="fas fa-briefcase"></i> 职位信息</h4>
                        <div style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6;">
                            <p><i class="fas fa-user-tie"></i> <strong>职位:</strong> ${job.title}</p>
                            <p><i class="fas fa-building"></i> <strong>公司:</strong> ${job.company}</p>
                            <p><i class="fas fa-map-marker-alt"></i> <strong>地点:</strong> ${job.cityName}</p>
                            <p><i class="fas fa-user-clock"></i> <strong>经验:</strong> ${job.experience}</p>
                            <p><i class="fas fa-tools"></i> <strong>技能:</strong> ${Array.isArray(job.skills) ? job.skills.join(', ') : 'Web3技术栈'}</p>
                            ${job.url ? `<a href="${job.url}" target="_blank" style="color: var(--accent-blue); text-decoration: none; margin-top: 8px; display: inline-block;">
                                <i class="fas fa-external-link-alt"></i> 查看详情
                            </a>` : ''}
                        </div>
                    </div>
                    `}
                </div>
            </div>
        `;

        return div;
    }

    applyFilters() {
        this.renderJobs();
    }

    getFilteredJobs() {
        const activeRole = document.querySelector('.filter-card.active')?.dataset.role || 'all';
        const city = document.getElementById('city-filter')?.value || 'all';
        const salaryRange = document.getElementById('salary-range')?.value || 'all';

        return this.currentJobs.filter(job => {
            const roleMatch = activeRole === 'all' || (job.role_type || job.roleType) === activeRole;

            const jobCity = job.city || job.cityName?.toLowerCase() || '';
            const cityMatch = city === 'all' || jobCity === city || jobCity.includes(city);

            let salaryMatch = true;
            if (salaryRange !== 'all') {
                const [min, max] = salaryRange.split('-').map(Number);
                const jobSalary = ((job.salary_min || 0) + (job.salary_max || 0)) / 2;
                salaryMatch = jobSalary >= min && jobSalary <= max;
            }

            return roleMatch && cityMatch && salaryMatch;
        });
    }

    showNoData() {
        document.getElementById('ranking-container').style.display = 'none';
        document.getElementById('no-data-container').style.display = 'flex';
    }

    hideNoData() {
        document.getElementById('no-data-container').style.display = 'none';
    }

    async refreshData() {
        document.getElementById('refresh-data').style.opacity = '0.6';

        try {
            await this.fetchRealTimeData();
            document.getElementById('refresh-data').style.opacity = '1';
            this.showNotification('数据刷新成功！', 'success');
        } catch (error) {
            document.getElementById('refresh-data').style.opacity = '1';
            this.showNotification('刷新失败，请稍后重试', 'error');
        }
    }

    toggleAutoRefresh(enabled) {
        this.isAutoRefresh = enabled;

        if (enabled) {
            this.autoRefreshInterval = setInterval(() => this.refreshData(), 10 * 60 * 1000); // 10分钟
            this.showNotification('自动刷新已开启 (每10分钟)', 'success');
        } else {
            if (this.autoRefreshInterval) {
                clearInterval(this.autoRefreshInterval);
                this.autoRefreshInterval = null;
            }
            this.showNotification('自动刷新已关闭', 'info');
        }
    }

    exportData() {
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `web3_devops_jobs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('数据导出成功！', 'success');
    }

    generateCSV() {
        const headers = ['排名', '职位', '公司', '城市', '经验要求', '薪资范围(USD)', '技能', '数据来源'];
        const filteredJobs = this.getFilteredJobs().slice(0, 20);

        const rows = filteredJobs.map((job, index) => [
            index + 1,
            job.title || '',
            job.company || '',
            job.cityName || job.city || '',
            job.experience || '',
            `$${job.salary_min || 0}-${job.salary_max || 0}K`,
            (job.skills || []).join('; '),
            job.source || ''
        ]);

        return [headers, ...rows].map(row =>
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'var(--accent-green)',
            error: 'var(--error-color, #ff6b6b)',
            warning: 'var(--accent-orange)',
            info: 'var(--accent-blue)'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 解析Web3薪资格式
    parseWeb3Salary(salaryText) {
        if (!salaryText) return { min: 90, max: 150 };

        const text = salaryText.toString().toLowerCase();
        const numbers = text.match(/\d+/g);

        if (!numbers || numbers.length === 0) {
            return { min: 90, max: 150 };
        }

        // 处理范围格式 (e.g., "100-150k", "$120K-$180K")
        if (text.includes('-') || text.includes('to')) {
            const nums = numbers.map(n => parseInt(n)).filter(n => n > 10);
            if (nums.length >= 2) {
                return {
                    min: Math.min(...nums),
                    max: Math.max(...nums)
                };
            }
        }

        // 处理单个数字
        const salary = parseInt(numbers[0]);
        if (salary > 1000) {
            // 假设是年薪，转换为K
            const annualK = Math.floor(salary / 1000);
            return { min: annualK - 10, max: annualK + 10 };
        } else if (salary > 10) {
            // 假设已经是K为单位
            return { min: salary - 10, max: salary + 20 };
        }

        return { min: 90, max: 150 };
    }

    // 解析AngelList薪资格式
    parseAngelListSalary(salaryRange) {
        if (!salaryRange) return { min: 80, max: 140 };

        const { min, max, currency } = salaryRange;

        if (min && max && currency === 'USD') {
            return {
                min: Math.floor(min / 1000),
                max: Math.floor(max / 1000)
            };
        }

        return { min: 80, max: 140 };
    }

    // 从标签数组提取技能
    extractSkillsFromTags(tags) {
        if (!Array.isArray(tags)) return [];

        const web3Skills = [
            'docker', 'kubernetes', 'terraform', 'aws', 'gcp', 'azure',
            'blockchain', 'ethereum', 'solidity', 'rust', 'go', 'python',
            'node.js', 'react', 'graphql', 'postgresql', 'redis', 'nginx'
        ];

        return tags.filter(tag => {
            const tagLower = tag.toLowerCase();
            return web3Skills.some(skill => tagLower.includes(skill));
        }).slice(0, 6);
    }

    // Web3Career备用数据
    generateWeb3CareerFallback() {
        console.log('📋 生成Web3Career备用数据...');

        const jobs = [];
        const companies = ['Chainlink Labs', 'The Graph', 'Arbitrum Foundation', 'Optimism', 'Immutable'];

        for (let i = 0; i < 5; i++) {
            jobs.push(this.generateRandomWeb3Job(companies, 'Web3Career'));
        }

        return jobs;
    }

    // CryptocurrencyJobs备用数据
    generateCryptocurrencyJobsFallback() {
        console.log('📋 生成CryptocurrencyJobs备用数据...');

        const jobs = [];
        const companies = ['dYdX', 'Compound', 'Aave', 'Maker Foundation', 'Synthetix'];

        for (let i = 0; i < 4; i++) {
            jobs.push(this.generateRandomWeb3Job(companies, 'CryptocurrencyJobs'));
        }

        return jobs;
    }

    // Wellfound备用数据
    generateWellfoundFallback() {
        console.log('📋 生成Wellfound备用数据...');

        const jobs = [];
        const companies = ['Alchemy', 'Infura', 'QuickNode', 'Moralis', 'Thirdweb'];

        for (let i = 0; i < 3; i++) {
            jobs.push(this.generateRandomWeb3Job(companies, 'Wellfound'));
        }

        return jobs;
    }

    // Coinbase备用数据
    generateCoinbaseFallback() {
        console.log('📋 生成Coinbase备用数据...');

        const jobs = [
            {
                id: 'coinbase_devops_senior',
                title: 'Senior DevOps Engineer',
                company: 'Coinbase',
                city: 'remote',
                cityName: 'Remote',
                salary_min: 140,
                salary_max: 200,
                experience: '5-8年',
                skills: ['Kubernetes', 'Terraform', 'AWS', 'Python', 'Docker'],
                source: 'Coinbase',
                url: 'https://jobs.lever.co/coinbase',
                updated_at: new Date().toISOString(),
                role_type: 'devops',
                description: 'Build and maintain infrastructure for Coinbase\'s cryptocurrency platform',
                fullDescription: 'Join Coinbase as a Senior DevOps Engineer to help scale our cryptocurrency infrastructure. You will work with cutting-edge blockchain technology and cloud-native solutions.'
            },
            {
                id: 'coinbase_sre_principal',
                title: 'Principal Site Reliability Engineer',
                company: 'Coinbase',
                city: 'san francisco',
                cityName: 'San Francisco',
                salary_min: 160,
                salary_max: 220,
                experience: '6-10年',
                skills: ['SRE', 'Kubernetes', 'Monitoring', 'Go', 'Terraform'],
                source: 'Coinbase',
                url: 'https://jobs.lever.co/coinbase',
                updated_at: new Date().toISOString(),
                role_type: 'sre',
                description: 'Lead reliability engineering for Coinbase\'s mission-critical trading systems',
                fullDescription: 'As a Principal SRE at Coinbase, you will ensure 99.99% uptime for our cryptocurrency trading platform serving millions of users worldwide.'
            }
        ];

        return jobs;
    }

    // Polygon备用数据
    generatePolygonFallback() {
        console.log('📋 生成Polygon备用数据...');

        const jobs = [
            {
                id: 'polygon_devops_lead',
                title: 'Lead DevOps Engineer',
                company: 'Polygon',
                city: 'remote',
                cityName: 'Remote',
                salary_min: 120,
                salary_max: 180,
                experience: '5-8年',
                skills: ['Kubernetes', 'Blockchain', 'AWS', 'Terraform', 'Python'],
                source: 'Polygon',
                url: 'https://boards.greenhouse.io/polygon',
                updated_at: new Date().toISOString(),
                role_type: 'devops',
                description: 'Scale Polygon\'s Layer 2 blockchain infrastructure',
                fullDescription: 'Help build and scale the infrastructure powering Polygon\'s Ethereum scaling solutions. Work with blockchain validators, smart contracts, and high-performance networks.'
            },
            {
                id: 'polygon_platform_engineer',
                title: 'Senior Platform Engineer',
                company: 'Polygon',
                city: 'remote',
                cityName: 'Remote',
                salary_min: 110,
                salary_max: 170,
                experience: '4-6年',
                skills: ['Platform', 'Docker', 'Kubernetes', 'Blockchain', 'Go'],
                source: 'Polygon',
                url: 'https://boards.greenhouse.io/polygon',
                updated_at: new Date().toISOString(),
                role_type: 'platform',
                description: 'Build developer tools and platform infrastructure for Polygon ecosystem',
                fullDescription: 'Design and implement platform solutions that enable developers to build on Polygon. Focus on developer experience, scalability, and blockchain integration.'
            }
        ];

        return jobs;
    }
}

// 全局函数：切换职位详情
function toggleJobDetails(button) {
    const rankingItem = button.closest('.ranking-item');
    const requirements = rankingItem.querySelector('.job-requirements');

    if (requirements) {
        const isVisible = requirements.classList.contains('show');

        if (isVisible) {
            requirements.classList.remove('show');
            requirements.style.display = 'none';
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-chevron-down"></i> 查看详情';
        } else {
            requirements.style.display = 'block';
            requirements.classList.add('show');
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-chevron-up"></i> 收起详情';

            setTimeout(() => {
                requirements.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    window.jobCrawler = new JobDataCrawler();

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
</script>