# vue2-input-number

## v-input-number 允许输入数字

### stackblitz
* https://stackblitz.com/edit/vue2-input-number

### 演示 
* https://vue2-input-number.stackblitz.io

### 使用方法
```JavaScript
// 在main.js引入
import inputNumber from '@/directive/input-number/input-number
Vue.use(inputNumber)
```
```JavaScript
// 基本语法
<input v-model="value" v-input-number />

// 不允许输入小数、负数
<input v-model="value" v-input-number="{ point: false, minus: false }" />

// 允许输入小数，不允许输入负数
<input v-model="value" v-input-number="{ point: true, minus: false }" />

// 允许输入负数，不允许输入小数
<input v-model="value" v-input-number="{ point: false, minus: true }" />
```
