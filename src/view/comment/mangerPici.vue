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
import baseTeam from '@/components/base-team/base-team.vue'
export default {
  components: {
    canEditTable,
    piCi,
    baseTeam
  },

  data () {
    return {

    }
  },
  methods: {
    changepage () {},
    handlePageSize () {}
  }
}
</script>
