/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 弹出层组件
 * @Date: 2018-09-21 09:45:13
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-21 09:45:13
 */

import React, { Component } from 'react'
import Popup from '@/components/popup'

export default class extends Component {
  static defaultProps = {
    style: {
      width: '500px',
      height: '300px'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    const { show } = this.props

    this.setState({
      show: show
    })
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps

    this.setState({
      show: show
    })
  }

  /**
   * 弹出框关闭事件
   */
  onClose = () => {
    const { onClose } = this.props

    this.setState({
      show: false
    })

    // 执行父级的弹出框关闭回调函数，如果有
    if(typeof onClose === 'function') {
      onClose()
    }
  }

  render() {
    const {
      state: { show },
      props: { style, children }
    } = this

    return (
      <Popup
        style={{
          ...style,
          display: show ? 'block' : 'none'
        }}
        onClose={this.onClose}
      >
        {children}
      </Popup>
    )
  }
}
