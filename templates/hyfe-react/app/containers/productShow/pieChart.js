/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: e-charts圆环图组件
 * @Date: 2018-05-10 14:18:16
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-05-10 14:18:16
 */

import React, { Component } from 'react'
import echarts from 'echarts'

/**
 * @module
 */
export default class extends Component {
  constructor(props) {
    super(props)
    this.chart = null
    this.color = ['#0a816a', '#01505e', '#008bb8', '#07335e']
    this.option = {
      color: this.color,
      series: [
        {
          type: 'sunburst',
          radius: ['48%', '85%'],
          label: {
            show: true,
            rotate: 'tangential',
            fontSize: 16,
            color: '#ffffff',
            formatter: params => {
              return params.name
            }
          },
          itemStyle: {
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0)',
            shadowBlur: 0
          },
          emphasis: {
            label: {
              fontSize: 18
            },
            itemStyle: {
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, 0.8)',
              shadowBlur: 20
            }
          },
          nodeClick: 'link',
          data: []
        }
      ]
    }
  }

  /**
   * 这个方法在首次真实的DOM渲染后(render之后)调用（仅此一次）
   * - 当需要访问真实的DOM时，这个方法就经常用到
   * - 当需要请求外部接口数据，一般都在这里处理
   */
  componentDidMount() {
    const { keyWord, props: { data } } = this

    // 初始化echarts图表
    this.chart = echarts.init(keyWord)
    this.option.series[0].data = this.dataSet(data)
    this.chart.setOption(this.option)
    this.chart.resize(400, 400)
  }

  /**
   * 每当通过父组件更新子组件props时（这个也是唯一途径），这个方法就会被调用。
   * @param {json} nextProps 传递的新数据
   */
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    if(data.length) {
      this.option.series[0].data = this.dataSet(data)
      // 将数据渲染到图表
      this.chart.setOption(this.option)
      this.chart.resize(400, 400)
    }
  }

  /**
   * 处理后台返回的数据
   * @param {array} data 后台返回的数据
   * @returns {Array} 处理后的数据
   */
  dataSet(data) {
    const dataset = []

    if(data && data.length) {
      data.forEach(o => {
        o.name = o.title
        o.link = o.href
        o.value = 1
        dataset.push(o)
      })
    }

    return dataset
  }

  /**
   * 渲染列表
   * @returns {*}
   */
  render() {
    const { className } = this.props

    return (
      <div
        className={className}
        ref={keyWord => this.keyWord = keyWord}
      />
    )
  }
}
