<template>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
        <FormItem label="招标人" prop="tenderee">
            <Input v-model="formValidate.tenderee" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="招标联系人">
            <Input v-model="formValidate.bidderContacts" placeholder="请输入招标联系人"></Input>
        </FormItem>
        <FormItem label="联系电话">
            <Input v-model="formValidate.bidderContactsTel" placeholder="请输入联系电话"></Input>
        </FormItem>
        <FormItem label="招标代理机构项目负责人">
            <Input v-model="formValidate.projectLeader" disabled placeholder="请输入招标代理机构项目负责人"></Input>
        </FormItem>
        <FormItem label="项目负责人联系电话">
            <Input v-model="formValidate.projectLeaderTel" placeholder="请输入招标代理机构项目负责人电话"></Input>
        </FormItem>
        <FormItem label="委托项目">
            <Input v-model="formValidate.entrustedProject" placeholder="请输入委托项目"></Input>
        </FormItem>
        <FormItem label="委托时间">
            <DatePicker v-model="formValidate.commissionTime" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
        </FormItem>
        <div style="font-weight:bold;box-sizing:border-box;padding-left:100px;height:50px;line-height:50px;">评价内容</div>
        <FormItem label="A 招标结果">
            <RadioGroup v-model="formValidate.tenderResult">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="B 整体服务质量">
            <RadioGroup v-model="formValidate.qualityOfService">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="C 进度安排及完成时间">
            <RadioGroup v-model="formValidate.schedulingAndCompletionTime">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="D 项目前期咨询及服务">
            <RadioGroup v-model="formValidate.consultationAndServices">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="E 人员配备及业务水平">
            <RadioGroup v-model="formValidate.staffingAndProfessionalLevel">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="F 项目负责人责任心、工作态度">
            <RadioGroup v-model="formValidate.responsibilityAndWorkingAttitude">
                <Radio label="5">很满意(5分)</Radio>
                <Radio label="4">满意(4分)</Radio>
                <Radio label="3">比较满意(3分)</Radio>
                <Radio label="2">一般(2分)</Radio>
                <Radio label="1">不满意(1分)</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit('formValidate')" type="primary">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
import categorySelect from '@/components/select/category.vue'
import { dateFormat } from '@/libs/util'
export default {
  components: {
    categorySelect
  },
  data () {
    return {
      deptVisable: false,
      formValidate: {
        tenderee: '',
        bidderContacts: '',
        bidderContactsTel: '',
        projectLeader: this.$route.query.projectLeader,
        projectLeaderTel: '',
        entrustedProject: '',
        commissionTime: '',
        tenderResult: '',
        qualityOfService: '',
        schedulingAndCompletionTime: '',
        consultationAndServices: '',
        staffingAndProfessionalLevel: '',
        responsibilityAndWorkingAttitude: ''
      },
      ruleValidate: {
        tenderee: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      console.log('ok')
      this.$refs[name].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          this.formValidate.commissionTime = dateFormat(this.formValidate.commissionTime, 'yyyy-MM-dd HH:mm:ss')
          const { code } = await this.api.comment.saveDailiTable(this.formValidate)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            this.$Message.success('保存成功!')
            this.$router.push({
              name: 'weituocomment'
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  created () {

  }
}
</script>
