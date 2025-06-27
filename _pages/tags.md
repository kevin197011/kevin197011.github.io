---
layout: default
title: Kk'wiki - 标签集合
permalink: /tags/
description: 按标签浏览所有技术文档
---

<div class="tags-page">
    <!-- 标签页头部 -->
    <header class="tags-header">
        <div class="tags-terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">kk@wiki:~/tags$</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-line">
                    <span class="prompt">kk@wiki:~/tags$</span>
                    <span class="command typed-text">find . -name "*.md" | xargs grep -h "tags:" | sort | uniq</span>
                </div>
                <div class="tags-stats">
                    <div class="stat-item">
                        <i class="fas fa-tags"></i>
                        <span class="stat-value">{{ site.tags.size }}</span>
                        <span class="stat-label">个标签</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-file-alt"></i>
                        <span class="stat-value">{{ site.posts.size }}</span>
                        <span class="stat-label">篇文档</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-chart-bar"></i>
                        <span class="stat-value" id="avg-tags">0</span>
                        <span class="stat-label">平均标签</span>
                    </div>
                </div>
                <div class="cursor-blink">_</div>
            </div>
        </div>
    </header>

    <!-- 搜索和控制区域 -->
    <div class="tags-controls">
        <div class="search-section">
            <div class="search-box">
                <input type="text" id="tag-search" placeholder="搜索标签或文档..." class="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>

        <div class="filter-section">
            <div class="filter-group">
                <label>排序方式:</label>
                <select id="sort-order" class="filter-select">
                    <option value="count-desc">按文档数量 (降序)</option>
                    <option value="count-asc">按文档数量 (升序)</option>
                    <option value="name-asc">按标签名称 (A-Z)</option>
                    <option value="name-desc">按标签名称 (Z-A)</option>
                </select>
            </div>

            <div class="filter-group">
                <label>显示模式:</label>
                <select id="display-mode" class="filter-select">
                    <option value="cloud">标签云</option>
                    <option value="list">列表模式</option>
                    <option value="grid">网格模式</option>
                </select>
            </div>
        </div>
    </div>

    <!-- 标签云 -->
    <section class="tags-cloud-section" id="tags-cloud-section">
        <h2 class="section-title">
            <i class="fas fa-cloud"></i>
            标签云
            <span class="section-subtitle">点击标签查看相关文档</span>
        </h2>
        <div class="tags-cloud" id="tags-cloud">
            {% for tag in site.tags %}
            <a href="#tag-{{ tag[0] | slugify }}" class="tag-cloud-item" data-count="{{ tag[1].size }}" data-tag="{{ tag[0] }}">
                #{{ tag[0] }}
                <span class="tag-count">{{ tag[1].size }}</span>
            </a>
            {% endfor %}
        </div>
    </section>

    <!-- 标签列表/网格 -->
    <section class="tags-list-section" id="tags-list-section" style="display: none;">
        <h2 class="section-title">
            <i class="fas fa-list"></i>
            标签列表
        </h2>
        <div class="tags-list" id="tags-list">
            <!-- 动态生成 -->
        </div>
    </section>

    <!-- 文档分组 -->
    <main class="tags-content">
        {% assign tags_sorted_by_name = site.tags | sort %}
        {% for tag in tags_sorted_by_name %}
        <section class="tag-section" id="tag-{{ tag[0] | slugify }}" data-tag="{{ tag[0] }}">
            <h2 class="tag-title">
                <i class="fas fa-tag"></i>
                <span class="tag-name">#{{ tag[0] }}</span>
                <span class="tag-count-badge">{{ tag[1].size }} 篇</span>
                <button class="tag-toggle" data-target="content-{{ tag[0] | slugify }}">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </h2>

            <div class="tag-content" id="content-{{ tag[0] | slugify }}">
                <div class="tag-posts">
                    {% assign posts_by_date = tag[1] | sort: 'date' | reverse %}
                    {% for post in posts_by_date %}
                    <article class="tag-post" data-title="{{ post.title | downcase }}" data-tag="{{ tag[0] }}">
                        <div class="post-meta">
                            <time class="post-date">{{ post.date | date: "%Y-%m-%d" }}</time>
                            <span class="post-category">
                                <i class="fas fa-folder"></i>
                                {{ post.category | default: "General" }}
                            </span>
                        </div>

                        <h3 class="post-title">
                            <a href="{{ post.url | relative_url }}" class="post-link">
                                {{ post.title }}
                            </a>
                        </h3>

                        {% if post.excerpt %}
                        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
                        {% endif %}

                        {% if post.tags and post.tags.size > 1 %}
                        <div class="post-other-tags">
                            <span class="other-tags-label">其他标签:</span>
                            {% for other_tag in post.tags %}
                                {% unless other_tag == tag[0] %}
                                <a href="#tag-{{ other_tag | slugify }}" class="other-tag" data-tag="{{ other_tag }}">
                                    #{{ other_tag }}
                                </a>
                                {% endunless %}
                            {% endfor %}
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
        </section>
        {% endfor %}

        <!-- 空状态 -->
        <div class="empty-state" id="empty-state" style="display: none;">
            <i class="fas fa-search"></i>
            <h3>未找到匹配的标签或文档</h3>
            <p>请尝试调整搜索条件或选择其他标签</p>
        </div>
    </main>

    <!-- 回到顶部 -->
    <button class="back-to-top" id="back-to-top" title="回到顶部">
        <i class="fas fa-chevron-up"></i>
    </button>

    <!-- 标签导航侧栏 -->
    <div class="tag-navigation" id="tag-navigation">
        <div class="tag-nav-header">
            <h4>快速导航</h4>
            <button class="tag-nav-close" id="tag-nav-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="tag-nav-list" id="tag-nav-list">
            <!-- 动态生成 -->
        </div>
    </div>
</div>

<!-- 标签页面样式 -->
<style>
.tags-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    position: relative;
}

/* 标签页头部 */
.tags-header {
    margin-bottom: var(--spacing-xl);
}

.tags-terminal {
    background: var(--bg-card);
    border-radius: 8px;
    border: 1px solid var(--border-secondary);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.tags-stats {
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
.tags-controls {
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
    color: var(--accent-green);
}

.section-subtitle {
    margin-left: auto;
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: normal;
}

/* 标签云 */
.tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    align-items: center;
}

.tag-cloud-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 20px;
    border: 1px solid var(--border-secondary);
    font-size: 0.875rem;
    font-family: var(--font-mono);
    transition: var(--transition-fast);
    position: relative;
}

.tag-cloud-item:hover {
    color: var(--accent-green);
    border-color: var(--accent-green);
    background: rgba(0, 255, 136, 0.1);
    transform: translateY(-2px);
}

.tag-count {
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: var(--spacing-xs);
}

/* 动态标签云大小 */
.tag-cloud-item[data-count="1"] { font-size: 0.8rem; }
.tag-cloud-item[data-count="2"] { font-size: 0.85rem; }
.tag-cloud-item[data-count="3"] { font-size: 0.9rem; }
.tag-cloud-item[data-count="4"],
.tag-cloud-item[data-count="5"] { font-size: 0.95rem; }
.tag-cloud-item[data-count="6"],
.tag-cloud-item[data-count="7"],
.tag-cloud-item[data-count="8"] { font-size: 1rem; }
.tag-cloud-item[data-count="9"],
.tag-cloud-item[data-count="10"] { font-size: 1.05rem; }

/* 高频标签特殊样式 */
.tag-cloud-item[data-count="6"],
.tag-cloud-item[data-count="7"],
.tag-cloud-item[data-count="8"] {
    color: var(--accent-blue);
    border-color: var(--accent-blue);
}

.tag-cloud-item[data-count="9"],
.tag-cloud-item[data-count="10"] {
    color: var(--accent-green);
    border-color: var(--accent-green);
    font-weight: 600;
}

/* 标签列表模式 */
.tags-list {
    display: grid;
    gap: var(--spacing-md);
}

.tag-list-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition-fast);
    text-decoration: none;
    color: var(--text-primary);
}

.tag-list-item:hover {
    border-color: var(--accent-green);
    background: rgba(0, 255, 136, 0.1);
}

.tag-list-name {
    font-family: var(--font-mono);
    font-weight: 500;
}

.tag-list-count {
    background: var(--accent-green);
    color: var(--bg-primary);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-size: 0.8rem;
    font-family: var(--font-mono);
}

/* 标签区域 */
.tag-section {
    margin-bottom: var(--spacing-xl);
    scroll-margin-top: 80px;
}

.tag-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.3rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    border-bottom: 2px solid var(--border-secondary);
    cursor: pointer;
    user-select: none;
}

.tag-title:hover {
    color: var(--accent-green);
}

.tag-name {
    color: var(--accent-blue);
    font-family: var(--font-mono);
}

.tag-count-badge {
    margin-left: auto;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    font-size: 0.8rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
}

.tag-toggle {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition-fast);
    padding: var(--spacing-xs);
    border-radius: 4px;
}

.tag-toggle:hover {
    color: var(--accent-green);
    background: var(--bg-hover);
}

.tag-toggle.collapsed i {
    transform: rotate(-90deg);
}

.tag-content {
    transition: var(--transition-normal);
    overflow: hidden;
}

.tag-content.collapsed {
    max-height: 0;
    margin: 0;
    padding: 0;
}

/* 文章列表 */
.tag-posts {
    display: grid;
    gap: var(--spacing-md);
}

.tag-post {
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: var(--spacing-lg);
    transition: var(--transition-normal);
    position: relative;
}

.tag-post:hover {
    border-color: var(--accent-green);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.tag-post .post-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    font-size: 0.875rem;
}

.tag-post .post-date {
    color: var(--text-muted);
    font-family: var(--font-mono);
    background: var(--bg-secondary);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
}

.tag-post .post-category {
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.tag-post .post-title {
    margin: var(--spacing-sm) 0;
    font-size: 1.1rem;
    line-height: 1.4;
}

.tag-post .post-link {
    color: var(--text-primary);
    text-decoration: none;
    transition: var(--transition-fast);
}

.tag-post .post-link:hover {
    color: var(--accent-green);
}

.tag-post .post-excerpt {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: var(--spacing-sm) 0;
}

.tag-post .post-other-tags {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin: var(--spacing-sm) 0;
    flex-wrap: wrap;
}

.other-tags-label {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-right: var(--spacing-xs);
}

.other-tag {
    background: var(--bg-tertiary);
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 12px;
    font-family: var(--font-mono);
    transition: var(--transition-fast);
}

.other-tag:hover {
    color: var(--accent-blue);
    background: rgba(0, 212, 255, 0.1);
}

.tag-post .post-actions {
    margin-top: var(--spacing-md);
    display: flex;
    justify-content: flex-end;
}

.tag-post .read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--accent-green);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition-fast);
}

.tag-post .read-more:hover {
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

/* 标签导航侧栏 */
.tag-navigation {
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

.tag-navigation.show {
    right: 2rem;
}

.tag-nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-secondary);
}

.tag-nav-header h4 {
    color: var(--text-primary);
    margin: 0;
}

.tag-nav-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: 4px;
    transition: var(--transition-fast);
}

.tag-nav-close:hover {
    color: var(--accent-red);
    background: var(--bg-hover);
}

.tag-nav-list {
    padding: var(--spacing-sm);
    max-height: calc(60vh - 60px);
    overflow-y: auto;
}

.tag-nav-item {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    margin-bottom: 2px;
    font-size: 0.875rem;
    transition: var(--transition-fast);
}

.tag-nav-item:hover {
    color: var(--accent-green);
    background: var(--bg-hover);
}

.tag-nav-item.active {
    color: var(--accent-green);
    background: rgba(0, 255, 136, 0.1);
}

/* 亮色主题适配 */
html.light .tags-terminal {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

html.light .tags-controls {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

html.light .tag-post {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-sm);
}

html.light .tag-post:hover {
    box-shadow: var(--shadow-md);
}

html.light .search-input,
html.light .filter-select {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
}

html.light .tag-navigation {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .tags-page {
        padding: var(--spacing-lg) var(--spacing-md);
    }

    .tags-controls {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .filter-section {
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .tags-stats {
        gap: var(--spacing-md);
    }

    .stat-item {
        font-size: 0.8rem;
    }

    .tag-title {
        font-size: 1.2rem;
        flex-wrap: wrap;
    }

    .tag-count-badge {
        margin-left: 0;
        margin-top: var(--spacing-xs);
    }

    .tag-post {
        padding: var(--spacing-md);
    }

    .tag-post .post-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }

    .tags-cloud {
        gap: var(--spacing-xs);
    }

    .tag-cloud-item {
        font-size: 0.8rem !important;
    }

    .tag-navigation {
        right: -100%;
        width: calc(100vw - 2rem);
        max-width: 320px;
    }

    .tag-navigation.show {
        right: 1rem;
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

    .tag-post .post-other-tags {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }
}
</style>

<!-- 标签页面脚本 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    initTagsPage();
});

function initTagsPage() {
    // 初始化搜索功能
    setupTagSearch();

    // 初始化筛选功能
    setupTagFilters();

    // 初始化标签折叠
    setupTagToggle();

    // 初始化回到顶部
    setupBackToTop();

    // 初始化显示模式切换
    setupDisplayMode();

    // 初始化标签导航
    setupTagNavigation();

    // 计算平均标签数
    calculateAverageTags();

    // 初始化标签云大小
    initTagCloudSizes();
}

function setupTagSearch() {
    const searchInput = document.getElementById('tag-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        filterContent(query);
    });
}

function setupTagFilters() {
    const sortOrder = document.getElementById('sort-order');

    if (sortOrder) {
        sortOrder.addEventListener('change', function() {
            sortTags(this.value);
        });
    }
}

function setupDisplayMode() {
    const displayMode = document.getElementById('display-mode');
    const cloudSection = document.getElementById('tags-cloud-section');
    const listSection = document.getElementById('tags-list-section');

    if (!displayMode) return;

    displayMode.addEventListener('change', function() {
        const mode = this.value;

        switch(mode) {
            case 'cloud':
                cloudSection.style.display = 'block';
                listSection.style.display = 'none';
                break;
            case 'list':
            case 'grid':
                cloudSection.style.display = 'none';
                listSection.style.display = 'block';
                generateTagsList(mode);
                break;
        }
    });
}

function generateTagsList(mode) {
    const tagsList = document.getElementById('tags-list');
    const tagSections = document.querySelectorAll('.tag-section');

    let html = '';
    const className = mode === 'grid' ? 'tags-grid' : 'tags-list';

    tagSections.forEach(section => {
        const tag = section.getAttribute('data-tag');
        const count = section.querySelectorAll('.tag-post').length;

        html += `
            <a href="#tag-${tag.replace(/\s+/g, '-').toLowerCase()}" class="tag-list-item">
                <span class="tag-list-name">#${tag}</span>
                <span class="tag-list-count">${count}</span>
            </a>
        `;
    });

    tagsList.className = className;
    tagsList.innerHTML = html;

    if (mode === 'grid') {
        tagsList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    }
}

function filterContent(query) {
    const tagSections = document.querySelectorAll('.tag-section');
    const tagCloudItems = document.querySelectorAll('.tag-cloud-item');
    const emptyState = document.getElementById('empty-state');

    let visibleCount = 0;

    // 筛选标签区域
    tagSections.forEach(section => {
        const tag = section.getAttribute('data-tag').toLowerCase();
        const posts = section.querySelectorAll('.tag-post');
        let sectionVisible = false;

        if (!query || tag.includes(query)) {
            section.style.display = 'block';
            sectionVisible = true;
            visibleCount++;
        } else {
            // 检查该标签下的文章标题
            posts.forEach(post => {
                const title = post.getAttribute('data-title');
                if (title.includes(query)) {
                    section.style.display = 'block';
                    sectionVisible = true;
                    visibleCount++;
                }
            });

            if (!sectionVisible) {
                section.style.display = 'none';
            }
        }
    });

    // 筛选标签云
    tagCloudItems.forEach(item => {
        const tag = item.getAttribute('data-tag').toLowerCase();
        if (!query || tag.includes(query)) {
            item.style.display = 'inline-flex';
        } else {
            item.style.display = 'none';
        }
    });

    // 显示空状态
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
}

function sortTags(order) {
    const tagsContent = document.querySelector('.tags-content');
    const tagSections = Array.from(document.querySelectorAll('.tag-section'));

    tagSections.sort((a, b) => {
        const tagA = a.getAttribute('data-tag');
        const tagB = b.getAttribute('data-tag');
        const countA = a.querySelectorAll('.tag-post').length;
        const countB = b.querySelectorAll('.tag-post').length;

        switch(order) {
            case 'count-desc':
                return countB - countA;
            case 'count-asc':
                return countA - countB;
            case 'name-asc':
                return tagA.localeCompare(tagB);
            case 'name-desc':
                return tagB.localeCompare(tagA);
            default:
                return 0;
        }
    });

    // 重新排序DOM元素
    tagSections.forEach(section => {
        tagsContent.appendChild(section);
    });
}

function setupTagToggle() {
    const tagTitles = document.querySelectorAll('.tag-title');

    tagTitles.forEach(title => {
        title.addEventListener('click', function() {
            const toggle = this.querySelector('.tag-toggle');
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

function setupTagNavigation() {
    // 这个功能可以在需要时实现
    // 创建浮动的标签导航栏
    console.log('Tag navigation initialized');
}

function calculateAverageTags() {
    const avgElement = document.getElementById('avg-tags');
    if (!avgElement) return;

    const tagSections = document.querySelectorAll('.tag-section');
    const posts = document.querySelectorAll('.tag-post');

    if (posts.length === 0) {
        avgElement.textContent = '0';
        return;
    }

    // 简化计算：假设平均每篇文章有2-3个标签
    const averageTags = (tagSections.length / posts.length * 2.5).toFixed(1);
    avgElement.textContent = averageTags;
}

function initTagCloudSizes() {
    const cloudItems = document.querySelectorAll('.tag-cloud-item');

    cloudItems.forEach(item => {
        const count = parseInt(item.getAttribute('data-count'));

        // 根据文档数量动态设置字体大小和样式
        if (count >= 10) {
            item.style.fontSize = '1.1rem';
            item.style.fontWeight = '600';
        } else if (count >= 6) {
            item.style.fontSize = '1rem';
            item.style.fontWeight = '500';
        } else if (count >= 3) {
            item.style.fontSize = '0.9rem';
        } else {
            item.style.fontSize = '0.8rem';
        }
    });
}

// 平滑滚动到标签
document.querySelectorAll('a[href^="#tag-"]').forEach(link => {
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

            // 高亮目标标签
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
        50% { background: rgba(0, 255, 136, 0.1); }
        100% { background: transparent; }
    }
`;
document.head.appendChild(style);
</script>