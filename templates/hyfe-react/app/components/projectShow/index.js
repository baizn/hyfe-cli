/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 项目展示
 * @Date: 2018-09-12 16:46:45
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-12 16:46:45
 */

import React from 'react'
import defaultCover from './images/default.png'
import './index.scss'

export default props => {
  const {
    children,
    linkType,
    onClick,
    onDetails,
    data,
    isList
  } = props

  const [listSwitch, ...rest] = children

  return (
    <div className='pj-container'>
      {listSwitch}
      <div className={isList ? `pj-list` : `pj-matrix`}>
        {
          data.map((item, index) => {
            const href = linkType(item.href)
            return isList
              ? (
                <div className='item' key={index}>
                  <a
                    href={href}
                    target='_blank'
                    className='pic-container'
                    onClick={href.indexOf('javascript') === -1 ? null : onClick.bind(this, item.href)}
                  >
                    <img src={!item.imgUrl ? defaultCover : `http://192.168.5.21:8090/${item.imgUrl}`} alt='' />
                    <p className='item-title'>{item.title}</p>
                  </a>
                </div>
              )
              : (
                <div
                  className={`item ${index % 2 === 0 ? 'item-left' : 'item-right'}`}
                  key={index}
                >
                  <div className='item-container'>
                    <a
                      href={href}
                      target='_blank'
                      className='pic-container'
                      onClick={href.indexOf('javascript') === -1 ? null : onClick.bind(this, item.href)}
                    >
                      <img src={!item.imgUrl ? defaultCover : `http://192.168.5.21:8090/${item.imgUrl}`} alt='' />
                    </a>
                    <div className='info-container'>
                      <p className='pj-name'>{item.title}</p>
                      <p
                        className='pj-desc'
                        onClick={onDetails.bind(this, item)}
                      >
                        {item.introduction}
                      </p>
                    </div>
                  </div>
                </div>
              )
          })
        }
      </div>
      {rest}
    </div>
  )
}
