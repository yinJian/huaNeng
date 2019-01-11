<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="组名称">
            <Input v-model="group.groupID" disabled></Input>
        </FormItem>
        <FormItem label="计划开始时间">
            <Input v-model="group.planFromTime" disabled></Input>
        </FormItem>
        <FormItem label="计划结束时间">
            <Input v-model="group.planEndTime" disabled></Input>
        </FormItem>
        <FormItem label="会议室数量" prop="confrooms">
            <Input v-model="formValidate.confrooms" placeholder="请输入会议室数量"></Input>
        </FormItem>
        <FormItem label="理由" prop="notes">
            <Input v-model="formValidate.tconfReservedetail.notes" placeholder="请输入理由"></Input>
        </FormItem>
        <FormItem label="专家人数" prop="experts">
            <Input v-model="formValidate.experts" placeholder="请输入专家人数"></Input>
        </FormItem>
        <FormItem label="房间总数" prop="guestrooms">
            <Input v-model="formValidate.guestrooms" placeholder="请输入房间总数"></Input>
        </FormItem>
        <FormItem label="酒店专家人数" prop="hotelexperts">
            <Input v-model="formValidate.hotelexperts" placeholder="请输入酒店专家人数"></Input>
        </FormItem>
        <FormItem label="酒店理由" prop="hotelremark">
            <Input v-model="formValidate.tconfReserveinfor.hotelremark" placeholder="请输入酒店理由"></Input>
        </FormItem>
        <FormItem label="投影" prop="barco">
            <RadioGroup v-model="formValidate.tconfReservedetail.barco">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="白板" prop="board">
            <RadioGroup v-model="formValidate.tconfReservedetail.board">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="话筒" prop="microphone">
            <RadioGroup v-model="formValidate.tconfReservedetail.microphone">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="朝向" prop="orient">
            <RadioGroup v-model="formValidate.tconfReservedetail.orient">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="VIP" prop="vip">
            <RadioGroup v-model="formValidate.tconfReservedetail.vip">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form>
    <!-- 酒店申请列表表单 -->
    <!-- <Card>
        <Row class="margin-top-10 searchable-table-con1">
            <Col span="24">
                <Row :gutter="10" class="margin-top-20">
                <Col span="24">
                    <div class="edittable-table-height-con">
                    <can-edit-table
                        refs="student"
                        :border="true"
                        :columnsList="tHeaderColumn3"
                        :thisTableData="studentList"
                    ></can-edit-table>
                    <div style="height:20px;"></div>
                    <can-edit-table
                        refs="student"
                        :border="true"
                        :columnsList="tHeaderColumn4"
                        :thisTableData="studentList"
                    ></can-edit-table>
                    <div class="margin-top-20 tx-c">
                        <Button type="info">提交</Button>
                    </div>
                    </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card> -->
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      default: () => {
        return {
          endTime: '',
          fromTime: ''
        }
      }
    }
  },
  data () {
    return {
      formValidate: {
        confrooms: '',
        experts: '',
        guestrooms: '',
        hotelexperts: '',
        'tconfReservedetail': {
          'barco': 'Y', // 投影
          'board': 'Y', // 白板
          'confirmed': 'Y', // Y
          'confroomseri': 0, // 0
          'microphone': 'Y', // 话筒 Y Y
          'notes': '', // 其他需求
          'orient': 'Y', // 朝向
          'record': 'Y', // 录音
          'roomid': 0, // 填0
          'vip': 'Y'
        },
        'tconfReserveinfor': {
          'confrooms': '', // 会议室数量
          'endtime': '',
          'experts': '', // 会议室专家人数
          'fromtime': '',
          'groupid': '',
          'guestroomno': '', // 默认为空
          'guestrooms': 0, // 房间总数 人数
          'hotelexperts': 0, // 住宿酒店专家人数
          'hotelremark': '' // 酒店理由
        }
      },
      ruleValidate: {
        'confrooms': [
          { required: true, message: '请输入会议室数量', trigger: 'blur' }
        ],
        experts: [
          { required: true, message: '请输入专家人数', trigger: 'blur' }
        ],
        guestrooms: [
          { required: true, message: '请输入房间总数', trigger: 'blur' }
        ],
        hotelexperts: [
          { required: true, message: '请输入住宿酒店专家人数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.formValidate.tconfReserveinfor.confrooms = this.formValidate.confrooms
          this.formValidate.tconfReserveinfor.experts = this.formValidate.experts
          this.formValidate.tconfReserveinfor.guestrooms = this.formValidate.guestrooms
          this.formValidate.tconfReserveinfor.hotelexperts = this.formValidate.hotelexperts
          this.formValidate.tconfReserveinfor.groupid = this.group.groupID
          this.formValidate.tconfReserveinfor.fromtime = this.group.planEndTime
          this.formValidate.tconfReserveinfor.endtime = this.group.planFromTime
          const { code } = await this.api.bizMonitor.saveReserveInforDTO(this.formValidate)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            this.$Message.success('Success!')
            this.$refs[name].resetFields()
            this.formValidate.tconfReservedetail.notes = ''
            this.formValidate.tconfReserveinfor.hotelremark = ''
            this.$emit('applyHotelSuccess', { code })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
