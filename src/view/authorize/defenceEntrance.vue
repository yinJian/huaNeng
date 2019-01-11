<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
      <Card>
    <Row>
        <Row>
          <Col span="2" style="min-width: 70px;" class="line-height-35">起始时间：</Col>
          <Col span="6" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
          <Col span="6" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="5">
            <Input placeholder="标题模糊查询" style="width: 200px"></Input>
          </Col>
          <Col span="1">
            <Button type="primary" style="margin-right: 5px;">查询</Button>
          </Col>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <Table :ref="'defend'" @on-select="selection" :columns="tHeaderColumn" :data="list"  disabled-hover></Table>
                    <div class="margin-top-20 tx-c">
                        <Button type="info" @click="defend">布防</Button>
                        <Button class="margin-left-5" type="info">撤销</Button>
                    </div>
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
                </Col>
              </Row>
              <Modal v-model="modalDefinceShow" title="授权">
                <Form :label-width="80">
                  <FormItem label="开始日期">
                      <Row>
                          <Col span="11">
                              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="beginChange" placeholder="开始日期" v-model="beginDate"></DatePicker>
                          </Col>
                      </Row>
                  </FormItem>
                  <FormItem>
                      <Button type="primary" @click="submit">提交</Button>
                  </FormItem>
                </Form>
                <div slot="footer"></div>
              </Modal>
          </Col>
        </Row>
    </Row>
    </Card>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
export default {
  components: {
    canEditTable
  },

  data () {
    return {
      modalDefinceShow: false,
      total: 0,
      page: 1,
      count: 10,
      form: {
        currency: 0,
        size: 10,
        IsDefence: 1
      },
      list: [],
      checked: [],
      beginDate: '',
      operateType: '',
      tHeaderColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '设备ID',
          align: 'center',
          key: 'deviceID'
        },
        {
          title: '会议室ID',
          align: 'center',
          key: 'roomid'
        },
        {
          title: '会议室',
          align: 'center',
          key: 'roomno'
        },
        {
          title: '布防状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '时间',
          align: 'center',
          key: 'orgdate'
        }
        // {
        //   title: '操作',
        //   align: 'center',
        //   width: 200,
        //   handle: ['runTeam']
        // }
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
    beginChange (val) {
      this.beginDate = val
    },
    async getList () {
      this.form.current = this.page
      // const { data } = await this.api.bizMonitor.getMeetingRoomList({
      //   IsDefence: 1
      // })
      const { data } = await this.api.bizMonitor.getMeetingRoomList(this.form)
      this.list = data
      this.total = total
    },
    selection (data, row) {
      console.log(data)
      this.checked = data
    },
    async defend () {
      this.operateType = 0
      if (this.checked.length) {
        this.modalDefinceShow = true
      } else {
        this.$Message.error('请选择会议室!')
      }
    },
    async concel () {
      this.operateType = 1
      if (this.checked.length) {
        this.modalDefinceShow = true
      } else {
        this.$Message.error('请选择会议室!')
      }
    },
    async submit () {
      const body = []
      let bodyItem = {}
      this.checked.map(item => {
        bodyItem.securityList.push({
          beginTime: this.beginDate,
          operateType: this.operateType,
          securitySpaceID: item.roomid,
          deviceID: item.deviceID
        })
      })
      const { code } = await this.api.intelligent.defenceWithdrawal(body)
      if (code) {
        this.$Message.error('Fail!')
      } else {
        this.modalDefinceShow = false
        this.$Message.success('Success!')
      }
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>
