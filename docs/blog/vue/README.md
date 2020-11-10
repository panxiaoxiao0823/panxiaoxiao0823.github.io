# vue

## vue 某些知识点记录

### 1. model
> 2.2.0 新增  

**类型：**{ prop?: string, event?: string }  

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

使用model自定义 checkbox组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <my-checkbox v-model='checkValFather' value='some value'></my-checkbox>
    <hr>
    checkValFather:{{checkValFather}}
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script type="text/javascript">
    Vue.component('my-checkbox', {
      template: `
      <div><input type="checkbox" value='' name="favorite" :checked='checkValSon' :value="value" @change='updateVal($event.target.checked)' />同意<br>checkValSon:{{checkValSon}}</div>
      `,
      model: {
        prop: 'checkValSon',
        event: 'changexxx' // 随便命名事件，对应下面$emit即可
      },
      props: {
        checkValSon: {
          type: Boolean,
          default: true
        }
      },
      methods: {
        updateVal(value) {
          this.$emit('changexxx', value)
        }
      }
    })

    let app = new Vue({
      el: '#app',
      data() {
        return {
          checkValFather: true
        }
      }
    })

  </script>
</body>

</html>
```

使用model自定义 input组件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <my-input v-model="name" value="some value"></my-input>

        <hr>
        name:{{name}}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script type="text/javascript">

        Vue.component('my-input', {
            template: `<div><input type="text" :value="uname" @input="updateVal($event.target.value)">uname：{{uname}}</div>`,
            model: {
                prop: 'uname',
                event: 'changeXXX' // 随便命名事件，对应下面$emit即可
            },
            props: {
                uname: {
                    type: String,
                    default: 'tom'
                }
            },
            methods: {
                updateVal(val) {
                    this.$emit('changeXXX', val)
                }
            }
        })

        let app = new Vue({
            el: '#app',
            data() {
                return {
                    name: "hello world"
                }
            }
        })

    </script>
</body>

</html>
```

### 2. 作用域插槽
> 自 2.6.0 起有所更新。slot-scope 语法已废弃，使用v-slot替代
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>作用域插槽</title>
</head>
<style type="text/css">
  .current {
    color: orange;
  }
</style>

<body>
  </div>
  <div id="app">
    <!-- 1、当我们希望li 的样式由外部使用组件的地方定义，因为可能有多种地方要使用该组件，
    但样式希望不一样 这个时候我们需要使用作用域插槽 -->
    <fruit-list :list='list'>
      <!-- 2、 父组件中使用了<template>元素,而且包含scope="slotProps"，slotProps在这里只是临时变量 -->
      <template v-slot:default="slotProps"> <!-- slot-scope语法已废弃，用v-slot:default="slotProps"替代slot-scope='slotProps' -->
        <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
      </template>
    </fruit-list>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script type="text/javascript">
    /** 
     * 3、 在子组件模板中,<slot>元素上有一个类似props传递数据给组件的写法msg="xxx",插槽可以提供一个默认内容，如果父组件没有为这个插槽提供了内容，会显示默认的内容。 
     * 如果父组件为这个插槽提供了内容，则默认的内容会被替换掉
     */
    Vue.component('fruit-list', {
      props: ['list'],
      template: `
        <div>
          <li :key='item.id' v-for='item in list'>
            <slot :info='item'>{{item.name}}</slot>
          </li>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        list: [{
          id: 1,
          name: 'apple'
        }, {
          id: 2,
          name: 'orange'
        }, {
          id: 3,
          name: 'banana'
        }]
      }
    });
  </script>
</body>

</html>
```
运行结果如图：  
<img style='width:150px;' :src="$withBase('/img/vue-01.png')" alt="foo">
