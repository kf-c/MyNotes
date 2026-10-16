- 以下量除非特别说明，否则默认为在坐标系I下的量在B坐标系下的分量
## 9.29
- 确定测量量含义：角速度（mpu相对上一时刻位置的角度差值，以自身为坐标系）$\omega_h$（即mpu6050测得角速度值，假设其与机体坐标B一致） 
- 对机体角速度的坐标推导：
  $$\dot{n_h} = R^T\dot n_h^I = \omega_h×n_h + \Theta\dot\omega_h  {\tag1}$$
其中$n_h$为固定飞轮时，机体总的角动量，$\Theta$为飞轮固定时机体在B下相对支点O的张量矩。
### 10.09
- MPU6050 测量的是芯片相对于惯性系的转动，并用芯片自身的三个轴报告分量
## 10.11

由（1）得：
$$\omega_h×n_h + \Theta\dot \omega_h
+ \omega_w×n_w + \Theta_w\dot \omega_w
= Mg^B  \tag{A}
$$


其中$\Theta_w$为B下飞轮相对质心的转动惯量（$\Theta$中已经包含飞轮相对支点的转动惯量）

对飞轮有：
$$\tau = \Theta_w\dot \omega_w + \Theta_w\dot \omega_h \tag{B}$$ 联立AB得：
$$\omega_h×n_h + \omega_w×n_w + \hat\Theta\dot \omega_h
= Mg^B - \tau \tag{A}
$$
## 10.14
进行到（23）
（24）？