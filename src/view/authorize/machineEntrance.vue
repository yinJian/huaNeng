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

    <!-- <page
      :total="total"
      :current="page"
      :page-size="form.size"
      @on-change="changepage"
      @on-page-size-change="handlePageSize"
      class="margin-top-20"
      show-elevator
      show-sizer
      show-total
    ></page> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      total: 0,
      page: 1,
      checkedList: [],
      form: {
        current: 0,
        size: 5
      },
      tHeaderColumn: [
        {
          title: '设备ID',
          align: 'center',
          key: 'deviceid'
        },
        {
          title: '设备类型',
          align: 'center',
          key: 'devicetype'
        },
        {
          title: '设备IP地址',
          align: 'center',
          key: 'ipaddr'
        },
        {
          title: '管理员',
          align: 'center',
          key: 'manager'
        },
        {
          title: '管理员手机号',
          align: 'center',
          key: 'manphone'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        },
        {
          title: '是否授权',
          align: 'center',
          key: 'status'
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
      const { data, total } = await this.api.bizMonitor.getDeviceInfoByFloorId()
      this.list = data
      this.total = total
    },
    apply () {
      this.$router.push({
        name: 'machineAuthAdd'
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
