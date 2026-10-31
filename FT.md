%%%%## foundation

- **Definition**：
$$
F(w) = \int_{-\infty}^{+\infty}f(t)e^{-j\omega t}\,dt
$$
- **basic transform**
  1.  $\delta(t) \xrightarrow{FT} 1$
  2.  $1\xlongrightarrow{FT}2\pi\delta (w)$ 
>$$
\color{orange}
  \int_{-\infty}^{+\infty} e^{-j\omega t}\,dt 
  = \lim_{T \to \infty}T\dfrac{2\sin(\omega T)}{\omega T} 
  = 2\lim_{T \to \infty}Tsinc(fT)
$$
3.  频移特性: $e^{-j\omega_0 t}f(t) \xrightarrow{FT} F(\omega + \omega_0)$
4. 






