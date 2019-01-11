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
        <Row>
          <Button  type="info">导出</Button>
        </Row>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
            <Row :gutter="10" class="margin-top-20">
              <Col span="24">
                <div class="edittable-table-height-con">
                  <can-edit-table
                    refs="student"
                    :border="true"
                    :columnsList="tHeaderColumn"
                    :thisTableData="costList"
                  ></can-edit-table>
                  <div class="margin-top-20 tx-c">
                      <Button @click="saveData" type="info">保存</Button>
                      <Button @click="cancelData" class="margin-left-5" type="info">取消</Button>
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
                  ></page> -->
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
      costList: [ ],
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
          key: 'rate'
        },
        {
          title: '数量',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.number,
                type: 'number'
              },
              on: {
                input: (value) => {
                  params.row.number = value
                  // this.costList[params.index].total = parseInt(this.costList[params.index].num) * parseInt(params.row.rate)
                  params.row.subtotal = parseInt(params.row.number) * parseInt(params.row.rate)
                  if (isNaN(params.row.subtotal)) {
                    params.row.subtotal = 0
                  }
                  this.costListCopy[params.index] = params.row
                }
              }
            })
          }
        },
        {
          title: '小计',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.subtotal,
                disabled: 'disabled'
              },
              on: {
                input: (value) => {
                  params.row.subtotal = value
                  this.costListCopy[params.index] = params.row
                }
              }
            })
          }
        },
        {
          title: '备注',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.remark
              },
              on: {
                input: (value) => {
                  params.row.remark = value
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
      let name = '?groupid=' + this.$route.query.groupid
      const { code, data } = await this.api.cost.getTsyscostaccountingList(name)
      if (code) {
        this.$Message.error('获取数据失败!')
      } else {
        this.costList = data.records
        // this.costList.forEach((item, index) => {
        //   item.groupid = this.$route.query.groupid
        //   item.number = ''
        //   item.subtotal = ''
        //   item.remark = ''
        // })
        // this.costList.push({
        //   'rateid': '',
        //   'subject': '总计',

        // })
      }
    },
    async saveData () {
      let sData = this.costListCopy.filter(item => {
        return item !== null
      })
      const { code } = await this.api.cost.saveBatch(sData)
      if (code) {
        this.$Message.error('保存数据失败!')
      } else {
        this.$Message.success('保存数据成功!')
        this.$router.push({
          name: 'resultcost'
        })
      }
    },
    cancelData () {
      this.getTsysrateList()
    }
  },
  created () {
    this.getTsysrateList()
  }
}
</script>
