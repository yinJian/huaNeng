<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <!-- <Row>
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
                <div class="edittable-table-height-con">
                  <Table :ref="'approval'" :columns="tHeaderColumn" :data="list"  disabled-hover></Table>
                  <div>
                      <div class="margin-top-20 tx-c">
                        <Button type="info" @click="assignRoom">分配会议室</Button>
                        <Button class="margin-left-5" type="info" @click="reject">驳回</Button>
                        <Button class="margin-left-5" type="info" @click="cancel">取消</Button>
                    </div>
                  </div>
                  <Modal v-model="modalHotelShow" title="会议室申请">
                    <approval-form :formValidate="formValidate" @applyApprovalSuccess="applyApprovalSuccess" />
                    <div slot="footer"></div>
                  </Modal>
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
      </Card>
    </Row>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import approvalForm from '@/components/meeting/approval.vue'
import approvalDetail from '@/components/meeting/detail.vue'

export default {
  components: {
    canEditTable,
    approvalForm,
    approvalDetail
  },

  data () {
    return {
      modalHotelShow: false,
      total: 0,
      page: 1,
      count: 10,
      list: [],
      form: {
        current: 0,
        size: 5
      },
      formValidate: {},
      tHeaderColumn: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(approvalDetail, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '选中',
          align: 'center',
          key: 'checkBox',
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  'on-change': e => {
                    this.list.forEach(items => {
                      // 先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, 'checkBox', false)
                    })
                    this.list[params.index].checkBox = e // 再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ])
          }
        },
        {
          title: '序号',
          align: 'center',
          key: 'confid'
        },
        {
          title: '组名称',
          align: 'center',
          key: 'groupid'
        },
        {
          title: '会议室数量',
          align: 'center',
          key: 'confrooms'
        },
        {
          title: '专家人数',
          align: 'center',
          key: 'experts'
        },
        {
          title: '申请人',
          align: 'center',
          key: 'applicantname'
        },
        {
          title: '申请人联系电话',
          align: 'center',
          key: 'phone'
        },
        {
          title: '计划开始日期',
          align: 'center',
          key: 'fromtime'
        },
        {
          title: '计划结束日期',
          align: 'center',
          key: 'endtime'
        },
        {
          title: '其他需求',
          align: 'center',
          key: 'notes'
        },
        {
          title: '状态',
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
      const { data, total } = await this.api.bizMonitor.getReserveInfoForApproval(this.form)
      this.list = data
      this.total = total
      this.form.current += data.length
    },
    assignRoom () {
      const item = this.list.filter(item => {
        return item.checkBox === true
      })[0]
      if (item) {
        this.modalHotelShow = true
        item.confromtime = item.fromtime
        item.conendtime = item.endtime
        this.formValidate = Object.assign({}, item)
      }
    },
    applyApprovalSuccess (options) {
      if (!options.code) {
        this.modalHotelShow = false
      }
    },
    async reject () {
      const item = this.list.filter(item => {
        return item.checkBox === true
      })[0]
      if (item) {
        const { code, data } = await this.api.bizMonitor.RejectMeeting({
          reserveid: item.confid
        })
        if (code) {
          this.$Message.error('操作失败')
        } else {
          this.$Message.success(data)
          this.reload()
        }
      }
    },
    async cancel () {
      const item = this.list.filter(item => {
        return item.checkBox === true
      })[0]
      if (item) {
        const { code } = await this.api.bizMonitor.cancelConfirmByConfirmId({
          confirmId: item.confid
        })
        if (code) {
          this.$Message.error('取消失败')
        } else {
          this.$Message.success(data)
          this.reload()
        }
      }
    },
    reload () {
      this.form.current = 0
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>
