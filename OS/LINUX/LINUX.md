## 系统命令
其本身为独立的可执行程序，不依赖shell；


>[!note] nmcli device wifi --help
- ls --help | grep -i -- "-r"
```
 grep,过滤; -i,忽略大小写; --"text",过滤文本,其中--在linux表示参数结束
```
- nmcli device wifi --help
```
ARGUMENTS := connect <(B)SSID> [password <password>] [wep-key-type key|phrase] [ifname <ifname>][bssid <BSSID>] [name <name>] [private yes|no] [hidden yes|no]
```
[] 表示可选参数，<>必填参数；
### 主机命令
-  hostname -I
```
（历史遗留）显示主机所有ip，hostname表示显示主机名
ip addr （show wlanx）与之相同
```
-  uname -a
```
unix name  -all, show info of unix system
```
-  df -h
```
disk free -human-readable
```


## 文件系统

### 基础
- mkdir
```
mkdir test      # 当前目录下建 test 文件夹
mkdir -p dir1/dir2/dir3   # 一次性建三层,-parent ,创建父级
```
- touch
```
touch a.txt
//if a.txt does not exsist,create a new one,else update its changeing time.
```
- cp
```
cp a.txt /home/etc/b.txt
//copy a.txt to dir /home/etc,and rename it.
```

- mv
```
mv a.txt /home/b.txt
```
- rm
```
rm a.txt
rm -r tmp
```
- find
```
//to find files or dirs
find /home "*.txt"
```
### 检索
-  df -h
```
disk free -human-readable
```
- du -xh --max-depth=1 /root/.vscode-server 2>/dev/null | sort -h
```
disk usage -x(--one-file-system,即跳过挂载点) 
2>/dev/null (丢弃标准错误输出)
```
### vim
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   正常模式 (Normal Mode)  ←── 按 Esc 回到这里    │
│   ┌─────────────────────────────────────┐       │
│   │   • 浏览文件                        │       │
│   │   • 删除、复制、粘贴               │       │
│   │   • 移动光标（h j k l）            │       │
│   └─────────────────────────────────────┘       │
│            │ 按 i/a/o        │ 按 :             │
│            ▼                  ▼                 │
│   ┌──────────────┐  ┌──────────────┐          │
│   │  插入模式     │  │  命令行模式   │          │
│   │  (Insert)    │  │  (Command)   │          │
│   │  • 输入文字   │  │  • 保存 :w   │          │
│   │  • 编辑内容   │  │  • 退出 :q   │          │
│   │  按 Esc 退出  │  │  • 搜索 /    │          │
│   └──────────────┘  └──────────────┘          │
│                                                 │
└─────────────────────────────────────────────────┘
ZZ也是保存并退出（正常模式）
```
### 权限管理
角色：user,group,others
权限：read,write,execute（rwx和空,对应4，2，1，0）
```
root@linux:/home/tmp# ls -l t0.txt
-rw-r--r-- 1 root root 29 Aug 18 06:56 t0.txt
```

```
//解析如下：
位置： 1  2  3  4  5  6  7  8  9  10
字符： -  r  w  -  r  -  -  r  -  -
       │  │  │  │  │  │  │  │  │  │
       │  │  │  │  │  │  │  │  │  └─ r--,其他人权限 (Others)
       │  │  │  │  │  │  │  └─────── r--,所属组权限 (Group)
       │  │  │  │  └──────────────── rw-,所有者权限 (User)
       └────────────────────────────── 文件类型 (-=普通文件, d=目录, l=链接)
```
- 权限更改
chmod  ---change mode
```
chmod u+x script.sh      # 给脚本所有者加执行权限（使脚本可运行）
chmod g-w secret.txt     # 移除组用户的写入权限（保护文件不被组里人改）
chmod o-rwx private.txt  # 移除其他人的所有权限（完全不给看）
chmod a+r public.txt     # 给所有人加读取权限（公开文件）
# 精确设置：所有者全权限，组可读执行，其他人无权限
chmod u=rwx,g=rx,o= filename # 同chmod 750 filename
//管理员一般使用数字，方便
```


## 包管理
apt    ----  **A**dvanced **P**ackaging **T**ool 
```
apt list --installed, --upgradable
apt update
apt search tree
sudo apt install [-y] tree //有安装选项，自动yes
which tree       //查看命令包位置在哪里
sudo apt remove/purge tree //保存/删除软件本地配置

```
dpkg  ---Debian package 
```
dpkg -l, --list 
```
## 进程管理
- 查看进程

```
ps  --- process status
//显示当前终端会话的进程
```

```
top --- table of processes
htop ---advanced
root@linux:/home/tmp# top
#     当前时间  系统运行时间 登录用户   平均负载（1/5/15min）
top - 08:28:00 up  2:26,  0 users,  load average: 0.25, 0.07, 0.02
Tasks: 154 total,   1 running, 153 sleeping,   0 stopped,   0 zombie
%Cpu(s):  8.4 us,  3.0 sy,  0.0 ni, 87.7 id,  0.1 wa,  0.0 hi,  0.8 si,  0.0 st
MiB Mem :   1970.4 total,    186.9 free,    843.5 used,    940.1 buff/cache
# 交换，即虚拟内存
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   1097.6 avail Mem  

```

- 终止进程
```
 kill -9 <PID>     //-9，-SIGKILL,强制终止，-15，优雅终止（默认15）
 pkill -STOP <processname>  //-STOP/CON,即-19/18，暂停/恢复
```

## I2c
- i2cdetect
```
i2cdetect -y 2 //-yes,i2c-2
```
- i2cdump
```
print detailed register data
```
- template
```
int main()

{

    int fd;

    struct i2c_rdwr_ioctl_data data;

    //data config

    //...

    fd = open("/dev/i2c-2", O_RDWR);

    if(fd < 0)

    {

        perror("open");

        return -1;

    }

    ioctl(fd, I2C_RDWR, &data);

  

    close(fd);

    return 0;

}
```