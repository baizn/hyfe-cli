/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-10 16:47:03
 * @Description: 右侧内容
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-13 17:42:35
 */

import React, { Component } from 'react'
import config from '@/config/base.config'
import './index.scss'

import FormCatalogue from '../form/catalogue'
import FormProduct from '../form/product'

class Content extends Component {
  render() {
    const { currTreeNav, productDetail, catalogueDetail } = this.props
    const { onUpdateCatalogue, onUpdateProduct, onDeleteCatalogue, onDeleteProduct } = this.props
    const { type, id } = currTreeNav

    return (
      <div className='content-container'>
        <div className='content-wrapper'>

          {(function () {
            if (id) {
              switch (type) {
                // 项目(产品) 导航
                case 1:
                  return [
                    <img
                      key='img'
                      src={config.proxyHost.replace('project-show', '') + productDetail.pic}
                      alt='' />,
                    <FormProduct
                      key='form'
                      mode='update'
                      label='提交'
                      onDelete={onDeleteProduct}
                      initValue={productDetail}
                      onSubmit={onUpdateProduct}
                    />
                  ]
                // 目录导航
                case 2:
                  return (
                    <FormCatalogue
                      mode='update'
                      label='更改'
                      onDelete={onDeleteCatalogue}
                      initValue={catalogueDetail}
                      onSubmit={onUpdateCatalogue}
                    />
                  )
                default:
                  return null
              }
            }
          }())}
        </div>
      </div>
    )
  }
}

export default Content
