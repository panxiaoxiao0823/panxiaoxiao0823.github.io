# 进阶
<ClientOnly><click></click></ClientOnly>

## 类型别名
```
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
上例中，我们使用 type 创建类型别名。  

类型别名常用于联合类型。

## 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个
```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```
上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。  

注意，类型别名与字符串字面量类型都是使用 type 进行定义。

## 类
### 1. 访问修饰符  public/private/protected
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
```
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}
  
let a = new Animal('Jack');
console.log(a.name); // error 属性“name”为私有属性，只能在类“Animal”中访问。
a.name = 'Tom'; // error 属性“name”为私有属性，只能在类“Animal”中访问。
```
需要注意的是，TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性。  

上面的例子编译后的代码是：
```
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```

### 2. 使用 private 修饰的属性或方法，在子类中也是不允许访问的：
```
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name); // error 属性“name”为私有属性，只能在类“Animal”中访问。
  }
}
```

### 3. 而如果是用 protected 修饰，则允许在子类中访问：
```
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```

### 4. 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
```
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal { //error 无法扩展类“Animal”。类构造函数标记为私有。
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack');  // error 类“Animal”的构造函数是私有的，仅可在类声明中访问。
```

### 5. 当构造函数修饰为 protected 时，该类只允许被继承：
```
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack'); // error 类“Animal”的构造函数是受保护的，仅可在类声明中访问。
```

### 6. 参数属性
修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
```
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

### 7. readonly
只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
```
class Animal {
    readonly name;
    public constructor(name, readonly age) {
        this.name = name;
        this.age = age;
    }
}

let a = new Animal('Jack', 12);
console.log(a.name); // Jack
a.name = 'Tom'; // error 无法分配到 "name" ，因为它是只读属性。
a.age = 18; // error 无法分配到 "age" ，因为它是只读属性。
```
注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
```
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

### 8. 抽象类
abstract 用于定义抽象类和其中的抽象方法。  
什么是抽象类？  
首先，抽象类是不允许被实例化的：  
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack'); //error 无法创建抽象类的实例。
```
上面的例子中，我们定义了一个抽象类 Animal，并且定义了一个抽象方法 sayHi。在实例化抽象类的时候报错了。  
其次，抽象类中的抽象方法必须被子类实现：
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {  //error 非抽象类“Cat”不会实现继承自“Animal”类的抽象成员“sayHi”。
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom');
```
上面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi，所以编译报错了。  
下面是一个正确使用抽象类的例子：
```
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');
```
上面的例子中，我们实现了抽象方法 sayHi，编译通过了。  

需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是：
```
var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Cat = (function (_super) {
  __extends(Cat, _super);
  function Cat() {
    _super.apply(this, arguments);
  }
  Cat.prototype.sayHi = function () {
    console.log('Meow, My name is ' + this.name);
  };
  return Cat;
})(Animal);
var cat = new Cat('Tom');
```

### 9. 类的类型
给类加上 TypeScript 的类型很简单，与接口类似：
```
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 类与接口
### 1. 类实现接口
实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。  

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：
```
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```
一个类可以实现多个接口：
```
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```
上例中，Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。

### 2. 接口继承接口
接口与接口之间可以是继承关系：
```
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}
```
这很好理解，LightableAlarm 继承了 Alarm，除了拥有 alert 方法之外，还拥有两个新方法 lightOn 和 lightOff。

### 3. 接口继承类
常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：
```
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法【即不包括构造函数、静态属性或静态方法】：
```
class Point {
    /** 静态属性，坐标系原点 */
    static origin = new Point(0, 0);
    /** 静态方法，计算与原点距离 */
    static distanceToOrigin(p: Point) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }
    /** 实例属性，x 轴的值 */
    x: number;
    /** 实例属性，y 轴的值 */
    y: number;
    /** 构造函数 */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /** 实例方法，打印此点 */
    printPoint() {
        console.log(this.x, this.y);
    }
}

interface PointInstanceType {
    x: number;
    y: number;
    printPoint(): void;
}

let p1: Point;
let p2: PointInstanceType;
```
上例中最后的类型 Point 和类型 PointInstanceType 是等价的。  

同样的，在接口继承类的时候，也只会继承它的实例属性和实例方法。

## 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
### 1. 简单的例子
首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：
```
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。  
这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
`Array<any>`允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
这时候，泛型就派上用场了：
```
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```
上例中，我们在函数名后添加了 `<T>`，其中 T 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。  
接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来：
```
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

### 2. 多个类型参数
定义泛型的时候，可以一次定义多个类型参数：
```
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```
上例中，我们定义了一个 swap 函数，用来交换输入的元组。

### 3. 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
```
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```
上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。  
这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束：
```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```
上例中，我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性。  
此时如果调用 loggingIdentity 的时候，传入的 arg 不包含 length，那么在编译阶段就会报错了：
```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity(7);

// index.ts(10,17): error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```
多个类型参数之间也可以互相约束：
```
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
```
上例中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。

### 4. 泛型接口
之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```
当然也可以使用含有泛型的接口来定义函数的形状：
```
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
进一步，我们可以把泛型参数提前到接口名上：
```
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
注意，此时在使用泛型接口的时候，需要定义泛型的类型。

### 5. 泛型类
与泛型接口类似，泛型也可以用于类的类型定义中：
```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 6. 泛型参数的默认类型
在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
```
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

## 声明合并
如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：
### 1. 函数的合并 【使用重载】
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

### 2. 接口的合并
注意，合并的属性的类型必须是唯一的：
```
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错；如果改成price:string则会报错
    weight: number;
    alert(s: string, n: number): string;
}

let a: Alarm = {
    weight: 2,
    price: 10,
    alert(a: string, b: number): string { // error 不能将类型“(a: string, b: number) => string”分配给类型“{ (s: string): string; (s: string, n: number): string; }”
        return '2'
    }
}

a.alert('hello', 11)
```
::: warning 
上面代码alert方法的合并，会报错，不明白为什么 
:::

### 3. 类的合并
类的合并与接口的合并规则一致。
