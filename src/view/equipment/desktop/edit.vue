<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
    <!--<Row style="height:50px;">-->
    <!--<Col offset="3" span="18">-->
    <!--位置：-->
    <!--&lt;!&ndash; </Col>-->
    <!--<Col span="10"> &ndash;&gt;-->
    <!--<RadioGroup @on-change="choseArea">-->
    <!--&lt;!&ndash;<Radio label="楼层"></Radio>&ndash;&gt;-->
    <!--<Radio label="会议室"></Radio>-->
    <!--</RadioGroup>-->
    <!--</Col>-->
    <!--</Row>-->
    <Row>
      <Col span="8">
        <FormItem label="集团">
          <Select @on-change="changeBumen(formValidate.dptname)" v-model="formValidate.dptname" style="width:200px">
            <Option v-for="(item, index) in bumenList" :value="item.dptid" :key="index">{{item.dptname}}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="楼号">
          <Select @on-change="changeLohao(formValidate.buidno)" v-model="formValidate.buidno" style="width:200px">
            <Option v-for="(item, index) in louhaoList" :value="item" :key="index">{{item}}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="楼层">
          <Select @on-change="changeHuiyi(formValidate.floorno)" v-model="formValidate.floorno" style="width:200px">
            <Option v-for="(item, index) in loucengList" :value="item.floorid" :key="index">{{item.floorno}}
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="会议室编号">
          <Select v-model="formValidate.roomid" style="width:200px">
            <Option v-for="(item, index) in huiyiList" :value="item.roomid" :key="index">{{item.roomno}}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="设备编号">
      <Input v-model="formValidate.termID" disabled  placeholder="请选输入数字编号"/>
    </FormItem>
    <!--<FormItem label="区域">-->
    <!--<Input v-model="formValidate.area" type="textarea" placeholder="请输入具体区域，如：东、西、南、北"/>-->
    <!--</FormItem>-->
    <FormItem label="备注">
      <Input v-model="formValidate.notes" type="textarea" placeholder=""/>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit('formValidate')" type="primary">提交</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      bumenList: [],
      louhaoList: [],
      loucengList: [],
      huiyiList: [],
      formValidate: {
        notes: '',
        positionID: '',
        positionType: '',
        termID: ''
      },
      ruleValidate: {
        deviceType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit (name) {
      console.log(name)
      // this.$refs[name].validate(async (valid) => {
      //   if (valid) {
      this.formValidate = {
        deviceID: this.formValidate.termID || '',
        notes: this.formValidate.notes || '',
        positionID: this.formValidate.roomid || '',
        positionType: 'room'
      }

      const { code } = await this.api.equipment.editdesktop([this.formValidate])
      if (code) {
        this.$Message.error('Fail!')
      } else {
        this.$Message.success('保存成功!')
        this.$router.push({
          name: 'desktoplist'
        })
      }
      //   } else {
      //     this.$Message.error('Fail!')
      //   }
      // })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    async querys () {
      let name = this.$route.query._id
      const { code, data } = await this.api.equipment.desktopList()
      if (code) {

      } else {
        this.formValidate = {
          notes: data[name].notes || '',
          termID: data[name].termID || '',
          positionID: data[name].positionID || '',
          positionType: data[name].positionType || ''
        }
      }
    },
    async query () {
      const { code, data } = await this.api.equipment.getbumen()
      if (code) {

      } else {
        this.bumenList = data.records
      }
    },
    async changeBumen (value) {
      let name = '?DptID=' + value
      const { code, data } = await this.api.equipment.getlouhao(name)
      if (code) {

      } else {
        this.louhaoList = data
      }
    },
    async changeLohao (value) {
      console.log(value)
      let name = '?buldno=' + value
      const { code, data } = await this.api.equipment.getlouceng(name)
      if (code) {

      } else {
        this.loucengList = data.records
      }
    },
    async changeHuiyi (value) {
      console.log(value)
      let name = '?floorid=' + value
      const { code, data } = await this.api.equipment.gethuiyi(name)
      if (code) {

      } else {
        this.huiyiList = data.records
      }
    }
  },
  created () {
    this.querys()
    this.query()
  }

}
</script>
