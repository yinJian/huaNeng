<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="角色" prop="role">
            <category-select @categorySelect="categorySelect" v-model="formValidate.role" />
        </FormItem>
        <FormItem label="部门" prop="dept">
            <Input  @on-focus="focusDept" v-model="formValidate.dept" placeholder="部门"></Input>
            <Modal v-model="deptVisable" :title="'请选择'">
                <Input @on-focus="focusInput"  v-model="keyword" placeholder="请输入关键字进行过滤" style="width: 300px" />
                <Tree @on-select-change="deptSelect" :data="deptTree" expand="true"></Tree>
                <div slot="footer">
                </div>
            </Modal>
        </FormItem>
        <FormItem label="状态" prop="lockFlag">
            <RadioGroup v-model="formValidate.lockFlag">
                <Radio label="0">开启</Radio>
                <Radio label="1">锁定</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
import categorySelect from '@/components/select/category.vue'

export default {
  components: {
    categorySelect
  },
  data () {
    return {
      deptVisable: false,
      formValidate: {
        username: '',
        phone: '',
        deptId: '',
        status: '',
        role: [],
        dept: '',
        userId: '',
        lockFlag: ''
      },
      keyword: '',
      deptTree: [],
      ruleValidate: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        dept: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        lockFlag: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur', type: 'array' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const { code } = await this.api.user.userDetail(this.formValidate.username)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            const { code } = await this.api.user.addUser(this.formValidate)
            if (!code) {
              this.$Message.success('Success!')
            } else {
              this.$Message.error('Fail!')
            }
            this.$router.back()
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    focusDept () {
      this.deptVisable = true
    },
    deptSelect (value) {
      this.formValidate.deptId = (value.length && value[value.length - 1].id) || ''
      this.formValidate.dept = (value.length && value[value.length - 1].title) || ''
      this.deptVisable = false
      this.$refs['formValidate'].validateField('dept')
    },
    async getDeptTree () {
      const { data } = await this.api.user.getDeptTree()
      this.deptTree = data
    },
    categorySelect (value) {
      this.formValidate.role = value
    },
    async focusInput (value) {
      const { data } = await this.api.user.getDeptTree()
      this.deptTree = data
    }
  },
  created () {
    this.getDeptTree()
  }
}
</script>
