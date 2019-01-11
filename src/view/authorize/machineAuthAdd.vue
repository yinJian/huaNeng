<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
          <pi-ci></pi-ci>
      </Card>
    </Row>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
import piCi from '@/components/pici/pici.vue'

export default {
  components: {
    canEditTable,
    piCi
  },
  data () {
    return {
      modal1: false,
      total: 0,
      page: 1,
      count: 10
    }
  },
  methods: {
    changepage () {

    },
    handlePageSize () {

    },
    changePiciState (state) {
      console.log(state)
      this.piciState = state.piciState
    },
    showModal () {
      this.modal1 = true
    }
  }
}
</script>
