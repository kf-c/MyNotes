## 模拟频带传输

卡森公式的数字/模拟形式，信息量，香农。
数字/模拟域上的有效性/可靠性
抗噪声/适应性（fsk，2d，2p，2f）
3DB带宽，90功率带宽

系统指标：
射频带宽（有效性）、SNR（可靠性）
### 总览
- 性能：
![[database/IMAGE/Pasted image 20261114201829.png|508]]
- 应用：
![[database/IMAGE/Pasted image 20261114201900.png|506]]
### AM信号
#### 一、DSB-SC
（Double Sideband Suppressed Carrier，双边带抑制载波调制）
$$
s(t)=m(t)\cos\omega_ct
$$
解调：相干法
#### 二、AM（DSB-LC ）

$$
s(t) = [A_c+m(t)]\cos\omega_ct
$$
解调：非相干/相干法
#### 三、SSB
原理：由于是信号的共轭对称性，实际上只需要传递单个边带即包含全部信息。
实现：
1.滤波器法
将基带信号先混频到中频信号，可以增大过渡带的归一化值，便于滤波器设计。
![[database/drawio/SSB.drawio|SSB]]
2.移相法
带宽占用仅为AM，DSB一半，但须相干解调，实现较复杂。
![[database/drawio/SSB2.drawio|SSB2]]

#### 四、VSB

Vestigial Sideband，残留边带调制。

对 $m(t)=\cos\Omega t$，DSB 信号为：

$$
s_{\mathrm{DSB}}(t)
=\frac12\cos[(\Omega+\omega_c)t]
+\frac12\cos[(\Omega-\omega_c)t].
$$

先忽略滤波器的相位影响，记它对这两个频率的幅度增益分别为：

$$
h_U=H(\Omega+\omega_c),\qquad
h_L=H(\Omega-\omega_c).
$$

滤波后：

$$
s_{\mathrm{VSB}}(t)
=\frac{h_U}{2}\cos[(\Omega+\omega_c)t]
+\frac{h_L}{2}\cos[(\Omega-\omega_c)t].
$$

接收端用 $2\cos\omega_ct$ 相干解调，再滤除高频项，得到：

$$
y(t)=\frac{h_U+h_L}{2}\cos\Omega t.
$$

由此可得，滤波器应满足：

$$
H(\omega+\omega_c)+H(\omega-\omega_c)=C.
$$

![[database/IMAGE/Pasted image 20261110105645.png|529]]

---
### 角调信号

对
$$
\begin{aligned}
&s_m(t) = cos(w_ct+\varphi(t))\\\\
&PM:\varphi(t) = K_pm(t)\\
&FM:\varphi(t) = K_f\int m(t)\,dt
\end{aligned}
$$
下对FM信号进行分析：
若有
$$
|K_f\int m(t)\,dt|_{max} << \pi/6
$$
则称为窄带调频（NBFM），否则称为宽带调频（WBFM）。
对单音信号，
$$
\varphi(t) = K_f\int A_mcos(w_mt)\,dt = \dfrac{K_fA_m}{w_m}sin(w_mt)
$$
定义调频指数
$$
\color{orange}
m_f = \dfrac{\Delta f}{f_m} = \dfrac{K_fA_m}{f_m}
$$
其中 $\Delta f$ 表示 $\varphi(t)$ 的最大频偏，fm表示最大频率；
类似得，有
$$
m_p = K_pA_m
$$
则有调频信号带宽
$$
\begin{aligned}
&B_{FM} = 2(m_f+1)f_m = 2(\Delta f + f_m)\\\\
&NBFM:m_f<<1,B\approx 2f_m\\
&WBFM:m_f>>1,B\approx 2\Delta f
\end{aligned}
$$
调制的载波功率不变，只是重新分配。

对NBFM，有
$$
S_{NBFM}\approx cos(w_ct) -sin(\varphi(t))sin(w_ct)
$$
FM特点：抗噪能力强、带宽占用大
![[database/IMAGE/Pasted image 20261114175146.png|513]]
>窄带 FM 与 AM 的频谱外形相似，但FM下边带为负，不能当成普通AM包络检波；

**调制：**
直接法：
![[database/IMAGE/Pasted image 20261114191924.png]]
间接法：
![[database/IMAGE/Pasted image 20261114191720.png]]
**解调：**
- 相干解调（仅NBFM）：
![[database/IMAGE/Pasted image 20261114191507.png|478]]
- 非相干解调：
![[database/IMAGE/Pasted image 20261114191420.png|479]]
## 9.数字基带信号

### 一、数字信号的特点：
- 便于再生；便于差错控制、存储、处理和复用；
- 数字化的量化误差、带宽占用、需要同步和较复杂的处理；低信噪比下可能的明显性能恶化。
### 二、信息的度量：
事件 $x_i$ 的自信息定义为
$$
I(x_i)=-\log_2p_i=\log_2\frac1{p_i}
$$

自信息描述某一次结果带来的信息；**熵描述一个信源每次输出平均带来多少信息**。
对于具有 $M$ 个可能输出的离散信源，定义熵
$$

H(X)=\sum_{i=1}^{M}p_iI(x_i)
=-\sum_{i=1}^{M}p_i\log_2p_i.
$$
条件转移概率：P(A|B),即已知发射B，接收到为A的概率。
### 系统指标

有效性：
$$
码元速率R_B,\ 比特率R_b,\ 频带利用率\eta
$$
其中 $R_b =R_B\log_{2}{M},\ \eta = R_B/B$
可靠性：
![[database/IMAGE/Pasted image 20261115170720.png|400]]

### 三、数字编码
1.选码原则：
- 无直流分量；
- 含有0丰富时钟信息；（用于解码）
- 高频份量小；
- 有自检能力；
- 简单；

2.常见编码：（基带传输码）
- AMI码：将原始码中的1依次编码为+1、-1、+1、-1……
	- HDB3码：先画AMI；每个连续的“0000”替换为“000V“，破坏序列V的正负与前面邻近的非零序列相同（1、==🔴B==、V）；若两个V之间含有偶数个非零脉冲，则将”000V“替换为”B00V“，调节脉冲B的极性与最近的非零脉冲相反。
-  曼彻斯特编码（带宽比原信号大一倍，因为功率谱第一归零点变为原来的二倍）
  
![607](data:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system-body%2C%20ui-sans-serif%2C%20-apple-system%2C%20system-ui%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20Helvetica%2C%20%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%20Arial%2C%20sans-serif%2C%20%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%20%26quot%3BSegoe%20UI%20Symbol%26quot%3B%22%20font-weight%3D%22400%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(13%2C%2013%2C%2013\)%22%20viewBox%3D%220%200%20900%20420%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cline%20x1%3D%22114%22%20y1%3D%2235%22%20x2%3D%22114%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22153%22%20y1%3D%2235%22%20x2%3D%22153%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22192%22%20y1%3D%2235%22%20x2%3D%22192%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22231%22%20y1%3D%2235%22%20x2%3D%22231%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22270%22%20y1%3D%2235%22%20x2%3D%22270%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22309%22%20y1%3D%2235%22%20x2%3D%22309%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22348%22%20y1%3D%2235%22%20x2%3D%22348%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22387%22%20y1%3D%2235%22%20x2%3D%22387%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22426%22%20y1%3D%2235%22%20x2%3D%22426%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22465%22%20y1%3D%2235%22%20x2%3D%22465%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22504%22%20y1%3D%2235%22%20x2%3D%22504%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22543%22%20y1%3D%2235%22%20x2%3D%22543%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22582%22%20y1%3D%2235%22%20x2%3D%22582%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22621%22%20y1%3D%2235%22%20x2%3D%22621%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22660%22%20y1%3D%2235%22%20x2%3D%22660%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22699%22%20y1%3D%2235%22%20x2%3D%22699%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22738%22%20y1%3D%2235%22%20x2%3D%22738%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22777%22%20y1%3D%2235%22%20x2%3D%22777%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22816%22%20y1%3D%2235%22%20x2%3D%22816%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Cline%20x1%3D%22855%22%20y1%3D%2235%22%20x2%3D%22855%22%20y2%3D%22397%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.16%22%20stroke-dasharray%3D%223%204%22%2F%3E%3Ctext%20x%3D%2214%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2214%22%20font-weight%3D%22600%22%3E%E5%8E%9F%E5%A7%8B%E7%A0%81%3C%2Ftext%3E%3Ctext%20x%3D%22133.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E1%3C%2Ftext%3E%3Ctext%20x%3D%22172.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22211.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22250.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22289.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22328.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E1%3C%2Ftext%3E%3Ctext%20x%3D%22367.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E1%3C%2Ftext%3E%3Ctext%20x%3D%22406.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22445.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22484.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22523.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22562.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22601.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22640.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22679.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22718.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E1%3C%2Ftext%3E%3Ctext%20x%3D%22757.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22796.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E1%3C%2Ftext%3E%3Ctext%20x%3D%22835.5%22%20y%3D%2225%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E0%3C%2Ftext%3E%3Cg%3E%3Cline%20x1%3D%22114%22%20y1%3D%22105%22%20x2%3D%22855%22%20y2%3D%22105%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.4%22%20stroke-dasharray%3D%225%204%22%2F%3E%3Ctext%20x%3D%225%22%20y%3D%22110%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%3EAMI%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%2284%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%2BA%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22109%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22134%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%E2%88%92A%3C%2Ftext%3E%3C%2Fg%3E%3Cg%3E%3Cline%20x1%3D%22114%22%20y1%3D%22232%22%20x2%3D%22855%22%20y2%3D%22232%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.4%22%20stroke-dasharray%3D%225%204%22%2F%3E%3Ctext%20x%3D%225%22%20y%3D%22237%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%3EHDB%E2%82%83%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22211%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%2BA%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22236%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22261%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%E2%88%92A%3C%2Ftext%3E%3C%2Fg%3E%3Cg%3E%3Cline%20x1%3D%22114%22%20y1%3D%22360%22%20x2%3D%22855%22%20y2%3D%22360%22%20stroke%3D%22currentColor%22%20stroke-opacity%3D%220.4%22%20stroke-dasharray%3D%225%204%22%2F%3E%3Ctext%20x%3D%225%22%20y%3D%22365%22%20fill%3D%22currentColor%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%3EManchester%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22339%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%2BA%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22364%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E0%3C%2Ftext%3E%3Ctext%20x%3D%22103%22%20y%3D%22389%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%20text-anchor%3D%22end%22%3E%E2%88%92A%3C%2Ftext%3E%3C%2Fg%3E%3Cpath%20d%3D%22M%20114%20105%20L%20114%2080%20L%20153%2080%20L%20153%20105%20L%20192%20105%20L%20192%20105%20L%20231%20105%20L%20231%20105%20L%20270%20105%20L%20270%20105%20L%20309%20105%20L%20309%20130%20L%20348%20130%20L%20348%2080%20L%20387%2080%20L%20387%20105%20L%20426%20105%20L%20426%20105%20L%20465%20105%20L%20465%20105%20L%20504%20105%20L%20504%20105%20L%20543%20105%20L%20543%20105%20L%20582%20105%20L%20582%20105%20L%20621%20105%20L%20621%20105%20L%20660%20105%20L%20660%20105%20L%20699%20105%20L%20699%20130%20L%20738%20130%20L%20738%20105%20L%20777%20105%20L%20777%2080%20L%20816%2080%20L%20816%20105%20L%20855%20105%20L%20855%20105%22%20stroke%3D%22%233689db%22%20stroke-width%3D%223.2%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M%20114%20232%20L%20114%20207%20L%20153%20207%20L%20153%20232%20L%20192%20232%20L%20192%20232%20L%20231%20232%20L%20231%20232%20L%20270%20232%20L%20270%20207%20L%20309%20207%20L%20309%20257%20L%20348%20257%20L%20348%20207%20L%20387%20207%20L%20387%20257%20L%20426%20257%20L%20426%20232%20L%20465%20232%20L%20465%20232%20L%20504%20232%20L%20504%20257%20L%20543%20257%20L%20543%20207%20L%20582%20207%20L%20582%20232%20L%20621%20232%20L%20621%20232%20L%20660%20232%20L%20660%20207%20L%20699%20207%20L%20699%20257%20L%20738%20257%20L%20738%20232%20L%20777%20232%20L%20777%20207%20L%20816%20207%20L%20816%20232%20L%20855%20232%20L%20855%20232%22%20stroke%3D%22%2316a47d%22%20stroke-width%3D%223.2%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M%20114%20360%20L%20114%20335%20L%20133.5%20335%20L%20133.5%20385%20L%20153%20385%20L%20153%20385%20L%20172.5%20385%20L%20172.5%20335%20L%20192%20335%20L%20192%20385%20L%20211.5%20385%20L%20211.5%20335%20L%20231%20335%20L%20231%20385%20L%20250.5%20385%20L%20250.5%20335%20L%20270%20335%20L%20270%20385%20L%20289.5%20385%20L%20289.5%20335%20L%20309%20335%20L%20309%20335%20L%20328.5%20335%20L%20328.5%20385%20L%20348%20385%20L%20348%20335%20L%20367.5%20335%20L%20367.5%20385%20L%20387%20385%20L%20387%20385%20L%20406.5%20385%20L%20406.5%20335%20L%20426%20335%20L%20426%20385%20L%20445.5%20385%20L%20445.5%20335%20L%20465%20335%20L%20465%20385%20L%20484.5%20385%20L%20484.5%20335%20L%20504%20335%20L%20504%20385%20L%20523.5%20385%20L%20523.5%20335%20L%20543%20335%20L%20543%20385%20L%20562.5%20385%20L%20562.5%20335%20L%20582%20335%20L%20582%20385%20L%20601.5%20385%20L%20601.5%20335%20L%20621%20335%20L%20621%20385%20L%20640.5%20385%20L%20640.5%20335%20L%20660%20335%20L%20660%20385%20L%20679.5%20385%20L%20679.5%20335%20L%20699%20335%20L%20699%20335%20L%20718.5%20335%20L%20718.5%20385%20L%20738%20385%20L%20738%20385%20L%20757.5%20385%20L%20757.5%20335%20L%20777%20335%20L%20777%20335%20L%20796.5%20335%20L%20796.5%20385%20L%20816%20385%20L%20816%20385%20L%20835.5%20385%20L%20835.5%20335%20L%20855%20335%20L%20855%20360%22%20stroke%3D%22%239867d3%22%20stroke-width%3D%223.2%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%2F%3E%3Ctext%20x%3D%22289.5%22%20y%3D%22195%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%2316a47d%22%3E%2BV%3C%2Ftext%3E%3Ctext%20x%3D%22406.5%22%20y%3D%22281%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%2316a47d%22%3E%E2%88%92B%3C%2Ftext%3E%3Ctext%20x%3D%22523.5%22%20y%3D%22281%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%2316a47d%22%3E%E2%88%92V%3C%2Ftext%3E%3Ctext%20x%3D%22562.5%22%20y%3D%22195%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%2316a47d%22%3E%2BB%3C%2Ftext%3E%3Ctext%20x%3D%22679.5%22%20y%3D%22195%22%20text-anchor%3D%22middle%22%20font-size%3D%2214%22%20font-weight%3D%22700%22%20fill%3D%22%2316a47d%22%3E%2BV%3C%2Ftext%3E%3Ctext%20x%3D%22853%22%20y%3D%22410%22%20fill%3D%22currentColor%22%20font-size%3D%2211%22%20text-anchor%3D%22end%22%3E%E6%97%B6%E9%97%B4%20t%20%E2%86%92%3C%2Ftext%3E%3C%2Fsvg%3E)

|码型|连续谱的形状|离散谱特点|连续谱第一正零点|
|---|---|---|---|
|单极性 NRZ|$\operatorname{sinc}^2(fT_s)$|只有直流谱线|$1/T_s$|
|双极性 NRZ|$\operatorname{sinc}^2(fT_s)$|等概率时无离散谱|$1/T_s$|
|单极性 RZ|$\operatorname{sinc}^2(fDT_s)$|有直流谱线，通常还有码元率及部分谐波谱线|$1/(DT_s)$|
|双极性 RZ|$\operatorname{sinc}^2(fDT_s)$|等概率时无离散谱|$1/(DT_s)$|


## 10.数字频带传输

#### 调制/解调

一、**2ASK（二进制振幅键控，Binary Amplitude Shift Keying）**---AM
调制：

$$
a(n) = f(b(n))\\
e_{2ASK}(t) = s(t)cos(wt)\\
s(t) = \sum_{n}a_ng(t-nT_s)\tag{1}
$$

其中a(n)为数字基带码，b(n)为原始码,g(t)为方波/三角波等脉冲信号。

解调：
包络检波法：抽样判决
![[database/IMAGE/Pasted image 20261109180901.png|513]]

**二、2PSK**---DSB（相位调制在数字系统中要比模拟系统重要得多）
同（1），其中 a(n) = {+1,-1}，在跳变处相位累加反向
解调方法：相干法
![[IMG_20261102_151226.jpg|512]]
难点：要求相乘器工作时，**因子与输入同频同相**
解决办法：2DPSK

**三、2DPSK**
不同于2PSK，2DPSK的编码a(n)采用差分编码方式，即
$$
a(n) = b(n) \oplus a(n-1)
$$
由于 $2\pi$ 的周期性，连续两个差错会被归零。
公式两边异或a(n-1),有
$$
b(n)=a(n)\oplus a(n-1)
$$
即接收端只需比较相邻码元，即能恢复当前信息位。

**四、2FSK**---FM
1.调制---两个2ASK信号的叠加
![[database/IMAGE/IMG_20261102_154702.jpg|392]]

2.解调
非相干法：
![[database/IMAGE/Pasted image 20261109184012.png|394]]
差分判决，相比于2ASK的绝对判决，抗干扰更好。

相干法：
![[database/IMAGE/Pasted image 20261109184113.png|392]]
过零检测：
![[database/IMAGE/Pasted image 20261109184551.png|396]]

#### 功率谱分析
一、2ASK
对频带信号
$$
e_{2ASK} = s(t)cos(2\pi f_ct)
$$
有
$$
P_k = \dfrac{1}{4}[P_s(f-f_c)+P_s(f+f_c)]
$$
对原信号，其频谱为0~fs,对频带信号，其频谱为 $f_c-f_s$~$f_c+f_s$ ,
即 $B_{2ASK} = 2f_B$
![[database/IMAGE/Pasted image 20261109154017.png|426]]

二、2PSK
与2ASK类似，但s(t)为双极性码，因此当P= 1/2时，基带信号没有离散谱；
2DPSK只是在编码方式上不同，功率谱与2PSK相同。

三、2FSK
对频带信号
$$
e_{2FSK} = s_1(t)cos(2\pi f_1t)+s_2(t)cos(2\pi f_2t),s_2(t) = \overline{s_1(t)}
$$
有
$$
P_k = \dfrac{1}{4}[P_{s1}(f-f_1)+P_{s1}(f+f_1)]\\
+\dfrac{1}{4}[P_{s2}(f-f_2)+P_{s2}(f+f_2)]\\
B_{2FSK} = |f_1-f_2|+2f_s
$$
![[database/IMAGE/Pasted image 20261109171753.png|427]]

#### 二进制星座图

即（I,Q）点图，其中
$$
\boxed{I=\frac{2}{T}\int_0^T s(t)\cos(2\pi f_ct)\,dt}
$$
$$
\boxed{Q=\frac{2}{T}\int_0^T s(t)[-\sin(2\pi f_ct)]\,dt}
$$
对2FSK，正交因子分别为 $cos(w_1t),cos(w_2t)$ .

![[database/IMAGE/Pasted image 20261109180102.png|432]]



## Q&A
### L3
复信号是由两路实信号人为构建出来的，适合描述通信中的**幅度与相位变化**；
共轭对称谱的物理含义：要用复指数来合成一个没有虚部的波形，正、负频率分量就必须按共轭关系配对。
### L4。
调制的原因：缩小天线尺寸、增加频带利用率、提高抗干扰、规范化；
门限效应：输入信噪比降低到某个水平以下时，解调器的输出信噪比会急剧恶化，而不是随输入信噪比平缓下降。这个转折处的输入信噪比称为“门限”
$$
\text{接收相位}\approx\text{原信号相位}+\text{小的相位误差}.
$$
%%
鉴频器检测瞬时频率变化。在接收功率和噪声环境不变、且远离门限的条件下：

- 消息产生的频率摆动越大，鉴频输出中的有用信号越大；
- 噪声引起的相位扰动并没有随消息频偏同步增大；
- 因而有用信号相对于噪声更突出，输出信噪比随 $\Delta f^2$ 增长。
%%
### L5调频。
- m(t)--积分--PM调制器--FM；m(t)--微分分--FM调制器--PM；非线性调制：m(t),s(t)不满足线性关系；

### L6。
- 功率信号：功率有限、能量无限；
  能量信号：能量有限、平均功率为零；
  频谱/功率/能量谱表示~在各个频段上的分布（V，V/Hz，W/Hz,J/Hz）;
  $N=\int_{-B}^{B}\frac{N_0}{2}\,df=N_0B$ 表示噪声经过带宽为B的LPF后的平均功率，$N_0/2$ 是输入白噪声的**双边功率谱密度**；
- 高斯白噪声：高斯表示信号幅度服从高斯分布；白表示信号功率谱密度为常数；
- 调制制度增益：$G=\frac{(S/N)_o}{(S/N)_i}$ ,即解调器输入输出端的信噪比之比；
  由于DSB带宽是SSB两倍，接收噪声也是SSB两倍，G又是后者一半，所以最后信噪比相同；

### L7采样。

| 阶段    | 作用                           | 发生的变化       |
| ----- | ---------------------------- | ----------- |
| 信号调理  | 放大、衰减、加偏置，使信号适合 ADC 输入范围     | 调整电压范围      |
| 抗混叠滤波 | 抑制会折叠进目标频带的带外信号和噪声           | 限制输入频谱      |
| 采样保持  | 每隔 $T_s=1/f_s$ 取一个值，并在转换期间保持 | 时间离散，幅度尚未量化 |
| 量化    | 把采样值归入有限个幅度等级                | 幅度离散，产生量化误差 |
| 编码    | 用二进制码表示量化等级                  | 得到数字数据      |
- fs>2fh：滤波器需要过渡带；边界正弦分量无法完整保留；
- fs<2fh:看信号知否占满整个频带，分析是否混叠（混叠：不同模拟频率产生相同样本）
- 混叠是否可以恢复：
	 已知频带、折叠后没有未知分量互相重叠：可以恢复。
	 不同未知分量已经叠加，而且没有额外约束：一般不能唯一恢复。
	 注意：不需要 1 kHz 和 9 kHz 同时存在，才叫混叠。即使输入只有一个 9 kHz 正弦，采样结果也与某个 1 kHz 正弦无法区分。
- ADC选型：（信号0.1~5V）
	  fs：输入的频带分布、接收端结构、滤波器余量；
	  N：输入范围、精度要求、信噪比等；
	  设要求最小信号信噪比不小于40dB。
	  理想 ADC 的满量程正弦量化信噪比约为：$\mathrm{SNR}_{\mathrm{FS}}=6.02N+1.76.$
$$
	  D=20\log_{10}\frac{5}{0.1}\approx33.98\,\mathrm{dB}.\\
	  \Rightarrow \mathrm{SNR}_{\min}\approx6.02N+1.76-33.98\\
	带入N = 12，得最小信号信噪比为40dB。
$$
### L8数字信号

低通等效针对复信号：
它不仅可以表示信号，还可以把一整套带通系统转换成对应的低通模型：
$$
\text{实射频输入}
\longrightarrow
\text{带通系统}
\longrightarrow
\text{实射频输出}
$$
对应为
$$
\text{复基带输入}
\longrightarrow
\text{等效低通系统}
\longrightarrow
\text{复基带输出}.
$$

Hilbert变换的作用：
- 构造解析信号，提取包络和相位；
- 实现实带通信号的复表示；
- 实现单边带调制；

### L9
### L10。
- 相量分析中，j表示相位超前90°；在正交采样中，j表示用于构造复信号的虚部；

