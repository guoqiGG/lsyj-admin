/*
	需求：实现一个复制指定。复制指定内容至剪贴板
  1.动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域
  2.将要复制的值赋给 textarea 标签的 value 属性，并插入到 body
  3.选中值 textarea 并复制
  4.将 body 中插入的 textarea 移除
  5.在第一次调用时绑定事件，在解绑时移除事件
*/
import {
  ElMessage
} from "element-plus";
export const copy = {
  mounted: function (el, {
    value
  }) {
    console.log(arguments)
    el.$value = value

    el.onclick = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        ElMessage({
          type: "error",
          message: "无复制内容"
        });
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('input')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      // textarea.readOnly = 'readonly'
      // textarea.style.position = 'absolute'
      // textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      // textarea.value = el.$value
      // textarea.value = 'huangbia11111111o'
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        ElMessage({
          type: "success",
          message: "复制成功"
        });
      }
      document.body.removeChild(input)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  beforeUpdate(el, {
    value
  }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  },
}

export default copy