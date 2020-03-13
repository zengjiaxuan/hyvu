import {
	observe
} from './index'
class Observe {
	constructor(data) { // data 就是vue里面的我们定义的data vm._data
		//将用户的数据使用defineProperty定义
		this.walk(data)

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
			return value
		},
		set(newValue) {
			if (newValue === value) return
			// 有可能你设置的时候 也是一个对象
			observe(newValue)
			value = newValue
		}
	})
}
export default Observe