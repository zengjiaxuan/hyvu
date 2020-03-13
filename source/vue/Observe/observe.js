import {
	observe
} from './index'
import {
	arrayMethods,
	observerArray
} from './array'
class Observe {
	constructor(data) { // data 就是vue里面的我们定义的data vm._data
		//将用户的数据使用defineProperty定义
		if (Array.isArray(data)) {
			data.__proto__ = arrayMethods
			// 只能拦截数组的方法 数组里的每一项还要去监听 有可能是i对象
			observerArray(data)
		} else {
			this.walk(data)
		}
	}
	walk(data) {
		let keys = Object.keys(data)
		for (let i in keys) {
			let key = keys[i] // 所有的key
			let value = data[keys[i]] // 所有的value
			defineReactive(data, key, value)
		}
	}
}
export function defineReactive(data, key, value) {
	//观察value是不是一个对象然后监听
	observe(value)
	Object.defineProperty(data, key, {
		get() {
			console.log('获取数据')
			return value
		},
		set(newValue) {
			if (newValue === value) return
			// 有可能你设置的时候 也是一个对象
			console.log('设置数据')
			observe(newValue)
			value = newValue
		}
	})
}
export default Observe