/**
 * KkWiki - 极客风格UI交互系统
 * 版本: 2.0
 */

class CyberUI {
    constructor() {
        this.init();
    }

    init() {
        console.log('CyberUI: Initializing...');

        // 初始化各个功能模块
        this.setupSidebar();
        this.setupSearch();
        this.setupScrollEffects();
        this.setupKeyboardShortcuts();
        this.setupThemeToggle();
        this.setupTableOfContents();
        this.setupCategoryDropdown();

        // 延迟加载非关键功能
        setTimeout(() => {
            this.setupFloatingActions();
            this.enhanceCodeBlocks();
            this.setupLazyLoading();
            this.initializePerformanceMonitor();
        }, 100);

        console.log('CyberUI: Initialization complete');
    }

    // 侧边栏功能
    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                this.updateMainContentMargin();
            });
        }

        if (mobileSidebarToggle) {
            mobileSidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                this.addOverlay();
            });
        }

        // 点击遮罩关闭侧边栏
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !mobileSidebarToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                this.removeOverlay();
            }
        });

        // 窗口大小改变时处理侧边栏
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('open');
                this.removeOverlay();
            }
            this.updateMainContentMargin();
        });
    }

    updateMainContentMargin() {
        const mainContent = document.querySelector('.main-content');
        const sidebar = document.getElementById('sidebar');

        if (window.innerWidth > 768) {
            const isCollapsed = sidebar.classList.contains('collapsed');
            mainContent.style.marginLeft = isCollapsed ? '60px' : '280px';
        } else {
            mainContent.style.marginLeft = '0';
        }
    }

    addOverlay() {
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 99;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);

            // 触发动画
            setTimeout(() => overlay.style.opacity = '1', 10);
        }
    }

    removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // 搜索功能
    setupSearch() {
        const searchModal = document.getElementById('search-modal');
        const searchTrigger = document.getElementById('search-trigger');
        const globalSearch = document.getElementById('global-search');
        const modalSearchInput = document.getElementById('modal-search-input');
        const closeSearch = document.getElementById('close-search');
        const searchResults = document.getElementById('search-results');

        // 搜索触发器
        [searchTrigger, globalSearch].forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openSearchModal();
                });
            }
        });

        // 关闭搜索
        if (closeSearch) {
            closeSearch.addEventListener('click', () => {
                this.closeSearchModal();
            });
        }

        // 点击遮罩关闭
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    this.closeSearchModal();
                }
            });
        }

        // 搜索输入
        if (modalSearchInput) {
            modalSearchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });

            modalSearchInput.addEventListener('keydown', (e) => {
                this.handleSearchNavigation(e);
            });
        }

        // 初始化搜索数据
        this.initializeSearchIndex();
    }

    openSearchModal() {
        const searchModal = document.getElementById('search-modal');
        const modalSearchInput = document.getElementById('modal-search-input');

        if (searchModal) {
            searchModal.classList.add('show');
            document.body.style.overflow = 'hidden';

            // 聚焦搜索框
            setTimeout(() => {
                if (modalSearchInput) {
                    modalSearchInput.focus();
                }
            }, 100);
        }
    }

    closeSearchModal() {
        const searchModal = document.getElementById('search-modal');
        const modalSearchInput = document.getElementById('modal-search-input');

        if (searchModal) {
            searchModal.classList.remove('show');
            document.body.style.overflow = '';

            if (modalSearchInput) {
                modalSearchInput.value = '';
            }

            this.clearSearchResults();
        }
    }

    initializeSearchIndex() {
        // 模拟搜索数据，实际应用中应该从Jekyll生成的JSON获取
        this.searchIndex = [];

        // 从页面中提取搜索数据
        const posts = document.querySelectorAll('.post-card, .category-post-link');
        posts.forEach(post => {
            const titleElement = post.querySelector('h3 a, .post-title a') || post;
            const excerptElement = post.querySelector('.post-excerpt');
            const categoryElement = post.querySelector('.post-category');

            if (titleElement) {
                this.searchIndex.push({
                    title: titleElement.textContent.trim(),
                    excerpt: excerptElement ? excerptElement.textContent.trim() : '',
                    category: categoryElement ? categoryElement.textContent.trim() : '',
                    url: titleElement.href || '#'
                });
            }
        });
    }

    performSearch(query) {
        const searchResults = document.getElementById('search-results');

        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchIndex.filter(item => {
            const searchText = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <p>未找到与 "${query}" 相关的内容</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item" data-url="${result.url}">
                <h4 class="search-result-title">${this.highlightText(result.title, query)}</h4>
                <p class="search-result-excerpt">${this.highlightText(result.excerpt.substring(0, 100), query)}...</p>
                <div class="search-result-meta">
                    <span class="search-result-category">${result.category}</span>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = `<div class="search-results-list">${resultsHTML}</div>`;

        // 添加点击事件
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    clearSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <p>开始输入以搜索文档</p>
                </div>
            `;
        }
    }

    handleSearchNavigation(e) {
        const results = document.querySelectorAll('.search-result-item');
        let currentIndex = Array.from(results).findIndex(item => item.classList.contains('highlighted'));

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, results.length - 1);
                this.highlightSearchResult(results, currentIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, 0);
                this.highlightSearchResult(results, currentIndex);
                break;
            case 'Enter':
                e.preventDefault();
                const highlighted = document.querySelector('.search-result-item.highlighted');
                if (highlighted) {
                    window.location.href = highlighted.dataset.url;
                }
                break;
            case 'Escape':
                e.preventDefault();
                this.closeSearchModal();
                break;
        }
    }

    highlightSearchResult(results, index) {
        results.forEach(item => item.classList.remove('highlighted'));
        if (results[index]) {
            results[index].classList.add('highlighted');
            results[index].scrollIntoView({ block: 'nearest' });
        }
    }

    // 滚动效果
    setupScrollEffects() {
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // 显示/隐藏返回顶部按钮
            if (scrollTopBtn) {
                if (scrolled > windowHeight * 0.3) {
                    scrollTopBtn.style.opacity = '1';
                    scrollTopBtn.style.pointerEvents = 'auto';
                } else {
                    scrollTopBtn.style.opacity = '0';
                    scrollTopBtn.style.pointerEvents = 'none';
                }
            }

            // 视差效果
            this.updateParallaxEffects(scrolled);
        });

        // 返回顶部功能
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    updateParallaxEffects(scrolled) {
        const scanLine = document.querySelector('.scan-line');
        if (scanLine) {
            const speed = scrolled * 0.5;
            scanLine.style.transform = `translateY(${speed}px)`;
        }
    }

    // 键盘快捷键
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K - 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }

            // Ctrl/Cmd + Shift + T - 切换主题
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }

            // Escape - 退出专注模式或关闭搜索
            if (e.key === 'Escape') {
                e.preventDefault();

                // 优先检查是否在专注模式中，如果是则退出专注模式
                if (document.body.classList.contains('zen-mode')) {
                    this.toggleZenMode();
                    this.showToast('已退出专注模式', 'info');
                    return;
                }

                // 如果不在专注模式中，则关闭搜索模态框
                this.closeSearchModal();
            }

            // 在搜索模态框中的导航
            if (document.getElementById('search-modal').classList.contains('open')) {
                this.handleSearchNavigation(e);
            }
        });
    }

    // 浮动操作按钮
    setupFloatingActions() {
        // const quickNotesBtn = document.getElementById('quick-notes');
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        const zenMode = document.getElementById('zen-mode');

        // 快速笔记功能已禁用
        // if (quickNotesBtn) {
        //     quickNotesBtn.addEventListener('click', () => {
        //         this.openQuickNotes();
        //     });
        // }

        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        if (zenMode) {
            zenMode.addEventListener('click', () => {
                this.toggleZenMode();
            });
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                // Error handling for fullscreen request
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleZenMode() {
        const sidebar = document.getElementById('sidebar');
        const topBar = document.querySelector('.top-bar');
        const floatingActions = document.querySelector('.floating-actions');

        const isZenMode = document.body.classList.contains('zen-mode');

        if (isZenMode) {
            // 退出专注模式
            document.body.classList.remove('zen-mode');
            sidebar.style.display = '';
            topBar.style.display = '';
            floatingActions.style.display = '';
            this.showToast('已退出专注模式', 'info');
        } else {
            // 进入专注模式
            document.body.classList.add('zen-mode');
            sidebar.style.display = 'none';
            topBar.style.display = 'none';
            floatingActions.style.display = 'none';
            this.showToast('已进入专注模式，按ESC键退出', 'info');
        }
    }

    /*
    // 快速笔记功能 - 已完全禁用
    // 以下所有快速笔记相关的方法和样式都已被注释掉
    // 包括：
    // - addQuickNotesStyles(): 快速笔记样式添加
    // - setupQuickNotesEvents(): 事件处理设置
    // - updateNoteCount(): 字数统计更新
    // - updateSaveStatus(): 保存状态更新
    // - autoSave(): 自动保存功能
    // - saveNotes(): 保存笔记到本地存储
    // - exportNotes(): 导出为Markdown
    // - importNotes(): 导入文件功能
    // - setupFormatButtons(): 格式化按钮设置
    // - animateButton(): 按钮动画效果
    // - insertFormat(): 文本格式化插入
    // - handleQuickNotesKeyboard(): 键盘快捷键处理
    // - closeQuickNotes(): 关闭笔记窗口
    // - minimizeQuickNotes(): 最小化笔记窗口
    */

    // 打字机效果
    setupTypingEffect() {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            const text = typedElement.textContent;
            typedElement.textContent = '';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typedElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };

            setTimeout(typeWriter, 1000);
        }
    }

    // 目录功能
    setupTableOfContents() {
        this.setupTocToggle();
        this.setupTocNavigation();
        this.setupTocScrollSpy();
        this.optimizeTocForMobile();
        this.enhanceCodeBlocks();
    }

    setupTocToggle() {
        const tocToggle = document.querySelector('.toc-toggle');
        const tocNav = document.querySelector('.toc-nav');

        if (tocToggle && tocNav) {
            tocToggle.addEventListener('click', () => {
                tocNav.classList.toggle('collapsed');

                // 更新切换按钮图标
                const icon = tocToggle.querySelector('i');
                if (icon) {
                    icon.className = tocNav.classList.contains('collapsed') ?
                        'fas fa-chevron-down' : 'fas fa-chevron-up';
                }
            });

            // 在移动设备上默认折叠
            if (window.innerWidth <= 768) {
                tocNav.classList.add('collapsed');
            }
        }
    }

    setupTocNavigation() {
        const tocLinks = document.querySelectorAll('.toc-link');

        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // 移除所有活动状态
                    tocLinks.forEach(l => l.classList.remove('active'));
                    // 添加当前活动状态
                    link.classList.add('active');

                    // 平滑滚动到目标
                    const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 0;
                    const offset = targetElement.offsetTop - topbarHeight - 20;

                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });

                    // 高亮目标元素
                    this.highlightTarget(targetElement);
                }
            });
        });
    }

    setupTocScrollSpy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocLinks = document.querySelectorAll('.toc-link');

        if (headings.length === 0 || tocLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    // 移除所有活动状态
                    tocLinks.forEach(link => link.classList.remove('active'));
                    // 添加当前活动状态
                    if (tocLink) {
                        tocLink.classList.add('active');
                        this.scrollTocToActive(tocLink);
                    }
                }
            });
        }, {
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0.1
        });

        headings.forEach(heading => {
            if (heading.id) {
                observer.observe(heading);
            }
        });
    }

    scrollTocToActive(activeLink) {
        const tocNav = document.querySelector('.toc-nav');
        if (!tocNav || !activeLink) return;

        const tocNavRect = tocNav.getBoundingClientRect();
        const activeLinkRect = activeLink.getBoundingClientRect();

        // 计算需要滚动的距离
        const scrollTop = tocNav.scrollTop;
        const linkTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        const navHeight = tocNav.offsetHeight;

        // 如果链接不在可视区域内，则滚动到中央
        if (linkTop < scrollTop || linkTop + linkHeight > scrollTop + navHeight) {
            tocNav.scrollTo({
                top: linkTop - navHeight / 2 + linkHeight / 2,
                behavior: 'smooth'
            });
        }
    }

    highlightTarget(element) {
        // 移除之前的高亮
        const highlighted = document.querySelector('.toc-target-highlight');
        if (highlighted) {
            highlighted.classList.remove('toc-target-highlight');
        }

        // 添加高亮效果
        element.classList.add('toc-target-highlight');

        // 2秒后移除高亮
        setTimeout(() => {
            element.classList.remove('toc-target-highlight');
        }, 2000);
    }

    optimizeTocForMobile() {
        const handleResize = () => {
            const toc = document.querySelector('.post-toc');
            const tocNav = document.querySelector('.toc-nav');

            if (toc && tocNav) {
                if (window.innerWidth <= 1024) {
                    // 在移动设备上优化目录显示
                    tocNav.style.maxHeight = window.innerWidth <= 768 ? '150px' : '200px';
                } else {
                    // 桌面设备上恢复正常高度
                    tocNav.style.maxHeight = 'calc(100vh - var(--topbar-height) - 8rem)';
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始调用
    }

    // 性能监控
    initializePerformanceMonitor() {
        // 性能监控
        const loadTime = performance.now();

        // 内存使用监控（如果支持）
        if (performance.memory) {
            const memoryInfo = {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }
    }

    // 工具方法
    showToast(message, type = 'info') {
        // 创建或获取 toast 容器
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // 创建 toast 元素
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        // 添加到容器
        container.appendChild(toast);

        // 触发显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 自动移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 250);
        }, 3000);
    }

    // 懒加载图片
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    enhanceCodeBlocks() {
        // 为每个代码块添加容器和增强功能
        const processedElements = new Set();

        // 统一处理所有代码块
        const codeBlocks = [
            ...document.querySelectorAll('pre'),
            ...document.querySelectorAll('.highlight')
        ];

        codeBlocks.forEach((element) => {
            // 如果已经处理过，跳过
            if (processedElements.has(element) || element.closest('.code-block-container')) {
                return;
            }

            let targetElement = element;
            let codeElement;

            // 确定实际的代码元素
            if (element.classList.contains('highlight')) {
                // Jekyll Rouge highlight 容器
                const preElement = element.querySelector('pre');
                if (!preElement) return;

                targetElement = element;
                codeElement = element.querySelector('code');

                // 标记相关的 pre 元素也已处理
                processedElements.add(preElement);
            } else if (element.tagName === 'PRE') {
                // 直接的 pre 元素
                codeElement = element.querySelector('code');
                if (!codeElement) return;

                // 检查是否在 highlight 容器内
                const highlightParent = element.closest('.highlight');
                if (highlightParent) {
                    // 如果在 highlight 内，跳过单独处理
                    return;
                }

                targetElement = element;
            } else {
                return;
            }

            // 标记为已处理
            processedElements.add(element);

            // 创建代码块容器
            const container = document.createElement('div');
            container.className = 'code-block-container';
            targetElement.parentNode.insertBefore(container, targetElement);
            container.appendChild(targetElement);

            // 检测语言
            const language = this.detectCodeLanguage(codeElement) ||
                           this.detectLanguageFromClass(targetElement);

            // 添加语言标签
            if (language) {
                const langTag = document.createElement('div');
                langTag.className = 'code-language';
                langTag.textContent = language;
                container.appendChild(langTag);
            }

            // 添加复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i><span>复制</span>';
            copyBtn.title = '复制代码到剪贴板';

            // 复制功能
            copyBtn.addEventListener('click', () => {
                this.copyCodeToClipboard(codeElement, copyBtn);
            });

            container.appendChild(copyBtn);

            // 添加行号（对于较长的代码块）
            const preElement = targetElement.tagName === 'PRE' ? targetElement : targetElement.querySelector('pre');
            if (preElement && codeElement) {
                this.addLineNumbers(preElement, codeElement);
            }
        });
    }

    detectCodeLanguage(codeElement) {
        // 从class属性检测语言
        const classes = codeElement.className || '';
        const languageMatch = classes.match(/(?:language-|lang-)([a-zA-Z0-9-]+)/);
        if (languageMatch) {
            return languageMatch[1];
        }

        // 从父元素检测
        const highlight = codeElement.closest('.highlight');
        if (highlight) {
            return this.detectLanguageFromClass(highlight);
        }

        // 基于内容的简单检测
        const code = codeElement.textContent.trim();
        return this.detectLanguageFromContent(code);
    }

    detectLanguageFromClass(element) {
        const className = element.className || '';

        // Jekyll Rouge 高亮类名模式
        const patterns = {
            'highlight-bash': 'bash',
            'highlight-shell': 'shell',
            'highlight-javascript': 'javascript',
            'highlight-js': 'javascript',
            'highlight-python': 'python',
            'highlight-py': 'python',
            'highlight-java': 'java',
            'highlight-cpp': 'cpp',
            'highlight-c': 'c',
            'highlight-html': 'html',
            'highlight-css': 'css',
            'highlight-json': 'json',
            'highlight-yaml': 'yaml',
            'highlight-yml': 'yaml',
            'highlight-sql': 'sql',
            'highlight-dockerfile': 'dockerfile',
            'highlight-docker': 'docker'
        };

        for (const [pattern, lang] of Object.entries(patterns)) {
            if (className.includes(pattern)) {
                return lang;
            }
        }

        // 检查Rouge生成的语言类
        const match = className.match(/language-(\w+)/);
        if (match) {
            return match[1];
        }

        return null;
    }

    detectLanguageFromContent(code) {
        // 基于内容的简单语言检测
        if (code.includes('#!/bin/bash') || code.includes('#!/bin/sh')) return 'bash';
        if (code.includes('docker run') || code.includes('FROM ')) return 'docker';
        if (code.includes('def ') && code.includes(':')) return 'python';
        if (code.includes('function ') || code.includes('=>')) return 'javascript';
        if (code.includes('public class') || code.includes('import java')) return 'java';
        if (code.includes('SELECT ') || code.includes('FROM ')) return 'sql';
        if (code.includes('<!DOCTYPE') || code.includes('<html')) return 'html';
        if (code.includes('apiVersion:') || code.includes('kind:')) return 'yaml';
        if (code.includes('git ') || code.includes('npm ')) return 'bash';

        return null;
    }

    async copyCodeToClipboard(codeElement, button) {
        try {
            // 获取代码文本，排除行号
            let codeText = codeElement.textContent;

            // 如果有行号，尝试清理它们
            const lines = codeText.split('\n');
            const cleanLines = lines.map(line => {
                // 移除开头的行号模式 (1, 2, 3, 等)
                return line.replace(/^\s*\d+\s+/, '');
            });
            codeText = cleanLines.join('\n');

            // 使用现代剪贴板API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(codeText);
            } else {
                // 降级方案
                this.fallbackCopyText(codeText);
            }

            // 更新按钮状态
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i><span>已复制</span>';
            button.classList.add('copied');

            // 2秒后恢复
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 2000);

            // 显示提示
            this.showToast('代码已复制到剪贴板', 'success');

        } catch (err) {
            console.error('复制失败:', err);
            this.showToast('复制失败，请手动选择复制', 'error');
        }
    }

    fallbackCopyText(text) {
        // 降级复制方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('降级复制也失败了:', err);
        } finally {
            textArea.remove();
        }
    }

    addLineNumbers(pre, codeElement) {
        const lines = codeElement.textContent.split('\n');

        // 只对超过10行的代码添加行号
        if (lines.length <= 10) return;

        // 检查是否已经有行号
        if (pre.querySelector('.line-numbers')) return;

        const lineNumbersContainer = document.createElement('div');
        lineNumbersContainer.className = 'line-numbers';
        lineNumbersContainer.setAttribute('aria-hidden', 'true');

        // 生成行号
        for (let i = 1; i <= lines.length; i++) {
            const lineNumber = document.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = i.toString().padStart(2, ' ');
            lineNumbersContainer.appendChild(lineNumber);
        }

        pre.style.display = 'flex';
        pre.insertBefore(lineNumbersContainer, codeElement);

        // 添加行号样式
        const style = document.createElement('style');
        style.textContent = `
            .line-numbers {
                background: var(--bg-secondary);
                color: var(--text-muted);
                padding: var(--spacing-lg) var(--spacing-sm);
                margin-right: var(--spacing-md);
                border-right: 1px solid var(--border-secondary);
                font-family: var(--font-mono);
                font-size: 0.875rem;
                line-height: 1.5;
                user-select: none;
                min-width: 3rem;
                text-align: right;
            }

            .line-number {
                display: block;
                line-height: 1.5;
            }
        `;

        if (!document.querySelector('#line-numbers-style')) {
            style.id = 'line-numbers-style';
            document.head.appendChild(style);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');

        if (!themeToggle) return;

        // 从本地存储加载主题偏好
        this.loadThemePreference();

        // 监听主题切换按钮点击事件
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // 监听系统主题变化
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // 只有在用户没有手动设置主题时才跟随系统主题
            if (!localStorage.getItem('theme-preference')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    loadThemePreference() {
        // 优先级：本地存储 > 系统偏好 > 默认浅色
        const savedTheme = localStorage.getItem('theme-preference');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let theme = 'light'; // 默认主题

        if (savedTheme) {
            theme = savedTheme;
        } else if (systemPrefersDark) {
            theme = 'dark';
        }

        this.setTheme(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        this.setTheme(newTheme);

        // 保存用户偏好到本地存储
        localStorage.setItem('theme-preference', newTheme);

        // 显示主题切换提示
        this.showToast(`已切换到${newTheme === 'dark' ? '暗黑' : '浅色'}主题`, 'info');
    }

    setTheme(theme) {
        // 添加切换类以进行平滑过渡
        document.documentElement.classList.add('theme-switching');

        // 设置HTML元素的data-theme属性
        document.documentElement.setAttribute('data-theme', theme);

        // 更新主题切换按钮的标题
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('title',
                theme === 'dark' ? '切换到浅色模式 (Ctrl+Shift+T)' : '切换到暗黑模式 (Ctrl+Shift+T)'
            );
        }

        // 更新meta theme-color（用于移动端浏览器主题色）
        this.updateMetaThemeColor(theme);

        // 移除切换类
        setTimeout(() => {
            document.documentElement.classList.remove('theme-switching');
        }, 200);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');

        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        // 根据主题设置不同的颜色
        const color = theme === 'dark' ? '#0f172a' : '#ffffff';
        metaThemeColor.content = color;
    }

    setupCategoryDropdown() {
        const categoryToggles = document.querySelectorAll('.category-toggle');

        categoryToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const categoryName = toggle.dataset.category;
                const subNavList = document.querySelector(`.sub-nav-list[data-category="${categoryName}"]`);
                const isExpanded = toggle.classList.contains('expanded');

                // 切换当前分类
                if (isExpanded) {
                    // 折叠当前分类
                    toggle.classList.remove('expanded');
                    subNavList?.classList.remove('expanded');
                } else {
                    // 先关闭其他展开的分类（可选：如果想要手风琴效果）
                    // categoryToggles.forEach(otherToggle => {
                    //     if (otherToggle !== toggle) {
                    //         otherToggle.classList.remove('expanded');
                    //         const otherCategoryName = otherToggle.dataset.category;
                    //         const otherSubNavList = document.querySelector(`.sub-nav-list[data-category="${otherCategoryName}"]`);
                    //         otherSubNavList?.classList.remove('expanded');
                    //     }
                    // });

                    // 展开当前分类
                    toggle.classList.add('expanded');
                    subNavList?.classList.add('expanded');

                    // 平滑滚动到可见区域
                    setTimeout(() => {
                        if (subNavList && subNavList.scrollHeight > 400) {
                            subNavList.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }, 300);
                }
            });

            // 为子导航链接添加点击关闭功能（移动端）
            const categoryName = toggle.dataset.category;
            const subNavList = document.querySelector(`.sub-nav-list[data-category="${categoryName}"]`);

            if (subNavList) {
                const subNavLinks = subNavList.querySelectorAll('.sub-nav-link');
                subNavLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        // 在移动设备上点击链接后关闭侧边栏
                        if (window.innerWidth <= 768) {
                            const sidebar = document.getElementById('sidebar');
                            if (sidebar && sidebar.classList.contains('open')) {
                                setTimeout(() => {
                                    sidebar.classList.remove('open');
                                    this.removeOverlay();
                                }, 150);
                            }
                        }
                    });
                });
            }
        });

        // 初始化时展开当前页面所在的分类
        this.expandCurrentCategory();

        console.log('CyberUI: Category dropdown initialized');
    }

    expandCurrentCategory() {
        // 获取当前页面URL
        const currentPath = window.location.pathname;

        // 查找当前页面对应的子导航链接
        const currentSubNavLink = document.querySelector(`.sub-nav-link[href="${currentPath}"]`);

        if (currentSubNavLink) {
            // 找到对应的分类容器
            const subNavList = currentSubNavLink.closest('.sub-nav-list');
            const categoryName = subNavList?.dataset.category;

            if (categoryName) {
                // 展开对应的分类
                const categoryToggle = document.querySelector(`.category-toggle[data-category="${categoryName}"]`);
                if (categoryToggle && subNavList) {
                    categoryToggle.classList.add('expanded');
                    subNavList.classList.add('expanded');
                }
            }
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.cyberUI = new CyberUI();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberUI;
}

// 移动端侧边栏管理
function setupMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainContent = document.querySelector('.main-content');

    if (!sidebar || !mobileToggle) return;

    // 创建背景遮罩
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 150;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    document.body.appendChild(overlay);

    // 切换侧边栏
    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('open');

        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';

        // 更新按钮图标
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';

        // 更新按钮图标
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }

    // 绑定事件
    mobileToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);

    // 触摸手势支持
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function handleTouchStart(e) {
        if (window.innerWidth > 768) return;

        startX = e.touches[0].clientX;

        // 从左边缘开始的手势
        if (startX < 20) {
            isDragging = true;
            sidebar.style.transition = 'none';
        }
        // 侧边栏开启时的手势
        else if (sidebar.classList.contains('open')) {
            isDragging = true;
            sidebar.style.transition = 'none';
        }
    }

    function handleTouchMove(e) {
        if (!isDragging || window.innerWidth > 768) return;

        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (sidebar.classList.contains('open')) {
            // 侧边栏开启时，向左滑动关闭
            if (diffX < 0) {
                const progress = Math.max(0, 1 + diffX / 280);
                sidebar.style.transform = `translateX(${diffX}px)`;
                overlay.style.opacity = progress * 0.5;
            }
        } else {
            // 侧边栏关闭时，向右滑动开启
            if (diffX > 0 && startX < 20) {
                const progress = Math.min(1, diffX / 280);
                sidebar.style.transform = `translateX(${-280 + diffX}px)`;
                overlay.style.opacity = progress * 0.5;
                overlay.style.visibility = 'visible';
            }
        }
    }

    function handleTouchEnd(e) {
        if (!isDragging || window.innerWidth > 768) return;

        const diffX = currentX - startX;
        const threshold = 140; // 触发阈值

        sidebar.style.transition = '';
        sidebar.style.transform = '';

        if (sidebar.classList.contains('open')) {
            // 向左滑动超过阈值，关闭侧边栏
            if (diffX < -threshold) {
                closeSidebar();
            } else {
                // 回弹到开启状态
                openSidebar();
            }
        } else {
            // 向右滑动超过阈值，开启侧边栏
            if (diffX > threshold && startX < 20) {
                openSidebar();
            } else {
                // 回弹到关闭状态
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }
        }

        isDragging = false;
        startX = 0;
        currentX = 0;
    }

    // 绑定触摸事件
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 窗口大小改变时的处理
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
            document.body.style.overflow = '';
        }
    });

    // 点击侧边栏内链接时关闭侧边栏
    sidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            setTimeout(closeSidebar, 150);
        }
    });
}

// 全局搜索函数，供外部调用
function openSearchModal() {
    if (window.cyberUI) {
        window.cyberUI.openSearchModal();
    }
}

// 全局关闭搜索函数
function closeSearchModal() {
    if (window.cyberUI) {
        window.cyberUI.closeSearchModal();
    }
}

// 快捷键函数，供外部调用
function triggerSearch() {
    openSearchModal();
}

// 技术栈分页功能
class TechStackTabs {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupTechItems();
        this.updateStats();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tech-tab');
        const techItems = document.querySelectorAll('.tech-item');

        if (!tabs.length || !techItems.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有活动状态
                tabs.forEach(t => t.classList.remove('active'));

                // 设置当前标签为活动状态
                tab.classList.add('active');

                // 获取过滤类别
                const category = tab.dataset.category;

                // 过滤技术项
                this.filterTechItems(category);

                // 更新统计
                this.updateStats(category);

                // 添加切换动画
                this.animateItemsChange();
            });
        });
    }

    setupTechItems() {
        const techItems = document.querySelectorAll('.tech-item');

        // 为每个技术项添加点击跟踪
        techItems.forEach(item => {
            item.addEventListener('click', () => {
                const techName = item.querySelector('.tech-name')?.textContent;
                if (techName) {
                    // 可以在这里添加Google Analytics跟踪
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'tech_stack_click', {
                            'tech_name': techName,
                            'event_category': 'engagement'
                        });
                    }
                }
            });
        });
    }

    filterTechItems(category) {
        const techItems = document.querySelectorAll('.tech-item');

        techItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.display = '';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    }

    updateStats(category = 'all') {
        const visibleTagsCountElement = document.getElementById('visible-tags-count');
        if (!visibleTagsCountElement) return;

        const techItems = document.querySelectorAll('.tech-item');
        let visibleCount = 0;

        if (category === 'all') {
            visibleCount = techItems.length;
        } else {
            techItems.forEach(item => {
                if (item.dataset.category === category) {
                    visibleCount++;
                }
            });
        }

        // 数字动画效果
        this.animateNumber(visibleTagsCountElement, visibleCount);
    }

    animateNumber(element, targetNumber) {
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

    animateItemsChange() {
        const visibleItems = document.querySelectorAll('.tech-item:not(.hidden)');

        // 为可见项添加渐入动画
        visibleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // 获取分类统计信息
    getCategoryStats() {
        const techItems = document.querySelectorAll('.tech-item');
        const stats = {
            all: 0,
            devops: 0,
            languages: 0,
            cloud: 0,
            security: 0,
            tools: 0,
            system: 0
        };

        techItems.forEach(item => {
            const category = item.dataset.category;
            if (stats.hasOwnProperty(category)) {
                stats[category]++;
            }
            stats.all++;
        });

        return stats;
    }

    // 设置标签徽章显示数量
    updateTabBadges() {
        const stats = this.getCategoryStats();
        const tabs = document.querySelectorAll('.tech-tab');

        tabs.forEach(tab => {
            const category = tab.dataset.category;
            const count = stats[category] || 0;

            // 移除现有徽章
            const existingBadge = tab.querySelector('.tab-badge');
            if (existingBadge) {
                existingBadge.remove();
            }

            // 添加新徽章（仅在数量大于0时）
            if (count > 0) {
                const badge = document.createElement('span');
                badge.className = 'tab-badge';
                badge.textContent = count;
                badge.style.cssText = `
                    background: var(--accent-blue);
                    color: white;
                    font-size: 0.7rem;
                    padding: 2px 6px;
                    border-radius: 10px;
                    margin-left: 4px;
                    font-weight: bold;
                    min-width: 18px;
                    text-align: center;
                `;
                tab.appendChild(badge);
            }
        });
    }
}

// 搜索功能增强
function enhanceSearch() {
    const searchInput = document.getElementById('error-search');
    if (!searchInput) return;

    // 添加搜索建议功能
    const suggestions = [
        'Docker', 'Kubernetes', 'Linux', 'Python', 'DevOps',
        'Security', 'Network', 'AWS', 'Git', 'Jenkins'
    ];

    searchInput.addEventListener('focus', () => {
        // 可以在这里显示搜索建议
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length >= 2) {
            // 实时搜索建议
            const matchedSuggestions = suggestions.filter(s =>
                s.toLowerCase().includes(query)
            );
            // 这里可以显示建议列表
        }
    });
}

// 初始化技术栈分页
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否在首页且存在技术栈区域
    const techStackSection = document.querySelector('.tech-stack-section');
    if (techStackSection) {
        const techStackTabs = new TechStackTabs();

        // 初始化标签徽章
        setTimeout(() => {
            techStackTabs.updateTabBadges();
        }, 100);

        // 页面可见性变化时刷新统计
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                techStackTabs.updateStats();
            }
        });
    }

    // 初始化搜索增强
    enhanceSearch();
});

// 性能监控
function trackTechStackUsage() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const techName = item.querySelector('.tech-name')?.textContent;
            const category = item.dataset.category;

            // 发送使用统计
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tech_interaction', {
                    'tech_name': techName,
                    'category': category,
                    'event_category': 'tech_stack'
                });
            }
        });
    });
}

// 导出技术栈功能
window.TechStackTabs = TechStackTabs;