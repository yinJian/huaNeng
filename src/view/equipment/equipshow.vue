<style>
  @import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row>
          <Col span="1">
            <Button type="primary" @click="addEquip" style="margin-right: 5px;">新增</Button>
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
                    :columnsList="tHeaderColumn"
                    :thisTableData="equipList"
                  ></can-edit-table>
                  <page
                    :total="total"
                    :current="page"
                    :page-size="count"
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
import userForm from '@/components/user/form.vue'

export default {
  components: {
    canEditTable,
    userForm
  },
  data () {
    return {
      total: 0,
      page: 1,
      count: 10,
      dialogVisable: false,
      equipList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'index'
        },
        {
          title: '设备类型',
          align: 'center',
          key: 'devicetype'
        },
        {
          title: '设备编号',
          align: 'center',
          key: 'deviceid'
        },
        {
          title: 'IP',
          align: 'center',
          key: 'ipaddr'
        },
        {
          title: '位置类型',
          align: 'center',
          key: 'status'
        },
        {
          title: '位置',
          align: 'center',
          key: 'status'
        },
        {
          title: '区域',
          align: 'center',
          key: 'orgclerk'
        },
        {
          title: '备注',
          align: 'center',
          key: 'notes'
        }
      ]
    }
  },
  methods: {
    changepage (page) {
      console.log(page)
      this.page = page
      this.getEquipList()
    },
    handlePageSize (pageSize) {
      console.log(pageSize)
      this.count = pageSize
      this.getEquipList()
    },
    addEquip () {
      this.$router.push({
        name: 'equip_add'
      })
    },
    async getEquipList () {
      const { data } = await this.api.equipment.equipList()
      console.log(data)
      // this.total = data.total
      this.equipList = data
      this.userList.forEach((item, index) => {
        item.juese = ''
        item.roleList.forEach((roleItem, roleIndex) => {
          item.juese += roleItem.roleDesc + ' '
        })
      })
    }
  },
  created () {
    this.getEquipList()
  }
}
</script>
