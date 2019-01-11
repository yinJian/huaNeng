import { request } from '@/libs/request'

// const addTsysrate = data => {
//   return request({
//     url: 'bizMonitor/tsysrate',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     data,
//     method: 'put'

//   })
// }
const getVideo = name => {
  return request({
    url: 'bizMonitor/tsysconfroom/getVideoSituationByRoomID' + name,
    method: 'get'
  })
}
export default {
//   getBatchByManaID,
  getVideo
}
