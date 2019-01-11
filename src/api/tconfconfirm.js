const saveConfirm = data => {
  return request({
    url: 'tconfconfirm/saveConfirm',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data,
    method: 'post'
  })
}

export default {
  saveConfirm
}
