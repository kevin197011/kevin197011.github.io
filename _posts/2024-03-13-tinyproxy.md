---
title: tinyproxy
author: Kk
date: 2024-03-13
category: DevOps
layout: post
---

```bash
# gem
vim ~/.gemrc
http_proxy: http://tinyproxy:port
https_proxy: http://tinyproxy:port
```

```bash
# pip
vim ~/.pip/pip.conf
[global]
proxy = http://tinyproxy:port
```