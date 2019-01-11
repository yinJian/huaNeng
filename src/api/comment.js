import { request } from '@/libs/request'

const commentMangeList = name => {
  return request({
    url: '/eva/hotelevaluate/getExpertsRemindList/' + name,
    method: 'get'
  })
}

const mangerCommentList = name => {
  return request({
    url: '/eva/expertevaluate/getExpertByEvatorAndProjectIsEvaluate/' + name,
    method: 'get'
  })
}

const getKongbaiPage = name => {
  return request({
    url: 'eva/evaluateitem/page',
    method: 'get'
  })
}

const getHotelWaitForEva = name => {
  return request({
    url: 'eva/hotelevaluate/getHotelWaitForEva',
    method: 'get'
  })
}

const hotelevaluate = data => {
  return request({
    url: 'eva/hotelevaluate',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const getMangerExpertList = name => {
  return request({
    url: 'eva/expertevaluate/getExpertByEvatorAndProjectIsEvaluate' + name,
    method: 'get'
  })
}

const saveMangerExpertTable = data => {
  return request({
    url: 'eva/expertevaluate/insertEvaluate',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const getDailiList = name => {
  return request({
    url: 'eva/agencyevaluate/getProjectManaByEndProject',
    method: 'get'
  })
}

const saveDailiTable = data => {
  return request({
    url: 'eva/agencyevaluate/addAgencyEvaluate',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}
export default {
  commentMangeList,
  mangerCommentList,
  getKongbaiPage,
  getHotelWaitForEva,
  hotelevaluate,
  getMangerExpertList,
  saveMangerExpertTable,
  getDailiList,
  saveDailiTable
}
