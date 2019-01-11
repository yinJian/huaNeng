<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <div>
      <span class="inline-block line-height-50 font-size-16 font-weight">学生管理</span>
      <Button @click="batchImport" type="primary" style="float: right;margin-top: 5px;">批量导入</Button>
    </div>
    <Menu mode="horizontal" theme="light" active-name="1" style="margin-bottom: 10px;">
      <Row>
        <school-class @selectSchoolClass="selectSchoolClass"/>
        <Col :md="{ span: 5, offset: 5 }" :lg="{ span: 4, offset: 7 }" style="margin-right: 5px;">
          <Input @keyup.enter.native="getStudentList" v-model="keyword" icon="ios-search" placeholder="学生名称"></Input>
        </Col>
        <Col :md="{ span: 4 }" :lg="{ span: 2}" style="min-width: 60px;">
          <Button @click="getStudentList" type="primary">搜索</Button>
        </Col>
      </Row>
    </Menu>
    <Row class="margin-top-10 searchable-table-con1">
      <Col span="24">
        <Card>
          <Row :gutter="10" class="margin-top-20">
            <Col span="24">
              <div class="edittable-table-height-con">
                <can-edit-table
                  refs="student"
                  :border="true"
                  :columnsList="tHeaderColumn"
                  :thisTableData="studentList"
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
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import schoolClass from '@/components/school-class/school-class.vue'

export default {
  name: 'student_list',
  components: {
    canEditTable,
    schoolClass
  },
  data () {
    return {
      organizationData: [],
      total: 0,
      page: 1,
      count: 10,
      keyword: '',
      schoolId: '',
      classId: '',
      studentList: [],
      schoolList: [],
      classList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'index'
        },
        {
          title: '学籍号',
          align: 'center',
          key: 'stuNo'
        },
        {
          title: '真实姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '学校名称',
          align: 'center',
          key: 'handelShoolNames'
        },
        {
          title: '学校数量',
          align: 'center',
          key: 'schoolNum'
        },
        {
          title: '班级名称',
          align: 'center',
          key: 'handelClassNames'
        },
        {
          title: '班级数量',
          align: 'center',
          key: 'classNum'
        },
        {
          title: '用户状态',
          align: 'center',
          key: 'statusTxt'
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          handle: ['detail', 'statusBtn']
        }
      ]
    }
  },
  created () {
    this.getStudentList()
  },
  methods: {
    batchImport () {
      this.$router.push({
        name: 'student_import'
      })
    },
    changepage (currentPage) {
      this.page = currentPage
      this.getStudentList()
    },
    handlePageSize (pageSize) {
      this.count = pageSize
      this.getStudentList()
    },
    selectSchoolClass (options) {
      this.schoolId = options.schoolId || ''
      this.classId = options.classId || ''
      this.getStudentList()
    },
    async getStudentList () {
      const params = {
        page: this.page,
        count: this.count,
        keyword: this.keyword,
        schoolId: this.schoolId,
        classId: this.classId
      }
      const { result, code } = await this.api.cmsStudent.getCmsStudentList(params)
      if (code === 0) {
        this.total = result.count
        this.studentList = result.results
        this.studentList.forEach((item, index) => {
          item.index = index + 1
          item.handelShoolNames = ''
          item.schoolNames.forEach((schoolName, schoolIndex) => {
            if (schoolIndex === item.schoolNames.length - 1) {
              item.handelShoolNames += schoolName
            } else {
              item.handelShoolNames += schoolName + '; '
            }
          })
          item.schoolNum = item.schoolNames.length
          item.handelClassNames = ''
          item.classNames.forEach((className, classIndex) => {
            if (classIndex === item.classNames.length - 1) {
              item.handelClassNames += className
            } else {
              item.handelClassNames += className + '; '
            }
          })
          item.classNum = item.classNames.length
          if (item.status === this.$config.constant.USERSTATE.NORMAL) {
            item.statusTxt = '启用'
          } else {
            item.statusTxt = '禁用'
          }
        })
      }
    }
  }
}
</script>
