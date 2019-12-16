import request from '@/utils/request'

// 获取房产认证列表
export function getHouseList(param) {
  return request({
    url: '/adminApi/admin/house/listNeedVerify',
    method: 'get',
    param
  })
}

// 房产认证
export function certHouse(data = {}) {
  return request({
    url: '/adminApi/admin/house/verifyHouse',
    method: 'post',
    data
  })
}

// 实名认证列表
export function getAuthNameList(param = {}) {
  return request({
    url: '/adminApi/admin/identify/listNeedVerify',
    method: 'get',
    param
  })
}

// 认证身份证照片
export function certCardImg(data = {}) {
  return request({
    url: '/adminApi/admin/identify/verifyId',
    method: 'post',
    data
  })
}

// 姿势照片认证
export function certPoseImg(data = {}) {
  return request({
    url: '/adminApi/admin/identify/verifyPose',
    method: 'post',
    data
  })
}

// 学历认证列表
export function getEduList() {
  return request({
    url: '/adminApi/admin/edu/listNeedVerify',
    method: 'get'
  })
}

// 认证学历
export function certEdu(data = {}) {
  return request({
    url: '/adminApi/admin/edu/verifyEdu',
    method: 'post',
    data
  })
}
