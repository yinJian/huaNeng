<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
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
                    <can-edit-table
                      refs="student"
                      :border="true"
                      :columnsList="tHeaderColumn"
                      :thisTableData="batchList"
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
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import baseTeam from '@/components/base-team/base-team.vue'

export default {
  components: {
    canEditTable,
    baseTeam
  },
  created () {
    this.getBatchList()
  },
  data () {
    return {
      total: 0,
      page: 1,
      count: 10,
      form: {
        current: 0,
        size: 1
      },
      batchList: [],
      tHeaderColumn: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(baseTeam, {
              props: {
                groupList: params.row.groupList
              }
            })
          }
        },
        {
          title: '批次',
          align: 'center',
          key: 'batchid'
        },
        {
          title: '描述信息',
          align: 'center',
          key: 'batchdesc'
        }
      ]
    }
  },
  methods: {
    changepage (page) {
      this.page = page
      this.getBatchList()
    },
    handlePageSize (page) {
      this.page = page
      this.getBatchList()
    },
    getFromTime (val) {
      this.form.PlanFromTime = val
      this.getBatchList()
    },
    getEndTime (val) {
      this.form.PlanEndTime = val
      this.getBatchList()
    },
    async getBatchList () {
      const { data, total } = await this.api.bizMonitor.getBatchByManaID(this.form)
      this.batchList = data
      this.total = total
      this.form.current = data.length
    }
  }
}
</script>
