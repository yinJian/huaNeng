<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <div>
      <span class="inline-block line-height-50 font-size-16 font-weight">学生管理/查看</span>
      <Button @click="runEdit" type="primary" style="float: right;margin-top: 5px;">编辑</Button>
    </div>
    <Card :bordered="false">
      <p slot="title">基本信息</p>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <Row>
          <Col span="20" offset="2">
            <FormItem label="学籍号:" prop="stuNo">
              <span>{{formValidate.stuNo}}</span>
            </FormItem>
          </Col>
          <Col span="20" offset="2">
            <FormItem label="昵称:" prop="stuNo">
              <span>{{formValidate.nickName}}</span>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="真实姓名:" prop="stuNo">
              <span>{{formValidate.name}}</span>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="性别:" prop="stuNo">
              <span>{{formValidate.sex}}</span>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="出生日期:" prop="stuNo">
              <span>{{formValidate.birthday}}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="margin-top-20" :bordered="false">
      <p slot="title">学校信息</p>
      <Row class="margin-bottom-20" v-for="(item,index) in schoolImf" :key="index">
        <Col span="10" offset="2">学校名称：{{item.schoolName}}</Col>
        <Col span="10" offset="2">班级名称：{{item.className}}</Col>
      </Row>
    </Card>
    <div class="tx-c margin-top-20">
      <Button @click="runBack" type="primary" size="large">返回</Button>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/libs/util'

export default {
  data () {
    return {
      schoolImf: [],
      formValidate: {
        stuNo: '',
        nickName: '',
        name: '',
        sex: '',
        birthday: ''
      },
      ruleValidate: {
        stuNo: [{ required: true }],
        nickName: [{ required: true }],
        name: [{ required: true }],
        sex: [{ required: true }],
        birthday: [{ required: true }]
      }
    }
  },

  created () {
    this.init()
  },
  methods: {
    init () {
      this.query()
    },
    async query () {
      const { result, code } = await this.api.cmsStudent.getStudentDetail(this.$route.query._id)
      if (code === 0) {
        this.formValidate.stuNo = result.users.stuNo
        this.formValidate.nickName = result.users.nickName
        this.formValidate.name = result.users.name
        if (result.users.sex === 10) {
          this.formValidate.sex = '男'
        } else {
          this.formValidate.sex = '女'
        }
        this.formValidate.birthday = dateFormat(
          result.users.birthday,
          'yyyy-MM-dd'
        )

        this.schoolImf = result.school
      }
    },
    runEdit () {
      let argu = { _id: this.$route.query._id }
      this.$router.push({
        name: 'student_edit', // 打开的页面名字
        query: argu
      })
    },
    runBack () {
      window.history.back()
    }
  }
}
</script>
