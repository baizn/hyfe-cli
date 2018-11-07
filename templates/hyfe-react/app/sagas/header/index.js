/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: header mock 数据
 * @Date: 2018-07-04 17:18:22
 * @Last Modified by: Oceanxy（xieyang@hiynn.com）
 * @Last Modified time: 2018-07-04 17:18:22
 */

export default {
  url: '/navs',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'navList': [
        {
          type: 0,
          id: '0',
          key: '/hyshow',
          name: '公司首页'
        },
        {
          type: 1,
          id: '1',
          key: '/hyshow/pjshow',
          name: '项目展示',
          children: [
            {
              type: 1,
              id: '11',
              key: '/hyshow/pjshow',
              name: '刑侦'
            },
            {
              type: 2,
              id: '12',
              key: '/hyshow/pjshow',
              name: '情报'
            },
            {
              type: 3,
              id: '13',
              key: '/hyshow/pjshow',
              name: '其他'
            }
          ]
        },
        {
          type: 2,
          id: '2',
          key: '/hyshow/pdshow',
          name: '产品展示',
          children: [
            {
              type: 1,
              id: '21',
              key: '/hyshow/pdshow',
              name: '产品服务部',
              href: 'www.baidu.com'
            },
            {
              type: 2,
              id: '22',
              key: '/hyshow/pdshow',
              name: '智图研发部'
            },
            {
              type: 3,
              id: '23',
              key: '/hyshow/pdshow',
              name: '赋能平台'
            },
            {
              type: 4,
              id: '24',
              key: '/hyshow/pdshow',
              name: '数据指挥调度部'
            },
            {
              type: 5,
              id: '25',
              key: '/hyshow/pdshow',
              name: '其他'
            }
          ]
        },
        {
          type: 3,
          id: '3',
          key: '/hyshow/eas',
          name: '赋能与服务',
          href: 'www.hydata.cc'
        }
      ]
    }
  }
}
