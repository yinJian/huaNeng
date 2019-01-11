import { request } from '@/libs/request'

// const getDeptTree = () => {
//   return request({
//     url: 'admin/dept/user-tree',
//     method: 'get'
//   })
// }

// const addUser = data => {
//   return request({
//     url: 'admin/user',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     data,
//     method: 'post'
//   })
// }
const addcomputer = data => {
  return request({
    url: 'bizMonitor/tsysdevice/addDevice',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const computerlist = name => {
  return request({
    url: 'bizMonitor/tsysdevice/getDeviceInfo',
    method: 'get'
  })
}
const computerdetail = name => {
  return request({
    url: 'bizMonitor/tsysdevice/' + name,
    method: 'get'
  })
}

const editcomputer = data => {
  return request({
    url: 'bizMonitor/tsysdevice/updateDeviceInfoBatch',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'put'
  })
}

const deletecomputer = name => {
  return request({
    url: 'bizMonitor/devicearea/removeByDeviceIdAndPositionId' + name,
    method: 'delete'
  })
}

const desktopList = name => {
  return request({
    url: 'bizMonitor/tsysterminal/getTerminoInfo',
    method: 'get'
  })
}

const adddesktop = data => {
  return request({
    url: 'bizMonitor/tsysterminal/addTerminal',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const editdesktop = data => {
  return request({
    url: 'bizMonitor/tsysterminal/updateTerminal',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'put'
  })
}

const desktopdetail = name => {
  return request({
    url: 'bizMonitor/tsysterminal/' + name,
    method: 'get'
  })
}

const deletedesktop = name => {
  return request({
    url: 'bizMonitor/devicearea/removeByTerminalIdAndPositionId' + name,
    method: 'delete'
  })
}

const getbumen = name => {
  return request({
    url: 'bizMonitor/tsysdeptment/page',
    method: 'get'
  })
}

const getlouhao = name => {
  return request({
    url: 'bizMonitor/tsysconfroom/getBuilNo' + name,
    method: 'get'
  })
}

const getlouceng = name => {
  return request({
    url: 'bizMonitor/tsysfloor/page' + name,
    method: 'get'
  })
}

const gethuiyi = name => {
  return request({
    url: 'bizMonitor/tsysconfroom/page' + name,
    method: 'get'
  })
}

const getshebei = name => {
  return request({
    url: 'bizMonitor/tsysdevice/page' + name,
    method: 'get'
  })
}
export default {
  addcomputer,
  computerlist,
  computerdetail,
  editcomputer,
  deletecomputer,
  desktopList,
  adddesktop,
  editdesktop,
  desktopdetail,
  deletedesktop,
  getbumen,
  getlouhao,
  getlouceng,
  gethuiyi,
  getshebei
}
