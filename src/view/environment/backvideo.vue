<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
      <Card>
    <Row>
        <Row>
          <Col span="2" style="min-width: 70px;" class="line-height-35">楼号/楼层</Col>
          <Col span="5" style="margin-right: 5px;">
            <cascader-dept @cascaderDept="cascaderDept"/>>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">会议室：</Col>
          <Col span="5" style="margin-right: 5px;">
            <Select v-model="meethouse" >
                <Option v-for="item in house" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">设备：</Col>
          <Col span="5" style="margin-right: 5px;">
            <Select v-model="machine">
                <Option v-for="item in machines" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="2" style="min-width: 70px;" class="line-height-35">时间：</Col>
          <Col span="5" style="margin-right: 5px;">
            <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
          </Col>
          <!-- <Col span="5">
            <Input placeholder="标题模糊查询" style="width: 200px"></Input>
          </Col> -->
          <Col span="1">
            <Button type="primary" style="margin-right: 5px;">查询</Button>
          </Col>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
              <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                  <div class="edittable-table-height-con">
                    <can-edit-table
                      refs="student"
                      :border="true"
                      :columnsList="liveVideoColumn"
                      :thisTableData="videoList"
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
import cascaderDept from '@/components/cascader-dept/index.vue'

export default {
  components: {
    canEditTable,
    cascaderDept
  },

  data () {
    return {
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      form: {
        current: 0,
        size: 5,
        name: '?status=结束'
      },
      meethouse: '',
      machine: '',
      house: [],
      machines: [
        {
          value: '设备1',
          label: '设备1'
        },
        {
          value: '设备2',
          label: '设备2'
        }
      ],
      videoList: [],
      value1: [],
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }
      ],
      liveVideoColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'index'
        },
        {
          title: '视频列表',
          align: 'center',
          key: 'index'
        },
        {
          title: '操作',
          align: 'center',
          handle: ['playOne']
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
      // let name = '?status=结束'
      // const { code, data } = await this.api.video.getVideo(name)
      this.form.current = this.page
      const { code, data } = await this.api.video.getVideo(this.form)
      if (code) {

      } else {
        this.videoList = data
        this.total = total
        // this.form.current += data.length
      }
    },
    cascaderDept (value) {
      if (value.length === 3) {
        this.query()
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
