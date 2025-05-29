// 极客主题交互功能
document.addEventListener('DOMContentLoaded', function() {

    // 页面加载动画
    initPageAnimation();

    // 代码块功能增强
    enhanceCodeBlocks();

    // 工具提示功能
    initTooltips();

    // 滚动效果
    initScrollEffects();

    // 键盘快捷键
    initKeyboardShortcuts();

    // Matrix雨效果
    initMatrixRain();

    // 平滑滚动
    initSmoothScroll();
});

// 页面加载动画
function initPageAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.6s ease-in-out';

    setTimeout(function() {
        body.style.opacity = '1';
    }, 100);

    // 为页面元素添加渐入动画
    const animationElements = document.querySelectorAll('.page-inner, .article-card, .stat-item');
    animationElements.forEach(function(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        setTimeout(function() {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
}

// 代码块功能增强
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentNode;

        // 添加语言标签
        const language = codeBlock.className.match(/language-(\w+)/);
        if (language) {
            const langTag = document.createElement('span');
            langTag.className = 'absolute top-2 left-2 bg-green-400 text-black px-2 py-1 rounded text-xs font-bold uppercase';
            langTag.textContent = language[1];
            pre.style.position = 'relative';
            pre.appendChild(langTag);
        }

        // 复制按钮
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-all duration-200 flex items-center space-x-1';
        button.innerHTML = '<i class="fas fa-copy"></i><span>复制</span>';

        button.onclick = function() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                    button.innerHTML = '<i class="fas fa-check text-green-400"></i><span>已复制</span>';
                    button.classList.add('bg-green-600');

                    setTimeout(function() {
                        button.innerHTML = '<i class="fas fa-copy"></i><span>复制</span>';
                        button.classList.remove('bg-green-600');
                    }, 2000);
                });
            }
        };

        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    // 为代码块添加语法高亮增强
    const preElements = document.querySelectorAll('pre');
    preElements.forEach(function(pre) {
        pre.classList.add('cyber-border');

        // 添加行号
        const code = pre.querySelector('code');
        if (code && code.textContent.split('\n').length > 3) {
            const lines = code.textContent.split('\n');
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'absolute left-0 top-0 bottom-0 w-12 bg-gray-800 flex flex-col justify-start items-center pt-6 text-xs text-gray-500';

            lines.forEach(function(line, index) {
                if (line.trim() || index < lines.length - 1) {
                    const lineNum = document.createElement('div');
                    lineNum.textContent = (index + 1).toString().padStart(2, '0');
                    lineNum.className = 'leading-6 hover:text-green-400 transition-colors';
                    lineNumbers.appendChild(lineNum);
                }
            });

            pre.style.position = 'relative';
            pre.style.paddingLeft = '3rem';
            pre.appendChild(lineNumbers);
        }
    });
}

// 工具提示功能
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(function(element) {
        element.classList.add('tooltip');

        // 增强悬浮效果
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 滚动效果
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.book-header');
    const navigation = document.querySelectorAll('.navigation');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 头部隐藏/显示
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-in-out';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        // 导航按钮动画
        navigation.forEach(function(nav) {
            if (scrollTop > 200) {
                nav.style.opacity = '1';
                nav.style.pointerEvents = 'auto';
            } else {
                nav.style.opacity = '0.7';
                nav.style.pointerEvents = 'auto';
            }
        });

        lastScrollTop = scrollTop;
    });

    // 滚动到顶部按钮
    const scrollToTop = document.createElement('button');
    scrollToTop.className = 'fixed bottom-6 right-6 bg-green-400 hover:bg-green-500 text-black p-3 rounded-full shadow-lg transition-all duration-300 z-50 opacity-0 transform translate-y-4';
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(scrollToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.transform = 'translateY(0)';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.transform = 'translateY(16px)';
        }
    });
}

// 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // 这里可以添加搜索功能
            console.log('搜索快捷键被触发');
        }

        // ESC 键返回顶部
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 左右箭头键导航
        if (e.key === 'ArrowLeft') {
            const prevLink = document.querySelector('.navigation-prev');
            if (prevLink) {
                window.location.href = prevLink.href;
            }
        }

        if (e.key === 'ArrowRight') {
            const nextLink = document.querySelector('.navigation-next');
            if (nextLink) {
                window.location.href = nextLink.href;
            }
        }
    });
}

// Matrix雨效果（轻量版）
function initMatrixRain() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'fixed inset-0 pointer-events-none z-0 opacity-10';
    document.body.appendChild(matrixContainer);

    function createMatrixColumn() {
        const column = document.createElement('div');
        column.className = 'absolute top-0 text-green-400 text-xs font-mono animate-pulse';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';

        let text = '';
        for (let i = 0; i < 20; i++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        column.textContent = text;

        matrixContainer.appendChild(column);

        setTimeout(function() {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 5000);
    }

    // 每2秒创建一列
    setInterval(createMatrixColumn, 2000);
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加打字机效果到标题
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// 为文章卡片添加悬浮效果
const articleCards = document.querySelectorAll('.article-card');
articleCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 255, 65, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}