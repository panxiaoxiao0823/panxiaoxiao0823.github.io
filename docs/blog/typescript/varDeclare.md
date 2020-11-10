# 变量声明
<ClientOnly><click></click></ClientOnly>

## var存在的一些问题
```
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
//10 10 10 10...
```
上面代码结果都是10是因为我们传给setTimeout的每一个函数表达式实际上都引用了相同作用域里的同一个i。解决办法：使用立即执行的匿名函数
```
for (var i = 0; i < 10; i++) {
    (function(num) {
        setTimeout(function() { console.log(num); }, 100 * num);
    })(i); //匿名函数的参数num其实相当于复制了i的值，所以返回的都是不同的i值
}
//0 1 2 3 4 5 6 7 8 9 
```

## 对象展开 剩余运算符
对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法：
```
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```