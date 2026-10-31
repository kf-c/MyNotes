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
\color{orange} f_k = \frac{kf_s}{N} \tag{1}
$$

#### 2. 坐标符号规范

对实信号 $x(t)=\cos(\Omega t)=\cos(2\pi ft)$，以频率 $f_s$ 抽样，有序列

$$
x[n]=\cos\left(2\pi \frac{f}{f_s}n\right)=\cos(2\pi Fn)=\cos(\omega n)
$$
对应DFT为
$$
X(k) = \sum_{n=0}^{N-1}x[n]e^{-j\omega_k n}
$$

其中$\color{red} \circlearrowleft$

| *物理量* | *信号自身的频率* | *DFT 第 $k$ 个频率点* |
| :---: | :-------: | :--------------: |
| 模拟频率  |    $f$    |      $f_k$       |
| 模拟角频率 | $\Omega$  |    $\Omega_k$    |
| 数字频率  |    $F$    |      $F_k$       |
| 数字角频率 | $\omega$  |    $\omega_k$    |
即对模拟信号抽样得数字序列，对序列做DFT,可由DFT映射回模拟信号的频谱。

### 信号重构

**1. 过程**

设接收端收到连续信号 $x_c(t)$,其频谱为0~fs/2, 以频率fs无穷采样，设 $x[n] = x_c(nT_s)$，有
>由 $x_S(t) = x_c(t)p(t)$，在频域上X_S(f)为X_c(f)的fs周期延拓

$$
X_S(\Omega)=\sum_{-\infty}^{+\infty}x[n]e^{-j\Omega nT_s} = X_D(e^{jw})
$$
>这里  $w \longrightarrow \Omega T_s$

实际过程中，取有限N点采样，即对 $x_s(t)$ 乘以时间窗 $rect(\dfrac{t}{\tau})$，对应在频域上，即上式卷积 $RECT(\Omega)$，有
$$
X_S(\Omega)=\sum_{0}^{N-1}x[n]e^{-j\Omega nT_s} = X_D(e^{jw})
$$

由于计算机无法处理连续谱，因此仅能从 $X_d$ 中抽取有限谱线观察，有
$$
X(k) = X_d(e^{j\frac{2\pi k}{N}}) = \sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}
$$
这里仅观察X_d的一个周期，对应在时域上由离散谱x_s变为连续谱x_c，抵消了抽样过程;
其次的N点抽取对应在时域上x[n]以N为周期延拓。
>这里的抽取点数不小于采样点数均可

>[!tip]+
>1.时域和频域的统一性
>时域和频域是信号的一体两面，二者均包含信号的全部必要信息，换言之，在一个域的改变必然提现到另一个域。
2.由 
$$
X_s \approx \dfrac{1}{T_s}\sum_{m=0}^{N1}X_c(\Omega+m\Omega_s),
X_c(f_k) \approx T_sX(k)
$$










**2.总结

DFT逼近的FT有且仅有一下缺点：

| 步骤   | 潜在问题          | 解决方法                |
| ---- | ------------- | ------------------- |
| 时域抽样 | 频谱混叠（Nyquist） | LPF,  $f_s\uparrow$ |
| 时域截断 | 频谱泄露（频域卷积）    | 加长 / 优化截断窗          |
| 频域抽样 | 栅栏效应          | 采样序列末尾补零[^1]        |

[^1]: 采样序列末尾补零仅能增加 DFT 获得的频谱分辨率，并不能解决前期的频谱混叠等问题。

### 抽取 / 插值

**1. 抽取**

由(2)

$$
X_T(w) = \frac{1}{D}X\left(\frac{1}{D}w\right)
$$

即在频谱上横向拉伸为原来的 $D$ 倍，纵向放缩为原来的 $1/D$。

**2. 插值**

*?*