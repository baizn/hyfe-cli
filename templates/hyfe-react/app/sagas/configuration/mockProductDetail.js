export default {
  url: '/productDetail?id={id}',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'id': '@id',
      'name': '@cname',
      'goal': '@ctitle',
      'locate': '@csentence',
      'introduction': '@cparagraph',
      'environment': '@ctitle',
      'remark': '@ctitle',
      'href': '@url',
      'pic': '@image'
    }
  }
}
