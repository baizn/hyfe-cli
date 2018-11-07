/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 产品展示
 * @Date: 2018-09-20 11:31:35
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-20 11:31:35
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDShow from '@/components/productShow'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import defaultImg from '@/components/projectShow/images/default.png'
import PieChart from './pieChart'
import loadScene from './webgl-bg'
import Popup from '../popup'

const mapStateToProps = ({ navs, pdMenuLink, pdShow }) => {
  return {
    navs: navs || {},
    pdMenuLink: pdMenuLink || {},
    pdShow: pdShow || {}
  }
}

@connect(mapStateToProps)
export default class extends Component {
  constructor(props) {
    super(props)

    this.isLoadMenu = true // 是否加载饼图第二层菜单

    this.state = {
      index: 0, // 当前点击的最外层圆菜单的索引
      listBox: false, // 产品列表框是否显示
      popupShow: false, // 弹出框状态
      popupContent: null // 弹出框内容
    }
  }

  componentDidMount() {
    const { navs: { navList } } = this.props

    this.fetchMenuLink(navList)
    // 启用粒子背景
    setTimeout(loadScene, 1000)
  }

  componentWillReceiveProps = (nextProps) => {
    const { navs: { navList } } = nextProps

    this.fetchMenuLink(navList)
  }

  /**
   * 根据条件请求链接菜单数据（饼图第二层菜单）
   * @param {array} navList 导航菜单数据集
   */
  fetchMenuLink(navList) {
    if(navList && this.isLoadMenu) {
      this.isLoadMenu = false
      const { dispatch } = this.props

      // 发送链接菜单请求（饼图第二层菜单）
      reduxSagaInjector(dispatch, 'PD-MENU-LINK')('fetchPJShow', {
        key: navList[2].children[0].id,
        pageSize: 4,
        currentPage: 1
      }, 'pdMenuLink')
    }
  }

  /**
   * 点击二级菜单事件（最外层圆菜单）
   * @param {string} id 菜单id
   * @param {number} index 当前点击的菜单索引
   */
  onClick = (id, index) => {
    this.setState({
      index: index,
      listBox: true
    })

    const { dispatch } = this.props

    // 请求产品列表数据
    reduxSagaInjector(dispatch, 'PDSHOW')('fetchPJShow', {
      key: id,
      pageSize: 4,
      currentPage: 1
    }, 'pdShow')
  }

  onVClick = (href, e) => {
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
   * 关闭弹窗
   */
  onClose = () => {
    this.setState({
      popupShow: false,
      popupContent: null
    })
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

  render() {
    const {
      navs,
      pdMenuLink,
      history,
      pdShow
    } = this.props

    // 弹出框数据
    const { popupShow, popupContent } = this.state

    // 处理产品列表数据
    const { resourceList: pdList } = pdShow
    const { state: { index, listBox } } = this

    // 处理产品菜单数据（饼图第一层菜单）
    let pdMenu = []
    const { pathname } = history.location
    const currentPathname = pathname.split('/').slice(0, 3).join('/')
    const { navList } = navs
    if(navList) {
      navList.forEach(o => {
        if(o.key === currentPathname) {
          pdMenu = o.children
        }
      })
    }

    // 处理产品展示饼图链接菜单数据
    const { resourceList } = pdMenuLink

    return [
      <canvas id='hyshow-webgl-bg' className='pd-container-bg' key='pd-container-bg' />,
      <div className='pd-container' key='pd-container'>
        <PDShow data={pdMenu} selected={index} onClick={this.onClick}>
          <PieChart className='center-pie-menu' data={resourceList || []} />
          {
            // 饼图中央的链接为饼图第一层菜单数据集里索引为0的数据对象
            pdMenu.length
              ? (
                <div className='center-link' onClick={this.onVClick.bind(this, pdMenu[0].href)}>
                  {pdMenu[0].name}
                </div>
              )
              : (
                <div className='center-link' />
              )
          }
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
        </PDShow>
        {
          pdList
            ? (
              <div
                className={`pd-product-box ${index && (index === 1 || index === 4) ? 'left' : 'right'}`}
                style={{
                  display: listBox ? 'block' : 'none'
                }}
              >
                <ul className='pd-outer-content'>
                  {
                    pdList.map((o, i) => {
                      return (
                        <li key={`pd-item-${i}`} className='pd-product-item'>
                          <a href={o.href} target='_blank'>{`• ${o.title}`}</a>
                          <div className='pd-product-content'>
                            <div className='pd-img'>
                              <img src={o.imgUrl ? `http://192.168.5.21:8090/${o.imgUrl}` : defaultImg} alt='' />
                            </div>
                            <div className='pd-intr' onClick={this.onDetails.bind(this, o)}>
                              {
                                o.introduction && o.introduction !== 'undefined'
                                  ? o.introduction
                                  : '暂无介绍'
                              }
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
            : null
        }
      </div>,
      <div key='pd-waves' className='waves'>
        <div className='wave wave_1' />
        <div className='wave wave_2' />
        <div className='wave wave_3' />
        <div className='wave wave_4' />
        <div className='wave wave_5' />
      </div>
    ]
  }
}
