import Observe from './observe'
export function initstate(vm) {
	// 做不同的初始化工作
	let opts = vm.$options
	if (opts.data) {
		initData(vm)
	}
	if (opts.computed) {
		initComputed()
	}
	if (opts.watch) {
		initWatch()
	}
}
	// 判断是不是对象 return
export function observe(data) {
	if (typeof data !== 'object' || data == null) return
	return new Observe(data) // 观察数据的业务逻辑放在这里面
}
// vm._data 代理
function proxy(vm, source, key) {
	Object.defineProperty(vm, key, {
		get() {
			return vm[source][key]
		},
		set(newValue) {
			return vm[source][key] = newValue
		}
	})
}
function initData(vm) {
	// 获取用户传入的data
	let data = vm.$options.data
	// 判断是不是函数 把数据赋值给vm._data 方便观察
	data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
	// 其实是vm._data 代替了vm的操作
	for (let key in data) {
		proxy(vm, "_data", key)
	}
	// 观察数据
	observe(data)
}
function initComputed(vm) {

}
function initWatch(vm) {

}