<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <div>
      <span class="inline-block line-height-50 font-size-16 font-weight">学生编辑</span>
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
              <!--<span>{{formValidate.stuNo}}</span>-->
              <Input v-model="formValidate.stuNo" placeholder="请输入学籍号" style="width: 240px"></Input>
            </FormItem>
          </Col>
          <Col span="20" offset="2">
            <FormItem label="昵称:" prop="nickName">
              <!--<span>{{formValidate.nickName}}</span>-->
              <Input v-model="formValidate.nickName" placeholder="请输入学籍号" style="width: 240px"></Input>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="真实姓名:" prop="name">
              <!--<span>{{formValidate.name}}</span>-->
              <Input v-model="formValidate.name" placeholder="请输入姓名" style="width: 240px"></Input>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="性别:" prop="sex">
              <!--<span>{{formValidate.sex}}</span>-->
              <RadioGroup v-model="formValidate.sex">
                <Radio :label="10">男</Radio>
                <Radio :label="20">女</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="5" offset="2">
            <FormItem label="出生日期:" prop="birthday">
              <!--<span>{{formValidate.birthday}}</span>-->
              <DatePicker type="date" placeholder="请选择日期" v-model="formValidate.birthday"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="margin-top-20" :bordered="false">
      <p slot="title">学校信息</p>
      <Row class="margin-bottom-20" v-for="(item,index) in schoolImf" :key="index">
        <Col span="10" offset="2">学校名称：
          <Input v-model="item.schoolName" placeholder="请输入姓名" style="width: 240px"></Input>
        </Col>
        <Col span="10" offset="2">班级名称：
          <Input v-model="item.className" placeholder="请输入姓名" style="width: 240px"></Input>
        </Col>
      </Row>
    </Card>
    <div class="tx-c margin-top-20">
      <Button @click="handleSubmit('formValidate')" type="primary" size="large">提交</Button>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/libs/util'

export default {
  data () {
    return {
      schoolImf: [],
      userId: '',
      formValidate: {
        stuNo: '',
        nickName: '',
        name: '',
        sex: '',
        birthday: ''
      },
      ruleValidate: {
        stuNo: [{ required: true, message: '请输入学籍号', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        /* sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ], */
        birthday: [
          {
            required: true,
            type: 'date',
            message: '请选择时间',
            trigger: 'change'
          }
        ]
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
      const { code, result } = await this.api.cmsStudent.getStudentDetail(this.$route.query._id)
      if (code === 0) {
        this.userId = result.users._id
        this.formValidate.stuNo = result.users.stuNo
        this.formValidate.nickName = result.users.nickName
        this.formValidate.name = result.users.name
        this.formValidate.sex = result.users.sex
        this.formValidate.birthday = dateFormat(result.users.birthday, 'yyyy-MM-dd')
        this.schoolImf = result.school
      }
    },
    async handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let classes = []
          let schools = []
          this.schoolImf.forEach((item, index) => {
            classes.push({ className: item.className })
            schools.push({ schoolName: item.schoolName })
          })
          let data = {
            users: {
              userId: this.userId,
              stuNo: this.formValidate.stuNo,
              name: this.formValidate.name,
              nickName: this.formValidate.nickName,
              sex: this.formValidate.sex,
              birthday: this.formValidate.birthday
            },
            students: [
              {
                classes: classes
              },
              {
                schools: schools
              }
            ]
          }
          const { code, codemsg } = await this.api.cmsStudent.upsertStudent(data)
          if (code === 0) {
            this.common.info('编辑学生成功', this)
            this.$router.push({
              name: 'student_list' // 打开的页面名字
            })
          } else {
            this.common.error(codemsg, this)
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
