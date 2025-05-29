---
layout: post
title: "Ceph分布式存储架构部署维护指南"
excerpt: "深入解析Ceph分布式存储系统架构设计，从集群规划到运维管理，包含完整的企业级存储解决方案部署和维护最佳实践。"
date: 2024-12-31
category: DevOps
tags: [Ceph, 分布式存储, 存储架构, 对象存储, 块存储, 文件系统, RADOS]
author: Kk
diagram: |
  graph TB
      subgraph "客户端层"
          RBD[RBD 块设备]
          RGW[RGW 对象存储]
          CephFS[CephFS 文件系统]
      end

      subgraph "接口层"
          librados[librados]
          librbd[librbd]
          libcephfs[libcephfs]
          librgw[librgw]
      end

      subgraph "RADOS 核心层"
          MON[MON 监控节点]
          MGR[MGR 管理节点]
          OSD[OSD 存储节点]
          MDS[MDS 元数据服务]
      end

      subgraph "存储层"
          BlueStore[BlueStore]
          SSD[SSD 存储]
          HDD[HDD 存储]
          NVMe[NVMe 存储]
      end

      RBD --> librbd
      RGW --> librgw
      CephFS --> libcephfs
      librbd --> librados
      librgw --> librados
      libcephfs --> librados
      librados --> MON
      librados --> OSD
      CephFS --> MDS
      OSD --> BlueStore
      BlueStore --> SSD
      BlueStore --> HDD
      BlueStore --> NVMe

      style MON fill:#00d4ff
      style MGR fill:#00ff88
      style OSD fill:#ff6b6b
      style MDS fill:#ffa726
---

# Ceph分布式存储架构部署维护指南

## Ceph概述

### 什么是Ceph

Ceph是一个开源的分布式存储系统，提供对象存储、块存储和文件系统存储的统一解决方案：

```yaml
Ceph特性:
  统一存储: 对象、块、文件三种存储接口
  分布式: 无单点故障的分布式架构
  可扩展: 支持PB级存储扩展
  自修复: 自动数据复制和修复
  开源: Apache许可证
  POSIX兼容: 支持POSIX文件系统接口
```

#### Ceph发展历史
```bash
# Ceph版本发展历程
Ceph主要版本:
  Argonaut (2012)    - 首个稳定版本
  Bobtail (2013)     - 增强稳定性
  Cuttlefish (2013)  - 性能优化
  Dumpling (2013)    - 企业级功能
  Emperor (2013)     - CephFS改进
  Firefly (2014)     - 长期支持版本
  Giant (2014)       - erasure coding
  Hammer (2015)      - 长期支持版本
  Infernalis (2015)  - Jewel准备
  Jewel (2016)       - 长期支持版本
  Kraken (2017)      - BlueStore引入
  Luminous (2017)    - 长期支持版本
  Mimic (2018)       - Nautilus准备
  Nautilus (2019)    - 长期支持版本
  Octopus (2020)     - Pacific准备
  Pacific (2021)     - 长期支持版本
  Quincy (2022)      - 最新长期支持版本
  Reef (2023)        - 最新稳定版本
```

### 核心组件架构

#### Ceph核心组件
```json
{
  "存储后端": {
    "OSD": "对象存储守护进程",
    "描述": "负责数据存储和复制",
    "作用": "数据存储的基本单元"
  },
  "集群监控": {
    "MON": "集群监控守护进程",
    "描述": "维护集群状态和配置",
    "作用": "集群状态管理和认证"
  },
  "元数据服务": {
    "MDS": "元数据服务器",
    "描述": "CephFS文件系统元数据",
    "作用": "文件系统元数据管理"
  },
  "管理服务": {
    "MGR": "集群管理器",
    "描述": "集群管理和监控",
    "作用": "Web界面和API服务"
  },
  "网关服务": {
    "RGW": "RADOS网关",
    "描述": "S3/Swift兼容对象存储",
    "作用": "对象存储API接口"
  },
  "核心算法": {
    "CRUSH": "可控复制分布算法",
    "描述": "数据分布和定位算法",
    "作用": "数据放置和负载均衡"
  }
}
```

## Ceph架构设计

### 逻辑架构

#### RADOS分布式存储架构
```yaml
RADOS架构层次:
  应用层(Application Layer):
    - RBD: RADOS块设备
    - RGW: RADOS网关(对象存储)
    - CephFS: Ceph文件系统
    - librados: 原生API

  接口层(Interface Layer):
    - librbd: RBD库接口
    - librgw: RGW库接口
    - libcephfs: CephFS库接口
    - librados: RADOS原生接口

  RADOS层(RADOS Layer):
    - MON: 集群监控和状态管理
    - MGR: 集群管理和监控
    - OSD: 对象存储守护进程
    - MDS: 元数据服务器(仅CephFS)

  存储层(Storage Layer):
    - BlueStore: 新一代存储后端
    - FileStore: 传统文件系统后端(已废弃)
    - 物理存储: SSD、HDD、NVMe
```

#### 数据分布原理
```bash
# Ceph数据分布流程
数据写入流程:
  1. 客户端请求 → librados
  2. 计算PG (Placement Group)
  3. CRUSH算法计算OSD位置
  4. 主OSD接收数据
  5. 复制到副本OSD
  6. 确认写入完成

CRUSH算法原理:
  Object → Pool → PG → OSD Set

  计算公式:
  hash(object_name) % pg_num = PG_ID
  CRUSH(PG_ID) = [Primary_OSD, Replica_OSDs]
```

### 物理架构设计

#### 集群节点规划
```bash
# 生产环境Ceph集群规划
节点类型规划:
  MON节点 (3台或5台):
    - CPU: 4核+
    - 内存: 8GB+
    - 存储: SSD 50GB+ (系统+MON数据)
    - 网络: 双万兆网卡
    - 作用: 集群状态管理

  MGR节点 (2台):
    - CPU: 4核+
    - 内存: 8GB+
    - 存储: SSD 50GB+
    - 网络: 双万兆网卡
    - 作用: 集群管理和监控

  OSD节点 (N台):
    - CPU: 2核/OSD
    - 内存: 4GB/OSD (BlueStore)
    - 存储: 根据容量需求配置
    - 网络: 双万兆网卡
    - 作用: 数据存储

  MDS节点 (2台+):
    - CPU: 8核+
    - 内存: 16GB+
    - 存储: SSD 100GB+
    - 网络: 双万兆网卡
    - 作用: CephFS元数据服务

  RGW节点 (2台+):
    - CPU: 8核+
    - 内存: 16GB+
    - 存储: SSD 100GB+
    - 网络: 双万兆网卡
    - 作用: 对象存储网关
```

#### 存储介质规划
```yaml
存储介质配置:
  SSD配置:
    用途: WAL、DB、元数据
    容量: WAL(1-2GB/OSD), DB(30-100GB/OSD)
    推荐: NVMe SSD for最佳性能

  HDD配置:
    用途: 数据存储
    容量: 4TB-18TB per OSD
    推荐: 企业级7200转SATA/SAS硬盘

  混合配置:
    BlueStore推荐:
      - WAL: NVMe SSD (高速写入日志)
      - DB: SATA SSD (元数据存储)
      - Data: HDD (大容量数据)

  全闪存配置:
    高性能场景:
      - 全NVMe SSD部署
      - 适合高IOPS需求
      - 成本较高但性能最佳
```

### 网络架构设计

#### 网络规划
```bash
# Ceph网络架构设计
网络平面规划:
  公共网络 (Public Network):
    - 网段: 10.0.1.0/24
    - 用途: 客户端访问、MON通信
    - 带宽: 10Gbps+
    - 冗余: 双链路聚合

  集群网络 (Cluster Network):
    - 网段: 10.0.2.0/24
    - 用途: OSD间数据复制
    - 带宽: 10Gbps+ (建议25Gbps)
    - 冗余: 独立的网络平面

  管理网络 (Management):
    - 网段: 10.0.100.0/24
    - 用途: 运维管理、监控
    - 带宽: 1Gbps
    - 访问: 限制管理员访问

网络性能要求:
  - 延迟: < 1ms (数据中心内)
  - 带宽: 至少10Gbps，推荐25Gbps+
  - 丢包率: < 0.01%
  - 冗余: 双路径冗余
```

## Ceph安装部署

### 环境准备

#### 系统要求检查
```bash
#!/bin/bash
# Ceph环境检查脚本

echo "=== Ceph环境检查 ==="

# 检查操作系统
echo "操作系统信息:"
cat /etc/os-release

# 检查硬件资源
echo -e "\n硬件资源:"
echo "CPU核心数: $(nproc)"
echo "内存大小: $(free -h | grep Mem | awk '{print $2}')"
echo "磁盘列表:"
lsblk

# 检查网络配置
echo -e "\n网络配置:"
ip addr show | grep -E "(inet|link/ether)"

# 检查时间同步
echo -e "\n时间同步:"
timedatectl status

# 检查防火墙状态
echo -e "\n防火墙状态:"
systemctl is-active firewalld || echo "firewalld已关闭"
systemctl is-active ufw || echo "ufw已关闭"

# 检查SELinux状态
echo -e "\nSELinux状态:"
getenforce 2>/dev/null || echo "SELinux未安装"

# 检查可用磁盘
echo -e "\n可用磁盘(OSD候选):"
lsblk -f | grep -v "MOUNTPOINT\|/"
```

#### 基础环境配置
```bash
#!/bin/bash
# Ceph基础环境配置脚本

# 设置主机名和hosts文件
setup_hosts() {
    cat >> /etc/hosts << EOF
# Ceph Cluster
10.0.1.10 ceph-mon1
10.0.1.11 ceph-mon2
10.0.1.12 ceph-mon3
10.0.1.20 ceph-mgr1
10.0.1.21 ceph-mgr2
10.0.1.30 ceph-osd1
10.0.1.31 ceph-osd2
10.0.1.32 ceph-osd3
10.0.1.40 ceph-mds1
10.0.1.41 ceph-mds2
10.0.1.50 ceph-rgw1
10.0.1.51 ceph-rgw2
EOF
}

# 配置时间同步
setup_chrony() {
    yum install -y chrony

    cat > /etc/chrony.conf << EOF
server ntp.aliyun.com iburst
server time1.cloud.tencent.com iburst
server time.pool.aliyun.com iburst

driftfile /var/lib/chrony/drift
makestep 1.0 3
rtcsync
EOF

    systemctl enable chronyd
    systemctl start chronyd
    systemctl status chronyd
}

# 配置防火墙
setup_firewall() {
    # 关闭防火墙(生产环境建议配置规则)
    systemctl stop firewalld
    systemctl disable firewalld

    # 或者配置Ceph端口规则
    # firewall-cmd --permanent --add-port=6789/tcp  # MON
    # firewall-cmd --permanent --add-port=6800-7300/tcp  # OSD
    # firewall-cmd --permanent --add-port=7480/tcp  # RGW
    # firewall-cmd --reload
}

# 禁用SELinux
disable_selinux() {
    setenforce 0
    sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
}

# 优化内核参数
optimize_kernel() {
    cat >> /etc/sysctl.conf << EOF
# Ceph优化参数
kernel.pid_max = 4194304
fs.file-max = 26234859
vm.zone_reclaim_mode = 0
vm.swappiness = 1
vm.min_free_kbytes = 4194304

# 网络优化
net.core.rmem_default = 262144
net.core.rmem_max = 134217728
net.core.wmem_default = 262144
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 65536 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_timestamps = 0
net.ipv4.tcp_sack = 1
EOF

    sysctl -p
}

# 主程序
main() {
    echo "开始配置Ceph基础环境..."

    setup_hosts
    setup_chrony
    setup_firewall
    disable_selinux
    optimize_kernel

    echo "基础环境配置完成!"
    echo "请重启系统以确保所有配置生效"
}

main "$@"
```

### Cephadm部署方式

#### 使用Cephadm部署集群
```bash
#!/bin/bash
# 使用Cephadm部署Ceph集群

# 安装Docker/Podman
install_container_runtime() {
    # 安装Docker
    yum install -y yum-utils
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    yum install -y docker-ce docker-ce-cli containerd.io
    systemctl enable docker
    systemctl start docker

    # 或者安装Podman
    # yum install -y podman
}

# 安装Cephadm
install_cephadm() {
    # 下载cephadm
    curl --silent --remote-name --location https://github.com/ceph/ceph/raw/quincy/src/cephadm/cephadm
    chmod +x cephadm
    ./cephadm add-repo --release quincy
    ./cephadm install

    # 验证安装
    which cephadm
    cephadm version
}

# 引导集群
bootstrap_cluster() {
    local mon_ip=$1

    # 引导第一个MON节点
    cephadm bootstrap --mon-ip $mon_ip

    # 安装Ceph CLI
    cephadm add-repo --release quincy
    cephadm install ceph-common

    # 配置CLI认证
    mkdir -p /etc/ceph
    ceph config generate-minimal-conf > /etc/ceph/ceph.conf
    ceph auth get client.admin > /etc/ceph/ceph.client.admin.keyring
}

# 添加主机到集群
add_hosts() {
    # 添加其他节点
    ssh-copy-id -f -i /etc/ceph/ceph.pub root@ceph-mon2
    ssh-copy-id -f -i /etc/ceph/ceph.pub root@ceph-mon3
    ssh-copy-id -f -i /etc/ceph/ceph.pub root@ceph-osd1
    ssh-copy-id -f -i /etc/ceph/ceph.pub root@ceph-osd2
    ssh-copy-id -f -i /etc/ceph/ceph.pub root@ceph-osd3

    # 添加主机
    ceph orch host add ceph-mon2 10.0.1.11
    ceph orch host add ceph-mon3 10.0.1.12
    ceph orch host add ceph-osd1 10.0.1.30
    ceph orch host add ceph-osd2 10.0.1.31
    ceph orch host add ceph-osd3 10.0.1.32

    # 设置主机标签
    ceph orch host label add ceph-mon1 mon
    ceph orch host label add ceph-mon2 mon
    ceph orch host label add ceph-mon3 mon
    ceph orch host label add ceph-osd1 osd
    ceph orch host label add ceph-osd2 osd
    ceph orch host label add ceph-osd3 osd
}

# 部署服务
deploy_services() {
    # 部署MON服务
    ceph orch apply mon --placement="label:mon"

    # 部署MGR服务
    ceph orch apply mgr --placement="label:mon"

    # 部署OSD服务
    ceph orch apply osd --all-available-devices

    # 或者指定设备部署OSD
    # ceph orch daemon add osd ceph-osd1:/dev/sdb
    # ceph orch daemon add osd ceph-osd1:/dev/sdc
}

# 主程序
main() {
    if [ $# -ne 1 ]; then
        echo "用法: $0 <mon-ip>"
        echo "示例: $0 10.0.1.10"
        exit 1
    fi

    local mon_ip=$1

    install_container_runtime
    install_cephadm
    bootstrap_cluster $mon_ip
    add_hosts
    deploy_services

    echo "Ceph集群部署完成!"
    echo "运行 'ceph status' 检查集群状态"
}

main "$@"
```

### 手动部署方式

#### MON节点部署
```bash
#!/bin/bash
# MON节点手动部署

# 安装Ceph软件包
install_ceph_packages() {
    # 添加Ceph软件源
    cat > /etc/yum.repos.d/ceph.repo << EOF
[ceph]
name=Ceph packages for \$basearch
baseurl=https://download.ceph.com/rpm-quincy/el8/\$basearch
enabled=1
priority=2
gpgcheck=1
gpgkey=https://download.ceph.com/keys/release.asc

[ceph-noarch]
name=Ceph noarch packages
baseurl=https://download.ceph.com/rpm-quincy/el8/noarch
enabled=1
priority=2
gpgcheck=1
gpgkey=https://download.ceph.com/keys/release.asc
EOF

    # 安装软件包
    yum install -y ceph-mon ceph-mgr ceph-common
}

# 生成集群配置
generate_cluster_config() {
    # 生成FSID
    local fsid=$(uuidgen)

    # 创建配置文件
    mkdir -p /etc/ceph
    cat > /etc/ceph/ceph.conf << EOF
[global]
fsid = $fsid
mon initial members = ceph-mon1, ceph-mon2, ceph-mon3
mon host = 10.0.1.10, 10.0.1.11, 10.0.1.12
public network = 10.0.1.0/24
cluster network = 10.0.2.0/24
auth cluster required = cephx
auth service required = cephx
auth client required = cephx

[mon]
mon allow pool delete = true

[osd]
osd mkfs type = xfs
osd mkfs options xfs = -f -i size=2048
osd mount options xfs = noatime,largeio,inode64,swalloc
osd crush chooseleaf type = 1
EOF

    echo $fsid
}

# 创建MON密钥
create_mon_keyring() {
    # 生成monitor密钥
    ceph-authtool --create-keyring /tmp/ceph.mon.keyring --gen-key -n mon. --cap mon 'allow *'

    # 生成管理员密钥
    ceph-authtool --create-keyring /etc/ceph/ceph.client.admin.keyring --gen-key -n client.admin --cap mon 'allow *' --cap osd 'allow *' --cap mds 'allow *' --cap mgr 'allow *'

    # 生成bootstrap密钥
    ceph-authtool --create-keyring /var/lib/ceph/bootstrap-osd/ceph.keyring --gen-key -n client.bootstrap-osd --cap mon 'profile bootstrap-osd'

    # 合并密钥
    ceph-authtool /tmp/ceph.mon.keyring --import-keyring /etc/ceph/ceph.client.admin.keyring
    ceph-authtool /tmp/ceph.mon.keyring --import-keyring /var/lib/ceph/bootstrap-osd/ceph.keyring
}

# 生成MON map
generate_monmap() {
    # 创建monitor map
    monmaptool --create --add ceph-mon1 10.0.1.10 --add ceph-mon2 10.0.1.11 --add ceph-mon3 10.0.1.12 --fsid $(grep fsid /etc/ceph/ceph.conf | awk '{print $3}') /tmp/monmap
}

# 初始化MON数据
init_mon_data() {
    local hostname=$(hostname)

    # 创建MON数据目录
    mkdir -p /var/lib/ceph/mon/ceph-$hostname

    # 初始化MON数据
    ceph-mon --mkfs -i $hostname --monmap /tmp/monmap --keyring /tmp/ceph.mon.keyring

    # 设置权限
    chown -R ceph:ceph /var/lib/ceph/mon/ceph-$hostname
    chown -R ceph:ceph /etc/ceph/
}

# 启动MON服务
start_mon_service() {
    local hostname=$(hostname)

    # 启用并启动MON服务
    systemctl enable ceph-mon@$hostname
    systemctl start ceph-mon@$hostname
    systemctl status ceph-mon@$hostname
}

# 主程序
main() {
    echo "开始部署MON节点..."

    install_ceph_packages
    generate_cluster_config
    create_mon_keyring
    generate_monmap
    init_mon_data
    start_mon_service

    echo "MON节点部署完成!"
    echo "运行 'ceph -s' 检查集群状态"
}

main "$@"
```

#### OSD节点部署
```bash
#!/bin/bash
# OSD节点部署脚本

# 安装OSD软件包
install_osd_packages() {
    yum install -y ceph-osd
}

# 准备OSD磁盘
prepare_osd_disk() {
    local device=$1
    local bluestore_db_device=$2
    local bluestore_wal_device=$3

    echo "准备OSD设备: $device"

    # 检查设备是否存在
    if [ ! -b "$device" ]; then
        echo "错误: 设备 $device 不存在"
        return 1
    fi

    # 清理设备
    wipefs -a $device

    # 创建OSD
    if [ -n "$bluestore_db_device" ] && [ -n "$bluestore_wal_device" ]; then
        # 使用独立的DB和WAL设备
        ceph-volume lvm create --bluestore --data $device --block.db $bluestore_db_device --block.wal $bluestore_wal_device
    elif [ -n "$bluestore_db_device" ]; then
        # 使用独立的DB设备
        ceph-volume lvm create --bluestore --data $device --block.db $bluestore_db_device
    else
        # 单设备部署
        ceph-volume lvm create --bluestore --data $device
    fi
}

# 批量创建OSD
create_multiple_osds() {
    local devices=("$@")

    for device in "${devices[@]}"; do
        echo "创建OSD: $device"
        prepare_osd_disk $device

        if [ $? -eq 0 ]; then
            echo "OSD创建成功: $device"
        else
            echo "OSD创建失败: $device"
        fi
    done
}

# 列出可用设备
list_available_devices() {
    echo "可用于OSD的设备:"
    ceph-volume inventory
}

# 启动OSD服务
start_osd_services() {
    # 启用OSD target
    systemctl enable ceph-osd.target
    systemctl start ceph-osd.target

    # 查看OSD状态
    systemctl status ceph-osd.target
}

# 主程序
main() {
    if [ $# -eq 0 ]; then
        echo "用法: $0 <device1> [device2] [device3] ..."
        echo "示例: $0 /dev/sdb /dev/sdc /dev/sdd"
        echo ""
        list_available_devices
        exit 1
    fi

    local devices=("$@")

    echo "开始部署OSD节点..."

    install_osd_packages
    create_multiple_osds "${devices[@]}"
    start_osd_services

    echo "OSD节点部署完成!"
    echo "运行 'ceph osd tree' 查看OSD状态"
}

main "$@"
```

### 验证集群状态

#### 集群健康检查脚本
```bash
#!/bin/bash
# Ceph集群健康检查脚本

# 检查集群整体状态
check_cluster_status() {
    echo "=== 集群整体状态 ==="
    ceph status
    echo ""

    ceph health detail
    echo ""
}

# 检查MON状态
check_mon_status() {
    echo "=== MON状态检查 ==="
    ceph mon stat
    echo ""

    ceph quorum_status --format json-pretty
    echo ""
}

# 检查OSD状态
check_osd_status() {
    echo "=== OSD状态检查 ==="
    ceph osd stat
    echo ""

    ceph osd tree
    echo ""

    ceph osd df
    echo ""
}

# 检查PG状态
check_pg_status() {
    echo "=== PG状态检查 ==="
    ceph pg stat
    echo ""

    ceph pg dump summary
    echo ""
}

# 检查存储池
check_pools() {
    echo "=== 存储池状态 ==="
    ceph osd lspools
    echo ""

    ceph df
    echo ""
}

# 性能测试
performance_test() {
    echo "=== 性能测试 ==="

    # 创建测试池
    ceph osd pool create test-pool 128 128

    # RADOS性能测试
    echo "RADOS写入测试:"
    rados bench -p test-pool 60 write --no-cleanup
    echo ""

    echo "RADOS读取测试:"
    rados bench -p test-pool 60 seq
    echo ""

    # 清理测试数据
    rados bench -p test-pool 60 cleanup
    ceph osd pool delete test-pool test-pool --yes-i-really-really-mean-it
}

# 主程序
main() {
    echo "开始Ceph集群健康检查..."
    echo "检查时间: $(date)"
    echo "========================================"

    check_cluster_status
    check_mon_status
    check_osd_status
    check_pg_status
    check_pools

    # 询问是否进行性能测试
    read -p "是否进行性能测试? (y/N): " do_perf_test
    if [[ $do_perf_test =~ ^[Yy]$ ]]; then
        performance_test
    fi

    echo "集群健康检查完成!"
}

main "$@"
```

## 存储服务部署

### RBD块存储服务

#### RBD块存储配置
```bash
#!/bin/bash
# RBD块存储服务配置

# 创建RBD存储池
create_rbd_pools() {
    echo "创建RBD存储池..."

    # 创建RBD数据池
    ceph osd pool create rbd 128 128
    ceph osd pool application enable rbd rbd

    # 创建RBD元数据池
    ceph osd pool create rbd_metadata 32 32
    ceph osd pool application enable rbd_metadata rbd

    # 初始化RBD池
    rbd pool init rbd
}

# 创建RBD镜像
create_rbd_image() {
    local image_name=$1
    local size=$2
    local pool=${3:-rbd}

    echo "创建RBD镜像: $image_name"

    # 创建镜像
    rbd create --size $size --pool $pool $image_name

    # 启用镜像特性
    rbd feature enable $pool/$image_name object-map fast-diff exclusive-lock

    # 查看镜像信息
    rbd info $pool/$image_name
}

# 映射RBD设备
map_rbd_device() {
    local pool_image=$1

    echo "映射RBD设备: $pool_image"

    # 映射设备
    rbd map $pool_image

    # 查看映射状态
    rbd showmapped
}

# 格式化和挂载RBD设备
mount_rbd_device() {
    local device=$1
    local mount_point=$2
    local fs_type=${3:-ext4}

    echo "格式化并挂载RBD设备..."

    # 格式化设备
    mkfs.$fs_type $device

    # 创建挂载点
    mkdir -p $mount_point

    # 挂载设备
    mount $device $mount_point

    # 验证挂载
    df -h $mount_point
}

# 主程序
main() {
    create_rbd_pools

    # 示例：创建10GB的测试镜像
    create_rbd_image test-volume 10G

    # 映射设备
    local device=$(rbd map rbd/test-volume)
    echo "RBD设备已映射到: $device"

    # 格式化和挂载
    mount_rbd_device $device /mnt/ceph-rbd

    echo "RBD块存储配置完成!"
}

main "$@"
```

### CephFS文件系统服务

#### MDS节点部署
```bash
#!/bin/bash
# MDS元数据服务器部署

# 安装MDS软件包
install_mds_packages() {
    yum install -y ceph-mds
}

# 配置MDS服务
configure_mds() {
    local mds_name=$1

    # 创建MDS数据目录
    mkdir -p /var/lib/ceph/mds/ceph-$mds_name

    # 生成MDS密钥
    ceph auth get-or-create mds.$mds_name mon 'profile mds' mgr 'profile mds' mds 'allow *' osd 'allow *' > /var/lib/ceph/mds/ceph-$mds_name/keyring

    # 设置权限
    chown -R ceph:ceph /var/lib/ceph/mds/ceph-$mds_name
}

# 启动MDS服务
start_mds_service() {
    local mds_name=$1

    # 启用并启动MDS服务
    systemctl enable ceph-mds@$mds_name
    systemctl start ceph-mds@$mds_name
    systemctl status ceph-mds@$mds_name
}

# 创建CephFS文件系统
create_cephfs() {
    echo "创建CephFS文件系统..."

    # 创建元数据池
    ceph osd pool create cephfs_metadata 64 64
    ceph osd pool application enable cephfs_metadata cephfs

    # 创建数据池
    ceph osd pool create cephfs_data 128 128
    ceph osd pool application enable cephfs_data cephfs

    # 创建文件系统
    ceph fs new cephfs cephfs_metadata cephfs_data

    # 查看文件系统状态
    ceph fs status
}

# 挂载CephFS
mount_cephfs() {
    local mount_point=$1
    local mon_addr="10.0.1.10:6789,10.0.1.11:6789,10.0.1.12:6789"

    echo "挂载CephFS到: $mount_point"

    # 创建挂载点
    mkdir -p $mount_point

    # 获取admin密钥
    local admin_key=$(ceph auth get-key client.admin)

    # 挂载文件系统
    mount -t ceph $mon_addr:/ $mount_point -o name=admin,secret=$admin_key

    # 验证挂载
    df -h $mount_point
}

# 主程序
main() {
    local mds_name=$(hostname)

    install_mds_packages
    configure_mds $mds_name
    start_mds_service $mds_name
    create_cephfs
    mount_cephfs /mnt/cephfs

    echo "CephFS文件系统部署完成!"
}

main "$@"
```

### RGW对象存储服务

#### RGW网关部署
```bash
#!/bin/bash
# RGW对象存储网关部署

# 安装RGW软件包
install_rgw_packages() {
    yum install -y ceph-radosgw
}

# 配置RGW服务
configure_rgw() {
    local rgw_name=$1
    local rgw_port=${2:-7480}

    # 创建RGW数据目录
    mkdir -p /var/lib/ceph/radosgw/ceph-rgw.$rgw_name

    # 生成RGW密钥
    ceph auth get-or-create client.rgw.$rgw_name mon 'allow rw' osd 'allow rwx' > /var/lib/ceph/radosgw/ceph-rgw.$rgw_name/keyring

    # 添加RGW配置到ceph.conf
    cat >> /etc/ceph/ceph.conf << EOF

[client.rgw.$rgw_name]
host = $(hostname)
keyring = /var/lib/ceph/radosgw/ceph-rgw.$rgw_name/keyring
log file = /var/log/ceph/ceph-rgw-$rgw_name.log
rgw frontends = beast port=$rgw_port
rgw thread pool size = 512
rgw print continue = false
rgw enable usage log = true
EOF

    # 设置权限
    chown -R ceph:ceph /var/lib/ceph/radosgw/ceph-rgw.$rgw_name
}

# 启动RGW服务
start_rgw_service() {
    local rgw_name=$1

    # 启用并启动RGW服务
    systemctl enable ceph-radosgw@rgw.$rgw_name
    systemctl start ceph-radosgw@rgw.$rgw_name
    systemctl status ceph-radosgw@rgw.$rgw_name
}

# 创建RGW用户
create_rgw_user() {
    local username=$1
    local display_name=$2

    echo "创建RGW用户: $username"

    # 创建用户
    radosgw-admin user create --uid=$username --display-name="$display_name" --email=${username}@example.com

    # 创建访问密钥
    radosgw-admin key create --uid=$username --key-type=s3 --gen-access-key --gen-secret

    # 查看用户信息
    radosgw-admin user info --uid=$username
}

# 测试S3接口
test_s3_interface() {
    local endpoint=$1
    local access_key=$2
    local secret_key=$3

    echo "测试S3接口..."

    # 安装s3cmd
    yum install -y python3-pip
    pip3 install s3cmd

    # 配置s3cmd
    cat > ~/.s3cfg << EOF
[default]
access_key = $access_key
secret_key = $secret_key
host_base = $endpoint
host_bucket = %(bucket)s.$endpoint
use_https = False
EOF

    # 创建测试bucket
    s3cmd mb s3://test-bucket

    # 上传测试文件
    echo "Hello Ceph RGW" > test.txt
    s3cmd put test.txt s3://test-bucket/

    # 列出对象
    s3cmd ls s3://test-bucket/

    # 下载文件
    s3cmd get s3://test-bucket/test.txt test-download.txt
    cat test-download.txt

    # 清理测试数据
    s3cmd del s3://test-bucket/test.txt
    s3cmd rb s3://test-bucket
    rm -f test.txt test-download.txt
}

# 主程序
main() {
    local rgw_name=$(hostname)
    local rgw_port=7480

    install_rgw_packages
    configure_rgw $rgw_name $rgw_port
    start_rgw_service $rgw_name

    # 创建测试用户
    create_rgw_user testuser "Test User"

    echo "RGW对象存储服务部署完成!"
    echo "访问地址: http://$(hostname):$rgw_port"
}

main "$@"
```

## 集群管理和维护

### 集群监控脚本
```python
#!/usr/bin/env python3
# Ceph集群监控脚本

import subprocess
import json
import time
import smtplib
from email.mime.text import MimeText
from datetime import datetime

class CephMonitor:
    def __init__(self):
        self.cluster_status = {}
        self.alert_thresholds = {
            'osd_down_threshold': 2,
            'pg_degraded_threshold': 10,
            'usage_threshold': 80,
            'near_full_threshold': 85,
            'full_threshold': 95
        }

    def get_cluster_status(self):
        """获取集群状态"""
        try:
            result = subprocess.run(['ceph', 'status', '-f', 'json'],
                                  capture_output=True, text=True)
            self.cluster_status = json.loads(result.stdout)
            return True
        except Exception as e:
            print(f"获取集群状态失败: {e}")
            return False

    def check_cluster_health(self):
        """检查集群健康状态"""
        health_status = self.cluster_status.get('health', {})
        health = health_status.get('status', 'UNKNOWN')

        print(f"集群健康状态: {health}")

        if health != 'HEALTH_OK':
            checks = health_status.get('checks', {})
            for check_name, check_info in checks.items():
                severity = check_info.get('severity', 'UNKNOWN')
                summary = check_info.get('summary', {}).get('message', 'No message')
                print(f"  {severity}: {check_name} - {summary}")

        return health == 'HEALTH_OK'

    def check_osd_status(self):
        """检查OSD状态"""
        osd_map = self.cluster_status.get('osdmap', {})
        total_osds = osd_map.get('osdmap', {}).get('num_osds', 0)
        up_osds = osd_map.get('osdmap', {}).get('num_up_osds', 0)
        in_osds = osd_map.get('osdmap', {}).get('num_in_osds', 0)

        down_osds = total_osds - up_osds
        out_osds = total_osds - in_osds

        print(f"OSD状态: {up_osds}/{total_osds} up, {in_osds}/{total_osds} in")

        if down_osds > self.alert_thresholds['osd_down_threshold']:
            self.send_alert(f"告警: {down_osds} 个OSD处于down状态")
            return False

        return True

    def check_pg_status(self):
        """检查PG状态"""
        pg_map = self.cluster_status.get('pgmap', {})
        total_pgs = pg_map.get('num_pgs', 0)
        degraded_pgs = 0

        # 统计非正常状态的PG
        pgs_by_state = pg_map.get('pgs_by_state', [])
        for state_info in pgs_by_state:
            state_name = state_info.get('state_name', '')
            count = state_info.get('count', 0)

            if 'degraded' in state_name or 'inconsistent' in state_name:
                degraded_pgs += count

        print(f"PG状态: {total_pgs} total, {degraded_pgs} degraded")

        if degraded_pgs > self.alert_thresholds['pg_degraded_threshold']:
            self.send_alert(f"告警: {degraded_pgs} 个PG处于degraded状态")
            return False

        return True

    def check_storage_usage(self):
        """检查存储使用率"""
        pg_map = self.cluster_status.get('pgmap', {})
        total_bytes = pg_map.get('total_bytes', 0)
        used_bytes = pg_map.get('total_used_raw_bytes', 0)

        if total_bytes > 0:
            usage_percent = (used_bytes / total_bytes) * 100
            print(f"存储使用率: {usage_percent:.1f}%")

            if usage_percent > self.alert_thresholds['full_threshold']:
                self.send_alert(f"严重告警: 存储使用率达到 {usage_percent:.1f}%")
                return False
            elif usage_percent > self.alert_thresholds['near_full_threshold']:
                self.send_alert(f"告警: 存储使用率达到 {usage_percent:.1f}%")
                return False

        return True

    def check_mon_quorum(self):
        """检查MON仲裁状态"""
        try:
            result = subprocess.run(['ceph', 'quorum_status', '-f', 'json'],
                                  capture_output=True, text=True)
            quorum_status = json.loads(result.stdout)

            quorum_names = quorum_status.get('quorum_names', [])
            election_epoch = quorum_status.get('election_epoch', 0)

            print(f"MON仲裁: {len(quorum_names)} 个MON在仲裁中")
            print(f"选举轮次: {election_epoch}")

            return len(quorum_names) >= 2  # 至少需要2个MON

        except Exception as e:
            print(f"检查MON仲裁失败: {e}")
            return False

    def send_alert(self, message):
        """发送告警邮件"""
        print(f"ALERT: {message}")

        # 这里可以配置邮件发送
        # smtp_server = "smtp.example.com"
        # from_addr = "ceph-monitor@example.com"
        # to_addrs = ["admin@example.com"]
        #
        # msg = MimeText(message)
        # msg['Subject'] = f"Ceph集群告警 - {datetime.now()}"
        # msg['From'] = from_addr
        # msg['To'] = ', '.join(to_addrs)
        #
        # server = smtplib.SMTP(smtp_server)
        # server.send_message(msg)
        # server.quit()

    def generate_report(self):
        """生成监控报告"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        report = f"""
Ceph集群监控报告
生成时间: {timestamp}
==========================================
        """

        if self.get_cluster_status():
            # 基本信息
            cluster_id = self.cluster_status.get('fsid', 'Unknown')
            report += f"集群ID: {cluster_id}\n"

            # 健康状态
            health = self.cluster_status.get('health', {}).get('status', 'UNKNOWN')
            report += f"健康状态: {health}\n"

            # OSD信息
            osd_map = self.cluster_status.get('osdmap', {}).get('osdmap', {})
            total_osds = osd_map.get('num_osds', 0)
            up_osds = osd_map.get('num_up_osds', 0)
            in_osds = osd_map.get('num_in_osds', 0)
            report += f"OSD状态: {up_osds}/{total_osds} up, {in_osds}/{total_osds} in\n"

            # 存储信息
            pg_map = self.cluster_status.get('pgmap', {})
            total_bytes = pg_map.get('total_bytes', 0)
            used_bytes = pg_map.get('total_used_raw_bytes', 0)
            avail_bytes = pg_map.get('total_avail_bytes', 0)

            if total_bytes > 0:
                total_gb = total_bytes / (1024**3)
                used_gb = used_bytes / (1024**3)
                avail_gb = avail_bytes / (1024**3)
                usage_percent = (used_bytes / total_bytes) * 100

                report += f"存储容量: {total_gb:.1f}GB total, {used_gb:.1f}GB used, {avail_gb:.1f}GB available\n"
                report += f"使用率: {usage_percent:.1f}%\n"

            # PG信息
            total_pgs = pg_map.get('num_pgs', 0)
            report += f"PG总数: {total_pgs}\n"

        else:
            report += "无法获取集群状态信息\n"

        print(report)
        return report

    def run_monitoring(self):
        """执行监控检查"""
        print("开始Ceph集群监控...")

        if not self.get_cluster_status():
            self.send_alert("无法获取Ceph集群状态")
            return False

        all_checks_passed = True

        # 执行各项检查
        if not self.check_cluster_health():
            all_checks_passed = False

        if not self.check_osd_status():
            all_checks_passed = False

        if not self.check_pg_status():
            all_checks_passed = False

        if not self.check_storage_usage():
            all_checks_passed = False

        if not self.check_mon_quorum():
            all_checks_passed = False

        if all_checks_passed:
            print("所有检查通过，集群状态正常")
        else:
            print("发现异常，请检查告警信息")

        return all_checks_passed

def main():
    monitor = CephMonitor()

    # 生成监控报告
    monitor.generate_report()

    # 执行监控检查
    monitor.run_monitoring()

if __name__ == "__main__":
    main()
```

### 故障处理和恢复
```bash
#!/bin/bash
# Ceph故障处理脚本

# OSD故障处理
handle_osd_failure() {
    local osd_id=$1

    echo "处理OSD.$osd_id 故障..."

    # 检查OSD状态
    ceph osd tree | grep "osd.$osd_id"

    # 查看OSD详细信息
    ceph osd find $osd_id

    # 检查OSD日志
    journalctl -u ceph-osd@$osd_id --no-pager | tail -50

    # 尝试重启OSD
    echo "尝试重启OSD.$osd_id..."
    systemctl restart ceph-osd@$osd_id

    # 等待并检查状态
    sleep 30
    if ceph osd tree | grep "osd.$osd_id" | grep -q "up"; then
        echo "OSD.$osd_id 重启成功"
        return 0
    else
        echo "OSD.$osd_id 重启失败，需要进一步处理"
        return 1
    fi
}

# MON故障处理
handle_mon_failure() {
    local mon_name=$1

    echo "处理MON.$mon_name 故障..."

    # 检查MON状态
    ceph mon stat
    ceph quorum_status

    # 检查MON日志
    journalctl -u ceph-mon@$mon_name --no-pager | tail -50

    # 尝试重启MON
    echo "尝试重启MON.$mon_name..."
    systemctl restart ceph-mon@$mon_name

    # 等待并检查仲裁状态
    sleep 30
    if ceph quorum_status | grep -q "$mon_name"; then
        echo "MON.$mon_name 恢复正常"
        return 0
    else
        echo "MON.$mon_name 未能加入仲裁，需要进一步处理"
        return 1
    fi
}

# PG修复
repair_pgs() {
    echo "修复异常PG..."

    # 查找不一致的PG
    inconsistent_pgs=$(ceph health detail | grep "pg.*inconsistent" | awk '{print $2}')

    for pg in $inconsistent_pgs; do
        echo "修复PG: $pg"
        ceph pg repair $pg
    done

    # 查找降级的PG
    degraded_pgs=$(ceph pg ls degraded -f json | jq -r '.pg_stats[].pgid')

    echo "等待降级PG恢复..."
    echo "降级PG数量: $(echo "$degraded_pgs" | wc -l)"
}

# 集群清理
cleanup_cluster() {
    echo "执行集群清理..."

    # 清理旧的crashdump
    ceph crash ls | tail -10

    # 清理完成的PG
    ceph tell osd.* injectargs '--osd-scrub-sleep=0'

    # 启动深度清理
    for osd in $(ceph osd ls); do
        ceph tell osd.$osd config set osd_deep_scrub_interval 604800
    done
}

# 数据平衡
rebalance_data() {
    echo "执行数据平衡..."

    # 检查数据分布
    ceph osd df

    # 调整CRUSH权重
    high_usage_osds=$(ceph osd df | awk 'NR>1 && $7+0 > 80 {print $1}')

    for osd in $high_usage_osds; do
        current_weight=$(ceph osd tree | grep "osd.$osd" | awk '{print $3}')
        new_weight=$(echo "$current_weight * 0.9" | bc)

        echo "调整OSD.$osd 权重: $current_weight -> $new_weight"
        ceph osd crush reweight osd.$osd $new_weight
    done
}

# 主程序
main() {
    case $1 in
        osd)
            if [ -z "$2" ]; then
                echo "用法: $0 osd <osd_id>"
                exit 1
            fi
            handle_osd_failure $2
            ;;
        mon)
            if [ -z "$2" ]; then
                echo "用法: $0 mon <mon_name>"
                exit 1
            fi
            handle_mon_failure $2
            ;;
        repair)
            repair_pgs
            ;;
        cleanup)
            cleanup_cluster
            ;;
        rebalance)
            rebalance_data
            ;;
        *)
            echo "用法: $0 {osd|mon|repair|cleanup|rebalance} [参数]"
            echo "  osd <id>      - 处理OSD故障"
            echo "  mon <name>    - 处理MON故障"
            echo "  repair        - 修复异常PG"
            echo "  cleanup       - 清理集群"
            echo "  rebalance     - 数据平衡"
            exit 1
            ;;
    esac
}

main "$@"
```

## 最佳实践和建议

### 部署最佳实践
```yaml
Ceph部署建议:
  硬件选择:
    - 使用企业级硬件确保可靠性
    - SSD用于WAL和DB，提升性能
    - 万兆网络用于集群通信
    - 预留足够的内存资源

  网络设计:
    - 分离公共网络和集群网络
    - 使用绑定/聚合提高带宽
    - 配置网络冗余避免单点故障
    - 优化网络参数减少延迟

  存储规划:
    - 合理规划PG数量
    - 设置合适的副本数
    - 考虑故障域分布
    - 预留扩展空间

  安全配置:
    - 启用cephx认证
    - 配置防火墙规则
    - 定期更新系统补丁
    - 限制管理员权限
```

### 性能优化建议
```yaml
性能优化策略:
  BlueStore优化:
    - 配置合适的WAL和DB大小
    - 使用NVMe SSD提升性能
    - 调整BlueStore缓存参数
    - 启用压缩算法

  网络优化:
    - 调整TCP参数
    - 启用网络卸载功能
    - 使用多队列网卡
    - 优化中断处理

  OSD优化:
    - 设置合适的线程数
    - 调整队列深度
    - 优化文件系统参数
    - 配置亲和性绑定

  客户端优化:
    - 调整读写缓存
    - 使用多连接
    - 启用预读功能
    - 优化I/O模式
```

## 总结

Ceph作为统一的分布式存储解决方案，提供了对象存储、块存储和文件系统的完整功能。通过合理的架构设计、正确的部署配置和有效的运维管理，可以构建出高可靠、高性能、可扩展的存储集群。

### 关键要点

1. **架构设计**：
   - 理解RADOS核心架构和CRUSH算法
   - 合理规划节点角色和存储介质
   - 设计冗余的网络架构

2. **部署实施**：
   - 选择合适的部署方式（Cephadm或手动）
   - 遵循最佳实践进行配置
   - 充分测试验证功能

3. **运维管理**：
   - 建立完善的监控体系
   - 制定故障处理流程
   - 定期进行维护和优化

4. **性能调优**：
   - 根据工作负载特点优化配置
   - 监控关键性能指标
   - 持续改进系统性能

5. **数据安全**：
   - 配置合适的副本策略
   - 定期验证数据完整性
   - 建立备份和恢复机制

掌握Ceph的架构原理和运维技能，将帮助您构建企业级的分布式存储基础设施，满足现代应用对存储的各种需求。

---

*本文为Ceph分布式存储架构部署维护指南，建议结合实际环境和最新官方文档进行实践。如有技术问题，欢迎交流讨论。*