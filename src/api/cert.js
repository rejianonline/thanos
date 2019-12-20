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
    url: `/adminApi/admin/house/verifyHouse?houseDetailId=${data.houseDetailId}&status=${data.status}`,
    method: 'post'
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
    url: `/adminApi/admin/identify/verifyId?accId=${data.accId}&cardStatus=${data.cardStatus}&bodyStatus=${data.bodyStatus}`,
    method: 'post'
  })
}

// 姿势照片认证
export function certPoseImg(data = {}) {
  return request({
    url: `/adminApi/admin/identify/verifyPose?accId=${data.accId}&poseStatus=${data.poseStatus}`,
    method: 'post'
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
    url: `/adminApi/admin/edu/verifyEdu?eduDetailId=${data.eduDetailId}&status=${data.status}`,
    method: 'post'
  })
}

// 精选照片审核列表
export function getPhotoList(params = {}) {
  return request({
    url: '/adminApi/admin/selectPic/listNeedVerifyAccount',
    method: 'get',
    params
  })
}

// 审核精选照片详情页
export function certPhotoDetails(params = {}) {
  return request({
    url: '/adminApi/admin/selectPic/listSelectPicByAccId',
    method: 'get',
    params
  })
}

// 审核一张精选图片
export function certPhoto(data = {}) {
  return request({
    url: '/adminApi/admin/selectPic/verifyOneSelectPic',
    method: 'post',
    data
  })
}

// 提现列表
export function getWithdrawList(params = {}) {
  return request({
    url: '/adminApi/admin/withDraw/listNeedVerifyWithDraw',
    method: 'get',
    params
  })
}

// 提现详情
export function WithdrawDetails(params = {}) {
  return request({
    url: '/adminApi/admin/withDraw/getNeedVerifyWithDrawInfo',
    method: 'get',
    params
  })
}
