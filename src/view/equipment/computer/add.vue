<template>
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
            <FormItem label="设备类型" prop="deviceType">
                <Select v-model="formValidate.deviceType" style="width:200px" @on-change="getShebei(formValidate.deviceType)">
                    <Option value="闸机" label="闸机" >闸机</Option>
                    <Option value="摄像头" label="摄像头">摄像头</Option>
                    <Option value="人脸识别" label="人脸识别">人脸识别</Option>
                </Select>
            </FormItem>
            <!--<Row style="height:50px;">-->
                <!--<Col offset="3" span="18">-->
                    <!--位置：-->
                <!--&lt;!&ndash; </Col>-->
                <!--<Col span="10"> &ndash;&gt;-->
                    <!--<RadioGroup>-->
                        <!--<Radio label="楼层"></Radio>-->
                        <!--<Radio label="会议室"></Radio>-->
                    <!--</RadioGroup>-->
                <!--</Col>-->
            <!--</Row>-->
            <Row v-if="choseLouceng">
                <Row>
                <Col span="8">
                    <FormItem label="集团" >
                        <Select @on-change="changeBumen(formValidate.dptname)" v-model="formValidate.dptname" style="width:200px">
                            <Option v-for="(item, index) in bumenList" :value="item.dptid" :key="index">{{item.dptname}}</Option>
                        </Select>
                    </FormItem>
                </Col>
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
                <FormItem label="楼层" >
                    <Select v-model="formValidate.floorno" style="width:200px">
                        <Option v-for="(item, index) in loucengList" :value="item.floorid" :key="index">{{item.floorno}}</Option>
                    </Select>
                </FormItem>
                </Col>
                </Row>
            </Row>
            <Row v-if="choseMeeting">
                <Row>
                    <Col span="8">
                        <FormItem label="集团">
                            <Select @on-change="changeBumen(formValidate.dptname)" v-model="formValidate.dptname" style="width:200px">
                                <Option v-for="(item, index) in bumenList" :value="item.dptid" :key="index">{{item.dptname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
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
                <Col span="8">
                  <FormItem label="会议室编号">
                    <Select v-model="formValidate.roomid" style="width:200px">
                      <Option v-for="(item, index) in huiyiList" :value="item.roomid" :key="index">{{item.roomno}}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Row>
            <FormItem label="设备编号" prop="deviceid">
                <!--<Select  v-model="formValidate.deviceNo" style="width:200px">-->
                    <!--<Option v-for="(item, index) in shebeiList" :value="item.deviceid" :key="index">{{item.deviceno}}</Option>-->
                <!--</Select>-->
                <Select
                  style="width:200px"
                  v-model="formValidate.deviceNo"
                  filterable
                  remote
                  :remote-method="remoteMethod1"
                  :loading="loading1">
                  <Option v-for="(item, index) in options1" :value="item.deviceid" :key="index">{{item.deviceno}}</Option>
                </Select>
                <!-- <Input v-model="formValidate.deviceNo" placeholder="请输入设备编号" /> -->
            </FormItem>
            <FormItem label="IP" prop="ipAddr">
                <Input style="width:200px" v-model="formValidate.ipAddr" placeholder="请输入IP" />
            </FormItem>
            <FormItem label="区域信息" prop="area">
                <Input v-model="formValidate.area" type="textarea" placeholder="请输入区域信息" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="formValidate.notes"  type="textarea" placeholder="请输入备注信息" />
            </FormItem>
            <FormItem>
                <Button @click="handleSubmit('formValidate')" type="primary">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
export default {
  data () {
    return {
      choseLouceng: true,
      choseMeeting: false,
      loading1: false,
      options1: [],
      bumenList: [],
      louhaoList: [],
      loucengList: [],
      huiyiList: [],
      shebeiList: [],
      formValidate: {
        deviceType: '',
        notes: '',
        area: '',
        buidno: '',
        floorno: '',
        roomno: '',
        dptname: '',
        ipAddr: '',
        deviceNo: ''
      },
      ruleValidate: {
        deviceType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        deviceid: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        ipAddr: [
          { required: true, message: '请输入IP', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        let data = {
          'area': this.formValidate.area,
          'deviceID': this.formValidate.deviceNo,
          'deviceType': this.formValidate.deviceType,
          'ipAddr': this.formValidate.ipAddr,
          'notes': this.formValidate.notes,
          'positionID': this.formValidate.deviceType.indexOf('闸') >= 0 ? this.formValidate.floorno : this.formValidate.roomid,
          'positionType': this.choseLouceng ? 'floor' : 'room'
        }
        if (valid) {
          const { code } = await this.api.equipment.addcomputer(data)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            this.$Message.success('保存成功!')
            this.$router.push({
              name: 'computerlist'
            })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    choseArea (value) {
      console.log(value)
      if (value.indexOf('闸') >= 0) {
        this.choseLouceng = true
        this.choseMeeting = false
      } else {
        this.choseLouceng = false
        this.choseMeeting = true
      }
    },
    async query () {
      const { code, data } = await this.api.equipment.getbumen()
      if (code) {

      } else {
        this.bumenList = data.records
      }
    },
    async getShebei (value) {
      console.log(value)
      this.choseArea(value)
      let name = '?devicetype=' + this.formValidate.deviceType
      const { code, data } = await this.api.equipment.getshebei(name)
      if (code) {

      } else {
        this.shebeiList = data.records
      }
    },
    remoteMethod1 (query) {
      console.log(query)
      if (query !== '') {
        this.loading1 = true
        setTimeout(() => {
          this.loading1 = false
          const shebeilist = this.shebeiList.map(item => {
            return {
              deviceid: item.deviceid,
              deviceno: item.deviceno
            }
          })
          console.log(shebeilist)
          this.options1 = shebeilist.filter(item => item.deviceno.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.options1 = []
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
    this.query()
    // this.getShebei()
  }
}
</script>
