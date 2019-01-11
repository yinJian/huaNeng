<style>
  @import "../../styles/common.less";
</style>

<template>
  <div class="edittable-table-height-con">
    <Row style="margin-bottom:20px;">
      <Col span="1">
        <Button type="primary" style="margin-right: 5px;" @click="apply">授权</Button>
      </Col>
    </Row>
    <Table
      :ref="'experts'"
      :columns="tHeaderColumn"
      :data="list"
      disabled-hover
    ></Table>
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
</template>
<script>
export default {
  data () {
    return {
      list: [],
      total: 0,
      page: 1,
      form: {
        current: 0,
        size: 5
      },
      tHeaderColumn: [
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
      const { data, total } = await this.api.intelligent.getRoomSyncInfoByFloorId(this.form)
      this.list = data
      this.total = total
    },
    apply () {
      this.$router.push({
        name: 'meetingAuthAdd'
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
