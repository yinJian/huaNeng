<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Card v-if="false" >
        <pi-ci></pi-ci>
    </Card>
    <Card v-if="false">
        <base-team></base-team>
        <div class="margin-top-20 tx-c">
            <Button type="info">确定</Button>
        </div>
    </Card>
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
import piCi from '@/components/pici/pici.vue'
import baseTeam from '@/components/base-team/base-team.vue'

export default {
  components: {
    canEditTable,
    piCi,
    baseTeam
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
          title: '姓名',
          align: 'center',
          key: 'personName'
        },
        {
          title: '设备',
          align: 'center',
          key: 'deviceID'
        },
        {
          title: '时间',
          align: 'center',
          key: 'occurTime'
        },
        {
          title: '地点',
          align: 'center',
          key: 'positionID'
        },
        {
          title: '设备类型',
          align: 'center',
          key: 'deviceType'
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
      const { data, total } = await this.api.intelligent.selectTrajectoryByPersonID(this.form)
      this.list = data
      this.total = total
      this.form.current += data.length
    }
  },
  created () {
    this.getList({ personIDaf: this.$route.query.id })
  }
}
</script>
