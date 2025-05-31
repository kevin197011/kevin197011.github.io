/**
 * 打字机效果 JavaScript 控制器
 * Typewriter Effects Controller
 */

class TypewriterEffects {
    constructor() {
        this.observers = [];
        this.isInitialized = false;
        this.defaultOptions = {
            speed: 50,
            delay: 0,
            cursor: true,
            cursorChar: '|',
            loop: false,
            deleteSpeed: 30,
            pauseTime: 1000
        };

        this.init();
    }

    /**
     * 初始化打字机效果系统
     */
    init() {
        if (this.isInitialized) return;

        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEffects());
        } else {
            this.setupEffects();
        }

        this.isInitialized = true;
    }

    /**
     * 设置所有打字机效果
     */
    setupEffects() {
        // 自动检测并应用打字机效果
        this.autoDetectElements();

        // 设置交叉观察器用于延迟加载
        this.setupIntersectionObserver();

        // 监听页面变化
        this.observePageChanges();
    }

    /**
     * 自动检测页面中的元素并应用打字机效果
     */
    autoDetectElements() {
        // 标题元素
        const titles = document.querySelectorAll('h1, h2, h3, .page-title, .post-title, .section-title');
        titles.forEach((title, index) => {
            if (!title.classList.contains('typewriter-processed')) {
                this.applyTypewriterEffect(title, {
                    speed: 80,
                    delay: index * 200,
                    type: 'title'
                });
            }
        });

        // 段落元素
        const paragraphs = document.querySelectorAll('p, .description, .excerpt');
        paragraphs.forEach((p, index) => {
            if (!p.classList.contains('typewriter-processed')) {
                this.applyTypewriterEffect(p, {
                    speed: 30,
                    delay: (titles.length * 200) + (index * 100),
                    type: 'paragraph'
                });
            }
        });

        // 列表元素
        const lists = document.querySelectorAll('ul, ol');
        lists.forEach((list, index) => {
            if (!list.classList.contains('typewriter-processed')) {
                this.applyListTypewriter(list, {
                    delay: (titles.length + paragraphs.length) * 100 + (index * 300)
                });
            }
        });

        // 代码块
        const codeBlocks = document.querySelectorAll('pre code, .highlight');
        codeBlocks.forEach((code, index) => {
            if (!code.classList.contains('typewriter-processed')) {
                this.applyCodeTypewriter(code, {
                    speed: 20,
                    delay: index * 500
                });
            }
        });

        // 卡片元素
        const cards = document.querySelectorAll('.card, .post-item, .category-card, .tag-section');
        cards.forEach((card, index) => {
            if (!card.classList.contains('typewriter-processed')) {
                this.applyCardTypewriter(card, {
                    delay: index * 200
                });
            }
        });

        // 按钮元素
        const buttons = document.querySelectorAll('button, .btn, .nav-link');
        buttons.forEach((button, index) => {
            if (!button.classList.contains('typewriter-processed')) {
                this.applyButtonTypewriter(button, {
                    delay: index * 100
                });
            }
        });
    }

    /**
     * 应用基础打字机效果
     */
    applyTypewriterEffect(element, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        const text = element.textContent;

        if (!text || text.trim() === '') return;

        element.classList.add('typewriter-processed');
        element.textContent = '';

        // 添加样式类
        if (opts.type === 'title') {
            element.classList.add('typewriter-title');
        } else {
            element.classList.add('typewriter');
        }

        // 延迟执行
        setTimeout(() => {
            this.typeText(element, text, opts);
        }, opts.delay);
    }

    /**
     * 逐字符打字效果
     */
    typeText(element, text, options) {
        let index = 0;
        const chars = text.split('');

        const typeChar = () => {
            if (index < chars.length) {
                element.textContent += chars[index];
                index++;
                setTimeout(typeChar, options.speed);
            } else if (options.cursor) {
                // 添加光标闪烁效果
                this.addBlinkingCursor(element, options.cursorChar);
            }
        };

        typeChar();
    }

    /**
     * 应用段落打字机效果（逐字符淡入）
     */
    applyParagraphTypewriter(element, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        const text = element.textContent;

        if (!text || text.trim() === '') return;

        element.classList.add('typewriter-processed', 'typewriter-paragraph');
        element.innerHTML = '';

        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // 保持空格
            span.className = 'char';
            span.style.animationDelay = `${(opts.delay + index * 30)}ms`;
            element.appendChild(span);
        });
    }

    /**
     * 应用列表打字机效果
     */
    applyListTypewriter(listElement, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        const items = listElement.querySelectorAll('li');

        listElement.classList.add('typewriter-processed', 'typewriter-list');

        items.forEach((item, index) => {
            item.style.animationDelay = `${opts.delay + index * 200}ms`;
        });
    }

    /**
     * 应用代码块打字机效果
     */
    applyCodeTypewriter(codeElement, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        const text = codeElement.textContent;
        const lines = text.split('\n').filter(line => line.trim() !== '');

        codeElement.classList.add('typewriter-processed', 'typewriter-code');
        codeElement.innerHTML = '';

        lines.forEach((line, index) => {
            const lineElement = document.createElement('span');
            lineElement.className = 'typewriter-code-line';
            lineElement.textContent = line;
            lineElement.style.animationDelay = `${opts.delay + index * 300}ms`;
            codeElement.appendChild(lineElement);

            if (index < lines.length - 1) {
                codeElement.appendChild(document.createElement('br'));
            }
        });
    }

    /**
     * 应用卡片打字机效果
     */
    applyCardTypewriter(cardElement, options = {}) {
        const opts = { ...this.defaultOptions, ...options };

        cardElement.classList.add('typewriter-processed', 'typewriter-card');
        cardElement.style.animationDelay = `${opts.delay}ms`;

        // 为卡片内的文本元素应用打字机效果
        const textElements = cardElement.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
        textElements.forEach((el, index) => {
            if (!el.classList.contains('typewriter-processed')) {
                setTimeout(() => {
                    this.applyParagraphTypewriter(el, {
                        delay: 100 * index
                    });
                }, opts.delay + 300);
            }
        });
    }

    /**
     * 应用按钮打字机效果
     */
    applyButtonTypewriter(buttonElement, options = {}) {
        const opts = { ...this.defaultOptions, ...options };

        buttonElement.classList.add('typewriter-processed', 'typewriter-button');
        buttonElement.style.animationDelay = `${opts.delay}ms`;
    }

    /**
     * 添加闪烁光标
     */
    addBlinkingCursor(element, cursorChar = '|') {
        const cursor = document.createElement('span');
        cursor.textContent = cursorChar;
        cursor.className = 'typewriter-cursor';
        cursor.style.animation = 'blink-caret 0.75s step-end infinite';
        element.appendChild(cursor);
    }

    /**
     * 设置交叉观察器用于延迟加载
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // 检查是否已经处理过
                    if (!element.classList.contains('typewriter-processed')) {
                        this.processElement(element);
                    }

                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // 观察所有可能需要打字机效果的元素
        const elementsToObserve = document.querySelectorAll(`
            .post-content p,
            .post-content h1,
            .post-content h2,
            .post-content h3,
            .post-content h4,
            .post-content h5,
            .post-content h6,
            .post-content ul,
            .post-content ol,
            .post-content pre,
            .card,
            .post-item,
            .category-card,
            .tag-section
        `);

        elementsToObserve.forEach(el => {
            if (!el.classList.contains('typewriter-processed')) {
                observer.observe(el);
            }
        });

        this.observers.push(observer);
    }

    /**
     * 处理单个元素
     */
    processElement(element) {
        const tagName = element.tagName.toLowerCase();

        switch (tagName) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                this.applyTypewriterEffect(element, { type: 'title', speed: 80 });
                break;
            case 'p':
                this.applyParagraphTypewriter(element, { speed: 30 });
                break;
            case 'ul':
            case 'ol':
                this.applyListTypewriter(element);
                break;
            case 'pre':
                const code = element.querySelector('code');
                if (code) {
                    this.applyCodeTypewriter(code);
                }
                break;
            default:
                if (element.classList.contains('card') ||
                    element.classList.contains('post-item') ||
                    element.classList.contains('category-card') ||
                    element.classList.contains('tag-section')) {
                    this.applyCardTypewriter(element);
                }
                break;
        }
    }

    /**
     * 监听页面变化（用于SPA或动态内容）
     */
    observePageChanges() {
        if (!('MutationObserver' in window)) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // 为新添加的元素应用打字机效果
                            this.processNewElements(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.push(observer);
    }

    /**
     * 处理新添加的元素
     */
    processNewElements(container) {
        const elements = container.querySelectorAll(`
            h1, h2, h3, h4, h5, h6,
            p,
            ul, ol,
            pre code,
            .card, .post-item, .category-card, .tag-section,
            button, .btn, .nav-link
        `);

        elements.forEach(el => {
            if (!el.classList.contains('typewriter-processed')) {
                setTimeout(() => this.processElement(el), 100);
            }
        });
    }

    /**
     * 创建终端效果
     */
    createTerminalEffect(container, commands, options = {}) {
        const opts = { ...this.defaultOptions, speed: 50, ...options };

        container.classList.add('typewriter-terminal');
        container.innerHTML = '';

        let delay = opts.delay || 0;

        commands.forEach((command, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'typewriter-terminal-line';
                line.textContent = command;
                line.style.animationDelay = `${delay}ms`;
                container.appendChild(line);
                delay += 500;
            }, index * 1000);
        });
    }

    /**
     * 销毁所有观察器
     */
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
        this.isInitialized = false;
    }

    /**
     * 重新初始化（用于页面内容更新后）
     */
    reinitialize() {
        this.destroy();
        setTimeout(() => this.init(), 100);
    }
}

// 全局实例
window.TypewriterEffects = TypewriterEffects;

// 自动初始化
const typewriterEffects = new TypewriterEffects();

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypewriterEffects;
}

// 为页面提供便捷方法
window.initTypewriter = function(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        if (!el.classList.contains('typewriter-processed')) {
            typewriterEffects.processElement(el);
        }
    });
};

// 为特定元素添加打字机效果的便捷方法
window.addTypewriterEffect = function(element, text, options = {}) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element && !element.classList.contains('typewriter-processed')) {
        typewriterEffects.applyTypewriterEffect(element, options);
    }
};

// 创建终端效果的便捷方法
window.createTerminal = function(selector, commands, options = {}) {
    const container = typeof selector === 'string' ?
        document.querySelector(selector) : selector;

    if (container) {
        typewriterEffects.createTerminalEffect(container, commands, options);
    }
};