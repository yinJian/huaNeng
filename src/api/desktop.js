import axios from 'axios'

const service = axios.create({
  baseURL: 'ip:port',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

const request = (options) => {
  return new Promise((resolve, reject) => {
    service(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const getToken = () => {
  return request({
    url: '/v1/auth/tokens',
    method: 'post'
  })
}

const addBatUsers = async (data) => {
  const { token } = await getToken()
  return request({
    url: '/v1/bat_users',
    method: 'post',
    headers: {
      'Auth-Token': token.auth_token
    },
    data
  })
}

const deleteGroup = async groupId => {
  const { token } = await getToken()
  return request({
    url: `/v1/user_groups/${groupId}`,
    method: 'delete',
    headers: {
      'Auth-Token': token.auth_token
    }
  })
}

const addGroup = async groupId => {
  const { token } = await getToken()
  const data = {
    'user_group': {
      'name': groupId,
      'note': 'group',
      'group_id': groupId,
      'enable': 1
    }
  }
  return request({
    url: '/v1/user_groups',
    method: 'post',
    headers: {
      'Auth-Token': token.auth_token
    },
    data
  })
}

export default {
  getToken,
  addBatUsers,
  addGroup,
  deleteGroup
}
