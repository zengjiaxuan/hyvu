// ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']
import {observe} from './index'
// 获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype
// 复制一份 然后改新的
export let arrayMethods = Object.create(oldArrayProtoMethods)
let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']
export function observerArray(inserted) {
    // 循环监听新增每一个的属性
    for (let i = 0; i < inserted.length; i++) {
        observe(inserted[i])
    }
}
methods.forEach(methods => {
    arrayMethods[methods] = function(...arg) {
        // 不光返回新的数组方法 还要执行监听
        let res = oldArrayProtoMethods[methods].apply(this, arg)
        // 实现新增属性的监听
        let inserted
        if (method == 'unshift') inserted = arg
        if (method == 'splice') inserted = arg.slice(2)
        console.log('实现了监听数组属性的变化')
        return res
    }
})