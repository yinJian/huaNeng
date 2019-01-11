<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row>
          <Col span="1">
            <Button type="primary" @click="addUser" style="margin-right: 5px;">新增</Button>
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
                      :thisTableData="userList"
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
        <!-- <Modal
            title="新建用户"
            v-model="dialogVisable"
            class-name="vertical-center-modal">
            <user-form></user-form>
            <div slot="footer">
            </div>
        </Modal> -->
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
      userList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'userId'
        },
        {
          title: '用户名',
          align: 'center',
          key: 'username'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '角色',
          align: 'center',
          key: 'juese'
        },
        {
          title: '状态',
          align: 'center',
          key: 'stateTxt'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'createTime'
        }
      ]
    }
  },
  methods: {
    changepage (page) {
      console.log(page)
      this.page = page
      this.getUserList()
    },
    handlePageSize (pageSize) {
      console.log(pageSize)
      this.count = pageSize
      this.getUserList()
    },
    addUser () {
      this.$router.push({
        name: 'user_add'
      })
    },
    async getUserList () {
      let name = '?current=' + this.page + '&size=' + this.count
      const { data } = await this.api.user.userList(name)
      console.log(data)
      this.total = data.total
      this.userList = data.records
      this.userList.forEach((item, index) => {
        item.juese = ''
        item.roleList.forEach((roleItem, roleIndex) => {
          item.juese += roleItem.roleDesc + ' '
        })
        item.stateTxt = (item.lockFlag === '1') ? '无效' : '有效'
      })
    }
  },
  created () {
    this.getUserList()
  }
}
</script>
