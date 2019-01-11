<template>
  <div class="edittable-table-height-con">
    <Row style="margin-bottom:20px;">
      <Col span="1">
        <Button type="primary" style="margin-right: 5px;" @click="apply">申请</Button>
      </Col>
    </Row>
    <Table
      :ref="'experts'"
      :columns="tHeaderColumn"
      :data="list"
      disabled-hover
    ></Table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      checkedList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'congid'
        },
        {
          title: '组名称',
          align: 'center',
          key: 'groupid'
        },
        {
          title: '会议室',
          align: 'center',
          key: 'roomno'
        },
        {
          title: '计划开始日期',
          align: 'center',
          key: 'conendtime'
        },
        {
          title: '计划结束日期',
          align: 'center',
          key: 'confromtime'
        },
        {
          title: '其他需求',
          align: 'center',
          key: 'notes'
        },
        {
          title: '操作',
          align: 'center',
          key: 'pici',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(
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
                    click: async () => {
                      const { code, data } = await this.api.bizMonitor.cancelConfirmByConfirmId()
                      if (!code) {
                        this.$Message.success(data)
                        this.getList()
                      } else {
                        this.$Message.error(data)
                      }
                    //   this.$Message.success('播放')
                    }
                  }
                },
                '撤回'
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    async getList () {
      const { data } = await this.api.bizMonitor.getMeetingRecord()
      this.list = data.records
    },
    apply () {
      this.$router.push({
        name: 'meet'
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
