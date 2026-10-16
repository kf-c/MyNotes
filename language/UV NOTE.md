## UV

```
# 进入pyhton 交互式解释器
uv run python
```
### 单文件
 ```
 # 为运行的单文件创建临时包环境
 uv run --with requests  test.py

 ```


### 项目文件

- **STRUCTURE**
```
E:\MM
├── .venv
│   ├── Lib
│   ├── Scripts
│   ├── .gitignore
│   ├── .lock
│   ├── CACHEDIR.TAG
│   └── pyvenv.cfg
├── src
│   └── mm
├── .gitignore
├── .python-version
├── pyproject.toml
├── README.md
├── test.py
└── uv.lock
PS E:\MM> 
```

- **COMMON POPERATIONS**
```
# 1. 创建项目
uv init myproject
cd myproject

# 2. 固定 Python
uv python pin 3.14

# 3. 添加运行依赖
uv add numpy scipy matplotlib

# 4. 添加开发工具
uv add --dev pytest ruff

# 5. 编程
code .

# 6. 运行
uv run python main.py

# 7. 测试
uv run pytest

# 8. 检查
uv run ruff check .
```
spyder
matlab 

绘图--qt
运行--执行前清理所有变量



## PYTHON
### 0.str

- 切片复制 --- 选择性备份复制
- 直接复制 --- 相当于创建变量别名
```
ref1 = original[:] /original[a:b](左闭右开)
# 切片语法
text[start:stop:step]  # step默认为1，简写为text[start:stop]
```
### 1. lib

```
# 以time 库为例
uv run python
dir(time)  #展示内内容
help(time.strftime)
```

### 2.list

- mutable object
```
list = [0,1,2,3.4,5,6]
# 切片操作格式：list[begin:end:step]
list[::]      #list
list[:4:2]    #0,2(左闭右开)
list[::-1]    #reverse list

#method
list.insert(index,val)
list.pop(index)
list.remove(X)  # delete the first 'X'

list_A = list_B.copy()
list_C = list_A + list_B
len(list)
max/min(list)
del list_C

```

### 3.tuple

- immutable
```
tup_A = ()
tup_B = (5,)
C = A + B
```

### 4.set

- disordered and non-repetitive elements
```
set1 = {3,1,4}
set1.update(set2)  #get new the joint set,namely set1
union = set1.union(set2,set3)
	common_set = set1.intersection(set2)
set1.isdisjoint(set2)  # own common elements or not
set1.issubset(set2)    # or issuperset()
set.remove(X)
del set_C
```

### 5.dict

- 键值对
```
dict1 = {"}
```