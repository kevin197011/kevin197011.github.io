---
layout: default
title: 文档归档
permalink: /archive/
description: 按时间查看所有技术文档
---

<div class="archive-page">
    <!-- 归档页头部 -->
    <header class="archive-header">
        <div class="archive-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~/archive$</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="prompt">kk@wiki:~/archive$</span>
                    <span class="command typed-text">ls -la --group-directories-first</span>
                </div>
                <div class="archive-stats">
                    <div class="stat-item">
                        <i class="fas fa-file-alt"></i>
                        <span class="stat-value">{{ site.posts.size }}</span>
                        <span class="stat-label">篇文档</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-calendar"></i>
                        <span class="stat-value">{{ site.posts | group_by_exp: "post", "post.date | date: '%Y'" | size }}</span>
                        <span class="stat-label">年份</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-folder"></i>
                        <span class="stat-value">{{ site.categories.size }}</span>
                        <span class="stat-label">分类</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- 搜索和筛选 -->
    <div class="archive-controls">
        <div class="search-section">
            <div class="search-box">
                <input type="text" id="archive-search" placeholder="搜索文档标题..." class="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>

        <div class="filter-section">
            <div class="filter-group">
                <label>按分类筛选:</label>
                <select id="category-filter" class="filter-select">
                    <option value="">全部分类</option>
                    {% for category in site.categories %}
                    <option value="{{ category[0] }}">{{ category[0] }} ({{ category[1].size }})</option>
                    {% endfor %}
                </select>
            </div>

            <div class="filter-group">
                <label>按年份筛选:</label>
                <select id="year-filter" class="filter-select">
                    <option value="">全部年份</option>
                    {% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
                    {% for year in years %}
                    <option value="{{ year.name }}">{{ year.name }} ({{ year.items.size }})</option>
                    {% endfor %}
                </select>
            </div>
        </div>
    </div>

    <!-- 归档内容 -->
    <main class="archive-content">
        {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
        {% for year_group in posts_by_year %}
        <section class="year-section" data-year="{{ year_group.name }}">
            <h2 class="year-title">
                <i class="fas fa-calendar-alt"></i>
                {{ year_group.name }}
                <span class="year-count">{{ year_group.items.size }} 篇</span>
                <button class="year-toggle" data-target="year-{{ year_group.name }}">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </h2>

            <div class="year-content" id="year-{{ year_group.name }}">
                {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%m'" | sort: "name" | reverse %}
                {% for month_group in posts_by_month %}
                <div class="month-section">
                    <h3 class="month-title">
                        <i class="fas fa-folder-open"></i>
                        {{ month_group.items[0].date | date: "%B" }}
                        <span class="month-count">{{ month_group.items.size }} 篇</span>
                    </h3>

                    <div class="posts-list">
                        {% for post in month_group.items %}
                        <article class="archive-post" data-category="{{ post.category | default: 'General' }}" data-year="{{ post.date | date: '%Y' }}">
                            <div class="post-meta">
                                <time class="post-date">{{ post.date | date: "%m-%d" }}</time>
                                <span class="post-category">
                                    <i class="fas fa-tag"></i>
                                    {{ post.category | default: "General" }}
                                </span>
                            </div>

                            <h4 class="post-title">
                                <a href="{{ post.url | relative_url }}" class="post-link">
                                    {{ post.title }}
                                </a>
                            </h4>

                            {% if post.excerpt %}
                            <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                            {% endif %}

                            {% if post.tags and post.tags.size > 0 %}
                            <div class="post-tags">
                                {% for tag in post.tags limit: 3 %}
                                <span class="tag">#{{ tag }}</span>
                                {% endfor %}
                                {% if post.tags.size > 3 %}
                                <span class="tag-more">+{{ post.tags.size | minus: 3 }}</span>
                                {% endif %}
                            </div>
                            {% endif %}

                            <div class="post-actions">
                                <a href="{{ post.url | relative_url }}" class="read-more">
                                    <i class="fas fa-arrow-right"></i>
                                    阅读全文
                                </a>
                            </div>
                        </article>
                        {% endfor %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </section>
        {% endfor %}

        <!-- 空状态 -->
        <div class="empty-state" id="empty-state" style="display: none;">
            <i class="fas fa-search"></i>
            <h3>未找到匹配的文档</h3>
            <p>请尝试调整搜索条件或筛选选项</p>
        </div>
    </main>

    <!-- 回到顶部 -->
    <button class="back-to-top" id="back-to-top" title="回到顶部">
        <i class="fas fa-chevron-up"></i>
    </button>
</div>

<!-- 归档页面样式 -->
<style>
.archive-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-lg);
}

/* 归档头部 */
.archive-header {
    margin-bottom: var(--spacing-xl);
}

.archive-terminal {
    background: var(--bg-card);
    border-radius: 8px;
    border: 1px solid var(--border-secondary);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.archive-stats {
    display: flex;
    gap: var(--spacing-lg);
    margin: var(--spacing-md) 0;
    justify-content: center;
    flex-wrap: wrap;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.875rem;
}

.stat-value {
    color: var(--accent-green);
    font-weight: 600;
    font-size: 1.1rem;
}

/* 控制区域 */
.archive-controls {
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    display: flex;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
    align-items: end;
}

.search-section,
.filter-section {
    flex: 1;
    min-width: 250px;
}

.filter-section {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

/* 搜索框样式 */
.search-box {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    color: var(--text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    padding-right: 2.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: var(--transition-fast);
    font-family: var(--font-primary);
}

.search-input:focus {
    outline: none;
    border-color: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.search-input::placeholder {
    color: var(--text-muted);
}

.search-icon {
    position: absolute;
    right: var(--spacing-md);
    color: var(--text-muted);
    pointer-events: none;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    min-width: 150px;
}

.filter-group label {
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
}

.filter-select {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    color: var(--text-primary);
    padding: var(--spacing-sm);
    border-radius: 4px;
    font-size: 0.875rem;
    transition: var(--transition-fast);
}

.filter-select:focus {
    outline: none;
    border-color: var(--accent-green);
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

/* 年份区域 */
.year-section {
    margin-bottom: var(--spacing-xl);
}

.year-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    border-bottom: 2px solid var(--border-secondary);
    cursor: pointer;
    user-select: none;
}

.year-title:hover {
    color: var(--accent-green);
}

.year-count {
    margin-left: auto;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.8rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
}

.year-toggle {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition-fast);
    padding: var(--spacing-xs);
    border-radius: 4px;
}

.year-toggle:hover {
    color: var(--accent-green);
    background: var(--bg-hover);
}

.year-toggle.collapsed i {
    transform: rotate(-90deg);
}

.year-content {
    transition: var(--transition-normal);
    overflow: hidden;
}

.year-content.collapsed {
    max-height: 0;
    margin: 0;
    padding: 0;
}

/* 月份区域 */
.month-section {
    margin-bottom: var(--spacing-lg);
}

.month-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
}

.month-count {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-family: var(--font-mono);
}

/* 文章列表 */
.posts-list {
    display: grid;
    gap: var(--spacing-md);
}

.archive-post {
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    transition: var(--transition-normal);
    position: relative;
}

.archive-post:hover {
    border-color: var(--accent-green);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.archive-post .post-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
}

.archive-post .post-date {
    color: var(--text-muted);
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
}

.archive-post .post-category {
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.archive-post .post-title {
    margin: var(--spacing-sm) 0;
    font-size: 1.1rem;
    line-height: 1.4;
}

.archive-post .post-link {
    color: var(--text-primary);
    text-decoration: none;
    transition: var(--transition-fast);
}

.archive-post .post-link:hover {
    color: var(--accent-green);
}

.archive-post .post-excerpt {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: var(--spacing-sm) 0;
}

.archive-post .post-tags {
    display: flex;
    gap: var(--spacing-xs);
    margin: var(--spacing-sm) 0;
    flex-wrap: wrap;
}

.archive-post .tag {
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
}

.archive-post .tag-more {
    background: var(--accent-green);
    color: var(--bg-primary);
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
}

.archive-post .post-actions {
    margin-top: var(--spacing-md);
    display: flex;
    justify-content: flex-end;
}

.archive-post .read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition-fast);
}

.archive-post .read-more:hover {
    color: var(--accent-blue);
    transform: translateX(4px);
}

/* 空状态 */
.empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-muted);
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-secondary);
}

.empty-state h3 {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
}

/* 回到顶部按钮 */
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent-green);
    color: var(--bg-primary);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: var(--transition-normal);
    z-index: 1000;
    box-shadow: var(--shadow-lg);
}

.back-to-top.visible {
    opacity: 1;
    transform: translateY(0);
}

.back-to-top:hover {
    background: var(--accent-blue);
    transform: translateY(-2px);
}

/* 亮色主题适配 */
html.light .archive-terminal {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

html.light .archive-post {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-sm);
}

html.light .archive-post:hover {
    box-shadow: var(--shadow-md);
}

html.light .search-input {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
}

html.light .filter-select {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .archive-page {
        padding: var(--spacing-lg) var(--spacing-md);
    }

    .archive-controls {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .filter-section {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .archive-stats {
        gap: var(--spacing-md);
    }

    .stat-item {
        font-size: 0.8rem;
    }

    .year-title {
        font-size: 1.3rem;
        flex-wrap: wrap;
    }

    .month-title {
        font-size: 1.1rem;
        flex-wrap: wrap;
    }

    .archive-post {
        padding: var(--spacing-md);
    }
}

@media (max-width: 480px) {
    .archive-post .post-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }

    .archive-stats {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .back-to-top {
        width: 45px;
        height: 45px;
        bottom: 1rem;
        right: 1rem;
    }
}
</style>

<!-- 归档页面脚本 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    initArchivePage();
});

function initArchivePage() {
    // 初始化搜索功能
    setupArchiveSearch();

    // 初始化筛选功能
    setupArchiveFilters();

    // 初始化年份折叠
    setupYearToggle();

    // 初始化回到顶部
    setupBackToTop();

    // 统计信息
    updateArchiveStats();
}

function setupArchiveSearch() {
    const searchInput = document.getElementById('archive-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        filterPosts();
    });
}

function setupArchiveFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');

    [categoryFilter, yearFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterPosts);
        }
    });
}

function filterPosts() {
    const searchQuery = document.getElementById('archive-search').value.toLowerCase().trim();
    const categoryFilter = document.getElementById('category-filter').value;
    const yearFilter = document.getElementById('year-filter').value;

    const posts = document.querySelectorAll('.archive-post');
    const yearSections = document.querySelectorAll('.year-section');
    const monthSections = document.querySelectorAll('.month-section');

    let visibleCount = 0;

    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt')?.textContent.toLowerCase() || '';
        const category = post.getAttribute('data-category');
        const year = post.getAttribute('data-year');

        const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);
        const matchesCategory = !categoryFilter || category === categoryFilter;
        const matchesYear = !yearFilter || year === yearFilter;

        const isVisible = matchesSearch && matchesCategory && matchesYear;

        post.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });

    // 隐藏空的月份和年份区域
    monthSections.forEach(month => {
        const visiblePosts = month.querySelectorAll('.archive-post[style*="block"], .archive-post:not([style*="none"])');
        month.style.display = visiblePosts.length > 0 ? 'block' : 'none';
    });

    yearSections.forEach(year => {
        const visibleMonths = year.querySelectorAll('.month-section[style*="block"], .month-section:not([style*="none"])');
        year.style.display = visibleMonths.length > 0 ? 'block' : 'none';
    });

    // 显示空状态
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

function setupYearToggle() {
    const yearTitles = document.querySelectorAll('.year-title');

    yearTitles.forEach(title => {
        title.addEventListener('click', function() {
            const toggle = this.querySelector('.year-toggle');
            const targetId = toggle.getAttribute('data-target');
            const content = document.getElementById(targetId);

            if (content) {
                const isCollapsed = content.classList.contains('collapsed');

                if (isCollapsed) {
                    content.classList.remove('collapsed');
                    toggle.classList.remove('collapsed');
                } else {
                    content.classList.add('collapsed');
                    toggle.classList.add('collapsed');
                }
            }
        });
    });
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function updateArchiveStats() {
    // 这里可以添加动态统计更新逻辑
    console.log('Archive page loaded successfully');
}
</script>