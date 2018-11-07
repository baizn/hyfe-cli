/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-10 13:21:47
 * @Description: 配置页面
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-13 17:45:33
 */

import createAction from '@/util/createAction'

// 获取树形导航列表
export const TREE_NAV_REQUEST = 'TREE_NAV_REQUEST'
export const TREE_NAV_SUCCESS = 'TREE_NAV_SUCCESS'
export const treeNavRequest = createAction(TREE_NAV_REQUEST)
export const treeNavSuccess = createAction(TREE_NAV_SUCCESS, 'response')

// 记录当前激活的导航
export const CURR_TREE_NAV = 'CURR_TREE_NAV'
export const currTreeNav = createAction(CURR_TREE_NAV, 'response')

// 记录上下文菜单信息
export const CONTEXT_MENU = 'CONTEXT_MENU'
export const contextMenu = createAction(CONTEXT_MENU, 'response')

// 配置页全局 pending action
export const CONFIG_PENDING = 'CONFIG_PENDING'
export const configPending = createAction(CONFIG_PENDING, 'response')

// 项目(产品)导航: 增加
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST'
export const addProductRequest = createAction(ADD_PRODUCT_REQUEST, 'params')
// 项目(产品)导航: 删除
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST'
export const deleteProductRequest = createAction(DELETE_PRODUCT_REQUEST, 'id', 'oldFile')
// 项目(产品)导航: 更新
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST'
export const updateProductRequest = createAction(UPDATE_PRODUCT_REQUEST, 'params')
// 项目(产品)导航: 获取
export const FIND_PRODUCT_REQUEST = 'FIND_PRODUCT_REQUEST'
export const FIND_PRODUCT_SUCCESS = 'FIND_PRODUCT_SUCCESS'
export const findProductRequest = createAction(FIND_PRODUCT_REQUEST, 'id')
export const findProductSuccess = createAction(FIND_PRODUCT_SUCCESS, 'response')

// 目录导航: 增加
export const ADD_CATALOGUE_REQUEST = 'ADD_CATALOGUE_REQUEST'
export const addCatalogueRequest = createAction(ADD_CATALOGUE_REQUEST, 'params')
// 目录导航: 删除
export const DELETE_CATALOGUE_REQUEST = 'DELETE_CATALOGUE_REQUEST'
export const deleteCatalogueRequest = createAction(DELETE_CATALOGUE_REQUEST, 'id')
// 目录导航: 更新
export const UPDATE_CATALOGUE_REQUEST = 'UPDATE_CATALOGUE_REQUEST'
// { name, key }
export const updateCatalogueRequest = createAction(UPDATE_CATALOGUE_REQUEST, 'params')
// 目录导航: 获取
export const FIND_CATALOGUE_REQUEST = 'FIND_CATALOGUE_REQUEST'
export const FIND_CATALOGUE_SUCCESS = 'FIND_CATALOGUE_SUCCESS'
export const findCatalogueRequest = createAction(FIND_CATALOGUE_REQUEST, 'id')
export const findCatalogueSuccess = createAction(FIND_CATALOGUE_SUCCESS, 'response')
