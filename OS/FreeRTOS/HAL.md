---
date: 2026-07-12
---
- timer配置之后需要手动开启：	
    HAL_TIM_Base_Start(&htim2);
    HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_3);
    
 >[!tip]
>hispark本身需要手动初始化，手动使能；hal自动配置初始化，手动使能；
- 
- 
- 
，PA0, PB0, PC0 ... 这些引脚中，只能有一个被配置为 GPIO_EXTI0 模式（硬件上的mos选择）



## ADC配置：
### memory/peripheral width
  每次从外设 --内存搬运的数据位宽 （stm32一般半字，即16位（，与与外设寄存器位宽，adc_buf数组位宽一致，定义的存储数组相同））
- increment addresss: 地址自增（每次增加上述定义的位宽），（若只有一个adc外设，无需外设地址自增，由于写入内存数组，需要在数组里自增）
### ADC_Settings

      时钟分频器（异步/同步分频，具体可在时钟树中查看）
> [!note]- ADC Settings
> - Clock Prescaler
>    时钟分频器（可以选择异步时钟，即不受APB总线限制，具体见时钟树）
>  - Continuous Convertion Mode
>    ADC 一次触发后，是转换一次还是连续不断地转换。
>  - DMA Continuous Requests
>    ADC 每完成一次转换，是否继续向 DMA 发请求。
> 




$$
s_i  s^2  \Sigma  
$$

$s_i$
