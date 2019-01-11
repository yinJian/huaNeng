<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="组名称">
      <Input v-model="formValidate.groupid" disabled></Input>
    </FormItem>
    <FormItem label="计划开始时间">
      <Input v-model="formValidate.confromtime" disabled></Input>
    </FormItem>
    <FormItem label="计划结束时间">
      <Input v-model="formValidate.conendtime" disabled></Input>
    </FormItem>
    <FormItem label="房间号" prop="confroomseri">
      <Input v-model="formValidate.confroomseri"></Input>
      <span>多个用‘/’分割, eg: 1/2/3</span>
    </FormItem>
    <FormItem label="会议室数量" prop="confrooms">
      <Input v-model="formValidate.confrooms" placeholder="请输入会议室数量" type="number"></Input>
    </FormItem>
    <FormItem label="理由" prop="notes">
      <Input v-model="formValidate.notes" placeholder="请输入理由" disabled></Input>
    </FormItem>
    <FormItem label="专家人数" prop="experts">
      <Input v-model="formValidate.experts" placeholder="请输入专家人数" type="number"></Input>
    </FormItem>
    <!-- <FormItem label="房间总数" prop="guestrooms">
      <Input v-model="formValidate.guestrooms" placeholder="请输入房间总数"></Input>
    </FormItem> -->
    <!-- <FormItem label="酒店专家人数" prop="hotelexperts">
      <Input v-model="formValidate.hotelexperts" placeholder="请输入酒店专家人数"></Input>
    </FormItem> -->
    <!-- <FormItem label="酒店理由" prop="hotelremark">
      <Input v-model="formValidate.hotelremark" placeholder="请输入酒店理由"></Input>
    </FormItem> -->
    <FormItem label="投影" prop="barco">
      <RadioGroup v-model="formValidate.barco">
        <Radio label="Y">是</Radio>
        <Radio label="N">否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="白板" prop="board">
      <RadioGroup v-model="formValidate.board">
        <Radio label="Y">是</Radio>
        <Radio label="N">否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="话筒" prop="microPhone">
      <RadioGroup v-model="formValidate.microPhone">
        <Radio label="Y">是</Radio>
        <Radio label="N">否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="朝向" prop="orient">
      <RadioGroup v-model="formValidate.orient">
        <Radio label="Y">是</Radio>
        <Radio label="N">否</Radio>
      </RadioGroup>
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
          'barco': 'N', // 投影
          'board': 'N', // 白板
          'confirmed': 'N', // N
          'confroomseri': '', // 0
          'microPhone': 'N', // 话筒 Y N
          'notes': '', // 其他需求
          'orient': 'N', // 朝向
          'record': 'N', // 录音
          'roomid': 0, // 填0
          'vip': 'N',
          'confrooms': '', // 会议室数量
          'conendtime': '',
          'experts': '', // 会议室专家人数
          'confromtime': '',
          'groupid': '',
          'guestroomno': '', // 默认为空
          'guestrooms': 0, // 房间总数 人数
          'hotelexperts': 0, // 住宿酒店专家人数
          'hotelremark': '' // 酒店理由
        }
      }
    }
  },
  data () {
    return {
      ruleValidate: {
        confrooms: [
          { required: true, message: '请输入会议室数量', trigger: 'blur', type: 'number' }
        ],
        experts: [
          { required: true, message: '请输入专家人数', trigger: 'blur', type: 'number' }
        ],
        confroomseri: [
          { required: true, message: '请输入房间号', trigger: 'blur' }
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
          this.formValidate.congid = this.formValidate.confid
          this.formValidate.microphone = this.formValidate.microPhone
          const { code } = await this.api.bizMonitor.saveConfirm(this.formValidate)
          if (code) {
            this.$Message.error('Fail!')
          } else {
            this.$Message.success('Success!')
            this.$emit('applyApprovalSuccess', { code })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
