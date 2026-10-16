---
date: 2026-07-08
---
FreeRTOS最简源码：
```
F:\RTOS_PRACTICE\FreeRTOS
```
## 1.添加工程文件组
```
接下来我们在开发环境里面新建 FreeRTOS/src 和 FreeRTOS/port 两个组文件夹，其中 FreeRTOS/src 用于存放 src 文件夹的内容，FreeRTOS/port 用于存放 port\MemMang 文件夹 与 port\RVDS\ARM_CM？文件夹的内容，
添加user组---> FreeRTOSConfig.h

```

---
## 2.头文件指定
```
添加最简源码下的FreeRTOS\include和FreeRTOS\port\RVDS\ARM_CM？路径（compiler 5）
or 添加最简源码下的FreeRTOS\include和FreeRTOS\port\GCC\ARM_CM？路径（compiler 6）
```
## 3.文件修改

FreeRTOSConfig.h修改
-cubmx中禁用生成 `PendSV_Handler` ,`SysTick_Handler`,`SVC_Handler`生成
-什么
-东西







