/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-10 11:12:06
 * @Description: 配置页面
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-17 12:36:10
 */

import React, { Component } from 'react'
import { Tree, Menu, Icon, Input } from 'antd'
import randomString from '@/util/randomString'
import { FormMainCatalogue } from '@/components'
import './index.scss'

const { TreeNode } = Tree

class TreeConfig extends Component {
  /**
   * 渲染节点
   * @param  {Array}  data 数据源
   * @return {Object} JSX
   */
  renderTreeNodes = data => (
    data.map(item => {
      const icon = item.type === 2
        ? <Icon type='folder' />
        : <Icon type='file-text' />
      if (item.children) {
        return (
          <TreeNode
            id={item.id}
            pId={item.pId}
            type={item.type}
            title={item.name}
            icon={icon}
            // TODO: 使目录与项目目录 key 值唯一
            // key={randomString(10)}
            key={String(item.id) + String(item.pId)}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }

      return (
        <TreeNode
          id={item.id}
          pId={item.pId}
          type={item.type}
          icon={icon}
          title={item.name}
          // TODO: 使目录与项目目录 key 值唯一
          // key={randomString(10)}
          key={String(item.id) + String(item.pId)}
        />
      )
    })
  )

  /**
   * 渲染右键列表
   * @return {Object} JSX
   */
  renderContextMenu = () => {
    const {
      contextMenu, onAddNav, onCloseContextMenu
    } = this.props
    const { pageX, pageY, menuVisible } = contextMenu
    const menu = (
      <Menu
        style={{
          position: 'absolute',
          left: `${pageX + 20}px`,
          top: `${pageY}px`,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)'
        }}
      >
        <Menu.Item key='1' onClick={() => onAddNav(1)}>新增项目(产品)</Menu.Item>
        <Menu.Item key='2' onClick={() => onAddNav(2)}>新增目录</Menu.Item>
        <Menu.Item key='close' onClick={() => onCloseContextMenu()}>关闭菜单</Menu.Item>
      </Menu>
    )

    return menuVisible ? menu : ''
  }

  render() {
    const {
      treeNav, onNodeClick, onNodeRightClick, onAddMainCatalogue
    } = this.props

    return (
      <div className='tree-container'>
        <FormMainCatalogue
          onSubmit={onAddMainCatalogue}
        />

        <Tree
          showLine
          showIcon
          onSelect={(selectedKeys, e) => onNodeClick(selectedKeys, e)}
          onRightClick={e => onNodeRightClick(e)}
        >
          {this.renderTreeNodes(treeNav)}
        </Tree>

        {this.renderContextMenu()}
      </div>
    )
  }
}

export default TreeConfig
