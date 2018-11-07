export default {
  url: '/catalogueDetail?id={id}',
  mock: {
    'code': 1,
    'msg': 'success',
    'result': {
      'id': '@id',
      'name': '@cname'
    }
  }
}
