- JS不同于
- < script >块一般放在文件最后，使先渲染出来页面，保证用户体验;
- html关于页面显示内容；js关于页面行为操作；
- html和js代码的分离：
```
<script src = "index_test.js"></script>
```
## 数据类型
 - 弱类型语言，自动类型识别，类似python； 
 - 变量与常量
  ```
  let age;    //变量，可更改
  const age； //常量，不可全部更改
  const fruits = ["apples","oranges","1"]//弱类型数组
  ```
### 字符串
```
   //模板字符串
   let str = `The username is  ${username},with the password ${passsword}`;    
   //字符串拼接，同python
   let str2 = "The username is  " + username + ",with the password " + passsword;
```
### 对象

```
//对象
const person = {

    name:"kfc",

    age:18,

    sex:"male"
};
//析构
const {name} = person; //name = person.name
//对象数组

const todos  = [
    {
        id:1,
        text:"hello world",
        isCompleted:true
    },
    {
        id:2,
        text:"meet world",
        isCompleted:false
    },
    {
        id:3,
        text:"bye world",
        isCompleted:false
    }
]
//转换为JSON，即键要在""内

const todosJSON = JSON.stringify(todos);

console.log(todosJSON);
```


## 运算办法
- == 表示值相同，类型可以不同， === 表示值和类型都相同