/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: header组件
 * @Date: 2018-09-11 14:02:01
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-09-12 15:52:35
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export default props => {
  const { data, selected } = props

  return (
    <div className='header-container'>
      <div className='logo' />
      <ul className='menu'>
        {
          data.map((o, i) => {
            return (
              <li key={o.key} data-index={i} className={selected === i ? 'active' : ''}>
                {
                  o.href
                    ? <a href={`http://${o.href}`} target='_blank' rel='noopener noreferrer'>{o.name}</a>
                    : <NavLink to={`${o.key}${o.children ? `/all${o.id}` : ''}`}>
                      {o.name}
                    </NavLink>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
