import React, { Component } from 'react'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.homeCon.style.height = `${document.body.clientHeight - 84}px`
  }

  render() {
    return (
      <div className='content' ref={homeCon => this.homeCon = homeCon}>
        <video src='http://192.168.5.11:8085/hydata/hydata.mp4' width='1028px' height='580px' controls='controls' />
      </div>
    )
  }
}
