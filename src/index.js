import Vue from 'vue' // 默认搜索source/vue
let vm = new Vue({
	el: '#app',
	data() {
		return {
			msg: 'hello',
			hh: {
				a: 1
			}
		}
	},
	computed: {},
	watch: {}
})
console.log(vm)