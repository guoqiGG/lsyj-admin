import { createStore } from 'vuex'

import getters from './getters'
// 导入模块
const moduleFiles = import.meta.globEager('./modules/*.js')

var modules = {}

for (const path in moduleFiles) {
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[1]
  modules[moduleName] = moduleFiles[path].default
}

export default createStore({
  modules,
  getters
})