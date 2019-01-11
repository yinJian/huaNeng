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
          <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">起始时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col> -->
          <!-- <Col span="5">
            <Input placeholder="标题模糊查询" style="width: 200px"></Input>
          </Col> -->
          <Col span="1">
            <Button type="primary" style="margin-right: 5px;">查询</Button>
          </Col>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <Table :ref="'machine'" @on-select="selection" :columns="tHeaderColumn" :data="list"  disabled-hover></Table>
                    <div class="margin-top-20 tx-c">
                        <Button type="info" @click="auth">授权</Button>
                        <Button class="margin-left-5" type="info" @click="cancel">取消</Button>
                        <Button @click="showGroup" class="margin-left-5" type="info">查看组信息</Button>
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
    </Row>
    <Modal
        v-model="modal1"
        title="组信息"
        width="1000"
    >
      <Table :ref="'metting'" @on-select="selection" :columns="tHeaderColumn3" :data="group"  disabled-hover></Table>
    </Modal>
    <Modal v-model="modalMeetingShow" title="授权">
        <Form :label-width="80">
          <FormItem label="开始日期">
              <Row>
                  <Col span="11">
                      <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" @on-change="beginChange" placeholder="开始日期" v-model="fromDate"></DatePicker>
                  </Col>
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
      fromDate: '',
      endDate: '',
      modalMeetingShow: false,
      roomids: [],
      value1: [],
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      list: [],
      group: [],
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
          title: '序号',
          align: 'center',
          key: 'roomID'
        },
        {
          title: '会议室',
          align: 'center',
          key: 'roomNo'
        },
        {
          title: '组',
          align: 'center',
          key: 'groupid'
        },
        {
          title: '批次',
          align: 'center',
          key: 'batchID'
        },
        {
          title: '专家数',
          align: 'center',
          key: 'experts'
        },
        {
          title: '组开始日期',
          align: 'center',
          key: 'groupFromTime'
        },
        {
          title: '组结束日期',
          align: 'center',
          key: 'groupEndTime'
        },
        {
          title: '是否授权',
          align: 'center',
          key: 'isAuth'
        },
        {
          title: '授权时间',
          align: 'center',
          key: 'bizCode'
        },
        {
          title: '会议室状态',
          align: 'center',
          key: 'roomStatus'
        }
      ],
      tHeaderColumn3: [
        {
          title: '项目',
          align: 'center',
          key: 'projno'
        },
        {
          title: '项目经理',
          align: 'center',
          key: 'mananame'
        },
        {
          title: '联系方式',
          align: 'center',
          key: 'manaphone'
        },
        {
          title: '标号',
          align: 'center',
          key: 'grade'
        },
        {
          title: '标段',
          align: 'center',
          key: 'bidsection'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        }
        // {
        //   title: '操作',
        //   align: 'center',
        //   width: 200,
        //   handle: ['runTeamDetail']
        // }
      ]
    }
  },
  created () {
    this.getList({ FloorID: 'string' })
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
    async showGroup () {
      const { data } = await this.api.bizMonitor.getProjectByGroup({
        Group: this.$route.query.groupId
      })
      this.group = data
      this.modal1 = true
    },
    async getList (options) {
      const { data } = await this.api.intelligent.getRoomSyncInfoByFloorId(options)
      this.list = data
    },
    selection (data, row) {
      this.deviceIds = []
      data.map(item => {
        this.roomids.push(item.roomID)
      })
    },
    auth () {
      if (this.$route.query.groupId) {
        this.modalMeetingShow = true
      } else {
        this.modalMeetingShow = true
      }
    },
    async submit () {
      if (!this.roomids) {
        this.$Message.warning('请选择会议室')
        return
      }
      const body = { roomids: this.roomids, groupids: [this.$route.query.groupId] }
      const { code } = this.api.intelligent.authSyncBatchForRoom(body, this.fromDate, this.endDate)
      if (code) {
        this.$Message.error('Fail!')
      } else {
        this.$Message.success('Success!')
        this.$router.back()
      }
    },
    async cancel () {
      if (!this.roomids) {
        this.$Message.warning('请选择会议室')
        return
      }
      const body = { roomids: this.roomids, groupids: [this.$route.query.groupId] }
      const { code } = this.api.intelligent.authSyncBatchForRoomCancel(body, this.fromDate, this.endDate)
      if (code) {
        this.$Message.error('Fail!')
      } else {
        this.$Message.success('Success!')
        this.$router.back()
      }
    },
    cascaderDept (value) {
      if (value.length === 3) {
        console.log(value[2])
        this.getList({ FloorID: value[2] })
      }
    }
  }
}
</script>
