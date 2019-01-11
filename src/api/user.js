import { request } from '@/libs/request'
import { encryption } from '@/libs/util'

const login = ({ userName, password }) => {
  const obj = {
    username: userName,
    password: password,
    randomStr: new Date().getTime(),
    code: '1111',
    grant_type: 'password',
    scope: 'server'
  }

  return request({
    url: 'auth/oauth/token',
    headers: {
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    params: encryption({
      data: obj,
      param: ['password'],
      key: 'pigxpigxpigxpigx'
    }),
    method: 'post'
  })
}

const getUserInfo = () => {
  return request({
    url: 'admin/user/info',
    method: 'get'
  })
}

const logout = () => {
  return request({
    url: 'auth/token/logout',
    method: 'delete'
  })
}

const getDeptTree = () => {
  return request({
    url: 'admin/dept/user-tree',
    method: 'get'
  })
}

const addUser = data => {
  return request({
    url: 'admin/user',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

const userDetail = name => {
  return request({
    url: 'admin/user/details/' + name,
    method: 'get'
  })
}

const userList = name => {
  return request({
    url: 'admin/user/page/' + name,
    method: 'get'
  })
}

const addDept = data => {
  return request({
    url: 'admin/dept/',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

export default {
  login,
  getUserInfo,
  logout,
  getDeptTree,
  addUser,
  userDetail,
  userList,
  addDept
}
