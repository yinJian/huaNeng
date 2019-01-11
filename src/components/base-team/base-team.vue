<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row>
      <!-- <Row>
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
        </Row> -->
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <can-edit-table
                      refs="student"
                      :border="true"
                      :columnsList="groupColumn"
                      :thisTableData="groupList"
                      @showProjectList="showProjectList"
                    ></can-edit-table>
                  </div>
                </Col>
              </Row>
          </Col>
        </Row>
        <div class="margin-top-20 tx-c" v-show="isReenvironment">
            <Button type="info" @click="resetDesktop">重置桌面</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isResultCost">
            <Button type="info" @click="runDetailCost">编辑</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isCommentMange">
            <Button @click="watchComment" type="info">查看评价</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isTendering">
          <Button type="info" @click="applyMeeting">申请会议室酒店</Button>
          <Button class="margin-left-5" type="info" @click="applyDesktop">申请桌面</Button>
          <Button class="margin-left-5" type="info" @click="machineAuth">轧机授权</Button>
          <Button class="margin-left-5" type="info" @click="mettingAuth">会议室授权</Button>
          <Button class="margin-left-5" type="info" @click="beginGroup">开始组</Button>
          <Button class="margin-left-5" type="info" @click="endGroup">结束组</Button>
          <Button class="margin-left-5" type="info" @click="showProjectList">项目明细</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isMangerComment">
            <Button @click="goToComment" type="info">进入评价</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isMeeting">
          <Button type="info" @click="applyMeeting">申请会议室酒店</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isDesktop">
          <Button type="info" @click="applyDesktop">桌面申请</Button>
          <Button class="margin-left-5" type="info" @click="showProjectList">项目明细</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isTrail">
          <Button type="info" @click="showExperts">查看轨迹</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isMachine">
          <Button type="info" @click="machineAuth">轧机授权</Button>
        </div>
        <div class="margin-top-20 tx-c" v-show="isMeetingAuth">
          <Button type="info" @click="mettingAuth">会议室授权</Button>
        </div>
    </Row>
    <Modal v-model="modalProjectShow" title="项目明细">
      <can-edit-table
        refs="student"
        :border="true"
        :columnsList="projectColumn"
        :thisTableData="projectList"
      ></can-edit-table>
    </Modal>
    <Modal v-model="modalHotelShow" title="酒店申请">
      <hotel-form :group="group" @applyHotelSuccess="applyHotelSuccess" />
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="modalDesktopShow" title="桌面申请">
      <export-form :experts="experts" :group="group" @applyDesktopSuccess="applyDesktopSuccess" />
      <div slot="footer"></div>
    </Modal>

    <Modal v-model="modalTrailShow" title="轨迹查看">
      <export-trail :experts="experts" />
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import hotelForm from '@/components/hotel/form.vue'
import exportForm from '@/components/expert/table.vue'
import exportTrail from '@/components/expert/trail.vue'

export default {
  components: {
    canEditTable,
    hotelForm,
    exportForm,
    exportTrail
  },
  props: {
    groupList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      modalProjectShow: false,
      modalHotelShow: false,
      modalDesktopShow: false,
      modalTrailShow: false,
      total: 0,
      page: 1,
      count: 10,
      group: {},
      projectList: [],
      checkedGroup: [],
      experts: [],
      groupColumn: [
        {
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
                    this.groupList.forEach(items => {
                      // 先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, 'checkBox', false)
                    })
                    this.groupList[params.index].checkBox = e // 再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ])
          }
        },
        {
          title: '序号',
          align: 'center',
          key: 'batchID'
        },
        {
          title: '组编号',
          align: 'center',
          key: 'groupID'
        },
        {
          title: '专家数量',
          align: 'center',
          key: 'experts'
        },
        {
          title: '会议室',
          align: 'center',
          key: 'confRoomNum'
        },
        {
          title: '计划开始时间',
          align: 'center',
          key: 'planFromTime'
        },
        {
          title: '计划结束时间',
          align: 'center',
          key: 'planEndTime'
        },
        {
          title: '状态',
          align: 'center',
          key: 'groupStatus'
        }
      ],
      projectColumn: [
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
      ]
    }
  },

  computed: {
    isTendering () {
      return location.hash.replace('#', '') === '/meeting/tendering'
    },
    isReenvironment () {
      return location.hash.replace('#', '') === '/environment/reenvironment'
    },
    isResultCost () {
      return location.hash.replace('#', '') === '/cost/resultcost'
    },
    isCommentMange () {
      return location.hash.replace('#', '') === '/comment/commentmange'
    },
    isMangerComment () {
      return location.hash.replace('#', '') === '/comment/mangerpici'
    },
    isMeeting () {
      return location.hash.replace('#', '') === '/meeting/meet'
    },
    isDesktop () {
      return location.hash.replace('#', '') === '/meeting/desktop'
    },
    isTrail () {
      return location.hash.replace('#', '') === '/authorize/trailEntrance'
    },
    isMachine () {
      return location.hash.replace('#', '') === '/authorize/machineAuthAdd'
    },
    isMeetingAuth () {
      return location.hash.replace('#', '') === '/authorize/meetingAuthAdd'
    }
  },
  methods: {
    changepage () {},
    handlePageSize () {},
    async showProjectList () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      this.modalProjectShow = true
      const { data } = await this.api.bizMonitor.getProjectByGroup({
        Group: this.group.groupID
      })
      this.projectList = data
    },
    async applyMeeting () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      this.modalHotelShow = true
    },
    watchComment () {
      // this.watchModelShow = true
      // const { code } = await this.api.comment.commentMangeList()
      // console.log(code)
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group) {
        this.$Message.warning('请选择组')
      } else {
        let argu = { 'groupid': this.group.groupID }
        this.$router.push({
          name: 'commentmangelist',
          query: argu
        })
      }
    },
    runDetailCost () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group) {
        this.$Message.warning('请选择组')
      } else {
        let argu = { 'groupid': this.group.groupID }
        this.$router.push({
          name: 'costdetail',
          query: argu
        })
      }
    },
    applyHotelSuccess (options) {
      if (!options.code) {
        this.modalHotelShow = false
      }
    },
    async applyDesktopSuccess () {
      if (!options.code) {
        this.modalDesktopShow = false
      }
    },
    async applyDesktop () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      const { data } = await this.api.bizMonitor.getPersonCloudDesktopList({ groupID: this.group.groupID })
      data.map(item => {
        item.name = item.sysPerson.name
        item.idnumber = item.sysPerson.idnumber
        item.persionid = item.sysPerson.persionid
      })
      this.experts = data
      this.modalDesktopShow = true
    },
    machineAuth () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      this.$router.push({
        name: 'machine',
        query: {
          groupId: this.group.groupID
        }
      })
    },
    mettingAuth () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      this.$router.push({
        name: 'authmeeting',
        query: {
          groupId: this.group.groupID
        }
      })
    },
    async beginGroup () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      const body = { status: '进行', groupids: [this.group.groupID] }
      const { code } = this.api.bizMonitor.updateGroupStatus(body)
      if (code) {
        this.$Message.success('error')
      } else {
        this.$Message.success('success')
      }
    },
    async endGroup () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      const body = { status: '结束', groupids: [this.group.groupID] }
      const { code } = this.api.bizMonitor.updateGroupStatus(body)
      if (code) {
        this.$Message.success('error')
      } else {
        this.$Message.success('success')
      }
    },
    goToComment () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group) {
        this.$Message.warning('请选择组')
      } else {
        let argu = { 'groupid': this.group.groupID, 'batchID': this.group.groupID }
        this.$router.push({
          name: 'mangercomment',
          query: argu
        })
      }
    },
    async showExperts () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      const { data } = await this.api.bizMonitor.getPersonCloudDesktopList({ groupID: this.group.groupID })
      data.map(item => {
        item.name = item.sysPerson.name
        item.idnumber = item.sysPerson.idnumber
      })
      this.experts = data
      this.modalTrailShow = true
    },
    async resetDesktop () {
      this.group = this.groupList.filter(item => {
        return item.checkBox === true
      })[0]
      if (!this.group || this.group.groupID === undefined) {
        this.$Message.warning('请选择组')
        return
      }
      const groupId = await this.api.bizMonitor.getGroup({
        groupid: this.group.groupID
      })
      const { user_group, error_message } = await this.api.desktop.deleteGroup(groupId)
      if (user_group) {
        this.$router.back()
      } else {
        this.$Message.error(error_message)
      }
    }
  }
}
</script>
