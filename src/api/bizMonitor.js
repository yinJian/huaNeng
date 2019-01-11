import { request } from '@/libs/request'

const getBatchByManaID = params => {
  return request({
    url: 'bizMonitor/tsysproject/getBatchByManaID',
    method: 'get',
    params
  })
}

const getGroupByBatch = params => {
  return request({
    url: 'bizMonitor/tsysproject/getGroupByBatch',
    method: 'get',
    params
  })
}

const getProjectByGroup = params => {
  return request({
    url: 'bizMonitor/tsysproject/getProjectByGroup',
    methods: 'get',
    params
  })
}

const saveReserveInforDTO = data => {
  return request({
    url: 'bizMonitor/tconfreserveinfor/saveReserveInforDTO',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const getGateByFloorId = params => {
  return request({
    url: 'bizMonitor/tsysdevice/getGateByFloorId',
    method: 'get',
    params
  })
}

const getExpertsByGroupID = params => {
  return request({
    url: 'bizMonitor/tsysperson/getExpertsByGroupID',
    method: 'get',
    params
  })
}

const getPersonCloudDesktopList = params => {
  return request({
    url: 'bizMonitor/tsysperson/getPersonCloudDesktopList',
    method: 'get',
    params
  })
}

const updateGroupStatus = data => {
  return request({
    url: 'bizMonitor/tsysgroup/updateGroupStatus',
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const getReserveInfoForApproval = params => {
  return request({
    url: 'bizMonitor/tconfreserveinfor/getReserveInfoForApproval',
    method: 'get',
    params
  })
}

const saveConfirm = data => {
  return request({
    url: 'bizMonitor/tconfconfirm/saveConfirm',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const RejectMeeting = params => {
  return request({
    url: 'bizMonitor/tconfconfirm/Reject',
    method: 'get',
    params
  })
}

const RejectHotel = params => {
  return request({
    url: 'bizMonitor/thotelconfirm/Reject',
    method: 'get',
    params
  })
}

const getMeetingRoomList = params => {
  return request({
    url: 'bizMonitor/tsysconfroom/getRoomDevice',
    method: 'get',
    params
  })
}

const getMeetingRecord = params => {
  return request({
    url: 'bizMonitor/tconfconfirm/page',
    method: 'get',
    params
  })
}

const cancelConfirmByConfirmId = params => {
  return request({
    url: 'bizMonitor/tconfconfirm/cancelConfirmByConfirmId',
    method: 'get',
    params
  })
}

const getHotelReserveInfoForApproval = params => {
  return request({
    url: 'bizMonitor/tconfreserveinfor/getHotelReserveInfoForApproval',
    method: 'get',
    params
  })
}

const cancelHotelConfirmByConfirmId = params => {
  return request({
    url: 'bizMonitor/thotelconfirm/cancelHotelConfirmByConfirmId',
    method: 'get',
    params
  })
}

const getProjectStatisticsInfo = params => {
  return request({
    url: 'bizMonitor/tsysproject/getProjectStatisticsInfo',
    params
  })
}

const getProjectInfoByGroupStatusAndTime = params => {
  return request({
    url: 'bizMonitor/tsysproject/getProjectInfoByGroupStatusAndTime',
    params
  })
}

const getRoomOccupyInfo = params => {
  return request({
    url: 'bizMonitor/tsysconfroom/getRoomOccupyInfo',
    params
  })
}

const getRoomInfoAndExpertArrivedInfoByGroup = params => {
  return request({
    url: 'bizMonitor/tsysperson/getRoomInfoAndExpertArrivedInfoByGroup',
    params
  })
}

const getCloudOccInfoWhereRoomIsLive = params => {
  return request({
    url: 'bizMonitor/tsysterminal/getCloudOccInfoWhereRoomIsLive',
    params
  })
}

const saveBatchGroup = data => {
  return request({
    url: 'bizMonitor/cloudpersonidpersonid/saveBatch',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const getGroup = params => {
  return request({
    url: 'bizMonitor/cloudpersonidpersonid/page',
    params
  })
}

const getDptTree = params => {
  return request({
    url: 'bizMonitor/tsysfloor/getDptTree',
    params
  })
}

const thotelconfirm = data => {
  return request({
    url: 'bizMonitor/thotelconfirm',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

const getDeviceInfoByFloorId = params => {
  return request({
    url: 'bizMonitor/tsysdevice/getDeviceInfoByFloorId',
    params
  })
}

export default {
  getBatchByManaID,
  getGroupByBatch,
  getProjectByGroup,
  saveReserveInforDTO,
  getGateByFloorId,
  getExpertsByGroupID,
  getPersonCloudDesktopList,
  updateGroupStatus,
  getReserveInfoForApproval,
  saveConfirm,
  RejectMeeting,
  getMeetingRoomList,
  getMeetingRecord,
  cancelConfirmByConfirmId,
  getHotelReserveInfoForApproval,
  cancelHotelConfirmByConfirmId,
  RejectHotel,
  getProjectStatisticsInfo,
  getProjectInfoByGroupStatusAndTime,
  getRoomOccupyInfo,
  getRoomInfoAndExpertArrivedInfoByGroup,
  getCloudOccInfoWhereRoomIsLive,
  saveBatchGroup,
  getGroup,
  getDptTree,
  thotelconfirm,
  getDeviceInfoByFloorId
}
