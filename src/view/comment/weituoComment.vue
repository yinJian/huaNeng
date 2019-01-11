<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row v-if="piciState != 3">
          <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">起始时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col> -->
          <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">项目：</Col>
          <Col span="5">
            <Select v-model="project_id" style="width:200px">
                <Option v-for="item in projectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col> -->
          <Col span="2" style="min-width: 70px;" class="line-height-35">评价状态：</Col>
          <Col span="5">
            <Select v-model="isWatchEvaluate" style="width:200px">
                <Option value="Y">已评价</Option>
                <Option value="N">未评价</Option>
            </Select>
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
                    :thisTableData="projectList"
                    @showCommentModal= "showModal"
                  ></can-edit-table>
                  <page
                    :total="total"
                    :current="page"
                    :page-size="count"
                    @on-change="changepage"
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
    <Modal
        v-model="modal1"
        title="评价"
    >
        <!-- <can-edit-table
            refs="student"
            :border="true"
            :columnsList="tHeaderColumn3"
            :thisTableData="studentList"
        ></can-edit-table> -->
        <div>评价内容</div>
    </Modal>
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
      isWatchEvaluate: '',
      project_id: '',
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      piciState: 1,
      project: '',
      projectList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'index'
        },
        {
          title: '项目名称',
          align: 'center',
          key: 'pici'
        },
        {
          title: '项目经理',
          align: 'center',
          key: 'name'
        },
        {
          title: '是否评价',
          align: 'center',
          key: 'isevaluated'
        },
        {
          title: '操作',
          align: 'center',
          key: 'pici',
          width: 200,
          handle: ['weituoComment']
        }
      ]

    }
  },
  methods: {
    changepage () {},
    handlePageSize () {},
    showModal () {
      this.modal1 = true
    },
    async query () {
      let name = '?ProjID=1'
      const { code, data } = await this.api.comment.getDailiList(name)
      console.log(code)
      if (code) {

      } else {
        this.projectList = data
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
