/**
 * @Author: baizn
 * @Email: baizhanning@hiynn.com
 * @Description: 应用程序容器组件主文件
 * @Date: 2018-03-07 14:41:58
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-09-11 11:39:36
 */

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Primary from './primaryContainer'
import Configuration from './configuration'

export default class AppContainer extends Component {
  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/hyshow/conf' component={Configuration} />
            <Route path='/' component={Primary} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
