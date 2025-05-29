---
title: "Windows 命令行与 PowerShell 实用指南"
author: Kk
date: 2024-03-14
category: DevOps
layout: post
tags: [windows, cmd, powershell, command-line, system-administration]
excerpt: "Windows命令行和PowerShell是系统管理员必备技能，本文详细介绍各种实用命令、脚本编写和系统管理技巧。"
---

# Windows 命令行与 PowerShell 实用指南 💻

> Windows提供了强大的命令行工具和PowerShell环境，掌握这些工具可以大大提高系统管理和自动化工作的效率。

## 📊 目录

- [系统信息与环境](#系统信息与环境)
- [文件和目录操作](#文件和目录操作)
- [网络命令](#网络命令)
- [进程和服务管理](#进程和服务管理)
- [注册表操作](#注册表操作)
- [PowerShell进阶](#powershell进阶)
- [批处理脚本](#批处理脚本)
- [系统管理任务](#系统管理任务)

---

## 🖥️ 系统信息与环境

### 快速系统操作
```cmd
# 快速打开环境变量编辑器
rundll32 sysdm.cpl,EditEnvironmentVariables

# 打开系统属性
rundll32 shell32.dll,Control_RunDLL sysdm.cpl

# 打开网络连接
rundll32 shell32.dll,Control_RunDLL ncpa.cpl

# 打开设备管理器
rundll32 devmgr.dll DeviceManager_Execute

# 打开服务管理器
services.msc

# 打开注册表编辑器
regedit

# 打开组策略编辑器
gpedit.msc
```

### 系统信息查看
```cmd
# 查看系统信息
systeminfo
systeminfo | findstr /C:"OS Name" /C:"System Type"

# 查看计算机信息
hostname
echo %COMPUTERNAME%
echo %USERNAME%
whoami
whoami /all

# 查看硬件信息
wmic computersystem get model,name,manufacturer,systemtype
wmic cpu get name,maxclockspeed,numberofcores
wmic memorychip get capacity,speed
wmic diskdrive get size,model

# 查看环境变量
set
echo %PATH%
echo %USERPROFILE%
echo %PROGRAMFILES%
echo %TEMP%
```

### PowerShell系统信息
```powershell
# 详细系统信息
Get-ComputerInfo
Get-ComputerInfo | Select-Object WindowsProductName, WindowsVersion, TotalPhysicalMemory

# 硬件信息
Get-WmiObject -Class Win32_ComputerSystem
Get-WmiObject -Class Win32_Processor | Select-Object Name, NumberOfCores, MaxClockSpeed
Get-WmiObject -Class Win32_PhysicalMemory | Measure-Object Capacity -Sum

# 磁盘信息
Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID, Size, FreeSpace
Get-Volume

# 网络适配器
Get-NetAdapter | Where-Object Status -eq "Up"
Get-WmiObject -Class Win32_NetworkAdapterConfiguration | Where-Object IPEnabled -eq $true
```

### 环境变量管理
```cmd
# 设置临时环境变量
set MYVAR=value
echo %MYVAR%

# 设置永久用户环境变量
setx MYVAR "value"

# 设置永久系统环境变量（需要管理员权限）
setx MYVAR "value" /M

# 查看特定环境变量
echo %PATH%
echo %TEMP%
echo %APPDATA%
echo %PROGRAMFILES%
```

```powershell
# PowerShell环境变量操作
$env:PATH
$env:USERPROFILE
[Environment]::GetEnvironmentVariable("PATH", "User")
[Environment]::GetEnvironmentVariable("PATH", "Machine")

# 设置环境变量
$env:MYVAR = "value"
[Environment]::SetEnvironmentVariable("MYVAR", "value", "User")
[Environment]::SetEnvironmentVariable("MYVAR", "value", "Machine")

# 添加到PATH
$env:PATH += ";C:\MyTools"
```

---

## 📁 文件和目录操作

### 基本文件操作
```cmd
# 目录浏览
dir                    # 列出当前目录内容
dir /a                # 显示所有文件（包括隐藏文件）
dir /s                # 递归显示子目录
dir /o:d              # 按日期排序
dir /o:s              # 按大小排序
dir *.txt             # 按扩展名过滤
tree                  # 显示目录树结构
tree /f               # 显示目录树包含文件

# 目录操作
cd \path\to\directory  # 切换目录
cd..                   # 返回上级目录
cd.                    # 当前目录
pushd path             # 保存当前目录并切换
popd                   # 返回保存的目录
md "new folder"        # 创建目录
rd "folder name"       # 删除空目录
rd /s "folder name"    # 递归删除目录

# 文件操作
copy source.txt dest.txt           # 复制文件
copy *.txt backup\                 # 复制多个文件
xcopy source dest /s /e            # 复制目录结构
robocopy source dest /mir          # 镜像复制（推荐）
move oldfile.txt newlocation\      # 移动文件
ren oldname.txt newname.txt        # 重命名文件
del filename.txt                   # 删除文件
del *.tmp                         # 按模式删除
type filename.txt                  # 显示文件内容
more filename.txt                  # 分页显示
```

### PowerShell高级文件操作
```powershell
# 文件和目录操作
Get-ChildItem                      # 等同于dir
Get-ChildItem -Recurse -Force      # 递归显示所有文件
Get-ChildItem *.txt | Sort-Object Length -Descending
Set-Location "C:\path"             # 等同于cd
New-Item -ItemType Directory -Name "NewFolder"
New-Item -ItemType File -Name "NewFile.txt" -Value "Content"
Remove-Item "file.txt"
Remove-Item "folder" -Recurse -Force

# 高级搜索
Get-ChildItem -Recurse | Where-Object {$_.Name -like "*config*"}
Get-ChildItem -Recurse | Where-Object {$_.Length -gt 1MB}
Get-ChildItem -Recurse | Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-7)}

# 文件内容操作
Get-Content "file.txt"
Set-Content "file.txt" "New content"
Add-Content "file.txt" "Append this"
Select-String "pattern" "file.txt"
(Get-Content "file.txt") -replace "old", "new" | Set-Content "file.txt"

# 文件哈希和属性
Get-FileHash "file.txt" -Algorithm SHA256
Get-ItemProperty "file.txt"
Set-ItemProperty "file.txt" -Name IsReadOnly -Value $true
```

### 高级文件操作
```cmd
# 查找文件
where filename         # 在PATH中查找文件
forfiles /m *.log /c "cmd /c del @path"  # 批量操作文件

# 文件属性
attrib +h filename     # 设置隐藏属性
attrib -r filename     # 移除只读属性
attrib +s filename     # 设置系统属性

# 文件比较
fc file1 file2         # 比较文件内容
comp file1 file2       # 二进制文件比较

# 文件关联
assoc .txt             # 查看文件关联
ftype txtfile          # 查看文件类型命令
```

```powershell
# 高级文件搜索
Get-ChildItem -Recurse | Where-Object {$_.Name -like "*.log"}
Get-ChildItem -Recurse | Where-Object {$_.Length -gt 1MB}
Get-ChildItem -Recurse | Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)}

# 文件哈希计算
Get-FileHash filename -Algorithm SHA256
Get-FileHash filename -Algorithm MD5

# 压缩和解压
Compress-Archive -Path source -DestinationPath archive.zip
Expand-Archive -Path archive.zip -DestinationPath dest

# 文件权限
Get-Acl filename
Set-Acl filename -AclObject $acl
```

---

## 🌐 网络命令

### 网络诊断工具
```cmd
# 连通性测试
ping google.com              # 基本ping测试
ping -t google.com           # 持续ping
ping -a 8.8.8.8             # 解析主机名
ping -n 10 google.com       # 指定ping次数
tracert google.com          # 路由跟踪
pathping google.com         # 结合ping和tracert

# 网络配置
ipconfig                    # 显示基本网络配置
ipconfig /all               # 显示详细配置
ipconfig /release           # 释放IP地址
ipconfig /renew             # 重新获取IP
ipconfig /flushdns          # 清除DNS缓存
ipconfig /displaydns        # 显示DNS缓存
ipconfig /registerdns       # 重新注册DNS

# DNS查询
nslookup google.com
nslookup -type=mx gmail.com  # 查询MX记录
nslookup -type=ns google.com # 查询NS记录
```

### 网络连接管理
```cmd
# 查看网络连接
netstat -an                 # 显示所有连接
netstat -ano                # 显示PID
netstat -b                  # 显示进程名（需管理员权限）
netstat -r                  # 显示路由表
netstat -s                  # 显示协议统计

# 端口测试
telnet google.com 80        # 测试端口（需启用Telnet客户端）

# 网络共享
net share                   # 查看共享资源
net share sharename         # 查看特定共享
net use                     # 查看网络连接
net use z: \\server\share   # 映射网络驱动器
net use z: /delete          # 断开网络驱动器

# ARP表操作
arp -a                      # 显示ARP表
arp -d                      # 清除ARP缓存
```

### PowerShell网络操作
```powershell
# 高级网络测试
Test-Connection google.com
Test-Connection google.com -Count 4 -Delay 2
Test-NetConnection google.com -Port 443
Test-NetConnection google.com -Port 80 -InformationLevel Detailed

# DNS操作
Resolve-DnsName google.com
Resolve-DnsName google.com -Type MX
Clear-DnsClientCache
Get-DnsClientCache

# 网络配置
Get-NetIPConfiguration
Get-NetAdapter
Get-NetIPAddress
Get-NetRoute
Set-NetIPInterface -InterfaceAlias "Ethernet" -Dhcp Enabled

# 网络连接
Get-NetTCPConnection
Get-NetTCPConnection -State Listen
Get-NetTCPConnection -LocalPort 80

# 下载文件
Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile "file.zip"
Invoke-RestMethod -Uri "https://api.github.com/users/octocat"

# 端口扫描
1..1024 | ForEach-Object {
    $result = Test-NetConnection localhost -Port $_ -WarningAction SilentlyContinue
    if ($result.TcpTestSucceeded) {
        Write-Host "Port $_ is open"
    }
}
```

---

## ⚙️ 进程和服务管理

### 进程管理
```cmd
# 查看进程
tasklist                           # 显示所有进程
tasklist /fi "imagename eq chrome.exe"  # 过滤特定进程
tasklist /svc                      # 显示服务信息
tasklist /m                       # 显示模块信息

# 终止进程
taskkill /pid 1234                 # 按PID终止
taskkill /im notepad.exe           # 按进程名终止
taskkill /f /im chrome.exe         # 强制终止
taskkill /f /fi "windowtitle eq Calculator"  # 按窗口标题终止

# 启动程序
start notepad.exe                  # 启动程序
start /wait setup.exe              # 等待程序结束
start /min calculator.exe          # 最小化启动
start /max notepad.exe             # 最大化启动
```

### 服务管理
```cmd
# 服务查看
sc query                          # 查看所有服务
sc query state= all                # 查看所有状态的服务
sc query type= service             # 只查看服务
sc qc servicename                  # 查看服务配置

# 服务控制
sc start servicename              # 启动服务
sc stop servicename               # 停止服务
sc pause servicename              # 暂停服务
sc continue servicename           # 继续服务
sc config servicename start= auto # 设置自动启动
sc config servicename start= disabled  # 禁用服务

# NET命令
net start                         # 查看运行中的服务
net start servicename            # 启动服务
net stop servicename             # 停止服务
```

### PowerShell进程和服务
```powershell
# 进程管理
Get-Process                       # 获取所有进程
Get-Process chrome               # 获取特定进程
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
Stop-Process -Name notepad       # 停止进程
Stop-Process -Id 1234            # 按PID停止
Start-Process notepad.exe        # 启动进程
Start-Process powershell -Verb RunAs  # 以管理员身份启动

# 性能监控
Get-Process | Select-Object Name, CPU, WorkingSet, PagedMemorySize
Get-Counter "\Processor(_Total)\% Processor Time"
Get-Counter "\Memory\Available MBytes"

# 服务管理
Get-Service                      # 获取所有服务
Get-Service | Where-Object Status -eq "Running"
Get-Service -Name "Windows Update"
Start-Service -Name "Spooler"
Stop-Service -Name "Spooler"
Restart-Service -Name "Spooler"
Set-Service -Name "Spooler" -StartupType Manual

# 事件日志
Get-EventLog -LogName System -Newest 10
Get-EventLog -LogName Application -EntryType Error -Newest 5
Get-WinEvent -LogName System | Where-Object Id -eq 1074
```

---

## 📋 注册表操作

### CMD注册表操作
```cmd
# 查询注册表
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion"
reg query "HKCU\Software" /s      # 递归查询
reg query "HKLM\SOFTWARE" /f "Office" /s  # 搜索包含Office的项

# 添加注册表项和值
reg add "HKCU\Software\MyApp"
reg add "HKCU\Software\MyApp" /v "Setting" /t REG_SZ /d "Value"
reg add "HKCU\Software\MyApp" /v "Number" /t REG_DWORD /d 123
reg add "HKCU\Software\MyApp" /v "Binary" /t REG_BINARY /d 01020304

# 修改注册表值
reg add "HKCU\Software\MyApp" /v "Setting" /t REG_SZ /d "NewValue" /f

# 删除注册表
reg delete "HKCU\Software\MyApp" /v "Setting" /f
reg delete "HKCU\Software\MyApp" /f

# 导出和导入
reg export "HKCU\Software\MyApp" backup.reg
reg import backup.reg

# 比较注册表
reg compare "HKLM\SOFTWARE\Microsoft" "HKLM\SOFTWARE\Microsoft"
```

### PowerShell注册表操作
```powershell
# 注册表提供程序
Get-PSDrive
Set-Location HKLM:\SOFTWARE\Microsoft
Get-ChildItem HKLM:\SOFTWARE\Microsoft | Select-Object Name

# 读取注册表
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion"
(Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion").ProductName
Get-ItemPropertyValue "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" -Name "ProductName"

# 创建和修改注册表
New-Item "HKCU:\Software\MyApp" -Force
New-ItemProperty "HKCU:\Software\MyApp" -Name "Setting" -Value "Value" -PropertyType String
Set-ItemProperty "HKCU:\Software\MyApp" -Name "Setting" -Value "NewValue"
New-ItemProperty "HKCU:\Software\MyApp" -Name "Number" -Value 123 -PropertyType DWord

# 删除注册表
Remove-ItemProperty "HKCU:\Software\MyApp" -Name "Setting"
Remove-Item "HKCU:\Software\MyApp" -Recurse

# 注册表搜索
Get-ChildItem HKLM:\SOFTWARE -Recurse | Where-Object {$_.Name -like "*Office*"}
Get-ChildItem HKLM:\SOFTWARE\Microsoft -Recurse | Where-Object {$_.Property -contains "Version"}

# 注册表权限
Get-Acl "HKLM:\SOFTWARE\MyApp"
$acl = Get-Acl "HKLM:\SOFTWARE\MyApp"
Set-Acl "HKLM:\SOFTWARE\MyApp" -AclObject $acl
```

---

## 🚀 PowerShell进阶技巧

### 对象和管道操作
```powershell
# 对象处理
Get-Process | Select-Object Name, CPU, WorkingSet
Get-Process | Where-Object {$_.CPU -gt 100}
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
Get-Process | Group-Object ProcessName | Sort-Object Count -Descending

# 格式化输出
Get-Process | Format-Table Name, CPU, WorkingSet -AutoSize
Get-Process | Format-List *
Get-Process | Format-Wide Name -Column 4
Get-Process | Out-GridView

# 统计和测量
Get-Process | Measure-Object WorkingSet -Sum -Average -Maximum -Minimum
Get-ChildItem C:\ -Recurse | Measure-Object Length -Sum

# 导出数据
Get-Process | Export-Csv "processes.csv" -NoTypeInformation
Get-Process | ConvertTo-Json | Out-File "processes.json"
Get-Process | ConvertTo-Html | Out-File "processes.html"
```

### 变量和数据类型
```powershell
# 变量定义
$string = "Hello World"
$number = 42
$array = @(1, 2, 3, 4, 5)
$hashtable = @{Name="John"; Age=30; City="New York"}

# 数组操作
$array[0]                    # 第一个元素
$array[-1]                   # 最后一个元素
$array[1..3]                 # 切片
$array += 6                  # 添加元素
$array.Length                # 数组长度
$array | ForEach-Object {$_ * 2}  # 数组运算

# 哈希表操作
$hashtable["Name"]           # 获取值
$hashtable.Age               # 另一种获取方式
$hashtable["Email"] = "john@email.com"  # 添加键值对
$hashtable.Remove("City")    # 删除键值对
$hashtable.Keys              # 获取所有键
$hashtable.Values            # 获取所有值

# 自定义对象
$person = [PSCustomObject]@{
    Name = "John Doe"
    Age = 30
    Department = "IT"
}
$person | Add-Member -MemberType NoteProperty -Name "Salary" -Value 50000
```

### 函数和脚本块
```powershell
# 简单函数
function Get-ComputerUptime {
    $bootTime = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
    $uptime = (Get-Date) - $bootTime
    return $uptime
}

# 带参数的函数
function Test-PortConnection {
    param(
        [Parameter(Mandatory=$true)]
        [string]$ComputerName,

        [Parameter(Mandatory=$true)]
        [int]$Port,

        [int]$Timeout = 3000
    )

    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $connect = $tcpClient.BeginConnect($ComputerName, $Port, $null, $null)
        $wait = $connect.AsyncWaitHandle.WaitOne($Timeout, $false)

        if ($wait) {
            $tcpClient.EndConnect($connect)
            $result = $true
        } else {
            $result = $false
        }
    } catch {
        $result = $false
    } finally {
        if ($tcpClient) { $tcpClient.Close() }
    }

    return [PSCustomObject]@{
        ComputerName = $ComputerName
        Port = $Port
        Open = $result
        TestTime = Get-Date
    }
}

# 使用函数
Get-ComputerUptime
Test-PortConnection -ComputerName "google.com" -Port 80

# 脚本块
$scriptBlock = {
    Get-Process | Where-Object CPU -gt 100
}
& $scriptBlock  # 执行脚本块
```

---

## 📜 实用批处理脚本

### 系统维护脚本
```batch
@echo off
REM === 系统清理和维护脚本 ===
setlocal enabledelayedexpansion

echo ================================
echo    系统维护脚本 v1.0
echo ================================
echo.

REM 检查管理员权限
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 错误: 需要管理员权限运行此脚本
    pause
    exit /b 1
)

echo [1/6] 清理临时文件...
del /q /s "%TEMP%\*" 2>nul
del /q /s "C:\Windows\Temp\*" 2>nul
del /q /s "%USERPROFILE%\AppData\Local\Temp\*" 2>nul
echo 临时文件清理完成

echo [2/6] 清理回收站...
rd /s /q "%SYSTEMDRIVE%\$Recycle.Bin" 2>nul
echo 回收站清理完成

echo [3/6] 清理系统日志...
for /f "tokens=*" %%G in ('wevtutil.exe el') do wevtutil.exe cl "%%G" 2>nul
echo 系统日志清理完成

echo [4/6] 更新系统文件...
sfc /scannow >nul
echo 系统文件检查完成

echo [5/6] 磁盘碎片整理状态...
defrag C: /A /H
echo 磁盘分析完成

echo [6/6] 生成系统报告...
systeminfo > "%USERPROFILE%\Desktop\SystemReport_%date:~0,4%%date:~5,2%%date:~8,2%.txt"
echo 系统报告已保存到桌面

echo.
echo ================================
echo    系统维护完成！
echo ================================
pause
```

### 网络诊断脚本
```batch
@echo off
REM === 网络连接诊断脚本 ===
setlocal enabledelayedexpansion

set logfile=NetworkDiag_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%.log
set logfile=!logfile: =0!

echo ================================ > %logfile%
echo 网络诊断报告 - %date% %time% >> %logfile%
echo ================================ >> %logfile%
echo.

echo 正在进行网络诊断...

echo 1. 网络配置信息 >> %logfile%
echo ---------------------- >> %logfile%
ipconfig /all >> %logfile%
echo. >> %logfile%

echo 2. 连通性测试 >> %logfile%
echo ---------------------- >> %logfile%
for %%h in (8.8.8.8 google.com baidu.com github.com) do (
    echo 测试连接到 %%h...
    echo 测试 %%h: >> %logfile%
    ping -n 4 %%h >> %logfile% 2>&1
    echo. >> %logfile%
)

echo 3. 路由信息 >> %logfile%
echo ---------------------- >> %logfile%
route print >> %logfile%
echo. >> %logfile%

echo 4. DNS配置 >> %logfile%
echo ---------------------- >> %logfile%
nslookup google.com >> %logfile% 2>&1
echo. >> %logfile%

echo 5. 网络连接状态 >> %logfile%
echo ---------------------- >> %logfile%
netstat -an >> %logfile%
echo. >> %logfile%

echo 诊断完成！结果保存在: %logfile%
notepad %logfile%
```

### 自动化备份脚本
```batch
@echo off
REM === 增量备份脚本 ===
setlocal enabledelayedexpansion

REM 配置区域 - 根据需要修改
set SOURCE=C:\ImportantData
set BACKUP_BASE=D:\Backups
set RETENTION_DAYS=30
set LOG_FILE=%BACKUP_BASE%\backup.log

REM 检查源目录
if not exist "%SOURCE%" (
    echo 错误: 源目录不存在 %SOURCE%
    pause
    exit /b 1
)

REM 创建备份基础目录
if not exist "%BACKUP_BASE%" mkdir "%BACKUP_BASE%"

REM 生成时间戳
set TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=!TIMESTAMP: =0!
set BACKUP_DIR=%BACKUP_BASE%\Backup_%TIMESTAMP%

REM 记录开始时间
echo ================================== >> %LOG_FILE%
echo 备份开始: %date% %time% >> %LOG_FILE%
echo 源目录: %SOURCE% >> %LOG_FILE%
echo 目标目录: %BACKUP_DIR% >> %LOG_FILE%
echo ================================== >> %LOG_FILE%

REM 执行备份
echo 开始备份 %SOURCE% 到 %BACKUP_DIR%...
robocopy "%SOURCE%" "%BACKUP_DIR%" /MIR /R:3 /W:10 /TEE /LOG+:%LOG_FILE%

if %errorlevel% leq 3 (
    echo 备份成功完成 >> %LOG_FILE%
    echo 备份成功完成
) else (
    echo 备份出现错误，错误代码: %errorlevel% >> %LOG_FILE%
    echo 备份出现错误，请检查日志
)

REM 清理旧备份
echo 清理%RETENTION_DAYS%天前的备份... >> %LOG_FILE%
forfiles /p "%BACKUP_BASE%" /m "Backup_*" /d -%RETENTION_DAYS% /c "cmd /c rd /s /q @path && echo 删除: @path" >> %LOG_FILE% 2>&1

REM 记录结束时间
echo 备份结束: %date% %time% >> %LOG_FILE%
echo. >> %LOG_FILE%

echo 备份任务完成！日志文件: %LOG_FILE%
```

---

## 🛠️ 系统管理实用脚本

### PowerShell系统健康检查
```powershell
# SystemHealthCheck.ps1
function Invoke-SystemHealthCheck {
    [CmdletBinding()]
    param(
        [string]$OutputPath = "$env:USERPROFILE\Desktop\HealthCheck_$(Get-Date -Format 'yyyyMMdd_HHmm').html"
    )

    Write-Host "开始系统健康检查..." -ForegroundColor Green

    # 初始化报告数据
    $report = @{}

    # 1. 系统基本信息
    Write-Host "收集系统信息..." -ForegroundColor Yellow
    $os = Get-CimInstance Win32_OperatingSystem
    $computer = Get-CimInstance Win32_ComputerSystem
    $cpu = Get-CimInstance Win32_Processor

    $report.System = [PSCustomObject]@{
        ComputerName = $computer.Name
        OS = $os.Caption
        Version = $os.Version
        Architecture = $os.OSArchitecture
        InstallDate = $os.InstallDate
        LastBootTime = $os.LastBootUpTime
        Uptime = (Get-Date) - $os.LastBootUpTime
        CPU = $cpu.Name
        Cores = $cpu.NumberOfCores
        TotalMemory = [math]::Round($computer.TotalPhysicalMemory / 1GB, 2)
    }

    # 2. 磁盘空间检查
    Write-Host "检查磁盘空间..." -ForegroundColor Yellow
    $disks = Get-CimInstance Win32_LogicalDisk | Where-Object {$_.DriveType -eq 3}
    $report.Disks = $disks | ForEach-Object {
        $freePercent = [math]::Round(($_.FreeSpace / $_.Size) * 100, 2)
        [PSCustomObject]@{
            Drive = $_.DeviceID
            Label = $_.VolumeName
            SizeGB = [math]::Round($_.Size / 1GB, 2)
            FreeGB = [math]::Round($_.FreeSpace / 1GB, 2)
            FreePercent = $freePercent
            Status = if ($freePercent -lt 10) { "Critical" } elseif ($freePercent -lt 20) { "Warning" } else { "OK" }
        }
    }

    # 3. 服务状态检查
    Write-Host "检查关键服务..." -ForegroundColor Yellow
    $criticalServices = @("BITS", "Windows Update", "Windows Defender Antivirus Service", "Workstation", "Server")
    $report.Services = $criticalServices | ForEach-Object {
        $service = Get-Service -Name $_ -ErrorAction SilentlyContinue
        if ($service) {
            [PSCustomObject]@{
                Name = $service.DisplayName
                Status = $service.Status
                StartType = $service.StartType
            }
        }
    }

    # 4. 网络连接检查
    Write-Host "测试网络连接..." -ForegroundColor Yellow
    $testHosts = @("8.8.8.8", "google.com", "microsoft.com")
    $report.NetworkTests = $testHosts | ForEach-Object {
        $result = Test-Connection $_ -Count 2 -Quiet
        [PSCustomObject]@{
            Host = $_
            Status = if ($result) { "OK" } else { "Failed" }
            ResponseTime = if ($result) {
                (Test-Connection $_ -Count 1).ResponseTime
            } else { "N/A" }
        }
    }

    # 5. 事件日志错误检查
    Write-Host "检查系统错误..." -ForegroundColor Yellow
    $errorEvents = Get-EventLog -LogName System -EntryType Error -Newest 10 -ErrorAction SilentlyContinue
    $report.RecentErrors = $errorEvents | Select-Object TimeGenerated, Source, EventID, Message

    # 6. 安全更新检查
    Write-Host "检查Windows更新..." -ForegroundColor Yellow
    try {
        $updateSession = New-Object -ComObject Microsoft.Update.Session
        $updateSearcher = $updateSession.CreateUpdateSearcher()
        $searchResult = $updateSearcher.Search("IsInstalled=0 and Type='Software'")
        $report.PendingUpdates = $searchResult.Updates.Count
    } catch {
        $report.PendingUpdates = "无法检查"
    }

    # 生成HTML报告
    $html = @"
<!DOCTYPE html>
<html>
<head>
    <title>系统健康检查报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .critical { background-color: #ffebee; }
        .warning { background-color: #fff3e0; }
        .ok { background-color: #e8f5e8; }
        .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>系统健康检查报告</h1>
    <div class="summary">
        <h2>系统概要</h2>
        <p><strong>计算机名:</strong> $($report.System.ComputerName)</p>
        <p><strong>操作系统:</strong> $($report.System.OS)</p>
        <p><strong>运行时间:</strong> $($report.System.Uptime.Days) 天 $($report.System.Uptime.Hours) 小时</p>
        <p><strong>生成时间:</strong> $(Get-Date)</p>
    </div>

    <h2>磁盘空间状态</h2>
    <table>
        <tr><th>驱动器</th><th>标签</th><th>总大小(GB)</th><th>可用空间(GB)</th><th>可用百分比</th><th>状态</th></tr>
"@

    foreach ($disk in $report.Disks) {
        $class = switch ($disk.Status) {
            "Critical" { "critical" }
            "Warning" { "warning" }
            "OK" { "ok" }
        }
        $html += "<tr class='$class'><td>$($disk.Drive)</td><td>$($disk.Label)</td><td>$($disk.SizeGB)</td><td>$($disk.FreeGB)</td><td>$($disk.FreePercent)%</td><td>$($disk.Status)</td></tr>"
    }

    $html += @"
    </table>

    <h2>关键服务状态</h2>
    <table>
        <tr><th>服务名</th><th>状态</th><th>启动类型</th></tr>
"@

    foreach ($service in $report.Services) {
        $class = if ($service.Status -eq "Running") { "ok" } else { "warning" }
        $html += "<tr class='$class'><td>$($service.Name)</td><td>$($service.Status)</td><td>$($service.StartType)</td></tr>"
    }

    $html += @"
    </table>

    <h2>网络连接测试</h2>
    <table>
        <tr><th>主机</th><th>状态</th><th>响应时间(ms)</th></tr>
"@

    foreach ($test in $report.NetworkTests) {
        $class = if ($test.Status -eq "OK") { "ok" } else { "critical" }
        $html += "<tr class='$class'><td>$($test.Host)</td><td>$($test.Status)</td><td>$($test.ResponseTime)</td></tr>"
    }

    $html += @"
    </table>

    <h2>其他信息</h2>
    <p><strong>待安装更新:</strong> $($report.PendingUpdates)</p>
    <p><strong>最近系统错误:</strong> $($report.RecentErrors.Count) 个</p>
</body>
</html>
"@

    $html | Out-File -FilePath $OutputPath -Encoding UTF8
    Write-Host "健康检查完成！报告保存在: $OutputPath" -ForegroundColor Green

    # 打开报告
    Start-Process $OutputPath

    return $report
}

# 运行健康检查
Invoke-SystemHealthCheck
```

---

## ⚠️ 安全和最佳实践

### 脚本安全
```powershell
# 执行策略管理
Get-ExecutionPolicy
Get-ExecutionPolicy -List
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Set-ExecutionPolicy Bypass -Scope Process

# 脚本签名验证
Get-AuthenticodeSignature script.ps1
Set-AuthenticodeSignature script.ps1 -Certificate $cert

# 受限环境中运行
powershell.exe -ExecutionPolicy Bypass -File script.ps1
powershell.exe -Command "& {Get-Process}"
```

### 错误处理和日志
```powershell
# 错误处理
try {
    # 可能出错的代码
    Get-Item "C:\NonExistentFile.txt" -ErrorAction Stop
} catch {
    Write-Error "发生错误: $($_.Exception.Message)"
    Write-Host "详细错误: $($_.Exception)" -ForegroundColor Red
} finally {
    Write-Host "清理操作" -ForegroundColor Yellow
}

# 日志记录函数
function Write-Log {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message,

        [ValidateSet("INFO", "WARNING", "ERROR")]
        [string]$Level = "INFO",

        [string]$LogFile = "$env:TEMP\script.log"
    )

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"

    # 控制台输出
    switch ($Level) {
        "INFO" { Write-Host $logEntry -ForegroundColor Green }
        "WARNING" { Write-Host $logEntry -ForegroundColor Yellow }
        "ERROR" { Write-Host $logEntry -ForegroundColor Red }
    }

    # 文件输出
    Add-Content -Path $LogFile -Value $logEntry
}

# 使用日志
Write-Log "脚本开始执行"
Write-Log "发现警告情况" -Level "WARNING"
Write-Log "发生严重错误" -Level "ERROR"
```

---

## 📚 快速参考

### 常用CMD命令
```cmd
# 系统信息
systeminfo | findstr /C:"OS Name" /C:"System Type"
wmic cpu get name
wmic memorychip get capacity

# 文件操作
robocopy source dest /mir /r:3 /w:10
forfiles /p C:\logs /m *.log /d -7 /c "cmd /c del @path"
attrib +h filename.txt

# 网络
ipconfig /all | findstr "IPv4\|Default Gateway"
netstat -ano | findstr :80
ping -t google.com

# 进程和服务
tasklist /fi "memusage gt 100000"
sc config servicename start= auto
```

### 常用PowerShell Cmdlets
```powershell
# 对象操作
Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU -Descending
Get-ChildItem -Recurse | Where-Object Length -gt 1MB
Get-Service | Where-Object Status -eq "Stopped"

# 远程操作
Invoke-Command -ComputerName Server01 -ScriptBlock {Get-Process}
Enter-PSSession -ComputerName Server01
New-PSSession -ComputerName Server01,Server02

# 数据操作
Import-Csv data.csv | Where-Object Age -gt 30
Get-Process | Export-Csv processes.csv -NoTypeInformation
ConvertTo-Json $data | Out-File data.json
```

---

💡 **小贴士**: Windows命令行功能强大，但需要谨慎使用。建议在测试环境中验证脚本，生产环境中使用前务必备份重要数据。PowerShell的Get-Help命令是学习新功能的最佳途径。