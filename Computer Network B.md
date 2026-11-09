---
date: 2026-10-18
---
#P74
注意：
1、点对点协议和共享信道协议不只是书本上的PPP和802.3这两种
2、链路层及以上的相关协议设计重点要掌握设计思想和要解决的问题
## 数据链路层
#### 功能

链路管理、帧定界、流量控制、差错控制、分割数据和控制信息、寻址
#### 信道

1.点对点信道
（1）封装成帧
（2）透明传输
（3）差错控制
	帧检验序列（冗余码仅能做到无差错接受，而非可靠传输（有可能根本没传过来））


2.共享信道


#### 媒体共享技术（p84）

-  静态划分信道(确定复用) 
	-  频分复用（波分复用） 
	-  时分复用 
	- 码分复用 
- 动态媒体接入控制（统计复用） 
	-  随机接入，[[CSMA|如CSMA/CD CSMA/CA]]
	-  受控接入 ，如多点线路探询(polling)， 或轮询。



## 网络层

### 简单的传输网络

ARP：IP地址到MAC地址的映射构建
DNS：域名到IP的解析映射
ICMP: ip层用于检测网络问题


![[network.drawio]]

|位置|源 MAC|目的 MAC|源 IP|目的 IP|TTL|
|---|---|---|---|---|---|
|A → S1 → R1|MAC-A|MAC-R1L|192.168.1.10|192.168.2.20|64|
|R1 → R2|MAC-R1R|MAC-R2L|192.168.1.10|192.168.2.20|63|
|R2 → B|MAC-R2R|MAC-B|192.168.1.10|192.168.2.20|62|
交换机本身不会重新封装以太网帧，只是分岔口的重定向，另外有FCS校验等功能；

![[network establishment.drawio|100]]
>[!quote]- 网卡
>#### 适配器（网卡Network Interface Card）
>功能：
>- 进行串行/并行转换。 
>-  对数据进行缓存。
>-  在计算机的操作系统安装设备驱动程序。
>-  实现以太网协议
>![[Pasted image 20261019102050.png|463]]

>[!quote]- 以太网交换机
>| 比较        | 集线器 Hub      | 网桥 Bridge       |
| --------- | ------------ | --------------- |
| OSI 层次    | 物理层          | 数据链路层           |
| 处理对象      | 电信号或物理层信号    | 以太网帧            |
| 识别 MAC 地址 | 否            | 是               |
| 转发方式      | 通常复制到其他端口    | 根据 MAC 地址表选择性转发 |
| 碰撞域       | 所有端口属于同一个碰撞域 | 不同网段的碰撞域可以分开    |
| 隔离广播      | 否            | 通常不隔离同一二层网络的广播  |
交换式集线器（常称为**以太网交换机**，本质为多接口网桥）
>- 全双工、无碰撞

>[!quote]-  家用路由器
>家用路由器一般集成了多种功能：
>- WIFI AP
>- IP路由 & NAT
>- DHCP
>- 二层以太网交换机

>[!quote]- 主机如何加入网络
>主机A连接到路由器R的WIFI后，R获得MAC_A并通过DHCP(Dynamic Host Configuation Protocol)协议为A动态分配IP_A，并提供自身的IP_R。然后A通过ARP广播获MAC_A.


### 
因特网路由选择协议：

一、内部网关协议（IGP）
- RIP(Routing Information Protocol)
	- 基于距离定义的路由选择（即跳数多少）
	- 路由器仅与相邻路由器交换路由表，依次更新，形成全部路由信息，
- OSPF（Open Shortest Path First）
	- ![281](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system-body%2C%20ui-sans-serif%2C%20-apple-system%2C%20system-ui%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20Helvetica%2C%20%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%20Arial%2C%20sans-serif%2C%20%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%20%26quot%3BSegoe%20UI%20Symbol%26quot%3B%22%20font-weight%3D%22400%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(13%2C%2013%2C%2013\)%22%20viewBox%3D%220%200%20344%20282%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%2282%22%20y%3D%226%22%20width%3D%22180%22%20height%3D%22100%22%20rx%3D%2212%22%20fill%3D%22%230D9488%22%20fill-opacity%3D%22.08%22%20stroke%3D%22%230D9488%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%22172%22%20y%3D%2223%22%20font-size%3D%2212%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%20fill%3D%22%230D9488%22%3EArea%200%EF%BC%88%E9%AA%A8%E5%B9%B2%E5%8C%BA%E5%9F%9F%EF%BC%89%3C%2Ftext%3E%3Cg%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.5%22%20stroke-width%3D%221.6%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M130%2059%20H214%22%2F%3E%3Cpath%20d%3D%22M130%2059%20L105%20119%20M214%2059%20L239%20119%22%2F%3E%3Cpath%20d%3D%22M105%20149%20V185%20M239%20149%20V185%22%2F%3E%3C%2Fg%3E%3Crect%20x%3D%22111%22%20y%3D%2242%22%20width%3D%2238%22%20height%3D%2234%22%20rx%3D%227%22%20fill%3D%22%230D9488%22%20stroke%3D%22%230D9488%22%2F%3E%3Cpath%20d%3D%22M119%2059%20h22%20m-7%20-5%207%205%20-7%205%20m-7%20-10%20-7%205%207%205%22%20stroke%3D%22white%22%20stroke-width%3D%221.3%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Crect%20x%3D%22195%22%20y%3D%2242%22%20width%3D%2238%22%20height%3D%2234%22%20rx%3D%227%22%20fill%3D%22%230D9488%22%20stroke%3D%22%230D9488%22%2F%3E%3Cpath%20d%3D%22M203%2059%20h22%20m-7%20-5%207%205%20-7%205%20m-7%20-10%20-7%205%207%205%22%20stroke%3D%22white%22%20stroke-width%3D%221.3%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%22108%22%20width%3D%22161%22%20height%3D%22166%22%20rx%3D%2212%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.08%22%20stroke%3D%22%2394A3B8%22%20stroke-dasharray%3D%225%204%22%2F%3E%3Crect%20x%3D%22177%22%20y%3D%22108%22%20width%3D%22161%22%20height%3D%22166%22%20rx%3D%2212%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.08%22%20stroke%3D%22%2394A3B8%22%20stroke-dasharray%3D%225%204%22%2F%3E%3Cg%20fill%3D%22currentColor%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20font-weight%3D%22600%22%3E%3Ctext%20x%3D%2286%22%20y%3D%22252%22%3EArea%201%3C%2Ftext%3E%3Ctext%20x%3D%22258%22%20y%3D%22252%22%3EArea%202%3C%2Ftext%3E%3C%2Fg%3E%3Crect%20x%3D%2280%22%20y%3D%22115%22%20width%3D%2250%22%20height%3D%2230%22%20rx%3D%227%22%20fill%3D%22%23D97706%22%20fill-opacity%3D%22.15%22%20stroke%3D%22%23D97706%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%22105%22%20y%3D%22134%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22600%22%20fill%3D%22%23D97706%22%3EABR%3C%2Ftext%3E%3Ccircle%20cx%3D%22105%22%20cy%3D%22201%22%20r%3D%2216%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.18%22%20stroke%3D%22%2364748b%22%2F%3E%3Ccircle%20cx%3D%2268%22%20cy%3D%22224%22%20r%3D%2213%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.18%22%20stroke%3D%22%2364748b%22%2F%3E%3Cpath%20d%3D%22M105%20217%20L68%20224%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.5%22%2F%3E%3Ctext%20x%3D%22105%22%20y%3D%22205%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3ER%3C%2Ftext%3E%3Ctext%20x%3D%2268%22%20y%3D%22228%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3ER%3C%2Ftext%3E%3Crect%20x%3D%22214%22%20y%3D%22115%22%20width%3D%2250%22%20height%3D%2230%22%20rx%3D%227%22%20fill%3D%22%23D97706%22%20fill-opacity%3D%22.15%22%20stroke%3D%22%23D97706%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%22239%22%20y%3D%22134%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20font-weight%3D%22600%22%20fill%3D%22%23D97706%22%3EABR%3C%2Ftext%3E%3Ccircle%20cx%3D%22239%22%20cy%3D%22201%22%20r%3D%2216%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.18%22%20stroke%3D%22%2364748b%22%2F%3E%3Ccircle%20cx%3D%22276%22%20cy%3D%22224%22%20r%3D%2213%22%20fill%3D%22%2364748b%22%20fill-opacity%3D%22.18%22%20stroke%3D%22%2364748b%22%2F%3E%3Cpath%20d%3D%22M239%20217%20L276%20224%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%22.5%22%2F%3E%3Ctext%20x%3D%22239%22%20y%3D%22205%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3ER%3C%2Ftext%3E%3Ctext%20x%3D%22276%22%20y%3D%22228%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20fill%3D%22currentColor%22%3ER%3C%2Ftext%3E%3Ctext%20x%3D%22172%22%20y%3D%2293%22%20text-anchor%3D%22middle%22%20fill%3D%22%230D9488%22%20font-size%3D%2210%22%3E%E8%BF%9E%E6%8E%A5%E5%90%84%E9%9D%9E%E9%AA%A8%E5%B9%B2%E5%8C%BA%E5%9F%9F%3C%2Ftext%3E%3C%2Fsvg%3E)
	- ABR（区域边界路由器）：负责连接不同区域、传递跨区域路由信息。
    
	- DR/BDR（指定路由器/备份指定路由器）：负责优化同一个多路访问网络中的链路状态信息交换（一个以太网段可以连接多个路由器，但主机只有一个网关）
		- 特点：area内路由器分别组播链路状态信息（LSA），泛洪传播后形成链路数据库，各路由器本地计算出最优的下一跳路由表；area内及时响应变化，
	
外部网关协议(OGP)
- eBGP



IPv6：
不同于IPv4，分片在源端进行；

IPv6 首部：（40Bit）
	流标号：
	有效载荷长度：16bit（64KB）
	源地址、目的地址（128bit）
IPv6寻址：
- 单播
- 组播
- 任播（根据路由协议，最优化多选一）

IP多播/组播（v4，v6）（multicast）
- 目的：一对多通信；


