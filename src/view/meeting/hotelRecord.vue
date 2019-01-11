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
     <page
      :total="total"
      :current="page"
      :page-size="form.size"
      @on-change="changepage"
      @on-page-size-change="handlePageSize"
      class="margin-top-20"
      show-elevator
      show-sizer
      show-total
    ></page>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      total: 0,
      page: 1,
      form: {
        current: 0,
        size: 5
      },
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
                      console.log(params.row)
                      const { code, data } = await this.api.bizMonitor.cancelHotelConfirmByConfirmId({
                        confirmId: params.row.confid
                      })
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
    changepage (page) {
      this.page = page
      this.getList()
    },
    handlePageSize (page) {
      this.page = page
      this.getList()
    },
    async getList () {
      this.form.current = this.page
      const { data } = await this.api.bizMonitor.getHotelReserveInfoForApproval(this.form)
      this.list = data.records
      this.total = total
    },
    apply () {
      this.$router.push({
        name: 'hotel'
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
