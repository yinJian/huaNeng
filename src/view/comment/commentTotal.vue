<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row v-if="piciState != 3">
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
                <div v-if="piciState == 1" class="edittable-table-height-con">
                  <can-edit-table
                    refs="student"
                    :border="true"
                    :columnsList="tHeaderColumn"
                    :thisTableData="studentList"
                  ></can-edit-table>
                  <page
                    :total="total"
                    :current="page"
                    :page-size="count"
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
      </Card>
    </Row>
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
      piciState: 1,
      studentList: [{ index: 1, pici: '测试' }],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'index'
        },
        {
          title: '专家',
          align: 'center',
          key: 'pici'
        },
        {
          title: '酒店名称',
          align: 'center',
          key: 'pici'
        },
        {
          title: '评价状态',
          align: 'center',
          key: 'pici'
        },
        {
          title: '操作',
          align: 'center',
          key: 'pici',
          width: 200,
          handle: ['createDesktop', 'cancelDesktop']
        }
      ]

    }
  },
  methods: {
    changepage () {},
    handlePageSize () {}
  }
}
</script>
