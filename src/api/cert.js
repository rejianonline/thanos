import request from '@/utils/request'

export function getHouseList() {
  return request({
    url: '/api/admin/house/listNeedVerify',
    method: 'get'
  })
}
