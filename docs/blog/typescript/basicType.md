# 基础类型
<ClientOnly><click></click></ClientOnly>

## 定义数组

### 1. 「类型 + 方括号」表示法 
```
//表示由number类型元素组成的一个数组
let list1:number[]  = [1,3]

//数组里面包含不同的数据类型
let list: any[] = [1, true, "free"];
list[1] = 100;
```

### 2. 数组泛型
```
let list2:Array<number> = [2,1]
```

### 3. 用接口表示类数组【注意不是数组】：类数组不能用普通的数组的方式来描述，而应该用接口
```
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```
在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。
事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
```
function sum() {
    let args: IArguments = arguments;
}
```
其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
```
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

## 元组 Tuple
```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
当访问一个越界的元素时候，会报错
```
let d : [number,string] = [2,'4']
d[3] = 'world'  //error 不能将类型“"world"”分配给类型“undefined”。
```

## enum类型
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
```
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
或者，全部都采用手动赋值：
```
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
### 1. 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
```
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 8] = "Mon";
    Days[Days["Tue"] = 9] = "Tue";
    Days[Days["Wed"] = 10] = "Wed";
    Days[Days["Thu"] = 11] = "Thu";
    Days[Days["Fri"] = 12] = "Fri";
    Days[Days["Sat"] = "S"] = "Sat";
})(Days || (Days = {}));
```
当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
```
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

### 2. 常数枚举
常数枚举是使用 const enum 定义的枚举类型：
```
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
上例的编译结果是：
```
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
假如包含了计算成员，则会在编译阶段报错：
```
const enum Color {Red, Green, Blue = "blue".length};  //error 常量枚举成员初始值设定项只能包含文字值和其他计算的枚举值。
```

### 3. 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
```
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
上例的编译结果是：
```
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
外部枚举与声明语句一样，常出现在声明文件中。
同时使用 declare 和 const 也是可以的：
```
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
编译结果：
```
var directions = [0 /* Up /, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## :any  :null  :undefined
### 1. :any  任意值类型
类型推论：变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型；
```
let something;
something = 'seven';
something = 7;

//如果未指定类型但是赋值了，此时会给该变量推测出一个类型
let something = 'seven';
something = 7;  //error 不能将类型“7”分配给类型“string”。
```

### 2. 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
```
let aa:object = null;
```
null和undefined 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
```
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```
而 void 类型的变量不能赋值给 number 类型的变量：
```
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

## void类型
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```
function warnUser(): void {
    console.log("This is my warning message");
}
```
声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
```
let unusable: void = undefined;
```

## never类型
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。  

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
下面是一些返回never类型的函数：
```
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## object类型
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。  

使用object类型，就可以更好的表示像Object.create这样的API。例如：
```
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。  

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。  

类型断言有两种形式。 其一是“尖括号”语法：
```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
另一个为as语法：【推荐使用as语法】
```
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
### 1. 将任何一个类型断言为 any
```
window.foo = 1;  //error 类型“Window & typeof globalThis”上不存在属性“foo”
```
此时我们可以使用 as any 临时将 window 断言为 any 类型，在 any 类型的变量上，访问任何属性都是允许的。
```
(window as any).foo = 1;
```
::: tip <Badge text="总结"/>
（1）联合类型可以被断言为其中一个类型

（2）父类可以被断言为子类

（3）任何类型都可以被断言为 any

（4）any 可以被断言为任何类型

（5）要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
:::

### 2. 类型断言 vs 类型转换
类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
```
function toBoolean(something: any): boolean {
    return something as boolean;
}

toBoolean(1);
// 返回值为 1
```
在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成
```
function toBoolean(something) {
    return something;
}

toBoolean(1);
// 返回值为 1
```
所以类型断言不是类型转换，它不会真的影响到变量的类型。  

若要进行类型转换，需要直接调用类型转换的方法：
```
function toBoolean(something: any): boolean {
    return Boolean(something);
}

toBoolean(1);
// 返回值为 true
```

### 3. 类型断言 vs 类型声明
在这个例子中：
```
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```
我们使用 as Cat 将 any 类型断言为了 Cat 类型。
但实际上还有其他方式可以解决这个问题：
```
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom: Cat = getCacheData('tom');
tom.run();
```
上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。  

这和类型断言是非常相似的，而且产生的结果也几乎是一样的——tom 在接下来的代码中都变成了 Cat 类型。  

它们的区别，可以通过这个例子来理解：
```
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;
```
在上面的例子中，由于 Animal 兼容 Cat，故可以将 animal 断言为 Cat 赋值给 tom。  

但是若直接声明 tom 为 Cat 类型：
```
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```
则会报错，不允许将 animal 赋值为 Cat 类型的 tom。  

这很容易理解，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。  

深入的讲，它们的核心区别就在于：  
- animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
- animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行  

但是 Cat 并不兼容 Animal。  
而在前一个例子中，由于 getCacheData('tom') 是 any 类型，any 兼容 Cat，Cat 也兼容 any，故
```
const tom = getCacheData('tom') as Cat;
```
等价于
```
const tom: Cat = getCacheData('tom');
```
知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。
所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。

### 4. 类型断言 vs 泛型
还是这个例子
```
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```
我们还有第三种方式可以解决这个问题，那就是泛型：
```
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```
通过给 getCacheData 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案。

## 联合类型
表示取值可以为多种类型中的一种。联合类型使用 | 分隔每个类型
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
myFavoriteNumber = Boolean(true);  // error 不能将类型“boolean”分配给类型“string | number”。
```
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
```
function getLength(something: string | number): number {
    return something.length;  //error  类型“number”上不存在属性“length”。
}
```

## 函数的类型
### 1. 注意，输入多余的（或者少于要求的）参数，是不被允许的
```
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3); //error 应有 2 个参数，但获得 3 个。
```
### 2. 也可以用接口定义函数的形状，见下面接口部分
### 3. 可选参数
用 ? 表示可选的参数，需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
```
function buildName(firstName: string, lastName?: string) {  //如果是 firstName?: string, lastName: string则会报错
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
### 4. 函数参数默认值
TypeScript 会将添加了默认值的参数识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了：
```
function buildName(firstName: string, lastName: string = 'Cat') {  //firstName: string = 'Tom', lastName: string 这样也是可以的
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
### 5. ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
```
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);
```
事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
```
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```
注意，rest 参数只能是最后一个参数

### 6. 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。  
利用联合类型，我们可以这么实现：
```
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
这时，我们可以使用重载定义多个 reverse 的函数类型：
```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。  

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
重载只是有益于代码可读性，以上例子改写成当你输入number并且返回string时候也不会报错；


