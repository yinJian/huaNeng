<template>
    <Select @on-change="change" v-model="category" multiple>
        <Option v-for="(key, value) in categorys" :value="value" :key="key">{{ key }}</Option>
    </Select>
</template>
<script>
export default {
  data () {
    return {
      categorys: this.$config.constant.UTYPE_DESC_OBJ,
      category: ''
    }
  },
  methods: {
    change (value) {
      this.$emit('categorySelect', value)
    }
  }
}
</script>
