<template>
    <div class="container">
      <Card>
        <Row>
          <Col span="12">
            <div class="left">
              <Tree :data="deptTree" on-select-change="deptSelect"></Tree>
            </div>
          </Col>
          <Col span="12">
            <div class="right">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                    <FormItem label="父节点" prop="parent">
                        <Input v-model="formValidate.parent" placeholder="父节点"></Input>
                    </FormItem>

                    <FormItem label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="名称"></Input>
                    </FormItem>

                    <FormItem label="排序" prop="sort">
                        <Input v-model="formValidate.sort"></Input>
                    </FormItem>

                  <FormItem>
                      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                  </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      deptVisable: false,
      deptTree: [],
      formValidate: {
        name: '',
        parent: '',
        sort: ''
      },
      data1: [],
      ruleValidate: {
        name: [
          { required: true, message: '请输入父节点', trigger: 'blur' }
        ],
        parent: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let sData = {
            name: this.formValidate.name,
            parentId: this.formValidate.parent,
            sort: this.formValidate.sort
          }
          const { code } = await this.api.user.addDept(sData)
          if (code) {
            this.$Message.error('创建失败!')
          } else {
            this.$Message.success('创建成功!')
            this.getDeptTree()
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    async getDeptTree () {
      const { data } = await this.api.user.getDeptTree()
      this.deptTree = data
    },
    focusDept () {
      this.deptVisable = true
    },
    deptSelect (value) {
      console.log(value)
    }
  },
  created () {
    this.getDeptTree()
  }
}
</script>
