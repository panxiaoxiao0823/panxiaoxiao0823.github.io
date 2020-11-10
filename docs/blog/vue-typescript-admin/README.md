# vue-typescript-admin

## 使用vue-typescript-admin minimal分支实现master界面

### 1. 拉取远程minimal分支
如何拉取git远程仓库的某个指定分支：  
git clone会克隆一个版本库到本地。使用`-b <name>`或`--branch <name>`参数，它不会将新创建的HEAD指向克隆仓库的HEAD指向的分支（master分支），而是指向name分支。例如下面命令是拉取远程仓库的minimal分支。
```
git clone -b minimal https://github.com/Armour/vue-typescript-admin-template.git
```

## 备用知识

### 一些npm包

####  [vue-class-component](https://class-component.vuejs.org/)
::: tip
Vue Class Component 是一个可以让你使用Class风格语法编写Vue组件的库.
:::
你可以使用通过@Component装饰器标注Class，来用直观和标准的Class语法定义组件的data和方法。  

对应官方文档的中文翻译：[中文文档](https://www.jianshu.com/p/adfe275b731e)

#### [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator#Prop)
::: tip
There are several decorators and 1 function (Mixin):  

@Prop  
@PropSync  
@Model  
@Watch  
@Provide  
@Inject  
@ProvideReactive   
@InjectReactive  
@Emit  
@Ref  
@Component (provided by vue-class-component)  
Mixins (the helper function named mixins provided by vue-class-component)  
:::
vue-property-decorator非官方库，他是基于vue-class-componen并对vue-class-componen的补充。
