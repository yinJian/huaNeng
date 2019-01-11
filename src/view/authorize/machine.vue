<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row>
          <Col span="2" style="min-width: 70px;" class="line-height-35">楼号/楼层</Col>
          <Col span="5" style="margin-right: 5px;">
            <cascader-dept @cascaderDept="cascaderDept"/>
          </Col>
          <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">时间：</Col> -->
          <!-- <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col> -->
          <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col> -->
          <!-- <Col span="5">
            <Input placeholder="标题模糊查询" style="width: 200px"></Input>
          </Col> -->
          <!-- <Col span="1">
            <Button type="primary" style="margin-right: 5px;">查询</Button>
          </Col> -->
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <Table :ref="'machine'" @on-select="selection" :columns="tHeaderColumn" :data="list"  disabled-hover></Table>
                    <div class="margin-top-20 tx-c">
                        <Button type="info" @click="auth">授权</Button>
                        <Button class="margin-left-5" type="info">取消</Button>
                    </div>
                    <!-- <page
                      :total="total"
                      :current="page"
                      :page-size="count"
                      @on-change="changepage"
                      @on-page-size-change="handlePageSize"
                      class="margin-top-20"
                      show-elevator
                      show-sizer
                      show-total
                    ></page> -->
                  </div>
                </Col>
              </Row>
          </Col>
        </Row>
      </Card>
      <Modal v-model="modalMachineShow" title="授权">
        <Form :label-width="80">
          <FormItem label="开始日期">
              <Row>
                  <Col span="11">
                      <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" @on-change="beginChange" placeholder="开始日期" v-model="fromDate"></DatePicker>
                  </Col>
                  <!-- <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                  </Col> -->
              </Row>
          </FormItem>
          <FormItem label="结束日期">
              <Row>
                  <Col span="11">
                      <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" @on-change="endChange" placeholder="结束日期" v-model="endDate"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="submit">提交</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>
    </Row>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import piCi from '@/components/pici/pici.vue'
import baseTeam from '@/components/base-team/base-team.vue'
import cascaderDept from '@/components/cascader-dept/index.vue'

export default {
  components: {
    canEditTable,
    piCi,
    baseTeam,
    cascaderDept
  },

  data () {
    return {
      value1: [],
      modalMachineShow: false,
      modalPiciShow: false,
      fromDate: '',
      endDate: '',
      total: 0,
      page: 1,
      count: 10,
      list: [],
      deviceIds: [],
      operateType: '',
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
      ],
      tHeaderColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '设备ID',
          align: 'center',
          key: 'deviceid'
        },
        {
          title: '设备类型',
          align: 'center',
          key: 'devicetype'
        },
        {
          title: '设备IP地址',
          align: 'center',
          key: 'ipaddr'
        },
        {
          title: '管理员',
          align: 'center',
          key: 'manager'
        },
        {
          title: '管理员手机号',
          align: 'center',
          key: 'manphone'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        },
        {
          title: '是否授权',
          align: 'center',
          key: 'status'
        }
        // {
        //   title: '授权时间',
        //   align: 'center',
        //   key: 'updatedate'
        // }
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
    beginChange (value) {
      this.fromDate = value
    },
    endChange (value) {
      this.endDate = value
    },
    changepage () {

    },
    handlePageSize () {

    },
    changePiciState (state) {
      this.piciState = state.piciState
    },
    async getList (options) {
      const { data } = await this.api.bizMonitor.getGateByFloorId(options)
      this.list = data
    },
    auth () {
      if (!this.deviceIds.length) {
        this.$Message.warning('请选择轧机')
        return
      }
      this.operateType = 0
      this.modalMachineShow = true
    },
    selection (data, row) {
      this.deviceIds = []
      data.map(item => {
        this.deviceIds.push(item.deviceid)
      })
    },
    async submit () {
      const body = { deviceids: this.deviceIds, groupids: [this.$route.query.groupId] }
      const { code } = this.api.intelligent.authSyncBatch(body, this.fromDate, this.endDate, this.operateType)
      if (code) {
        this.$Message.error('Fail!')
      } else {
        this.$Message.success('Success!')
      }
      this.$router.back()
    },
    async cancel () {
      if (!this.deviceIds.length) {
        this.$Message.warning('请选择轧机')
        return
      }
      this.operateType = 1
      this.modalMachineShow = true
    },
    cascaderDept (value) {
      if (value.length === 3) {
        this.getList({ FloorID: value[2], DptID: value[0], BuldNo: value[1] })
      }
    }
  },

  created () {
    this.getList()
  }
}
</script>
