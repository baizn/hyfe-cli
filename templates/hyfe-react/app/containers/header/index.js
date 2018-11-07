/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: header组件
 * @Date: 2018-09-11 13:58:58
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-09-11 13:58:58
 */

import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header as Menu } from '@/components'
import reduxSagaInjector from '@/util/reduxSagaInjector'

const { Header } = Layout
const mapStateToProps = ({ navs }) => navs || {}

@connect(mapStateToProps)
export default withRouter(class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 0
    }
  }

  componentDidMount = () => {
    const { dispatch, history } = this.props

    // 请求数据
    reduxSagaInjector(dispatch, 'NAVS')('fetchNavs', null, 'navs')

    history.listen(location => {
      this.setMenuActive(location)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props

    this.setMenuActive(history.location, nextProps.navList)
  }

  setMenuActive(location, nextList) {
    const { navList } = this.props
    const list = navList || nextList

    if(list) {
      const currentRouter = location.pathname.split('/')
        .slice(0, 3)
        .join('/')

      for(let i = 0; i < list.length; i++) {
        if(list[i].key === currentRouter) {
          this.setState({
            selected: i
          })
          break
        }
      }
    }
  }

  /**
   * 渲染 Header
   * @returns {*}
   */
  render() {
    const { navList } = this.props

    if(!navList || navList.length === 0) {
      return ''
    }

    return (
      <Header className='header'>
        <Menu data={navList} selected={this.state.selected} />
      </Header>
    )
  }
})
