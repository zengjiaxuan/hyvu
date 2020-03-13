const defaultRe = /\{\{((?:.|\r?\n)+?)\}\}/g;
export function compiler(node, vm) {
    // 取出子节点
    let childNodes = node.childNodes;
    // 将数组转换成数组
    [...childNodes].forEach(child => {
        if (child.nodeType === 1) {
            compiler(child, vm)
        }else if (child.nodeType === 3) {
            util.compileText(child, vm)
        }
    })
}
export const util = {
    compileText(node, vm) { // 编译文本
        node.textContent = node.textContent.replace(defaultRe, function (...args) {
           return util.getValue(vm, args[1])
        })
    },
    getValue(vm, expr) {
        let keys = expr.split('.')
        return keys.reduce((memo, current) => {
            memo = memo[current]
            return memo
        }, vm)
    }
 }