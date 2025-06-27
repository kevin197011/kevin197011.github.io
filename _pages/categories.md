---
layout: default
title: Kk'wiki - 分类导航
permalink: /categories/
description: 按分类浏览所有技术文档
---

<div class="categories-page">
    <!-- 分类页头部 -->
    <header class="categories-header">
        <div class="categories-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~/categories$</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="prompt">kk@wiki:~/categories$</span>
                    <span class="command typed-text">find . -type f -name "*.md" | xargs grep -h "category:" | sort | uniq -c</span>
                </div>
                <div class="categories-stats">
                    <div class="stat-item">
                        <i class="fas fa-folder"></i>
                        <span class="stat-value">{{ site.categories.size }}</span>
                        <span class="stat-label">个分类</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-file-code"></i>
                        <span class="stat-value">{{ site.posts.size }}</span>
                        <span class="stat-label">篇文档</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-chart-pie"></i>
                        <span class="stat-value" id="avg-posts">0</span>
                        <span class="stat-label">平均文档</span>
                    </div>
                </div>
                <div class="cursor-blink">_</div>
            </div>
        </div>
    </header>

    <!-- 搜索和控制区域 -->
    <div class="categories-controls">
        <div class="search-section">
            <div class="search-box">
                <input type="text" id="category-search" placeholder="搜索分类或文档..." class="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>

        <div class="filter-section">
            <div class="filter-group">
                <label>排序方式:</label>
                <select id="sort-order" class="filter-select">
                    <option value="count-desc">按文档数量 (降序)</option>
                    <option value="count-asc">按文档数量 (升序)</option>
                    <option value="name-asc">按分类名称 (A-Z)</option>
                    <option value="name-desc">按分类名称 (Z-A)</option>
                </select>
            </div>

            <div class="filter-group">
                <label>显示模式:</label>
                <select id="display-mode" class="filter-select">
                    <option value="grid">网格模式</option>
                    <option value="list">列表模式</option>
                    <option value="tree">树形模式</option>
                </select>
            </div>
        </div>
    </div>

    <!-- 分类网格/列表 -->
    <section class="categories-overview" id="categories-overview">
        <h2 class="section-title">
            <i class="fas fa-th-large"></i>
            分类概览
            <span class="section-subtitle">点击分类查看详细内容</span>
        </h2>
        <div class="categories-grid" id="categories-grid">
            {% for category in site.categories %}
            <div class="category-card" data-category="{{ category[0] }}" data-count="{{ category[1].size }}">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <div class="category-info">
                        <h3 class="category-name">{{ category[0] }}</h3>
                        <span class="category-count">{{ category[1].size }} 篇文档</span>
                    </div>
                </div>

                <!-- 直接显示该分类下的文章标题列表 -->
                <div class="category-titles-list">
                    {% assign posts_sorted = category[1] | sort: 'date' | reverse %}
                    {% for post in posts_sorted %}
                    <div class="title-item">
                        <span class="title-date">{{ post.date | date: "%m-%d" }}</span>
                        <a href="{{ post.url | relative_url }}" class="title-link">
                            {{ post.title }}
                        </a>
                    </div>
                    {% endfor %}
                </div>

                <div class="category-meta">
                    {% assign latest_post = category[1] | sort: 'date' | reverse | first %}
                    <span class="latest-update">
                        <i class="fas fa-clock"></i>
                        最新: {{ latest_post.date | date: "%Y-%m-%d" }}
                    </span>
                </div>
                <div class="category-actions">
                    <a href="#category-{{ category[0] | slugify }}" class="explore-btn">
                        <i class="fas fa-arrow-right"></i>
                        查看详情
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
    </section>

    <!-- 空状态 -->
    <div class="empty-state" id="empty-state" style="display: none;">
        <i class="fas fa-folder-open"></i>
        <h3>未找到匹配的分类或文档</h3>
        <p>请尝试调整搜索条件或选择其他分类</p>
    </div>

    <!-- 回到顶部 -->
    <button class="back-to-top" id="back-to-top" title="回到顶部">
        <i class="fas fa-chevron-up"></i>
    </button>

    <!-- 分类导航侧栏 -->
    <div class="category-navigation" id="category-navigation">
        <div class="category-nav-header">
            <h4>快速导航</h4>
            <button class="category-nav-close" id="category-nav-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="category-nav-list" id="category-nav-list">
            {% for category in site.categories %}
            <a href="#category-{{ category[0] | slugify }}" class="category-nav-item" data-category="{{ category[0] }}">
                <i class="fas fa-folder"></i>
                <span>{{ category[0] }}</span>
                <span class="nav-count">{{ category[1].size }}</span>
            </a>
            {% endfor %}
        </div>
    </div>
</div>

<!-- 分类页面样式 -->
<style>
.categories-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    position: relative;
}

/* 分类页头部 */
.categories-header {
    margin-bottom: var(--spacing-xl);
}

.categories-terminal {
    background: var(--bg-card);
    border-radius: 8px;
    border: 1px solid var(--border-secondary);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.categories-stats {
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
.categories-controls {
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

/* 区域标题 */
.section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--border-secondary);
}

.section-title i {
    color: var(--accent-blue);
}

.section-subtitle {
    margin-left: auto;
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: normal;
}

/* 分类网格 */
.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.category-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    transition: var(--transition-normal);
    position: relative;
    cursor: pointer;
}

.category-card:hover {
    border-color: var(--accent-blue);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.category-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.category-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-primary);
    font-size: 1.5rem;
}

.category-info h3 {
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1.2rem;
}

.category-count {
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-family: var(--font-mono);
}

.category-description {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: var(--spacing-md);
    min-height: 2.7rem;
}

/* 分类文章标题列表 */
.category-titles-list {
    margin-bottom: var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: 6px;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-secondary);
}

.title-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid var(--border-secondary);
    transition: var(--transition-fast);
}

.title-item:last-child {
    border-bottom: none;
}

.title-item:hover {
    background: var(--bg-hover);
    margin: 0 calc(-1 * var(--spacing-xs));
    padding-left: var(--spacing-xs);
    padding-right: var(--spacing-xs);
    border-radius: 4px;
}

.title-date {
    flex-shrink: 0;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 3px;
    min-width: 35px;
    text-align: center;
}

.title-link {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.3;
    transition: var(--transition-fast);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.title-link:hover {
    color: var(--accent-blue);
}

.title-more {
    margin-top: var(--spacing-xs);
    padding-top: var(--spacing-xs);
    border-top: 1px solid var(--border-secondary);
}

.view-all-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    transition: var(--transition-fast);
}

.view-all-link:hover {
    color: var(--accent-blue);
}

.category-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    font-size: 0.8rem;
    color: var(--text-muted);
    flex-wrap: wrap;
}

.latest-update {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.category-actions {
    display: flex;
    justify-content: flex-end;
}

.explore-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    background: var(--accent-blue);
    color: var(--bg-primary);
    text-decoration: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition-fast);
}

.explore-btn:hover {
    background: var(--accent-green);
    transform: translateX(2px);
}

/* 分类内容区域 */
.category-section {
    margin-bottom: var(--spacing-xl);
    scroll-margin-top: 80px;
}

.category-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.4rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    border-bottom: 2px solid var(--border-secondary);
    cursor: pointer;
    user-select: none;
}

.category-title:hover {
    color: var(--accent-blue);
}

.category-name {
    color: var(--accent-blue);
    font-family: var(--font-mono);
    font-weight: 600;
}

.category-count-badge {
    margin-left: auto;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.8rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
}

    transform: rotate(-90deg);
}

.category-content {
    transition: var(--transition-normal);
    overflow: hidden;
}

.category-content.collapsed {
    max-height: 0;
    margin: 0;
    padding: 0;
}

/* 文章列表 */
.category-posts {
    display: grid;
    gap: var(--spacing-lg);
}

.category-post {
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    transition: var(--transition-normal);
    position: relative;
}

.category-post:hover {
    border-color: var(--accent-blue);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.category-post .post-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.category-post .post-date {
    color: var(--text-muted);
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
}

.post-tags-preview {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--text-secondary);
}

.tag-mini {
    background: var(--bg-tertiary);
    color: var(--accent-green);
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 8px;
    font-family: var(--font-mono);
}

.tag-more {
    background: var(--bg-secondary);
    color: var(--text-muted);
    font-size: 0.7rem;
    padding: 2px 4px;
    border-radius: 6px;
    font-family: var(--font-mono);
}

.category-post .post-title {
    margin: var(--spacing-sm) 0;
    font-size: 1.2rem;
    line-height: 1.4;
}

.category-post .post-link {
    color: var(--text-primary);
    text-decoration: none;
    transition: var(--transition-fast);
}

.category-post .post-link:hover {
    color: var(--accent-blue);
}

.category-post .post-excerpt {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: var(--spacing-md) 0;
}

.post-stats {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin: var(--spacing-md) 0;
    font-size: 0.8rem;
    color: var(--text-muted);
    flex-wrap: wrap;
}

.reading-time,
.tags-count {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.category-post .post-actions {
    margin-top: var(--spacing-md);
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
    flex-wrap: wrap;
}

.category-post .read-more,
.category-post .view-tags {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    transition: var(--transition-fast);
}

.category-post .read-more {
    color: var(--accent-green);
    background: rgba(0, 255, 136, 0.1);
}

.category-post .read-more:hover {
    background: rgba(0, 255, 136, 0.2);
    transform: translateX(2px);
}

.category-post .view-tags {
    color: var(--accent-blue);
    background: rgba(0, 212, 255, 0.1);
}

.category-post .view-tags:hover {
    background: rgba(0, 212, 255, 0.2);
}

/* 列表模式 */
.categories-grid.list-mode {
    grid-template-columns: 1fr;
}

.categories-grid.list-mode .category-card {
    display: flex;
    align-items: flex-start;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
}

.categories-grid.list-mode .category-header {
    margin-bottom: 0;
    flex-shrink: 0;
    min-width: 200px;
}

.categories-grid.list-mode .category-titles-list {
    flex: 1;
    margin-bottom: 0;
}

.categories-grid.list-mode .category-meta,
.categories-grid.list-mode .category-actions {
    flex-shrink: 0;
    margin-bottom: 0;
}

/* 树形模式 */
.categories-grid.tree-mode {
    display: block;
}

.categories-grid.tree-mode .category-card {
    margin-bottom: var(--spacing-md);
    border-left: 4px solid var(--accent-blue);
    padding-left: var(--spacing-lg);
}

.categories-grid.tree-mode .title-item {
    padding-left: var(--spacing-md);
    position: relative;
}

.categories-grid.tree-mode .title-item::before {
    content: "├─";
    position: absolute;
    left: 0;
    color: var(--text-muted);
    font-family: var(--font-mono);
}

.categories-grid.tree-mode .title-item:last-child::before {
    content: "└─";
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
    background: var(--accent-blue);
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
    background: var(--accent-green);
    transform: translateY(-2px);
}

/* 分类导航侧栏 */
.category-navigation {
    position: fixed;
    top: 50%;
    right: -300px;
    transform: translateY(-50%);
    width: 280px;
    max-height: 60vh;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    transition: right var(--transition-normal);
    overflow: hidden;
}

.category-navigation.show {
    right: 1rem;
}

.category-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-secondary);
}

.category-nav-header h4 {
    color: var(--text-primary);
    margin: 0;
}

.category-nav-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: 4px;
    transition: var(--transition-fast);
}

.category-nav-close:hover {
    color: var(--accent-red);
    background: var(--bg-hover);
}

.category-nav-list {
    padding: var(--spacing-sm);
    max-height: calc(60vh - 60px);
    overflow-y: auto;
}

.category-nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    margin-bottom: 2px;
    font-size: 0.875rem;
    transition: var(--transition-fast);
}

.category-nav-item:hover {
    color: var(--accent-blue);
    background: var(--bg-hover);
}

.category-nav-item.active {
    color: var(--accent-blue);
    background: rgba(0, 212, 255, 0.1);
}

.nav-count {
    margin-left: auto;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 8px;
    font-family: var(--font-mono);
}

/* 亮色主题适配 */
html.light .categories-terminal {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

html.light .categories-controls {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

html.light .category-card {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-sm);
}

html.light .category-card:hover {
    box-shadow: var(--shadow-md);
}

html.light .category-post {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-sm);
}

html.light .category-post:hover {
    box-shadow: var(--shadow-md);
}

html.light .search-input,
html.light .filter-select {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
}

html.light .category-navigation {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

/* 亮色主题下的文章标题列表 */
html.light .category-titles-list {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
}

html.light .title-item {
    border-bottom: 1px solid var(--border-primary);
}

html.light .title-date {
    background: var(--bg-tertiary);
}

html.light .title-more {
    border-top: 1px solid var(--border-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .categories-page {
        padding: var(--spacing-lg) var(--spacing-md);
    }

    .categories-controls {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .filter-section {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .categories-stats {
        gap: var(--spacing-md);
    }

    .stat-item {
        font-size: 0.8rem;
    }

    .categories-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }

    .category-title {
        font-size: 1.2rem;
        flex-wrap: wrap;
    }

    .category-count-badge {
        margin-left: 0;
        margin-top: var(--spacing-xs);
    }

    .category-post {
        padding: var(--spacing-md);
    }

    .category-post .post-meta {
        flex-direction: column;
        align-items: flex-start;
    }

    .category-post .post-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .category-navigation {
        right: -100%;
        width: calc(100vw - 2rem);
        max-width: 320px;
    }

    .category-navigation.show {
        right: 1rem;
    }

    /* 移动端文章标题列表优化 */
    .categories-grid.list-mode .category-card {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .categories-grid.list-mode .category-header {
        min-width: auto;
        width: 100%;
    }

    .title-link {
        white-space: normal;
        overflow: visible;
        text-overflow: initial;
    }

    .categories-grid.tree-mode .title-item {
        padding-left: var(--spacing-sm);
    }
}

@media (max-width: 480px) {
    .back-to-top {
        width: 45px;
        height: 45px;
        bottom: 1rem;
        right: 1rem;
    }

    .section-title {
        font-size: 1.3rem;
        flex-wrap: wrap;
    }

    .section-subtitle {
        margin-left: 0;
        margin-top: var(--spacing-xs);
        width: 100%;
    }

    .category-header {
        flex-direction: column;
        text-align: center;
    }

    .category-icon {
        align-self: center;
    }

    .post-stats {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }
}
</style>

<!-- 分类页面脚本 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    initCategoriesPage();
});

function initCategoriesPage() {
    // 初始化搜索功能
    setupCategorySearch();

    // 初始化筛选功能
    setupCategoryFilters();

    // 初始化回到顶部
    setupBackToTop();

    // 初始化显示模式切换
    setupDisplayMode();

    // 初始化分类导航
    setupCategoryNavigation();

    // 计算平均文档数
    calculateAveragePosts();

    // 初始化分类卡片点击
    setupCategoryCards();
}

function setupCategorySearch() {
    const searchInput = document.getElementById('category-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        filterCategoryContent(query);
    });
}

function setupCategoryFilters() {
    const sortOrder = document.getElementById('sort-order');

    if (sortOrder) {
        sortOrder.addEventListener('change', function() {
            sortCategories(this.value);
        });
    }
}

function setupDisplayMode() {
    const displayMode = document.getElementById('display-mode');
    const categoriesGrid = document.getElementById('categories-grid');

    if (!displayMode) return;

    displayMode.addEventListener('change', function() {
        const mode = this.value;

        // 移除所有模式类
        categoriesGrid.classList.remove('list-mode', 'tree-mode');

        // 添加对应模式类
        if (mode === 'list') {
            categoriesGrid.classList.add('list-mode');
        } else if (mode === 'tree') {
            categoriesGrid.classList.add('tree-mode');
        }
    });
}

function filterCategoryContent(query) {
    const categoryCards = document.querySelectorAll('.category-card');
    const emptyState = document.getElementById('empty-state');

    let visibleCount = 0;

    // 筛选分类卡片
    categoryCards.forEach(card => {
        const category = card.getAttribute('data-category').toLowerCase();
        const titleItems = card.querySelectorAll('.title-link');
        let cardVisible = false;

        // 检查分类名称或文章标题是否匹配
        if (!query || category.includes(query)) {
            cardVisible = true;
        } else {
            // 检查该分类下的文章标题
            titleItems.forEach(link => {
                const title = link.textContent.toLowerCase();
                if (title.includes(query)) {
                    cardVisible = true;
                }
            });
        }

        if (cardVisible) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // 显示空状态
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
}

function sortCategories(order) {
    const categoriesGrid = document.getElementById('categories-grid');
    const categoryCards = Array.from(document.querySelectorAll('.category-card'));

    // 排序函数
    const sortFunction = (a, b) => {
        const categoryA = a.getAttribute('data-category');
        const categoryB = b.getAttribute('data-category');
        const countA = parseInt(a.getAttribute('data-count') || '0');
        const countB = parseInt(b.getAttribute('data-count') || '0');

        switch(order) {
            case 'count-desc':
                return countB - countA;
            case 'count-asc':
                return countA - countB;
            case 'name-asc':
                return categoryA.localeCompare(categoryB);
            case 'name-desc':
                return categoryB.localeCompare(categoryA);
            default:
                return 0;
        }
    };

    // 排序并重新插入元素
    categoryCards.sort(sortFunction);
    categoryCards.forEach(card => {
        categoriesGrid.appendChild(card);
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

function setupCategoryNavigation() {
    // 可以在需要时实现侧栏导航功能
    console.log('Category navigation initialized');
}

function calculateAveragePosts() {
    const avgElement = document.getElementById('avg-posts');
    if (!avgElement) return;

    const categoryCards = document.querySelectorAll('.category-card');

    if (categoryCards.length === 0) {
        avgElement.textContent = '0';
        return;
    }

    let totalPosts = 0;
    categoryCards.forEach(card => {
        const count = parseInt(card.getAttribute('data-count') || '0');
        totalPosts += count;
    });

    const averagePosts = (totalPosts / categoryCards.length).toFixed(1);
    avgElement.textContent = averagePosts;
}

function setupCategoryCards() {
    // 分类卡片现在只显示文章标题，不需要特殊的点击处理
    console.log('Category cards initialized');
}

// 平滑滚动到分类
document.querySelectorAll('a[href^="#category-"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });

            // 高亮目标分类
            targetElement.style.animation = 'highlight 2s ease-out';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 2000);
        }
    });
});

// 添加高亮动画
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0% { background: transparent; }
        50% { background: rgba(0, 212, 255, 0.1); }
        100% { background: transparent; }
    }
`;
document.head.appendChild(style);
</script>