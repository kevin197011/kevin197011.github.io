---
layout: post
title: "Ansible 完全指南：从入门到实战"
date: 2025-05-29 20:00:00 +0800
category: DevOps
tags: [Ansible, 自动化, 运维, DevOps, 配置管理]
author: Kk
excerpt: "全面掌握Ansible自动化运维工具，从基础概念到实战案例，助你提升运维效率"
diagram: |
  graph TB
      subgraph "控制节点"
          AC[Ansible Controller]
          INV[Inventory 清单]
          PB[Playbooks 剧本]
          MOD[Modules 模块]
          ROLES[Roles 角色]
      end

      subgraph "目标节点群组"
          subgraph "Web服务器"
              WEB1[Web Server 1]
              WEB2[Web Server 2]
              WEB3[Web Server 3]
          end

          subgraph "数据库服务器"
              DB1[Database 1]
              DB2[Database 2]
          end

          subgraph "负载均衡器"
              LB1[Load Balancer]
          end
      end

      subgraph "配置文件"
          CONF[ansible.cfg]
          HOST[hosts 文件]
          VAULT[Ansible Vault]
      end

      AC --> INV
      AC --> PB
      PB --> MOD
      PB --> ROLES
      INV --> WEB1
      INV --> WEB2
      INV --> WEB3
      INV --> DB1
      INV --> DB2
      INV --> LB1

      CONF --> AC
      HOST --> INV
      VAULT --> PB

      AC -.->|SSH| WEB1
      AC -.->|SSH| WEB2
      AC -.->|SSH| WEB3
      AC -.->|SSH| DB1
      AC -.->|SSH| DB2
      AC -.->|SSH| LB1

      style AC fill:#00d4ff,stroke:#fff,stroke-width:2px,color:#fff
      style PB fill:#00ff88,stroke:#fff,stroke-width:2px,color:#000
      style MOD fill:#ffa726,stroke:#fff,stroke-width:2px,color:#000
      style INV fill:#e1f5fe,stroke:#0066cc,stroke-width:2px
      style ROLES fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
---

# Ansible 完全指南：从入门到实战

## 🚀 什么是 Ansible

Ansible 是一个开源的自动化运维工具，用于应用程序部署、配置管理和任务执行。它使用简单的 YAML 语法，无需在目标主机上安装代理程序，通过 SSH 连接进行管理。

### 核心特点

- **🔧 无代理架构**: 不需要在目标主机安装客户端
- **📝 简单易学**: 使用 YAML 语法，易于理解和维护
- **🔄 幂等性**: 多次执行相同操作结果一致
- **📦 模块丰富**: 提供大量内置模块
- **🌐 跨平台**: 支持 Linux、Windows、macOS 等

## 📦 安装 Ansible

### 在 Ubuntu/Debian 上安装

```bash
# 更新包列表
sudo apt update

# 安装 Ansible
sudo apt install ansible -y

# 验证安装
ansible --version
```

### 在 CentOS/RHEL 上安装

```bash
# 安装 EPEL 仓库
sudo yum install epel-release -y

# 安装 Ansible
sudo yum install ansible -y

# 验证安装
ansible --version
```

### 使用 pip 安装

```bash
# 安装 pip（如果未安装）
sudo apt install python3-pip -y

# 安装 Ansible
pip3 install ansible

# 验证安装
ansible --version
```

## 🏗️ 基础概念

### 1. Inventory（清单）

Inventory 定义了 Ansible 管理的主机列表。

#### 创建 hosts 文件

```ini
# /etc/ansible/hosts 或自定义文件

# 单个主机
web1 ansible_host=192.168.1.10

# 主机组
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[databases]
db1 ansible_host=192.168.1.20
db2 ansible_host=192.168.1.21

# 嵌套组
[production:children]
webservers
databases

# 组变量
[webservers:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

#### YAML 格式 Inventory

```yaml
# inventory.yml
all:
  children:
    webservers:
      hosts:
        web1:
          ansible_host: 192.168.1.10
        web2:
          ansible_host: 192.168.1.11
      vars:
        ansible_user: ubuntu
    databases:
      hosts:
        db1:
          ansible_host: 192.168.1.20
```

### 2. Ad-hoc 命令

快速执行单个任务的命令。

```bash
# 测试连接
ansible all -m ping

# 执行命令
ansible webservers -m command -a "uptime"

# 安装软件包
ansible webservers -m apt -a "name=nginx state=present" --become

# 复制文件
ansible all -m copy -a "src=/local/file dest=/remote/file"

# 重启服务
ansible webservers -m service -a "name=nginx state=restarted" --become
```

### 3. Playbook（剧本）

Playbook 是 Ansible 的配置、部署和编排语言。

#### 基础 Playbook 结构

```yaml
---
- name: 配置 Web 服务器
  hosts: webservers
  become: yes
  vars:
    nginx_port: 80
    server_name: example.com

  tasks:
    - name: 安装 Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: 启动并启用 Nginx
      service:
        name: nginx
        state: started
        enabled: yes

    - name: 配置防火墙
      ufw:
        rule: allow
        port: "{% raw %}{{ nginx_port }}{% endraw %}"
        proto: tcp
```

#### 执行 Playbook

```bash
# 运行 playbook
ansible-playbook site.yml

# 指定 inventory
ansible-playbook -i inventory.yml site.yml

# 检查语法
ansible-playbook --syntax-check site.yml

# 预演模式（不实际执行）
ansible-playbook --check site.yml
```

## 🔧 常用模块详解

### 1. 文件操作模块

```yaml
- name: 创建目录
  file:
    path: /opt/myapp
    state: directory
    mode: '0755'
    owner: www-data
    group: www-data

- name: 复制文件
  copy:
    src: files/nginx.conf
    dest: /etc/nginx/nginx.conf
    backup: yes
    owner: root
    group: root
    mode: '0644'
  notify: restart nginx

- name: 使用模板
  template:
    src: templates/index.html.j2
    dest: /var/www/html/index.html
    owner: www-data
    group: www-data
    mode: '0644'
```

### 2. 包管理模块

```yaml
- name: 安装多个包
  apt:
    name: "{% raw %}{{ item }}{% endraw %}"
    state: present
  loop:
    - nginx
    - mysql-server
    - php-fpm

- name: 安装特定版本
  apt:
    name: nginx=1.18.0-0ubuntu1
    state: present

- name: 卸载包
  apt:
    name: apache2
    state: absent
    purge: yes
```

### 3. 服务管理模块

```yaml
- name: 启动并启用服务
  systemd:
    name: nginx
    state: started
    enabled: yes
    daemon_reload: yes

- name: 重新加载服务配置
  systemd:
    name: nginx
    state: reloaded
```

### 4. 用户和组管理

```yaml
- name: 创建用户
  user:
    name: appuser
    groups: sudo,docker
    shell: /bin/bash
    home: /home/appuser
    create_home: yes
    password: "{% raw %}{{ 'mypassword' | password_hash('sha512') }}{% endraw %}"

- name: 添加 SSH 公钥
  authorized_key:
    user: appuser
    key: "{% raw %}{{ lookup('file', '~/.ssh/id_rsa.pub') }}{% endraw %}"
```

## 🎯 实战案例：LAMP 服务器部署

### 项目结构

```
lamp-deployment/
├── inventory.yml
├── site.yml
├── group_vars/
│   └── all.yml
├── roles/
│   ├── common/
│   ├── apache/
│   ├── mysql/
│   └── php/
└── templates/
    └── vhost.conf.j2
```

### inventory.yml

```yaml
all:
  children:
    lampservers:
      hosts:
        lamp1:
          ansible_host: 192.168.1.10
        lamp2:
          ansible_host: 192.168.1.11
      vars:
        ansible_user: ubuntu
        ansible_ssh_private_key_file: ~/.ssh/id_rsa
```

### group_vars/all.yml

```yaml
# 全局变量
mysql_root_password: "SecurePassword123!"
app_user: www-data
app_domain: example.com
php_version: "8.1"

# 包列表
common_packages:
  - curl
  - wget
  - git
  - htop
  - vim

apache_packages:
  - apache2
  - apache2-utils

mysql_packages:
  - mysql-server
  - mysql-client
  - python3-pymysql

php_packages:
  - "{% raw %}php{{ php_version }}{% endraw %}"
  - "{% raw %}php{{ php_version }}{% endraw %}-mysql"
  - "{% raw %}php{{ php_version }}{% endraw %}-curl"
  - "{% raw %}php{{ php_version }}{% endraw %}-gd"
  - "{% raw %}php{{ php_version }}{% endraw %}-mbstring"
  - libapache2-mod-php
```

### site.yml

```yaml
---
- name: 部署 LAMP 服务器
  hosts: lampservers
  become: yes

  pre_tasks:
    - name: 更新包缓存
      apt:
        update_cache: yes
        cache_valid_time: 3600

  roles:
    - common
    - apache
    - mysql
    - php

  post_tasks:
    - name: 重启所有服务
      service:
        name: "{% raw %}{{ item }}{% endraw %}"
        state: restarted
      loop:
        - apache2
        - mysql
```

### roles/common/tasks/main.yml

```yaml
---
- name: 安装基础软件包
  apt:
    name: "{% raw %}{{ common_packages }}{% endraw %}"
    state: present

- name: 配置时区
  timezone:
    name: Asia/Shanghai

- name: 配置防火墙
  ufw:
    rule: allow
    port: "{% raw %}{{ item }}{% endraw %}"
    proto: tcp
  loop:
    - "22"
    - "80"
    - "443"

- name: 启用防火墙
  ufw:
    state: enabled
```

### roles/apache/tasks/main.yml

```yaml
---
- name: 安装 Apache
  apt:
    name: "{% raw %}{{ apache_packages }}{% endraw %}"
    state: present

- name: 启用 Apache 模块
  apache2_module:
    name: "{% raw %}{{ item }}{% endraw %}"
    state: present
  loop:
    - rewrite
    - ssl
  notify: restart apache

- name: 创建虚拟主机配置
  template:
    src: vhost.conf.j2
    dest: "/etc/apache2/sites-available/{% raw %}{{ app_domain }}{% endraw %}.conf"
  notify: restart apache

- name: 启用站点
  command: a2ensite {% raw %}{{ app_domain }}{% endraw %}
  notify: restart apache

- name: 禁用默认站点
  command: a2dissite 000-default
  notify: restart apache

- name: 启动并启用 Apache
  service:
    name: apache2
    state: started
    enabled: yes
```

### roles/apache/handlers/main.yml

```yaml
---
- name: restart apache
  service:
    name: apache2
    state: restarted
```

### templates/vhost.conf.j2

```apache
<VirtualHost *:80>
    ServerName {% raw %}{{ app_domain }}{% endraw %}
    DocumentRoot /var/www/{% raw %}{{ app_domain }}{% endraw %}

    <Directory /var/www/{% raw %}{{ app_domain }}{% endraw %}>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/{% raw %}{{ app_domain }}{% endraw %}_error.log
    CustomLog ${APACHE_LOG_DIR}/{% raw %}{{ app_domain }}{% endraw %}_access.log combined
</VirtualHost>
```

### roles/mysql/tasks/main.yml

```yaml
---
- name: 安装 MySQL
  apt:
    name: "{% raw %}{{ mysql_packages }}{% endraw %}"
    state: present

- name: 启动并启用 MySQL
  service:
    name: mysql
    state: started
    enabled: yes

- name: 设置 MySQL root 密码
  mysql_user:
    name: root
    password: "{% raw %}{{ mysql_root_password }}{% endraw %}"
    login_unix_socket: /var/run/mysqld/mysqld.sock

- name: 删除匿名用户
  mysql_user:
    name: ''
    host_all: yes
    state: absent
    login_user: root
    login_password: "{% raw %}{{ mysql_root_password }}{% endraw %}"

- name: 删除测试数据库
  mysql_db:
    name: test
    state: absent
    login_user: root
    login_password: "{% raw %}{{ mysql_root_password }}{% endraw %}"
```

### 执行部署

```bash
# 检查语法
ansible-playbook --syntax-check site.yml

# 测试连接
ansible all -m ping

# 执行部署
ansible-playbook -i inventory.yml site.yml

# 使用标签执行特定任务
ansible-playbook -i inventory.yml site.yml --tags "mysql"
```

## 🔐 安全最佳实践

### 1. 使用 Ansible Vault 加密敏感数据

```bash
# 创建加密文件
ansible-vault create secrets.yml

# 编辑加密文件
ansible-vault edit secrets.yml

# 加密现有文件
ansible-vault encrypt vars.yml

# 解密文件
ansible-vault decrypt vars.yml

# 查看加密文件
ansible-vault view secrets.yml
```

### secrets.yml 示例

```yaml
---
mysql_root_password: "SuperSecretPassword123!"
api_key: "abc123def456"
ssl_private_key: |
  -----BEGIN PRIVATE KEY-----
  ...
  -----END PRIVATE KEY-----
```

### 在 Playbook 中使用

```yaml
---
- name: 使用加密变量
  hosts: all
  vars_files:
    - secrets.yml

  tasks:
    - name: 设置数据库密码
      mysql_user:
        name: root
        password: "{{ mysql_root_password }}"
```

### 执行时提供密码

```bash
# 提示输入密码
ansible-playbook site.yml --ask-vault-pass

# 使用密码文件
ansible-playbook site.yml --vault-password-file .vault_pass

# 使用环境变量
export ANSIBLE_VAULT_PASSWORD_FILE=.vault_pass
ansible-playbook site.yml
```

### 2. SSH 密钥管理

```yaml
- name: 配置 SSH 密钥认证
  authorized_key:
    user: "{% raw %}{{ ansible_user }}{% endraw %}"
    key: "{% raw %}{{ lookup('file', item) }}{% endraw %}"
    exclusive: yes
  with_fileglob:
    - "keys/*.pub"

- name: 禁用密码认证
  lineinfile:
    dest: /etc/ssh/sshd_config
    regexp: '^PasswordAuthentication'
    line: 'PasswordAuthentication no'
  notify: restart ssh
```

## ⚡ 高级功能

### 1. 条件执行

```yaml
- name: 安装 Docker（仅在 Ubuntu 上）
  apt:
    name: docker.io
    state: present
  when: ansible_distribution == "Ubuntu"

- name: 检查服务状态
  service_facts:

- name: 重启 Nginx（如果正在运行）
  service:
    name: nginx
    state: restarted
  when: ansible_facts.services["nginx.service"] is defined
```

### 2. 循环

```yaml
- name: 创建多个用户
  user:
    name: "{% raw %}{{ item.name }}{% endraw %}"
    groups: "{% raw %}{{ item.groups }}{% endraw %}"
    shell: "{% raw %}{{ item.shell | default('/bin/bash') }}{% endraw %}"
  loop:
    - { name: "alice", groups: "sudo", shell: "/bin/zsh" }
    - { name: "bob", groups: "docker" }
    - { name: "charlie", groups: "sudo,docker" }

- name: 安装多个包
  apt:
    name: "{% raw %}{{ item }}{% endraw %}"
    state: present
  loop:
    - nginx
    - mysql-server
    - php-fpm
```

### 3. 模板和变量

```yaml
# group_vars/webservers.yml
nginx_config:
  worker_processes: auto
  worker_connections: 1024
  keepalive_timeout: 65

server_blocks:
  - { name: "example.com", root: "/var/www/example" }
  - { name: "test.com", root: "/var/www/test" }
```

```jinja2
{# templates/nginx.conf.j2 #}
worker_processes {% raw %}{{ nginx_config.worker_processes }}{% endraw %};

events {
    worker_connections {% raw %}{{ nginx_config.worker_connections }}{% endraw %};
}

http {
    keepalive_timeout {% raw %}{{ nginx_config.keepalive_timeout }}{% endraw %};

    {% raw %}{% for server in server_blocks %}{% endraw %}
    server {
        listen 80;
        server_name {% raw %}{{ server.name }}{% endraw %};
        root {% raw %}{{ server.root }}{% endraw %};

        location / {
            try_files $uri $uri/ =404;
        }
    }
    {% raw %}{% endfor %}{% endraw %}
}
```

### 4. 错误处理

```yaml
- name: 尝试启动服务
  service:
    name: myservice
    state: started
  ignore_errors: yes

- name: 备份配置文件
  copy:
    src: /etc/nginx/nginx.conf
    dest: /etc/nginx/nginx.conf.backup
    remote_src: yes
  rescue:
    - name: 恢复默认配置
      copy:
        src: files/nginx.conf.default
        dest: /etc/nginx/nginx.conf
```

## 📊 性能优化

### 1. 并行执行

```yaml
- name: 并行执行任务
  hosts: all
  strategy: free
  serial: 5  # 每次处理5台主机

  tasks:
    - name: 更新软件包
      apt:
        update_cache: yes
        upgrade: dist
```

### 2. 缓存和事实收集

```ini
# ansible.cfg
[defaults]
gathering = smart
fact_caching = memory
fact_caching_timeout = 86400
host_key_checking = False
pipelining = True
```

### 3. 使用异步任务

```yaml
- name: 长时间运行的任务
  command: /usr/bin/long_running_operation
  async: 3600  # 超时时间
  poll: 0      # 不等待结果
  register: long_task

- name: 检查任务状态
  async_status:
    jid: "{% raw %}{{ long_task.ansible_job_id }}{% endraw %}"
  register: job_result
  until: job_result.finished
  retries: 30
  delay: 60
```

## 🔍 调试和故障排除

### 1. 调试模式

```bash
# 详细输出
ansible-playbook site.yml -v

# 更详细的输出
ansible-playbook site.yml -vv

# 最详细的输出
ansible-playbook site.yml -vvv

# 调试特定任务
ansible-playbook site.yml --start-at-task="安装 Nginx"
```

### 2. 调试模块

```yaml
- name: 显示变量
  debug:
    var: ansible_facts

- name: 显示消息
  debug:
    msg: "当前主机是 {% raw %}{{ inventory_hostname }}{% endraw %}"

- name: 条件调试
  debug:
    msg: "这是生产环境"
  when: environment == "production"
```

### 3. 故障诊断

```yaml
- name: 检查连接
  ping:

- name: 收集系统信息
  setup:
  register: system_info

- name: 检查磁盘空间
  shell: df -h
  register: disk_usage

- name: 显示磁盘使用情况
  debug:
    var: disk_usage.stdout_lines
```

## 📚 总结

Ansible 是一个强大而灵活的自动化工具，掌握以下关键点：

### ✅ 核心优势
- **简单易学**: YAML 语法直观
- **无代理架构**: 降低维护成本
- **幂等性**: 确保一致性
- **模块丰富**: 覆盖各种场景

### 🎯 最佳实践
- 使用版本控制管理 Playbook
- 遵循目录结构规范
- 善用 roles 实现代码复用
- 使用 Vault 保护敏感数据
- 编写幂等的任务

### 🚀 进阶建议
- 学习 Jinja2 模板语法
- 掌握条件判断和循环
- 了解异步执行机制
- 集成 CI/CD 流水线
- 监控和日志管理

通过系统学习和实践，你将能够使用 Ansible 构建高效、可靠的自动化运维体系，显著提升工作效率和系统稳定性。

---

*💡 提示：建议在测试环境中充分验证 Playbook 后再应用到生产环境。*