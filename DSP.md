---
date: 2026-10-16
---
#DFT

## DFT

### 对时频域坐标的理解

#### 1. DFT 坐标映射

对连续时间信号 $x_c(t)$，其傅里叶变换（FT）为

$$
X_c(f) = \int_{-\infty}^{+\infty}x_c(t)e^{-j2\pi ft}\,dt
$$

对 $x_c(t)$ 抽样，令 $x[n] = x_c(nT_s)$，有

$$
x_p(t) = \sum_{n=0}^{N-1}x[n]\delta(t)\,dt
$$

对应

$$
X_p(f) = \sum_{n=0}^{N-1}x[n]e^{-j2\pi fnT_s}
$$

对比 DFT 定义: $X(k)=\sum_{n=0}^{N-1}x[n]e^{-j2\pi \frac{kn}{N}}$

可得 DFT 到实际频率的坐标映射为

$$
\color{orange} f_k = \frac{kf_s}{N}
$$

#### 2. 坐标符号规范

对实信号 $x(t)=\cos(\Omega t)=\cos(2\pi ft)$，以频率 $f_s$ 抽样，有序列

$$
x(n)=\cos\left(2\pi \frac{f}{f_s}n\right)=\cos(2\pi Fn)=\cos(\omega n)
$$

其中

| *物理量* | *信号自身的频率* | *DFT 第 $k$ 个频率点* |
| :---: | :-------: | :--------------: |
| 模拟频率  |    $f$    |      $f_k$       |
| 模拟角频率 | $\Omega$  |    $\Omega_k$    |
| 数字频率  |    $F$    |      $F_k$       |
| 数字角频率 | $\omega$  |    $\omega_k$    |

### DFT 逼近 FT

**1. 原理**

假设我们关注连续信号在时间区间 $[0,NT_s)$ 上的傅里叶积分：

$$
X_T(f)=\int_0^{NT_s}x_c(t)e^{-j2\pi ft}\,dt
$$

用间隔 $T_s$ 的左端点矩形求积公式近似这个积分：

$$
X_T(f)\approx T_s\sum_{n=0}^{N-1}x_c(nT_s)e^{-j2\pi f nT_s}
$$

代入刚才的 $f_k$：

$$
\begin{aligned}
X_T(f_k)
&\approx T_s\sum_{n=0}^{N-1}x[n]e^{-j2\pi f_knT_s}\\
&=T_s\sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}\\
&=T_sX[k]
\end{aligned}
$$

所以：

$$
\boxed{
X_T(f_k)\approx T_sX[k]
}
$$

**2. 步骤 & 评价**

| 步骤   | 潜在问题          | 解决方法                |
| ---- | ------------- | ------------------- |
| 时域抽样 | 频谱混叠（Nyquist） | LPF,  $f_s\uparrow$ |
| 时域截断 | 频谱泄露（频域卷积）    | 加长 / 优化截断窗          |
| 频域抽样 | 栅栏效应          | 采样序列末尾补零[^1]        |

[^1]: 采样序列末尾补零仅能增加 DFT 获得的频谱分辨率，并不能解决前期的频谱混叠等问题。

### 抽取 / 插值

**1. 抽取**

由 FS 伸缩变换性质，将采样率 $f_s$ 降低为 $1/D$，对应有

$$
X'(w) = \frac{1}{D}X\left(\frac{1}{D}w\right)
$$

即在频谱上横向拉伸为原来的 $D$ 倍，纵向放缩为原来的 $1/D$。

**2. 插值**