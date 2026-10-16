---
date: 2026-07-08
---
## 中断
```
//HAL库中断实现流程：

//stm32f1xx_it.c


void USART1_IRQHandler(void)
{
  HAL_UART_IRQHandler(&huart1); // 自动生成的，它会帮你清除中断标志位、判断中断类型
  //内部处理完杂事后自动调用回调函数
  /********************************
	void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
	{
	    if(huart->Instance == USART1)
	    {
	        //用户逻辑实现
	    }
	}
  ********************************/
}
```
