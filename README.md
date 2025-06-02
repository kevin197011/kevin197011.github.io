# Web3 DevOps & SRE 职位薪资榜

🚀 **实时追踪Web3/区块链领域DevOps和SRE职位薪资排行**

专门从 [CryptoJobsList](https://cryptojobslist.com)、[RemoteOK](https://remoteok.io) 等多个数据源抓取最新的Web3/区块链技术职位信息，为DevOps和SRE工程师提供全面的薪资参考。

## 🌟 特性

- **🎯 专注Web3领域**: 专门抓取区块链、DeFi、NFT等Web3公司的技术职位
- **💰 薪资透明**: 实时显示DevOps/SRE职位的薪资范围（美元年薪）
- **🌍 全球远程**: 支持全球远程职位筛选和统计
- **🔄 实时更新**: 纯前端自动抓取，无需后端服务器
- **📊 智能分析**: 自动分类职位类型、技能要求和薪资趋势
- **💾 本地缓存**: 浏览器端缓存，减少重复请求
- **🎨 现代UI**: 响应式设计，完美适配各种设备

## 🏗️ 技术架构

### 纯前端实现 (Vanilla JavaScript)
```
_pages/jobs.md                 # 主要展示页面
├── 多数据源并行抓取           # CryptoJobsList + RemoteOK + 备用数据
├── CORS代理处理              # 解决跨域问题
├── 本地缓存机制              # localStorage缓存
├── 降级方案                  # 网络失败时的备用数据
├── 实时数据展示              # 动态加载职位数据
├── 多维度筛选                # 按角色、地区、薪资筛选
├── 数据导出                  # CSV格式数据下载
└── 响应式设计                # 完美适配各种设备
```

### 数据源配置
```javascript
dataSources: {
    primary: 'https://cryptojobslist.com',           // 主要数据源
    corsProxy: 'https://api.allorigins.win/get?url=', // CORS代理
    fallbackApis: [
        'https://remoteok.io/api'                    // RemoteOK API
    ]
}
```

## 🚀 快速开始

### 环境要求
- 现代浏览器 (支持ES6+、fetch API、localStorage)
- 网络连接 (用于获取实时数据)

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/kevin197011/kevin197011.github.io.git
cd kevin197011.github.io
```

2. **启动本地服务器**
```bash
# 使用Python
python3 -m http.server 8080

# 或使用Node.js
npx http-server -p 8080

# 或使用Jekyll (如果已安装)
bundle exec jekyll serve
```

3. **访问页面**
```
http://localhost:8080/jobs/          # 主要职位页面
http://localhost:8080/test_frontend.html  # 测试页面
```

4. **测试功能**
- 打开浏览器开发者工具查看控制台日志
- 点击"刷新数据"测试数据抓取
- 测试不同的筛选条件
- 验证本地缓存功能

## 📦 数据源和API

### 主要数据源
- **CryptoJobsList**: 专业的Web3招聘平台
- **RemoteOK**: 全球远程职位API
- **备用数据**: 模拟的Web3公司职位数据

### CORS处理
```javascript
// 使用AllOrigins代理解决跨域问题
const corsProxy = 'https://api.allorigins.win/get?url=';
const targetUrl = encodeURIComponent('https://cryptojobslist.com');
const response = await fetch(`${corsProxy}${targetUrl}`);
```

### 缓存机制
```javascript
// 本地存储缓存策略
const cacheData = {
    timestamp: new Date().toISOString(),
    jobs: jobsArray,
    stats: statisticsObject,
    version: '1.0'
};
localStorage.setItem('web3_jobs_cache', JSON.stringify(cacheData));

// 缓存有效期：1小时
const cacheAge = Date.now() - new Date(cacheData.timestamp).getTime();
const isValid = cacheAge < 60 * 60 * 1000;
```

## 🔧 核心功能

### 数据抓取流程
1. **检查缓存**: 优先使用本地缓存数据（1小时有效期）
2. **并行抓取**: 同时从多个数据源获取数据
3. **数据处理**: 去重、分类、排序
4. **降级方案**: 网络失败时使用模拟数据
5. **缓存更新**: 保存最新数据到本地存储

### 智能分类算法
```javascript
// 职位类型自动分类
classifyRole(title, description) {
    const text = (title + ' ' + description).toLowerCase();

    if (text.includes('sre') || text.includes('site reliability')) {
        return 'sre';
    } else if (text.includes('devops')) {
        return 'devops';
    } else if (text.includes('platform') || text.includes('infrastructure')) {
        return 'platform';
    } else if (text.includes('cloud') || text.includes('kubernetes')) {
        return 'cloud';
    }
    return 'devops'; // 默认分类
}
```

### 技能提取
```javascript
// Web3相关技能关键词匹配
const skillKeywords = [
    'docker', 'kubernetes', 'terraform', 'aws', 'python', 'go', 'rust',
    'blockchain', 'ethereum', 'solana', 'web3', 'defi', 'smart contracts'
];
```

## 📊 数据结构

### 职位数据格式
```json
{
  "id": "crypto_1234567890_abc123",
  "title": "Senior DevOps Engineer",
  "company": "Coinbase",
  "cityName": "Remote",
  "salary_min": 150,
  "salary_max": 200,
  "experience": "5-8年",
  "skills": ["Docker", "Kubernetes", "AWS", "Terraform", "Blockchain"],
  "source": "CryptoJobsList",
  "url": "https://cryptojobslist.com/job/...",
  "role_type": "devops",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### 缓存数据结构
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "jobs": [...],
  "stats": {
    "by_source": {"CryptoJobsList": 15, "RemoteOK": 8},
    "by_location": {"Remote": 18, "San Francisco": 3},
    "by_role": {"devops": 12, "sre": 8, "platform": 5}
  },
  "version": "1.0"
}
```

## 🔍 使用说明

### 筛选功能
1. **按角色筛选**: DevOps、SRE、Platform、Cloud
2. **按地区筛选**: 全球城市 + 远程职位
3. **按薪资筛选**: 不同薪资区间范围

### 数据导出
- **CSV格式**: 支持导出前20个职位数据
- **包含字段**: 排名、职位、公司、城市、经验、薪资、技能、数据源

### 控制面板
- **手动刷新**: 立即抓取最新数据
- **自动刷新**: 每10分钟自动更新
- **抓取状态**: 显示数据来源和成功率
- **缓存管理**: 查看和清除本地缓存

## 🚧 故障排除

### 常见问题

**Q: 页面显示"获取数据失败"？**
```javascript
// 检查网络连接
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(data => console.log('网络正常:', data))
  .catch(e => console.error('网络问题:', e));

// 检查CORS代理状态
fetch('https://api.allorigins.win/get?url=' +
      encodeURIComponent('https://httpbin.org/get'))
  .then(r => r.json())
  .then(data => console.log('代理正常:', data));
```

**Q: 遇到CSP (Content Security Policy) 错误？**
```javascript
// CSP错误通常显示为：
// "Refused to connect to 'https://example.com' because it violates CSP directive"

// 解决方案1: 确认使用CORS代理
const targetUrl = encodeURIComponent('https://remoteok.io/api');
const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`);

// 解决方案2: 检查是否有缓存数据
const cached = localStorage.getItem('web3_jobs_cache');
if (cached) {
    console.log('发现缓存数据，可以离线使用');
}

// 解决方案3: 使用备用数据
// 系统会自动降级到模拟数据，无需手动处理
```

**Q: 数据更新不及时？**
```javascript
// 清除缓存强制刷新
localStorage.removeItem('web3_jobs_cache');
window.location.reload();

// 或使用控制面板的"清除缓存"按钮
```

**Q: 某些职位没有显示？**
```javascript
// 检查关键词匹配
const keywords = ['devops', 'sre', 'infrastructure', 'platform'];
const jobTitle = 'your job title';
const isMatch = keywords.some(k => jobTitle.toLowerCase().includes(k));
console.log('职位匹配:', isMatch);
```

### 调试模式
```javascript
// 开启详细日志
localStorage.setItem('debug_mode', 'true');

// 查看原始数据
console.log('当前职位数据:', window.jobCrawler.currentJobs);
console.log('缓存数据:', localStorage.getItem('web3_jobs_cache'));
```

## 🔄 部署流程

### GitHub Pages自动部署
1. **代码推送**: 推送到main分支
2. **自动构建**: GitHub Pages自动重建
3. **CDN分发**: 全球CDN加速访问

### 性能优化
- **缓存策略**: 1小时本地缓存减少请求
- **并行加载**: 多数据源并行抓取
- **懒加载**: 按需加载职位详情
- **压缩**: HTML/CSS/JS压缩

## 🔒 安全考虑

### 数据安全
- **无敏感信息**: 仅抓取公开职位信息
- **CORS代理**: 通过可信代理访问外部API
- **本地存储**: 数据仅存储在用户浏览器中

### 隐私保护
- **无追踪**: 不收集用户个人信息
- **无服务器**: 纯前端实现，无后端数据库
- **开源透明**: 所有代码公开可审查

## 🤝 贡献指南

欢迎贡献代码！请按以下步骤：

1. **Fork项目**
2. **创建分支**: `git checkout -b feature/amazing-feature`
3. **提交更改**: `git commit -m 'Add amazing feature'`
4. **推送分支**: `git push origin feature/amazing-feature`
5. **创建PR**: 提交Pull Request

### 代码规范
- 中文注释，英文代码
- 使用现代JavaScript特性 (ES6+)
- 遵循Promise/async-await模式
- 添加适当的错误处理
- 保持代码简洁可读

### 新增数据源
```javascript
// 添加新的数据源
async fetchFromNewSource() {
    try {
        const response = await fetch('https://new-jobs-api.com/api');
        const data = await response.json();

        return data.jobs.map(job => ({
            id: `new_${job.id}`,
            title: job.title,
            company: job.company,
            // ... 其他字段映射
            source: 'NewSource'
        }));
    } catch (error) {
        console.error('新数据源抓取失败:', error);
        throw error;
    }
}
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [CryptoJobsList](https://cryptojobslist.com) - Web3招聘数据源
- [RemoteOK](https://remoteok.io) - 远程工作API
- [AllOrigins](https://allorigins.win) - CORS代理服务
- [Jekyll](https://jekyllrb.com) - 静态网站生成器

## 📈 更新日志

### v2.0.0 (纯前端版本)
- 🚀 完全重写为纯前端实现
- 🔄 多数据源并行抓取
- 💾 本地缓存机制
- 🌐 CORS代理解决跨域
- 📱 响应式设计优化

### v1.0.0 (Node.js版本)
- 🎯 基本的CryptoJobsList抓取
- 📊 职位分类和排序
- 🎨 Terminal风格UI

---

⭐ **如果这个项目对你有帮助，请给一个Star！**

📧 **有问题或建议？欢迎提Issue或联系我们**

🔮 **期待Web3世界更多优秀的DevOps和SRE工程师！**