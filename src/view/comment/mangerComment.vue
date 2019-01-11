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
                    :thisTableData="expertList"
                    @showCommentModal= "showModal"
                  ></can-edit-table>
                  <page
                    :total="total"
                    :current="page"
                    :page-size="form.size"
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
      form: {
        current: 0,
        size: 10
      },
      piciState: 1,
      project: '',
      projectList: [],
      expertList: [],
      tHeaderColumn: [
        {
          title: '项目名称',
          align: 'center',
          key: 'projID'
        },
        {
          title: '专家',
          align: 'center',
          key: 'expertName'
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
          title: '是否评价',
          align: 'center',
          key: 'isEvaluated'
        },
        {
          title: '操作',
          align: 'center',
          key: 'pici',
          width: 200,
          handle: ['managerComment']
        }
      ]

    }
  },
  methods: {
    changepage (page) {
      this.page = page
      this.query()
    },
    handlePageSize (page) {
      this.page = page
      this.query()
    },
    showModal () {
      this.modal1 = true
    },
    async query () {
      // this.form.current = this.page
      let name = '?groupid=' + this.$route.query.groupid + '&isWatchEvaluate=' + this.isWatchEvaluate
      const { code, data } = await this.api.comment.getMangerExpertList(name)
      const batchID = this.$route.query.batchID
      const groupid = this.$route.query.groupid
      data.map(item => {
        item.batchID = batchID
        item.groupid = groupid
      })
      if (code) {

      } else {
        this.expertList = data
        this.total = total
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
