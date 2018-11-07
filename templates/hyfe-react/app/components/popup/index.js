/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 弹出层组件
 * @Date: 2018-09-21 09:45:13
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-21 09:45:13
 */

import React from 'react'
import './index.scss'

export default (props) => {
  const { style, children, onClose } = props

  return (
    <div className='popup-box' style={style}>
      <div className='popup-close' onClick={onClose} />
      {children}
    </div>
  )
}

