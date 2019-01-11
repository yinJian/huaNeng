<style>
@import "../../../styles/common.less";
</style>

<template>
  <div>
      <Card>
    <Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <can-edit-table
                      refs="desktop"
                      :border="true"
                      :columnsList="liveVideoColumn"
                      :thisTableData="desktopList"
                      @desktopDelete="desktopDelete"
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
      form: {
        current: 0,
        size: 5
      },
      desktopList: [],
      liveVideoColumn: [
        {
          title: '设备编号',
          align: 'center',
          key: 'termID'
        },
        {
          title: '位置',
          align: 'center',
          key: 'positionType'
        },
        {
          title: '会议室编号',
          align: 'center',
          key: 'roomNo'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        },
        {
          title: '操作',
          align: 'center',
          handle: ['edit', 'delete']
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
    async query () {
      this.form.current = this.page
      const { code, data } = await this.api.equipment.desktopList(this.form)
      if (code) {

      } else {
        this.desktopList = data
        this.total = total
      }
    },
    async desktopDelete (value) {
      console.log(value)
      let name = '?terID=' + value.terID + '&PositionID=' + value.positionID
      const { code } = await this.api.equipment.deletedesktop(name)
      if (code) {
        this.$Message.success('删除失败')
      } else {
        this.$Message.success('删除成功')
        this.$router.push({
          name: 'desktoplist'
        })
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
