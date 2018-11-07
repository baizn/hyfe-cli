/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 项目展示组件
 * @Date: 2018-09-12 16:49:12
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-12 16:49:12
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PJShow from '@/components/projectShow'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import config from '@/config'
import LoadMore from '../loadMore'
import Popup from '../popup'

const mapStateToProps = ({ pjShow, navs }) => {
  return {
    pjShow: pjShow || {},
    navs: navs || {}
  }
}

@connect(mapStateToProps)
export default class extends Component {
  constructor(props) {
    super(props)

    this.isLoadMore = false // 加载数据方式：true 加载更多；false 重新加载
    this.isLoadMenu = true // 是否加载二级菜单
    this.pageSize = 10 // 每页显示条数
    this.currentPage = 0 // 当前页码
    this.loadedData = [] // 在同一个 id 下存储的所有数据
    this.state = {
      menuId: null, // 当前二级菜单id
      isList: true, // 展示方式：true 列表展示；false 封面展示
      popupShow: false, // 点击项目视频后弹出框的状态
      popupContent: null // 弹出框内容
    }
  }

  /**
   * 发送请求
   */
  componentDidMount() {
    const { dispatch, navs: { navList } } = this.props

    if(navList && this.isLoadMenu) {
      this.fetch(dispatch, `all${navList[1].id}`)
    }
  }

  /**
   * 处理列表及分页数据
   * @param {object} nextProps 下一个Props
   */
  componentWillReceiveProps = (nextProps) => {
    const {
      pjShow,
      dispatch,
      navs: { navList }
    } = nextProps

    // 处理本页面二级菜单数据
    if(navList && this.isLoadMenu) {
      this.fetch(dispatch, `all${navList[1].id}`)
    }

    // 处理页面数据
    if(Object.keys(pjShow).length) {
      const { resourceList, pageInfo } = pjShow
      const { currentPage } = pageInfo

      this.loadedData = this.isLoadMore
        ? this.loadedData.concat(resourceList)
        : resourceList || []
      this.currentPage = currentPage
      this.isLoadMore = false
    }
  }

  /**
   * 列表切换事件
   * @param {object} e event
   */
  onToggle = (e) => {
    this.setState({
      isList: !e.target.classList.toggle('matrix')
    })
  }

  /**
   * 点击项目事件（当项目链接为 config 配置文件里面指定的视频格式时触发）
   * @param {string} href 点击项目后回传的路径
   */
  onClick = (href, e) => {
    this.setState({
      popupShow: true,
      popupContent: (
        <video
          src={href}
          width='1028px'
          height='580px'
          controls='controls'
        />
      )
    })
  }

  /**
   * 二级菜单切换
   * @param {string} id 二级菜单id
   * @param {object} e event
   */
  onMenuClick = (id, e) => {
    const { dispatch } = this.props

    this.setState({
      menuId: id
    })

    this.fetch(dispatch, id)
  }

  /**
   * 查看项目介绍详情
   * @param {object} item 项目详情
   */
  onDetails = (item) => {
    this.setState({
      popupShow: true,
      popupContent: (
        <div className='pj-details'>
          <p className='pj-det-title'>{item.title} - 详情</p>
          <p>
            <span>功能描述:</span>
            {!item.introduction || item.introduction === 'undefined' ? '暂无数据' : item.introduction}
          </p>
          <p>
            <span>目 标:</span>
            {!item.goal || item.goal === 'undefined' ? '暂无数据' : item.goal}
          </p>
          <p>
            <span>定 位:</span>
            {!item.locate || item.locate === 'undefined' ? '暂无数据' : item.locate}
          </p>
          <p>
            <span>实施环境:</span>
            {!item.environment || item.environment === 'undefined' ? '暂无数据' : item.environment}
          </p>
          <p>
            <span>备 注:</span>
            {!item.remark || item.remark === 'undefined' ? '暂无数据' : item.remark}
          </p>
        </div>
      )
    })
  }

  /**
   * 关闭弹出框的回调事件
   */
  onClose = () => {
    this.setState({
      popupShow: false,
      popupContent: null
    })
  }

  /**
   * 加载更多回调事件
   * @returns {boolean} 是否执行完成
   */
  onLoadMore = () => {
    this.isLoadMore = true
    this.fetch(this.props.dispatch, this.state.menuId)
    return true
  }

  /**
   * 发送请求
   * @param {object} dispatch dispatch 对象
   * @param {string} id 点击的菜单的ID
   */
  fetch(dispatch, id) {
    this.isLoadMenu = false
    this.setState({
      menuId: id
    })
    // 请求数据
    reduxSagaInjector(dispatch, 'PJSHOW')('fetchPJShow', {
      key: id,
      pageSize: this.pageSize,
      currentPage: this.isLoadMore ? this.currentPage + 1 : 1
    }, 'pjShow')
  }

  /**
   * 处理链接地址
   * 如果是视频连接，则返回处理后的链接；否则返回原链接
   * @param {string} href 后台返回的链接地址
   * @returns {*} 返回处理后的链接
   */
  linkType = (href) => {
    // 从 config 配置文件加载需要处理的视频后缀
    const videoSuffix = config.get('videoSuffix')
      .join('/')
    const currentSuffix = href.substring(href.lastIndexOf('.'))

    if(videoSuffix.indexOf(currentSuffix) === -1) {
      return href
    }
    return `javascript: void(0)`
  }

  /**
   * 渲染项目展示 DOM
   * @returns {*}
   */
  render() {
    const { loadedData, state: { popupShow, popupContent } } = this
    const { pjShow: { pageInfo }, navs: { navList } } = this.props

    const { isList } = this.state

    // 准备本页面二级菜单数据
    let pjMenu = null
    if(navList) {
      for(let i = 0; i < navList.length; i++) {
        if(navList[i].key === '/hyshow/pjshow') {
          pjMenu = navList[i]
        }
      }

      // 本页面二级菜单按照 menu_order 字段升序排列
      navList[1].children.sort((a, b) => {
        return a['menu_order'] - b['menu_order']
      })
    }

    return (
      <PJShow
        data={loadedData}
        isList={isList}
        linkType={this.linkType}
        onClick={this.onClick}
        onDetails={this.onDetails}
      >
        <div className='list-switch'>
          {
            pjMenu ? (
              <ul className='pj-menu'>
                <li
                  onClick={this.onMenuClick.bind(this, `all${pjMenu.id}`)}
                  key='pj-menu-0'
                  className={this.state.menuId === `all${pjMenu.id}` ? 'active' : ''}
                >全部
                </li>
                {
                  pjMenu.children.map((o, i) => {
                    return (
                      <li
                        key={`pj-menu-${i + 1}`}
                        onClick={this.onMenuClick.bind(this, o.id)}
                        className={this.state.menuId === o.id ? 'active' : ''}
                      >{o.name}</li>
                    )
                  })
                }
              </ul>
            ) : null
          }
          <span
            onClick={this.onToggle}
            className={isList ? '' : 'matrix'}
            title={`显示为${isList ? '列表' : '图片'}`}
          />
        </div>
        {
          !loadedData || !loadedData.length
            ? <p className='no-data'>暂无数据</p>
            : null
        }
        <LoadMore data={pageInfo} onLoadMore={this.onLoadMore.bind(this)} />
        <Popup
          style={{
            width: '1028px',
            height: '580px'
          }}
          show={popupShow}
          onClose={this.onClose}
        >
          {popupContent}
        </Popup>
      </PJShow>
    )
  }
}
