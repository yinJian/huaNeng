<style>
@import "../../../styles/common.less";
</style>

<template>
  <div>
      <Card>
    <Row>
        <Row>
          <Col span="2" style="min-width: 70px;" class="line-height-35">设备类型：</Col>
          <Col span="6" style="margin-right: 5px;">
            <Select v-model="deviceType">
                    <Option value="闸机" label="闸机" >闸机</Option>
                    <Option value="摄像头" label="摄像头">摄像头</Option>
                    <Option value="人脸识别" label="人脸识别">人脸识别</Option>
                </Select>
          </Col>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <can-edit-table
                      refs="computer"
                      :border="true"
                      :columnsList="liveVideoColumn"
                      :thisTableData="computerList"
                      @computerDelete="computerDelete"
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
      deviceType: '',
      total: 0,
      page: 1,
      count: 10,
      form: {
        current: 0,
        size: 5
      },
      computerList: [],
      liveVideoColumn: [
        {
          title: '设备类型',
          align: 'center',
          key: 'deviceType'
        },
        {
          title: '设备编号',
          align: 'center',
          key: 'deviceNo'
        },
        {
          title: 'IP',
          align: 'center',
          key: 'ipAddr'
        },
        {
          title: '位置类型',
          align: 'center',
          key: 'positionType'
        },
        {
          title: '位置',
          align: 'positionNo',
          key: 'positionNo'
        },
        {
          title: '区域',
          align: 'center',
          key: 'area'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
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
      const { code, data } = await this.api.equipment.computerlist(this.form)
      if (code) {

      } else {
        console.log(data)
        this.computerList = data
        this.total = total
      }
    },
    async computerDelete (value) {
      console.log(value)
      let name = '?DeviceID=' + value.deviceID + '&PositionID=' + value.positionID
      const { code } = await this.api.equipment.deletecomputer(name)
      if (code) {
        this.$Message.success('删除失败')
      } else {
        this.$Message.success('删除成功')
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
