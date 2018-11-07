/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-10 13:19:56
 * @Description: 配置页
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-17 12:37:07
 */
import {
  treeNavRequest, currTreeNav, contextMenu,

  addCatalogueRequest, addProductRequest,
  deleteCatalogueRequest, deleteProductRequest,
  updateCatalogueRequest, updateProductRequest,
  findCatalogueRequest, findProductRequest
} from '@/actions/configAction'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Spin } from 'antd'
import { Tree, Content, FormCatalogue, FormProduct } from '@/components'
import './index.scss'

const mapStateToProps = ({ configuration }) => ({ configuration })

@connect(mapStateToProps)
class Configuration extends Component {
  componentDidMount() {
    // 请求树形图数据
    this.props.dispatch(treeNavRequest())
  }

  /**
   * 节点点击事件
   * @param {String} selectedKeys 被选中节点的 key
   * @param {Object} e            Event && Node
   */
  onNodeClick = (selectedKeys, e) => {
    const { dispatch } = this.props
    const {
      id, pId, type, pic
    } = e.node.props

    // 获取当前导航的信息
    dispatch(currTreeNav({ id: pId || id, type, pic }))

    switch (type) {
      case 1:
        dispatch(findProductRequest(pId))
        break
      case 2:
        dispatch(findCatalogueRequest(id))
        break
      default:
        break
    }
  }

  /**
   * 节点右键点击事件
   * 右键点击时, 只需要获取坐标信息, id, 以及文件类型
   * @param {Object} e Event && Node
   */
  onNodeRightClick = e => {
    const { pageX, pageY } = e.event
    const { type, id } = e.node.props

    // 只允许目录具备右键功能
    if (type === 2) {
      this.props.dispatch(contextMenu({
        id,
        pageX,
        pageY,
        menuVisible: true
      }))
    }
  }

  /**
   * 关闭右键菜单
   */
  onCloseContextMenu = () => {
    this.props.dispatch(contextMenu({
      menuVisible: false
    }))
  }

  /**
   * 显示增加导航弹出框
   * @param {Number} type 1 产品  2 目录
   */
  onShowModal = type => {
    debugger
    switch(type) {
      case 1:
        this.props.dispatch(contextMenu({
          menuVisible: false,
          modalVisible: true,
          modalTitle: '增加一个产品',
          addType: type
        }))
        break
      case 2:
        this.props.dispatch(contextMenu({
          menuVisible: false,
          modalVisible: true,
          modalTitle: '增加一个目录',
          addType: type
        }))
        break
      default:
        break
    }
  }

  /**
   * 隐藏增加导航弹出框
   */
  onHideModal = () => {
    this.props.dispatch(contextMenu({
      menuVisible: false,
      modalVisible: false,
      modalTitle: '',
      addType: 0
    }))
  }

  /**
   * 增加一级菜单目录
   * @param {Object} values 表单的参数
   */
  onAddMainCatalogue = ({ name }) => {
    this.props.dispatch(addCatalogueRequest({ name }))
  }

  /**
   * 增加菜单导航
   * @param {Object} values 表单的参数
   */
  onAddCatalogue = ({ name, key }) => {
    this.props.dispatch(addCatalogueRequest({
      parentId: this.props.configuration.contextMenu.id,
      name,
      href: key
    }))
  }

  /**
   * 增加项目(产品)导航
   * @param {Object} values 表单的参数
   */
  onAddProduct = values => {
    const params = values
    params.parentId = this.props.configuration.contextMenu.id

    this.props.dispatch(addProductRequest(params))
  }

  /**
   * 更新目录导航
   * @param {String} name 更新的名字
   * @param {String} id   该导航的id
   */
  onUpdateCatalogue = ({ name, id, key }) => {
    this.props.dispatch(updateCatalogueRequest({
      id, name, href: key
    }))
  }

  /**
   * 更新项目(产品)导航
   * @param {Object} params params
   */
  onUpdateProduct = params => {
    this.props.dispatch(updateProductRequest(params))
  }

  /**
   * 删除目录导航
   */
  onDeleteCatalogue = () => {
    const { id } = this.props.configuration.currTreeNav
    this.props.dispatch(deleteCatalogueRequest(id))
  }

  /**
   * 删除项目(产品)导航
   */
  onDeleteProduct = () => {
    const { id } = this.props.configuration.currTreeNav
    const { pic } = this.props.configuration.productDetail
    this.props.dispatch(deleteProductRequest(id, pic))
  }

  render() {
    const {
      treeNav,
      currTreeNav,
      contextMenu,
      productDetail,
      catalogueDetail,
      pending
    } = this.props.configuration

    const {
      modalVisible,
      modalTitle,
      modalValue,
      addType
    } = contextMenu

    return (
      <div className='configuration-container'>
        {/* 加载中 */}
        <div
          className='spining-container'
          style={{ display: pending ? '' : 'none' }}
        >
          <Spin
            spinning={pending}
            tip='loading...'
          />
        </div>

        <header>后台管理系统</header>

        <main>

          <Modal
            title={modalTitle}
            visible={modalVisible}
            width={650}
            footer={null}
            onCancel={this.onHideModal}
          >
            {addType === 1
              ? <FormProduct
                label='提交'
                onSubmit={this.onAddProduct}
              />
              : <FormCatalogue
                label='提交'
                onSubmit={this.onAddCatalogue}
              /> }
          </Modal>

          {treeNav.data.length ? (
            <Tree
              treeNav={treeNav.data}
              contextMenu={contextMenu}
              onAddNav={this.onShowModal}
              onAddMainCatalogue={this.onAddMainCatalogue}
              onNodeClick={this.onNodeClick}
              onNodeRightClick={this.onNodeRightClick}
              onCloseContextMenu={this.onCloseContextMenu}
            />
          ) : null}

          <Content
            currTreeNav={currTreeNav}
            catalogueDetail={catalogueDetail}
            productDetail={productDetail}
            onUpdateCatalogue={this.onUpdateCatalogue}
            onUpdateProduct={this.onUpdateProduct}
            onDeleteCatalogue={this.onDeleteCatalogue}
            onDeleteProduct={this.onDeleteProduct}
          />
        </main>
      </div>
    )
  }
}

export default Configuration
