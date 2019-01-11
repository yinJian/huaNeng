import { request } from '@/libs/request'

const getRoomSyncInfoByFloorId = params => {
  return request({
    url: 'intelligent/intelligent/getRoomSyncInfoByFloorId',
    params
  })
}

const getAlarmInfo = params => {
  return request({
    url: 'intelligent/alarm/getAlarmInfo',
    params
  })
}

const authSyncBatch = (data, beginTime, endTime, operateType = 0) => {
  return request({
    url: `intelligent/intelligent/authSyncBatch?operateType=${operateType}&beginTime=${beginTime}&endTime=${endTime}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const authSyncBatchForRoom = (data, beginTime, endTime) => {
  return request({
    url: `intelligent/intelligent/authSyncBatchForRoom?operateType=0&beginTime=${beginTime}&endTime=${endTime}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const authSyncBatchForRoomCancel = (data, beginTime, endTime) => {
  return request({
    url: `intelligent/intelligent/authSyncBatchForRoom?operateType=1&beginTime=${beginTime}&endTime=${endTime}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const selectTrajectoryByPersonID = params => {
  return request({
    url: 'intelligent/trajectory/selectTrajectoryByPersonID',
    params
  })
}

const defenceWithdrawal = data => {
  return request({
    url: `intelligent/intelligent/defenceWithdrawal`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export default {
  getRoomSyncInfoByFloorId,
  getAlarmInfo,
  authSyncBatch,
  authSyncBatchForRoom,
  selectTrajectoryByPersonID,
  defenceWithdrawal,
  authSyncBatchForRoomCancel
}
