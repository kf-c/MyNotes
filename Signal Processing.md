---
date: 2026-10-21
---
#正交调制
## Quadrature Sampling

假设天线接收到单音信号：
$$
r(t) = Acos(2\pi f_ct+\theta(t))
$$
其中 $\theta(t)  = 2\pi f_0t + \varphi$
对 $r(t)$做两路混频并滤波，得：
(频带信号 $\longrightarrow$基带信号，混频因子：$e^{2\pi f_ct}$，该过程在模拟域完成)
$$
I(t) = r(t)\cdot Real(e^{2\pi f_ct}) = Acos(\theta (t))\\
\Rightarrow z(t) = I(t) + jQ(t) = Ae^{j\theta (t)}
$$



