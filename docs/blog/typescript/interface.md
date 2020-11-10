# 接口
<ClientOnly><click></click></ClientOnly>

## 简单的接口示例
```
interface LabelledValue { // 接口一般首字母大写
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。

## 可选属性
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。  

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：
```
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {  //这里的 : { color: string; area: number } 是函数createSquare的返回值静态类型
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

## 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性:
```
interface Point {
    readonly x: number;
    readonly y: number;
}
```
你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
```
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```
TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!  The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```
上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
```
a = ro as number[];

//因为a的类型是number[],所以如果把ro赋值给一个新的没有类型的值是可以的。
let c = ro; //true
```

## 额外的属性检查
```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 }); // error: 'colour' not expected in type 'SquareConfig'
```
上面代码会报错，原因是 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。  

绕开这些检查非常简单：
```
//方法一：类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

//方法二：添加一个字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

//方法三：将这个对象赋值给一个另一个变量
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
上面代码的`[propName:string]:any`即表示任意属性，需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
```
interface SquareConfig {
    color: string;
    width?: number;
    [propName: string]: string;
}

let a : SquareConfig = {
    color:'red',
    width:20 //error 属性“width”与索引签名不兼容。 不能将类型“number”分配给类型“string”。
}
```
一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
```
interface SquareConfig {
    color: string;
    width?: number;
    [propName: string]: string | number;
}

let a : SquareConfig = {
    color:'red',
    width:20
}
```

## 函数类型
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```
interface fn {
    (a: string, b: number): number //(a: string, b: number)是参数类型  // : number是函数返回值类型
}

let c : fn;
c = function (e, f) { //这里的参数可以不用和fn函数接口的参数一致，即不用一定是a/b
    return 2;
}
c('1', 3)
```

## 可索引的类型
与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如`a[10]`或`ageMap["daniel"]`。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
```
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0]; //当用 number去索引StringArray时会得到string类型的返回值。
```
略，看不明白，看[官方手册](http://www.tslang.cn/docs/handbook/interfaces.html)吧

## 类类型
实现接口
```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```