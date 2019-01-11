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
            <DatePicker @on-change="getFromTime" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
          <Col span="6" style="margin-right: 5px;">
            <DatePicker @on-change="getEndTime" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="5">
            <Select v-model="form.Status" style="width:200px">
              <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="1">
            <Button type="primary" style="margin-right: 5px;" @click="reload">查询</Button>
          </Col>
        </Row>

        <Row style="margin-bottom: 20px;margin-top:20px">
            <Col span="2">
                <span>共计: </span>
                <span>{{ statics.totalNum }}</span>
            </Col>
            <Col span="2">
                <span>计划: </span>
                <span>{{ statics.planNum }}</span>
            </Col>
            <Col span="2">
                <span>预定数量: </span>
                <span>{{ statics.reserveNum }}</span>
            </Col>
            <Col span="2">
                <span>进行数量: </span>
                <span>{{ statics.conductNum }}</span>
            </Col>
            <Col span="2">
                <span>取消数量: </span>
                <span>{{ statics.cancelNum }}</span>
            </Col>
            <Col span="2">
                <span>结束: </span>
                <span>{{ statics.doneNum }}</span>
            </Col>
        </Row>

        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <can-edit-table
                      refs="student"
                      :border="true"
                      :columnsList="tHeaderColumn"
                      :thisTableData="list"
                    ></can-edit-table>
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
      total: 0,
      page: 1,
      status: [{
        value: '计划',
        label: '计划'
      }, {
        value: '预定',
        label: '预定'
      }, {
        value: '进行',
        label: '进行'
      }, {
        value: '取消',
        label: '取消'
      }, {
        value: '结束',
        label: '结束'
      }],
      statics: {},
      form: {
        current: 0,
        size: 10
      },
      list: [],
      tHeaderColumn: [
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
          title: '状态',
          align: 'center',
          key: 'status'
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
    async getList () {
      const { data, total } = await this.api.bizMonitor.getProjectInfoByGroupStatusAndTime(this.form)
      this.form.current += data.length
      this.list = data
      this.total = total
    },
    async getStatic () {
      const { data } = await this.api.bizMonitor.getProjectStatisticsInfo(this.form)
      this.statics = data
    },
    getFromTime (val) {
      this.form.FromTime = val
      this.reload()
    },
    getEndTime (val) {
      this.form.EndTime = val
      this.reload()
    },
    reload () {
      this.form.current = 0
      this.getList()
      this.getStatic()
    }
  },
  created () {
    this.reload()
  }
}
</script>
