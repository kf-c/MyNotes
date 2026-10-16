---
date: 2026-10-16
---
对实信号$x(t) = cos(\Omega t) = cos(2\pi ft)$,以频率fs抽样，有序列

$$x(n) = cos(2\pi \frac{f}{f_s}n) = cos(2\pi Fn) = cos(\omega n)$$ 
其中

| 物理量   | 信号自身的频率                        | DFT 第 \(k\) 个频率点                  |
| ----- | ------------------------------ | --------------------------------- |
| 模拟频率  | \(f\)                          | \(f_k=\dfrac{kf_s}{N}\)           |
| 模拟角频率 | \(\Omega=2\pi f\)              | \(\Omega_k=\dfrac{2\pi kf_s}{N}\) |
| 数字频率  | \(F=\dfrac{f}{f_s}\)           | \(F_k=\dfrac{k}{N}\)              |
| 数字角频率 | \(\omega=\dfrac{2\pi f}{f_s}\) | \(\omega_k=\dfrac{2\pi k}{N}\)    |



