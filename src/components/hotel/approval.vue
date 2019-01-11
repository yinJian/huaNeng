<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="组名称">
      <Input v-model="formValidate.groupID" disabled></Input>
    </FormItem>
    <FormItem label="计划开始时间">
      <Input v-model="formValidate.fromTime" disabled></Input>
    </FormItem>
    <FormItem label="计划结束时间">
      <Input v-model="formValidate.endTime" disabled></Input>
    </FormItem>
    <FormItem label="房间号" prop="hotelroomno">
      <Input v-model="formValidate.hotelroomno"></Input>
    </FormItem>
    <FormItem label="房间ID" prop="hotelroomseri">
      <Input v-model="formValidate.hotelroomseri"></Input>
    </FormItem>
    <FormItem label="备注" prop="notes">
      <Input v-model="formValidate.notes"></Input>
    </FormItem>
    <FormItem label="房间总数" prop="guestrooms">
      <Input v-model="formValidate.guestrooms" placeholder="请输入房间总数"></Input>
    </FormItem>
    <FormItem label="酒店专家人数" prop="hotelexperts">
      <Input v-model="formValidate.hotelexperts" placeholder="请输入酒店专家人数"></Input>
    </FormItem>
    <FormItem label="VIP" prop="vip">
      <RadioGroup v-model="formValidate.vip">
        <Radio label="Y">是</Radio>
        <Radio label="N">否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
    </FormItem>
  </Form>
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
    },
    formValidate: {
      type: Object,
      default: () => {
        return {
          'confirmed': 'N', // N
          'confroomseri': '', // 0
          'notes': '', // 其他需求
          'roomid': 0, // 填0
          'confrooms': '', // 会议室数量
          'fromTime': '',
          'experts': '', // 会议室专家人数
          'guestroomno': '', // 默认为空
          'guestrooms': '', // 房间总数 人数
          'hotelexperts': '', // 住宿酒店专家人数
          'hotelremark': '', // 酒店理由
          'vip': '',
          'groupid': '',
          'congid': '0',
          'hotelroomno': ''
        }
      }
    }
  },
  data () {
    return {
      ruleValidate: {
        confrooms: [
          { required: true, message: '请输入会议室数量', trigger: 'blur' }
        ],
        experts: [
          { required: true, message: '请输入专家人数', trigger: 'blur' }
        ],
        hotelroomseri: [
          { required: true, message: '请输入房间ID', trigger: 'blur' }
        ],
        hotelroomno: [
          { required: true, message: '请输入房间号', trigger: 'blur', type: 'string' }
        ],
        notes: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.formValidate.congid = this.formValidate.confID
          this.formValidate.groupid = this.formValidate.groupID
          delete this.formValidate.confID
          const { code } = await this.api.bizMonitor.thotelconfirm(this.formValidate)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            this.$Message.success('Success!')
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
