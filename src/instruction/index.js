import draggable from "./modules/draggable";
import copy from "./modules/copy";

const directivesList = {
  draggable,
  copy
};

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;