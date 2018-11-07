import { message } from 'antd'
import { call, put, take } from 'redux-saga/effects'
import { fetch } from '@/util/request'

import {
  TREE_NAV_REQUEST,
  treeNavSuccess,

  currTreeNav,
  contextMenu,
  configPending,

  ADD_CATALOGUE_REQUEST,
  ADD_PRODUCT_REQUEST,
  DELETE_CATALOGUE_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPDATE_CATALOGUE_REQUEST,
  UPDATE_PRODUCT_REQUEST,

  FIND_PRODUCT_REQUEST,
  findProductSuccess,

  FIND_CATALOGUE_REQUEST,
  findCatalogueSuccess
} from '@/actions/configAction'

const apifetchTreeNav = () => fetch('fetchTreeNav')

function* _fetchTreeNav() {
  const res = yield call(apifetchTreeNav)
  yield put(treeNavSuccess(res.data.result.treeNavList))
}

function* refresh() {
  yield * _fetchTreeNav()

  // 将当前选中的导航清空
  yield put(currTreeNav({
    id: '',
    type: 2
  }))
}

// 获取树形导航列表
export function* fetchTreeNav() {
  while (true) {
    try {
      const action = yield take(TREE_NAV_REQUEST)
      yield put(configPending(true))
      yield * _fetchTreeNav()
      yield put(configPending(false))
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 更新和获取项目(产品)详情
const apifetchProductDetail = id => fetch('fetchProductDetail', { id })
const apifetchUpdateProduct = ({
  id, name, goal, environment, href, introduction, locate, oldFile, remark, fileList
}) => {
  // 如果上传了图片, 就需要传递之前的图片地址, 并将其删除
  const oldF = fileList ? oldFile : ''
  return fetch('fetchUpdateProduct', {
    id,
    name,
    goal,
    environment,
    href,
    introduction,
    locate,
    remark,
    oldFile: oldF,
    fileList: fileList ? fileList[0].originFileObj : null
  })
}

function* _fetchProductDetail(id) {
  const res = yield call(apifetchProductDetail, id)
  yield put(findProductSuccess(res.data.result))
}

// 获取
export function* fetchProductDetail() {
  while (true) {
    try {
      const action = yield take(FIND_PRODUCT_REQUEST)
      yield put(configPending(true))
      yield * _fetchProductDetail(action.id)
      yield put(configPending(false))
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 更新
export function* fetchUpdateProduct() {
  while (true) {
    try {
      const action = yield take(UPDATE_PRODUCT_REQUEST)
      const { params } = action
      yield put(configPending(true))
      const res = yield call(apifetchUpdateProduct, params)

      // 修改成功后, 重新请求项目产品详情
      if (res.data.code) {
        yield * _fetchProductDetail(params.id)
        yield * _fetchTreeNav()
        yield put(configPending(false))
        yield message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 更新和获取目录导航
const apifetchCatalogueDetail = id => fetch('fetchCatalogueDetail', { id })
const apifetchUpdateCatalogue = params => fetch('fetchUpdateCatalogue', params)
function* _fetchCatalogueDetail(id) {
  const res = yield call(apifetchCatalogueDetail, id)
  yield put(findCatalogueSuccess(res.data.result))
}

// 获取
export function* fetchCatalogueDetail() {
  while (true) {
    try {
      const action = yield take(FIND_CATALOGUE_REQUEST)
      yield put(configPending(true))
      yield * _fetchCatalogueDetail(action.id)
      yield put(configPending(false))
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 更新
export function* fetchUpdateCatalogue() {
  while (true) {
    try {
      const action = yield take(UPDATE_CATALOGUE_REQUEST)
      yield put(configPending(true))
      const res = yield call(apifetchUpdateCatalogue, action.params)

      if (res.data.code) {
        yield * _fetchCatalogueDetail(action.id)
        yield * _fetchTreeNav()
        yield put(configPending(false))
        yield message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 删除目录导航导航
const apifetchDeleteCatalogue = id => fetch('fetchDeleteCatalogue', { id })
export function* fetchDeleteCatalogue() {
  while (true) {
    try {
      const action = yield take(DELETE_CATALOGUE_REQUEST)
      yield put(configPending(true))
      const res = yield call(apifetchDeleteCatalogue, action.id)

      if (res.data.code) {
        yield * refresh()
        yield put(configPending(false))
        yield message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 删除项目(产品)导航
const apifetchDeleteProduct = (id, oldFile) => fetch('fetchDeleteProduct', { id, oldFile })
export function* fetchDeleteProduct() {
  while (true) {
    try {
      const action = yield take(DELETE_PRODUCT_REQUEST)
      yield put(configPending(true))
      const res = yield call(apifetchDeleteProduct, action.id, action.oldFile)

      if (res.data.code) {
        yield * refresh()
        yield put(configPending(false))
        yield message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 添加目录导航
const apifetchAddCatalogue = params => fetch('fetchAddCatalogue', params)
export function* fetchAddCatalogue() {
  while (true) {
    try {
      const action = yield take(ADD_CATALOGUE_REQUEST)
      yield put(configPending(true))
      const res = yield call(apifetchAddCatalogue, action.params)

      if (res.data.code) {
        yield * _fetchTreeNav()
        yield put(contextMenu({
          modalVisible: false,
          modalTitle: '',
          addType: 0
        }))
        yield put(configPending(false))
        message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}

// 添加项目(产品)导航
const apifetchAddProduct = ({
  parentId, name, goal, environment, href, introduction, locate, remark, fileList
}) => {
  return fetch('fetchAddProduct', {
    parentId,
    name,
    goal,
    environment,
    href,
    introduction,
    locate,
    remark,
    fileList: fileList ? fileList[0].originFileObj : null
  })
}
export function* fetchAddProduct() {
  while (true) {
    try {
      const action = yield take(ADD_PRODUCT_REQUEST)
      yield put(configPending(true))
      const res = yield call(apifetchAddProduct, action.params)

      if (res.data.code) {
        yield * _fetchTreeNav()
        yield put(contextMenu({
          modalVisible: false,
          modalTitle: '',
          addType: 0
        }))
        yield put(configPending(false))
        message.info(res.data.msg)
      }
    } catch (err) {
      yield put(configPending(false))
      yield message.error(err.message)
    }
  }
}
