<style lang="less">
@import "./editable-table.less";
</style>

<template>
  <div>
    <Table :ref="refs" :columns="columnsList" :data="thisTableData" disabled-hover></Table>
  </div>
</template>

<script>
const detailButton = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small'
        // icon: 'edit'
      },
      on: {
        click: () => {
          let argu = { _id: currentRow['_id'] }
          vm.$router.push({
            name: vm.refs + '_detail', // 打开的页面名字
            query: argu
          })
        }
      }
    },
    '详情'
  )
}
const runTeam = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small'
        // icon: 'edit'
      },
      on: {
        click: () => {
          // let argu = { _id: currentRow['_id'] }
          // vm.$router.push({
          //   name: 'team' // 打开的页面名字
          //   // query: argu
          // })
          let piciState = 2
          vm.$emit('changePiciState', { piciState })
        }
      }
    },
    '详情'
  )
}
const runTeamDetail = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small'
        // icon: 'edit'
      },
      on: {
        click: () => {
          vm.$emit('showProjectList', { _id: currentRow.groupID })
        }
      }
    },
    '项目明细'
  )
}

const createDesktop = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small'
      },
      on: {
        click: () => {

        }
      }
    },
    '生成桌面'
  )
}

const cancelDesktop = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        size: 'small'
      },
      on: {
        click: () => {

        }
      }
    },
    '取消桌面'
  )
}

const commentInfo = (vm, h, currentRow, index) => {
  let mark = true
  if (currentRow.evaluateFlag.indexOf('未') >= 0) {
    mark = false
  } else {
    mark = true
  }
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'info',
        size: 'small',
        disabled: mark
      },
      on: {
        click: () => {
          vm.$Message.info('已通知')
        }
      }
    },
    '通知'
  )
}

const managerComment = (vm, h, currentRow, index) => {
  let mark = true
  if (currentRow.isEvaluated.indexOf('未') >= 0) {
    mark = false
  } else {
    mark = true
  }
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'info',
        size: 'small',
        disabled: mark
      },
      on: {
        click: () => {
          let argu = { 'groupid': vm.$route.query.groupid, 'expertId': currentRow.expertID, 'expertName': currentRow.expertName }
          vm.$router.push({
            name: 'commenttable',
            query: argu
          })
        }
      }
    },
    '评价'
  )
}

const expertComment = (vm, h, currentRow, index) => {
  let mark = false
  if (currentRow.isEvaluate.indexOf('未') >= 0) {
    mark = false
  } else {
    mark = true
  }
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'info',
        size: 'small',
        disabled: mark
      },
      on: {
        click: () => {
          console.log(vm, h, currentRow, index)
          let argu = { 'groupid': currentRow.groupid, 'hotel': currentRow.hotelName }
          vm.$router.push({
            name: 'experttable',
            query: argu
          })
        }
      }
    },
    '评价'
  )
}

const weituoComment = (vm, h, currentRow, index) => {
  let mark = false
  if (currentRow.isevaluated.indexOf('未') >= 0) {
    mark = false
  } else {
    mark = true
  }
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'info',
        size: 'small',
        disabled: mark
      },
      on: {
        click: () => {
          console.log(vm, h, currentRow, index)
          let argu = { 'projectLeader': currentRow.name }
          vm.$router.push({
            name: 'weituotable',
            query: argu
          })
        }
      }
    },
    '评价'
  )
}

const playOne = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'info',
        size: 'small'
      },
      on: {
        click: () => {
          vm.$Message.success('播放')
        }
      }
    },
    '播放'
  )
}
const runEedit = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'primary',
        size: 'small'
        // icon: 'edit'
      },
      on: {
        click: () => {
          let val = ''
          if (currentRow['deviceID']) {
            val = currentRow['deviceID']
          }
          if (currentRow['termID']) {
            val = currentRow['termID']
          }
          let argu = { _id: val }
          vm.$router.push({
            name: 'edit' + vm.refs, // 打开的页面名字
            query: argu
          })
        }
      }
    },
    '编辑'
  )
}

const Edelete = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        size: 'small'
        // icon: 'edit'
      },
      on: {
        click: () => {
          if (currentRow['deviceID']) {
            vm.$emit('computerDelete', { deviceID: currentRow.deviceID, positionID: currentRow.positionID })
          }
          if (currentRow['termID']) {
            vm.$emit('desktopDelete', { termID: currentRow.termID, positionID: currentRow.positionID })
          }
        }
      }
    },
    '删除'
  )
}
export default {
  name: 'canEditTable',
  props: {
    refs: String,
    columnsList: Array,
    thisTableData: Array
  },
  data () {
    return {}
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.columnsList.forEach((item, index) => {
        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index]
            let children = []
            item.handle.forEach(item => {
              if (item === 'detail') {
                children.push(
                  detailButton(this, h, currentRowData, param.index)
                )
              } else if (item === 'runTeamDetail') {
                children.push(
                  runTeamDetail(this, h, currentRowData, param.index)
                )
              } else if (item === 'runTeam') {
                children.push(
                  runTeam(this, h, currentRowData, param.index)
                )
              } else if (item === 'createDesktop') {
                children.push(
                  createDesktop(this, h, currentRowData, param.index)
                )
              } else if (item === 'cancelDesktop') {
                children.push(
                  cancelDesktop(this, h, currentRowData, param.index)
                )
              } else if (item === 'commentInfo') {
                children.push(
                  commentInfo(this, h, currentRowData, param.index)
                )
              } else if (item === 'managerComment') {
                children.push(
                  managerComment(this, h, currentRowData, param.index)
                )
              } else if (item === 'expertComment') {
                children.push(
                  expertComment(this, h, currentRowData, param.index)
                )
              } else if (item === 'weituoComment') {
                children.push(
                  weituoComment(this, h, currentRowData, param.index)
                )
              } else if (item === 'playOne') {
                children.push(
                  playOne(this, h, currentRowData, param.index)
                )
              } else if (item === 'delete') {
                children.push(
                  Edelete(this, h, currentRowData, param.index)
                )
              } else if (item === 'edit') {
                children.push(
                  runEedit(this, h, currentRowData, param.index)
                )
              }
            })
            return h('div', children)
          }
        }
      })
    }
  },
  watch: {
    value (data) {
      this.init()
    }
  }
}
</script>
