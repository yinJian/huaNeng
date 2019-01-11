<template>
    <div class="edittable-table-height-con">
      <Table :ref="'experts'" :columns="tHeaderColumn" :data="experts"  disabled-hover></Table>
      <div>
        <div class="margin-top-20 tx-c">
          <Button type="info" @click="getTrail">查看轨迹</Button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    experts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      list: [],
      checkedList: [],
      tHeaderColumn: [{
        title: '选中',
        align: 'center',
        key: 'checkBox',
        render: (h, params) => {
          return h('div', [
            h('Checkbox', {
              props: {
                value: params.row.checkBox
              },
              on: {
                'on-change': e => {
                  this.experts.forEach(items => {
                    // 先取消所有对象的勾选，checkBox设置为false
                    this.$set(items, 'checkBox', false)
                  })
                  this.experts[params.index].checkBox = e // 再将勾选的对象的checkBox设置为true
                }
              }
            })
          ])
        }
      },
      {
        title: '评标人员',
        align: 'center',
        key: 'name'
      },

      {
        title: '身份证号',
        align: 'center',
        key: 'idnumber'
      },
      {
        title: '状态',
        align: 'center',
        key: 'flag'
      }
      ]
    }
  },
  methods: {
    async getTrail () {
      const item = this.experts.filter(item => {
        return item.checkBox === true
      })[0]
      if (item) {
        console.log(item)
        this.$router.push({
          name: 'trail',
          query: {
            id: item.sysPerson.personid
          }
        })
      }
    }
  }
}
</script>
