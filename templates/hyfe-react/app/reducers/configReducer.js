/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-10 13:28:47
 * @Description: 获取树形菜单 Reducer
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-17 11:31:25
 */

import {
  TREE_NAV_SUCCESS,
  CURR_TREE_NAV,
  CONTEXT_MENU,
  CONFIG_PENDING,

  FIND_CATALOGUE_SUCCESS,
  FIND_PRODUCT_SUCCESS
} from '@/actions/configAction'
import { combineReducers } from 'redux'

// pending
const configPendingReducer = (state = false, action) => {
  switch(action.type) {
    case CONFIG_PENDING:
      return state = action.response
    default:
      return state
  }
}

// 左侧导航树
const treeNavInitState = {
  data: []
}
const treeNavReducer = (state = treeNavInitState, action) => {
  switch (action.type) {
    case TREE_NAV_SUCCESS:
      const listData = [...state, ...action.response]

      return Object.assign({}, state, {
        data: listData
      })
    default:
      return state
  }
}

// 项目(产品)目录详情
const productDetailInitState = {
  id: '',
  name: '',
  goal: '',
  locate: '',
  introduction: '',
  environment: '',
  remark: '',
  href: '',
  pic: ''
}
const findProductReducer = (state = productDetailInitState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_SUCCESS:
      return Object.assign({}, state, action.response)
    default:
      return state
  }
}

// 目录导航详情
const catalogueDetailInitState = {
  id: '',
  name: ''
}
const findCatalogueReducer = (state = catalogueDetailInitState, action) => {
  switch (action.type) {
    case FIND_CATALOGUE_SUCCESS:
      return Object.assign({}, state, action.response)
    default:
      return state
  }
}

// 当前导航
const currTreeNavInitState = {
  id: '',
  type: 2
}
const currTreeNavReducer = (state = currTreeNavInitState, action) => {
  switch (action.type) {
    case CURR_TREE_NAV:
      return Object.assign({}, state, action.response)
    default:
      return state
  }
}

// 上下文菜单
const contextMenuInitState = {
  id: '',
  pageX: 0,
  pageY: 0,
  menuVisible: false,
  modalVisible: false,
  modalTitle: '',
  addType: 0
}
const contextMenuReducer = (state = contextMenuInitState, action) => {
  switch(action.type) {
    case CONTEXT_MENU:
      return Object.assign({}, state, action.response)
    default:
      return state
  }
}

export default combineReducers({
  treeNav: treeNavReducer,
  currTreeNav: currTreeNavReducer,
  contextMenu: contextMenuReducer,
  productDetail: findProductReducer,
  catalogueDetail: findCatalogueReducer,
  pending: configPendingReducer
})
