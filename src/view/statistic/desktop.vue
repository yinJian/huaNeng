<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
      <Card>
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
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      list: [],
      form: {
        current: 0,
        size: 5
      },
      tHeaderColumn: [
        {
          title: '设备数',
          align: 'center',
          key: 'deviceNum'
        },
        {
          title: '占用设备数量',
          align: 'center',
          key: 'occDeviceNum'
        },
        {
          title: '房间号',
          align: 'center',
          key: 'roomNo'
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
      this.form.current = this.page
      const { data, total } = await this.api.bizMonitor.getCloudOccInfoWhereRoomIsLive(this.form)
      this.list = data
      this.total = total
      // this.form.current += data.length
    }
  },
  created () {
    this.getList()
  }
}
</script>
