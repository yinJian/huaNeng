<template>
    <Cascader @on-change="change" :data="data" v-model="value"></Cascader>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      value: []
    }
  },
  methods: {
    async getData () {
      const { data } = await this.api.bizMonitor.getDptTree()
      data.map(item => {
        item.label = item.dptname
        item.value = item.dptid
        item.children = []
        const dtos = []
        const dtoBuildNos = []
        item.buldDTOs.map(dto => {
          if (!dtoBuildNos.includes(dto.buldNo)) {
            dtoBuildNos.push(dto.buldNo)
            dtos.push(dto)
          }
        })
        item.children = dtos
        item.children.map(child => {
          child.label = child.buldNo
          child.value = child.buldNo
          child.children = child.floors
          child.children.map(floor => {
            floor.label = floor.floorno
            floor.value = floor.floorid
          })
        })
      })
      this.data = data
    },
    change (value) {
      this.$emit('cascaderDept', value)
    }
  },
  created () {
    this.getData()
  }
}
</script>
