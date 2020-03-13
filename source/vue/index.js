import {
	initstate
} from './Observe'
import Watcher from './Observe/Watcher'
import {
	compiler
} from './Observe/util'

function Vue(options) { // vue中传入参数
	// 初始化用户传入的选项
	this._init(options)

}
// 初始化
Vue.prototype._init = function (options) {
	let vm = this
	vm.$options = options
	// 重新初始化状态 data computed watch
	initstate(vm)
	// 初始化渲染页面
	if (vm.$options.el) {
		vm.$mount()
	}
}

function query(el) {
	if (typeof el === 'string') return document.querySelector(el)
	return el
}
Vue.prototype.$mount = function () {
	let vm = this
	let el = vm.$options.el
	el = vm.$el = query(el) // 获取当前的节点
	// 渲染节点 通过watcher渲染
	let updateComponent = () => {
		console.log('更新和渲染的实现')
		vm._update()
	}
	new Watcher(vm, updateComponent)
}
Vue.prototype._update = function () {
	// 拿到数据更新视图
	let vm = this
	let el = vm.$el
	let node = document.createDocumentFragment()
	let firstChild
	while (firstChild = el.firstChild) {
		node.appendChild(firstChild)
	}
	console.log(node,121)
	// 文本替换
	compiler(node, vm)
	el.appendChild(node) //替换完再放进去
}
export default Vue