import Vue from 'vue'
// 导入UI
import {
  Slider,
  Tooltip,
} from 'element-ui'
Vue.use(Slider)
Vue.use(Tooltip)

export default ({ store }) => {
  // 由于通过全局参数传入,所以 this.$notify 不能通过 this.$notify.success 调用,只可以使用 this.$notify({type: 'success'}) 方式调用
  Vue.prototype.$notify = (options) => {
    Object.assign(options, {
      offset: 50,
      customClass: store.state.dictionary.isToolBarShow ? 'barShow' : '',
    })
    return Notification(options)
  }
}
