/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 页面 DOM 骨架
 * @Date: 2018-09-11 15:28:34
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-11 15:28:34
 */

import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './header'
import Home from './home'
import Project from './projectShow'
import Product from './productShow'
import EmpowermentAndService from './empowermentAndService'

const { Content } = Layout

export default class extends Component {
  render() {
    return (
      <Layout className='app'>
        <Header />
        <Content className='content'>
          <Switch>
            <Route react path='/hyshow' exact component={Home} />
            <Route path='/hyshow/pjshow' component={Project} />
            <Route path='/hyshow/pdshow' component={Product} />
            <Route path='/hyshow/eas' component={EmpowermentAndService} />
            <Redirect to='/hyshow' />
          </Switch>
        </Content>
      </Layout>
    )
  }
}
