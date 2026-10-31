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
X_s(\Omega)=\sum_{0}^{N-1}x[n]e^{-j\Omega nT_s} = X_d(e^{jw})
$$

由于计算机无法处理连续谱，因此仅能从 $X_d$ 中抽取有限谱线观察，有
$$
X(k) = X_d(e^{j\frac{2\pi k}{N}}) = \sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}
$$

>[!quote]+ $X_d\longrightarrow x_c$
> - 法一：
> $X_d$的一个周期对应的是$x_c(t)$的频谱（Ts倍纵向缩放），直接取单周期通过IFT恢复$x_c$，有(这里用w代替 $\Omega$ 积分，因而没有乘以系数Ts)
> $$
>  \widetilde x(t)=\frac1{2\pi}\int_{-\pi}^{\pi}
>  X_d(e^{j\omega})e^{j\omega t}\,d\omega,
>  \qquad t\in\mathbb R,
>  $$
> 代入得，
> $$
>  \widetilde x(\tau)=\sum_n x[n]\operatorname{sinc}(\tau-n),
>  \qquad
>  \operatorname{sinc}(u)=\frac{\sin(\pi u)}{\pi u}.
>  $$
>  上式即理想限带的内插公式，这里的 $\tau$ 为归一化时间，$\tau = t/T_s$
>  - 法二：
>  在频域上只取 $X_d$ 单周期，即乘以H(jw),对应在时域上卷积h(t）即得到x_c,结果同上，有
>  $$
>  h(\tau) = sinc(\tau) 
>  $$
>  
>  

>[!quote]+
>1.时域和频域的统一性
>时域和频域是信号的一体两面，二者均包含信号的全部必要信息，换言之，在一个域的改变必然提现到另一个域。
> 2.由 
> $$
> X_s \approx \dfrac{1}{T_s}\sum_{m=0}^{N1}X_c(\Omega+m\Omega_s),
> X_c(f_k) \approx T_sX(k)
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

#### 1. 抽取
$$
y(m) = x(Mn)\\\\

Y(\omega)
=\sum_{r=0}^{M-1}G(\omega-2\pi r)
=\frac1M\sum_{r=0}^{M-1}
X\left(\frac{\omega-2\pi r}{M}\right)

$$

$$
x[n]\ \xrightarrow{\text{限制带宽至 }|\omega|<\pi/M}
v[n]\ \xrightarrow{\text{每 }M\text{ 点取一个}}
y[m].
$$

>取出一个周期 → 横向拉伸 $M$ 倍、纵向乘 $1/M$ → 每隔 $2\pi$ 复制并相加。

#### 2. 插值

定义

$$
u[m]=
\begin{cases}
x[n],&m=Ln,\\
0,&\text{其他位置}.
\end{cases}
$$
有

$$
\begin{aligned}
U(e^{j\omega})
&=\sum_m u[m]e^{-j\omega m}\\
&=\sum_n x[n]e^{-j\omega Ln}\\
&=X(e^{jL\omega}).
\end{aligned}
$$
完整的 $L$ 倍插值，还要对插零结果进行低通滤波。

设

$$
y[m]=u[m]*h[m],
$$

则

$$
Y(e^{j\omega})
=H(e^{j\omega})U(e^{j\omega})
=H(e^{j\omega})X(e^{jL\omega}).
$$

理想插值滤波器在主周期内为

$$
H(e^{j\omega})=
\begin{cases}
L,&|\omega|<\pi/L,\\
0,&\pi/L<|\omega|\le\pi.
\end{cases}
$$

所以最终：

$$
\boxed{
Y(e^{j\omega})=
\begin{cases}
L\,X(e^{jL\omega}),&|\omega|<\pi/L,\\
0,&\pi/L<|\omega|\le\pi.
\end{cases}
}
$$

再以 $2\pi$ 为周期延拓。

也就是说：

1. 插零使原频谱压缩到原来的 $1/L$，同时产生镜像；
2. 低通滤波只保留中央的一份；
3. 通带增益 $L$ 保证插值后的样本幅度正确。

这个滤波器正好对应上一条中的 sinc。通过逆 DTFT：

$$
\begin{aligned}
h[m]
&=\frac{1}{2\pi}
\int_{-\pi/L}^{\pi/L}L e^{j\omega m}\,d\omega\\
&=\operatorname{sinc}\left(\frac{m}{L}\right).
\end{aligned}
$$

|操作|时域|DTFT 关系|
|---|---|---|
|$M$ 倍直接抽取|$y[m]=x[Mm]$|$\displaystyle Y(e^{j\omega})=\frac1M\sum_{r=0}^{M-1}X(e^{j(\omega-2\pi r)/M})$|
|$L$ 倍插零|$u[Ln]=x[n]$，其他为零|$\displaystyle U(e^{j\omega})=X(e^{jL\omega})$|
|$L$ 倍完整插值|$y=u*h$|$\displaystyle Y(e^{j\omega})=H(e^{j\omega})X(e^{jL\omega})$|
