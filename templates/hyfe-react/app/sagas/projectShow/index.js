/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 项目展示 mock 数据
 * @Date: 2018-09-12 16:50:27
 * @Last Modified by: Oceanxy
 * @Last Modified time: 2018-09-12 16:50:27
 */

export default {
  url: '/get/projects?key={key}&currentPage={currentPage}&pageSize={pageSize}',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'resourceList|5': [
        {
          'imgUrl': '',
          'goal': '目标',
          'introduction': '系统主要有6 个页面，主界面、源头控制、过程监督、模型分析、可视化分析、事后监督。',
          'title': '@name',
          'href': '/static/html/xingzhen/index.html',
          'locate': '',
          'environment': '',
          'remark': ''
        }
      ],
      'pageInfo': {
        'totalCount': 100,
        'currentPage': 1,
        'totalPage': 10
      }
    }
  }
}
