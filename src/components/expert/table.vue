<template>
    <div class="edittable-table-height-con">
      <Row>
        <Col span="2" style="min-width: 70px;" class="line-height-35">楼号/楼层</Col>
        <Col span="5" style="margin-right: 5px;">
          <Cascader :data="data" v-model="value1"></Cascader>
        </Col>
        <Col span="2" style="min-width: 70px;" class="line-height-35">时间：</Col>
        <Col span="5" style="margin-right: 5px;">
          <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
        </Col>
        <!-- <Col span="2" style="min-width: 70px;" class="line-height-35">结束时间：</Col>
        <Col span="5" style="margin-right: 5px;">
          <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
        </Col> -->
        <!-- <Col span="5">
          <Input placeholder="标题模糊查询" style="width: 200px"></Input>
        </Col> -->
        <Col span="1">
          <Button type="primary" style="margin-right: 5px;">查询</Button>
        </Col>
      </Row>
      <Table :ref="'experts'" @on-select="selection" :columns="tHeaderColumn" :data="experts"  disabled-hover></Table>
      <div>
        <div class="margin-top-20 tx-c">
          <Button type="info" @click="addBatUser">提交</Button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    experts: {
      type: Array,
      default: () => {
        return []
      }
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      value1: [],
      data: [],
      list: [],
      checkedList: [],
      tHeaderColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '评标人员',
          align: 'center',
          key: 'name'
        },

        {
          title: '身份证号',
          align: 'center',
          key: 'idnumber'
        },
        {
          title: '状态',
          align: 'center',
          key: 'flag'
        }
        // {
        //   title: '操作',
        //   align: 'center',
        //   key: 'pici',
        //   width: 200,
        //   handle: ['createDesktop', 'cancelDesktop']
        // }
      ]
    }
  },
  methods: {
    async addBatUser () {
      const { user_group, error_message } = await this.api.desktop.addGroup(this.group.groupID)
      if (error_message) {
        this.$Message.error(error_message)
        return
      }
      const data = this.checkedList.map(item => {
        item.group_id = user_group.group_id
      })
      const result = await this.api.bizMonitor.saveBatchGroup([{
        cloudgroupid: user_group.group_id,
        groupid: item.group_id
      }])
      if (result.code) {
        this.$Message.error('Fail!')
        return
      }
      const { code } = await this.api.desktop.addBatUsers(data)
      if (error_message) {
        this.$Message.error(error_message)
      } else {
        this.$Message.success('Success!')
        this.$emit('addBatUserSuccess', { code })
      }
    },
    selection (data, row) {
      this.checkedList = data
    }
  }
}
</script>
