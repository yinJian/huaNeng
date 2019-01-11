<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <!-- <Row v-if="piciState != 3">
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
                <div v-if="piciState == 1" class="edittable-table-height-con">
                  <can-edit-table
                    refs="student"
                    :border="true"
                    :columnsList="tHeaderColumn"
                    :thisTableData="costList"
                  ></can-edit-table>
                  <div class="margin-top-20 tx-c">
                    <Button @click="submitCost" type="info">提交</Button>
                  </div>
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
                  ></page>-->
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
      costList: [],
      costListCopy: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'rateid'
        },
        {
          title: '科目',
          align: 'center',
          key: 'subject'
        },
        {
          title: '费率',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.rate,
                type: 'number'
              },
              // on: {
              //   click: () => {
              //     this.aaa(params)
              //     console.log(params)
              //   }
              // }
              on: {
                input: (value) => {
                  params.row.rate = value
                  this.costListCopy[params.index] = params.row
                }
              }
            })
          }
        }
      ]
    }
  },
  methods: {
    changepage () {},
    handlePageSize () {},
    async getTsysrateList () {
      const { code, data } = await this.api.cost.getTsysrateList()
      if (code) {
        this.$Message.error('获取数据失败!')
      } else {
        this.costList = data.records
      }
    },
    async submitCost () {
      const body = this.costListCopy.filter(item => {
        return item !== null
      })
      const { code } = await this.api.cost.addTsysrate(body)
      if (code) {
        this.$Message.error('获取数据失败!')
      } else {
        this.$Message.success('修改成功!')
      }
    }
  },
  created () {
    this.getTsysrateList()
  }
}
</script>
