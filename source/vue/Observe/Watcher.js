let id = 0
class Watcher {
    constructor(vm, exprOrFn, cb = () => {}, opts) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.cb = cb
        this.id = id++ 
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn
        }
        this.get() //默认创建一个watcher 会调用自身的get方法
    }
    get() {
        this.getter()
    }
}
export default Watcher