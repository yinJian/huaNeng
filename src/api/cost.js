import { request } from '@/libs/request'

const addTsysrate = data => {
  return request({
    url: 'bizMonitor/tsysrate',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'put'
  })
}

const getTsysrateList = data => {
  return request({
    url: 'bizMonitor/tsysrate/page',
    method: 'get'
  })
}

const saveBatch = data => {
  return request({
    url: 'bizMonitor/tsyscostaccounting/saveBatch',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const getTsyscostaccountingList = name => {
  return request({
    url: 'bizMonitor/tsyscostaccounting/page/' + name,
    method: 'get'
  })
}
export default {
//   getBatchByManaID,
  addTsysrate,
  getTsysrateList,
  saveBatch,
  getTsyscostaccountingList
}
