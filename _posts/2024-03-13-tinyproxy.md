---
title: tinyproxy
author: Kk
date: 2024-03-13
category: DevOps
layout: post
---

## gem

```bash
vim ~/.gemrc
http_proxy: http://tinyproxy:port
https_proxy: http://tinyproxy:port
```

## pip

```bash
vim ~/.pip/pip.conf
[global]
proxy = http://tinyproxy:port
```