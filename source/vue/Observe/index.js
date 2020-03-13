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
export function observe(data) {
	// 判断是不是对象 return
	if (typeof data !== 'object' || data == null) return
	return new Observe(data) // 观察数据的业务逻辑放在这里面
}
function initData(vm) {
	// 获取用户传入的data
	let data = vm.$options.data
	// 判断是不是函数 把数据赋值给vm._data 方便观察
	data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
	// 观察数据
	observe(data)
}
function initComputed(vm) {

}
function initWatch(vm) {

}