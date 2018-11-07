export default {
  url: '/treeNavs',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'treeNavList|4': [
        {
          'id': '@id',
          'name': '@ctitle',
          'type': 2,
          'children|3-5': [
            {
              'id': '@id',
              'name': '@cname',
              'type': 2,
              'children|5-10': [
                {
                  'id': '@id',
                  'pid|1000-10000': 1000,
                  'name': '@ctitle',
                  'type': 1
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
