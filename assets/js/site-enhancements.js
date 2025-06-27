/**
 * Site Enhancements - 网站增强功能
 * 包含各种图标交互和功能增强
 */

(function() {
    'use strict';

    // 页脚时间更新
    function updateFooterTime() {
        const timeElement = document.getElementById('footer-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('zh-CN', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }

    // 返回顶部功能
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 搜索功能
    function searchFor(keyword) {
        const searchInput = document.getElementById('modal-search-input') ||
                          document.getElementById('global-search') ||
                          document.getElementById('error-search');

        if (searchInput) {
            searchInput.value = keyword;
            searchInput.focus();
        }
    }

    // 执行搜索功能
    function performSearch() {
        const searchInput = document.getElementById('error-search');
        if (searchInput && searchInput.value.trim()) {
            const searchTerm = encodeURIComponent(searchInput.value.trim());
            window.location.href = `/?search=${searchTerm}`;
        }
    }

    // 打印页面功能
    function printPage() {
        window.print();
    }

    // 分享页面功能
    function sharePage() {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            alert('页面链接已复制到剪贴板！');
        } else {
            prompt('复制以下链接进行分享:', url);
        }
    }

    // 初始化功能
    function init() {
        // 页脚时间更新
        updateFooterTime();
        setInterval(updateFooterTime, 1000);

        // 绑定全局函数
        window.scrollToTop = scrollToTop;
        window.searchFor = searchFor;
        window.performSearch = performSearch;

        // 绑定事件监听器
        document.addEventListener('click', function(e) {
            if (e.target.closest('#print-page')) {
                e.preventDefault();
                printPage();
            }

            if (e.target.closest('#share-page')) {
                e.preventDefault();
                sharePage();
            }
        });
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();