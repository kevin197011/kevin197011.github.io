/**
 * SEO Optimization JavaScript Functions
 * Handles sharing, analytics, and user experience improvements
 */

// SEO and sharing functionality
(function() {
    'use strict';

    // Initialize SEO optimizations when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initSEOOptimizations();
        initSharingFunctions();
        initPerformanceTracking();
        initAccessibilityEnhancements();
    });

    /**
     * Initialize SEO optimizations
     */
    function initSEOOptimizations() {
        // Add structured data for reading time
        updateReadingTime();

        // Add word count
        updateWordCount();

        // Enhance internal linking
        enhanceInternalLinks();

        // Add alt text to images without it
        enhanceImageAccessibility();

        // Add nofollow to external links
        enhanceExternalLinks();
    }

    /**
     * Calculate and display reading time
     */
    function updateReadingTime() {
        const content = document.querySelector('.article-content');
        const readingTimeElement = document.getElementById('reading-time');

        if (content && readingTimeElement) {
            const text = content.textContent || content.innerText;
            const wordsPerMinute = 200; // Average reading speed
            const words = text.trim().split(/\s+/).length;
            const minutes = Math.ceil(words / wordsPerMinute);

            readingTimeElement.textContent = `约 ${minutes} 分钟阅读`;

            // Add to structured data
            const readingTimeData = {
                "@type": "Duration",
                "value": `PT${minutes}M`
            };

            // Update meta tag if exists
            const metaReadingTime = document.querySelector('meta[name="reading-time"]');
            if (metaReadingTime) {
                metaReadingTime.setAttribute('content', minutes);
            }
        }
    }

    /**
     * Calculate and display word count
     */
    function updateWordCount() {
        const content = document.querySelector('.article-content');
        const wordCountElement = document.getElementById('word-count');

        if (content && wordCountElement) {
            const text = content.textContent || content.innerText;
            const words = text.trim().split(/\s+/).length;

            wordCountElement.textContent = `${words.toLocaleString()} 字`;

            // Update structured data
            const wordCountMeta = document.querySelector('[itemProp="wordCount"]');
            if (wordCountMeta) {
                wordCountMeta.setAttribute('content', words);
            }
        }
    }

    /**
     * Enhance internal links for better SEO
     */
    function enhanceInternalLinks() {
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

        internalLinks.forEach(link => {
            // Add title if missing
            if (!link.getAttribute('title') && link.textContent) {
                link.setAttribute('title', link.textContent.trim());
            }

            // Add structured data for internal navigation
            if (!link.getAttribute('itemProp')) {
                link.setAttribute('itemProp', 'relatedLink');
            }
        });
    }

    /**
     * Enhance external links for SEO and security
     */
    function enhanceExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

        externalLinks.forEach(link => {
            // Add security attributes
            if (!link.getAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }

            // Add target blank if not set
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
            }

            // Add external link indicator
            if (!link.querySelector('.external-indicator')) {
                const indicator = document.createElement('i');
                indicator.className = 'fas fa-external-link-alt external-indicator';
                indicator.style.marginLeft = '0.3rem';
                indicator.style.fontSize = '0.8em';
                indicator.style.opacity = '0.7';
                link.appendChild(indicator);
            }
        });
    }

    /**
     * Enhance image accessibility and SEO
     */
    function enhanceImageAccessibility() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            // Add alt text if missing
            if (!img.getAttribute('alt')) {
                const figcaption = img.closest('figure')?.querySelector('figcaption');
                const title = img.getAttribute('title');
                const src = img.getAttribute('src');

                if (figcaption) {
                    img.setAttribute('alt', figcaption.textContent.trim());
                } else if (title) {
                    img.setAttribute('alt', title);
                } else if (src) {
                    // Generate alt from filename
                    const filename = src.split('/').pop().split('.')[0];
                    const altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    img.setAttribute('alt', altText);
                }
            }

            // Add loading="lazy" for performance
            if (!img.getAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add structured data
            if (!img.getAttribute('itemProp')) {
                img.setAttribute('itemProp', 'image');
            }
        });
    }

    /**
     * Initialize sharing functions
     */
    function initSharingFunctions() {
        // Make sharing functions globally available
        window.copyToClipboard = copyToClipboard;
        window.shareToTwitter = shareToTwitter;
        window.shareToLinkedIn = shareToLinkedIn;
        window.shareToWeibo = shareToWeibo;
        window.shareViaWebAPI = shareViaWebAPI;

        // Add Web Share API support if available
        if (navigator.share) {
            addWebShareButton();
        }
    }

    /**
     * Copy current page URL to clipboard
     */
    function copyToClipboard() {
        const url = window.location.href;
        const title = document.title;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('链接已复制到剪贴板', 'success');

                // Track sharing event
                if (window.gtag) {
                    gtag('event', 'share', {
                        method: 'copy_link',
                        content_type: 'article',
                        item_id: url
                    });
                }
            }).catch(() => {
                fallbackCopyToClipboard(url);
            });
        } else {
            fallbackCopyToClipboard(url);
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    function fallbackCopyToClipboard(text) {
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
            showNotification('链接已复制到剪贴板', 'success');
        } catch (err) {
            showNotification('复制失败，请手动复制链接', 'error');
        }

        document.body.removeChild(textArea);
    }

    /**
     * Share to Twitter
     */
    function shareToTwitter() {
        const url = window.location.href;
        const title = document.title;
        const text = `${title} - 来自 KK's Wiki`;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

        openShareWindow(twitterUrl, 'Twitter');

        // Track sharing event
        if (window.gtag) {
            gtag('event', 'share', {
                method: 'twitter',
                content_type: 'article',
                item_id: url
            });
        }
    }

    /**
     * Share to LinkedIn
     */
    function shareToLinkedIn() {
        const url = window.location.href;
        const title = document.title;

        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

        openShareWindow(linkedinUrl, 'LinkedIn');

        // Track sharing event
        if (window.gtag) {
            gtag('event', 'share', {
                method: 'linkedin',
                content_type: 'article',
                item_id: url
            });
        }
    }

    /**
     * Share to Weibo
     */
    function shareToWeibo() {
        const url = window.location.href;
        const title = document.title;
        const text = `${title} - 来自 KK's Wiki`;

        const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;

        openShareWindow(weiboUrl, 'Weibo');

        // Track sharing event
        if (window.gtag) {
            gtag('event', 'share', {
                method: 'weibo',
                content_type: 'article',
                item_id: url
            });
        }
    }

    /**
     * Use Web Share API if available
     */
    function shareViaWebAPI() {
        if (navigator.share) {
            const shareData = {
                title: document.title,
                text: document.querySelector('meta[name="description"]')?.content || '',
                url: window.location.href
            };

            navigator.share(shareData).then(() => {
                // Track sharing event
                if (window.gtag) {
                    gtag('event', 'share', {
                        method: 'web_share_api',
                        content_type: 'article',
                        item_id: window.location.href
                    });
                }
            }).catch((error) => {
                console.log('Error sharing:', error);
            });
        }
    }

    /**
     * Add Web Share API button if supported
     */
    function addWebShareButton() {
        const shareButtons = document.querySelector('.share-buttons');
        if (shareButtons) {
            const webShareBtn = document.createElement('button');
            webShareBtn.className = 'share-btn';
            webShareBtn.title = '分享';
            webShareBtn.onclick = shareViaWebAPI;
            webShareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';

            shareButtons.insertBefore(webShareBtn, shareButtons.firstChild.nextSibling);
        }
    }

    /**
     * Open share window
     */
    function openShareWindow(url, platform) {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            url,
            `share-${platform}`,
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );
    }

    /**
     * Show notification to user
     */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.seo-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `seo-notification seo-notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease',
            maxWidth: '300px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        });

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Initialize performance tracking
     */
    function initPerformanceTracking() {
        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

                // Send to Google Analytics if available
                if (window.gtag && loadTime > 0) {
                    gtag('event', 'timing_complete', {
                        name: 'page_load',
                        value: Math.round(loadTime)
                    });
                }

                // Track Core Web Vitals
                trackCoreWebVitals();
            }, 1000);
        });

        // Track user engagement
        trackUserEngagement();
    }

    /**
     * Track Core Web Vitals for SEO
     */
    function trackCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            try {
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];

                    if (window.gtag) {
                        gtag('event', 'web_vital', {
                            name: 'LCP',
                            value: Math.round(lastEntry.startTime),
                            event_category: 'Web Vitals'
                        });
                    }
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay (FID)
                const fidObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach((entry) => {
                        if (window.gtag) {
                            gtag('event', 'web_vital', {
                                name: 'FID',
                                value: Math.round(entry.processingStart - entry.startTime),
                                event_category: 'Web Vitals'
                            });
                        }
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift (CLS)
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });

                // Send CLS value before page unload
                window.addEventListener('beforeunload', () => {
                    if (window.gtag && clsValue > 0) {
                        gtag('event', 'web_vital', {
                            name: 'CLS',
                            value: Math.round(clsValue * 1000),
                            event_category: 'Web Vitals'
                        });
                    }
                });

            } catch (error) {
                console.log('Performance tracking not available:', error);
            }
        }
    }

    /**
     * Track user engagement for SEO signals
     */
    function trackUserEngagement() {
        let startTime = Date.now();
        let isVisible = true;

        // Track time on page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isVisible = false;
                const timeSpent = Date.now() - startTime;

                if (window.gtag && timeSpent > 5000) { // Only track if > 5 seconds
                    gtag('event', 'user_engagement', {
                        engagement_time_msec: timeSpent,
                        event_category: 'User Engagement'
                    });
                }
            } else {
                isVisible = true;
                startTime = Date.now();
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', debounce(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll && scrollPercent <= 100) {
                maxScroll = scrollPercent;

                // Track scroll milestones
                if ([25, 50, 75, 90].includes(scrollPercent) && window.gtag) {
                    gtag('event', 'scroll', {
                        percent_scrolled: scrollPercent,
                        event_category: 'User Engagement'
                    });
                }
            }
        }, 100));
    }

    /**
     * Initialize accessibility enhancements
     */
    function initAccessibilityEnhancements() {
        // Add skip link if not present
        addSkipLink();

        // Enhance keyboard navigation
        enhanceKeyboardNavigation();

        // Add ARIA labels where missing
        enhanceAriaLabels();
    }

    /**
     * Add skip link for accessibility
     */
    function addSkipLink() {
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = '跳转到主要内容';
            skipLink.className = 'skip-link';

            Object.assign(skipLink.style, {
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
            });

            skipLink.addEventListener('focus', () => {
                Object.assign(skipLink.style, {
                    position: 'static',
                    left: 'auto',
                    width: 'auto',
                    height: 'auto',
                    overflow: 'visible',
                    padding: '8px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    zIndex: '10000'
                });
            });

            skipLink.addEventListener('blur', () => {
                Object.assign(skipLink.style, {
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden'
                });
            });

            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }

    /**
     * Enhance keyboard navigation
     */
    function enhanceKeyboardNavigation() {
        // Add keyboard support for custom interactive elements
        const interactiveElements = document.querySelectorAll('[onclick]:not(button):not(a)');

        interactiveElements.forEach(element => {
            if (!element.getAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }

            if (!element.getAttribute('role')) {
                element.setAttribute('role', 'button');
            }

            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    /**
     * Enhance ARIA labels
     */
    function enhanceAriaLabels() {
        // Add ARIA labels to buttons without text
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            const title = button.getAttribute('title');

            if (icon && title) {
                button.setAttribute('aria-label', title);
            }
        });

        // Add ARIA labels to form inputs without labels
        const inputs = document.querySelectorAll('input:not([aria-label]):not([id])');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
                input.setAttribute('aria-label', placeholder);
            }
        });
    }

    /**
     * Debounce function to limit function calls
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Export functions for global use
    window.SEOOptimization = {
        copyToClipboard,
        shareToTwitter,
        shareToLinkedIn,
        shareToWeibo,
        shareViaWebAPI,
        showNotification
    };

})();