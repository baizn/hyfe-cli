/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 加载更多组件
 * @Date: 2018-09-13 14:43:35
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-13 14:43:35
 */

import React, { Component } from 'react'
import { Button } from 'antd'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loadMoreText: '加载更多'
    }
  }

  onLoadMore = (e) => {
    const { onLoadMore } = this.props

    if(!this.state.loading) {
      this.setState({ loading: true, loadMoreText: '加载中' })

      if(onLoadMore && onLoadMore(e)) {
        this.setState({ loading: false, loadMoreText: '加载更多' })
      }
    }
  }

  render() {
    const { data } = this.props

    if(!data || data.totalPage <= 1 || data.totalPage === data.currentPage) {
      return null
    }

    const { loading, loadMoreText } = this.state

    return (
      <div className='load-more'>
        <Button
          onClick={this.onLoadMore}
          className='load-btn'
          loading={loading}
        >
          {loadMoreText}
        </Button>
      </div>
    )
  }
}
