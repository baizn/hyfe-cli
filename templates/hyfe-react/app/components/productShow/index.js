/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 产品展示
 * @Date: 2018-09-17 11:31:00
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-09-17 11:31:00
 */

import React from 'react'
import './index.scss'

export default props => {
  const { data, onClick, selected } = props

  return (
    <div className='pd-pie'>
      {
        data.map((o, i) => {
          if(i > 0 && i < 5) {
            return (
              <div
                className={`outer-pie-menu ${selected === i ? 'active' : ''}`}
                key={`pd-${i - 1}`}
                onClick={onClick.bind(this, o.id, i)}
              >
                <span>{o.name}</span>
              </div>
            )
          }
        })
      }
      {
        props.children
      }
    </div>
  )
}
