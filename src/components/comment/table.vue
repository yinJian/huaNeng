<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
        <Row class="searchable-table-con1">
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

  },
  created () {

  }
}
</script>
