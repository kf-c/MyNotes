---
date: 2026-10-16
---
### DFT坐标映射

对连续时间信号$x_c(t)$,其傅里叶变换（FT）为
$$
X_c(f) = \int_{-\infty}^{+\infty}x_c(t)e^{-j2\pi ft}\,dt
$$
对$x_c(t)$抽样，令$x[n] = x_c(nT_s)$,有
$$
x_p(t) = \sum_{n=0}^{N-1}x[n]\delta (t)\,dt
$$
对应
$$
X_p(f) =  \sum_{n=0}^{N-1}x[n]e^{-j2\pi fnT_S}
$$
对比DFT定义：$X(k) =  \sum_{n=0}^{N-1}x[n]e^{-j2\pi \frac{kn}{N}}$
可得DFT到实际频率的坐标映射为
 $$
 \color{orange} f_k = \frac{kf_s}{N}
 $$
### DFT频率坐标的理解

对实信号$x(t) = cos(\Omega t) = cos(2\pi ft)$,以频率fs抽样，有序列
$$
x(n) = cos(2\pi \frac{f}{f_s}n) = cos(2\pi Fn) = cos(\omega n)
$$其中

| *物理量* | *信号自身的频率* | *DFT 第 \(k\) 个频率点* |
| ----- | --------- | ------------------ |
| 模拟频率  | f         | $f_k$              |
| 模拟角频率 | $\Omega$  | $\Omega_k$         |
| 数字频率  | $F$       | $F_k$              |
| 数字角频率 | $\omega$  | $\omega_k$         |

### DFT逼近FT

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

### 抽取/插值

**1.抽取**
由FS伸缩变换性质，将采样率$f_s$降低为1/D,对应有
$$
X'(w) = \frac{1}{D}X(\frac{1}{D}w)
$$
即在频谱上横向拉伸为原来的D倍，纵向放缩为原来的1/D.

**2.插值**




