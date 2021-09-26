import Vue from "vue";
import {
  Slider,
  Tooltip,
  Dialog,
  Button,
  MessageBox,
  Pagination,
  Select,
  Option,
  Input,
  Radio,
  RadioButton
} from "element-ui";
Vue.use(Slider);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.prototype.$confirm = MessageBox.confirm;
export default ({ store }) => {
  Vue.prototype.$notify = (options) => {
    Object.assign(options, {
      offset: 50,
      customClass: store.state.dictionary.isToolBarShow ? "barShow" : "",
    });
    return Notification(options);
  };
};
