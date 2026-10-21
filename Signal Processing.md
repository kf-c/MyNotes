---
date: 2026-10-21
---
#正交调制
## Quadrature Sampling

![[Pasted image 20261021164424.png|576]]

假设天线接收到单音信号：
$$
r(t) = Acos(2\pi f_ct+\theta(t))
$$
其中 $\theta(t)  = 2\pi f_0t + \varphi$
对 $r(t)$做两路混频并滤波（下变频），得：
(频带信号 $\longrightarrow$基带信号，混频因子：$e^{2\pi f_ct}$，该过程在模拟域完成)
$$
 {z(t)=2\operatorname{LPF}\left\{r(t)e^{-j2\pi f_ct}\right\}} 
$$
此时，相比于 $\theta(t)$, $z(t)$在频域上镜像负频率被抵消，对之后再对 $z(t)$采样则避免了由于正负频率混叠导致的频谱混叠（另一种情况是采样率不足导致的正频率的混叠)。
