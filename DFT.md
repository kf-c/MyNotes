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
>由 $x_s(t) = x(t)p(t)$，在频域上X_s(f)为X_c(f)的fs周期延拓
> $NT_s$ 的时间窗，对应在频域卷积，导致频谱泄露，这发生在DTFT过程之前。

$$
X_s(f)=\sum_{-\infty}^{+\infty}x[n]e^{-j2\pi fnT_s} = X_d(wf_s)
$$
实际过程中，取有限N点采样，即对 $x_s(t)$ 乘以时间窗 $rect(\dfrac{t}{\tau})$，对应上式卷积RECT(f),
用间隔 $T_s$ 的左端点矩形求积公式近似这个积分：
>近似影响：~~
$$
X_T(f)\approx T_s\sum_{n=0}^{N-1}x_c(nT_s)e^{-j2\pi f nT_s}
$$

>由数字角频率 $\omega = 2\pi fT_s$ ,有 $X_T(f)\approx T_s\sum_{n=0}^{N-1}x_c(nT_s)e^{-j2\pi \omega n}$ , 即DTFT格式

代入  $f_k = k\frac{f_s}{N}$:
$$
\begin{aligned}
X_T(f_k)
&\approx T_s\sum_{n=0}^{N-1}x[n]e^{-j2\pi f_knT_s}\\
&=T_s\sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}\\
&=T_sX[k]
\end{aligned}
$$
>- X[k]即x[n]的N点DFT，显然DFT只是从DTFT结果中选取特定样值
>- 频域上从N点DTFT抽取N‘个正交量组成DFT，对应地时域上x[n]以N’为周期延拓，所以有N'>=N;


所以：

$$
\boxed{
X_T(f_k)\approx T_sX[k]
} \tag{2}
$$
即连续时间信号的傅里叶变换可以近似地用其DFT来表示。
>对于 $X[k]$，其周期为N，实际上也是DFS序列

>[!tip]-  时域和频域的统一性
>时域和频域是信号的一体两面，二者均包含信号的全部必要信息，换言之，在一个域的改变必然提现到另一个域。

>[!tip]- 对频谱泄露的理解
>为了避开正弦的正、负频率，把信号写成复指数：
>$$
> x(t)=Ae^{j2\pi f_0t}.
> $$
>在有限区间 $[0,T)$ 内，拿频率 $f$ 的复指数与它做内积，得到
>$$
> \begin{aligned}
> X_T(f)
> &=\int_0^T Ae^{j2\pi f_0t}e^{-j2\pi ft}\,dt\\
> &=AT\,e^{j\pi(f_0-f)T}
> \operatorname{sinc}\big((f_0-f)T\big),
> \end{aligned}
> $$
> 当 $T \to \infty$时，有
> $$
> |X_T(f)| = A\delta(f-f_0)
> $$

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