- html为页面渲染语言
# 标签

## < head>
--- 头部的引用说明之类的
```
<head>
    //指定编码格式
    <meta charset="UTF-8">
    //指定     视口配置             宽度                 初始缩放比
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
    <title>KFC Home</title>
    //引入外部css链接
    <link rel="stylesheet" href="style.css">

</head>
```
## < body >
--- 渲染的主体内容
## < div > 
   --- division,表示分区,即一个代码块，便于管理，无显示效果
   ```
    <div class="control-panel">

    <h3 class="panel-title">空调控制</h3>

    <button class="btn" onclick="send('open_26')">制冷---26°</button
    
    <div id="status">就绪</div>

  </div>
   ```

可以添加class/id等用作css渲染标识（有别于前者，后者唯一）（其他很多标签都能添加类似的标识）
## < p >
--- paragraph，表示一个段落，自动换行
## < b >
--- break ,换行
## < script > 
--- 脚本，JavaScript区域，表示交互的可变行为#@


## < a >
--- `<a>` 是 HTML 中的**超链接标签**，全称是 "**anchor**"（锚点）
```
<a href="#" onclick="return openAirConditioner()">

    <h2>空调 -- 413</h2>

</a>
```