<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
          <pi-ci></pi-ci>
      </Card>
      <Card v-if="false">
          <base-team></base-team>
          <div class="margin-top-20 tx-c">
              <Button type="info">重置环境</Button>
          </div>
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
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      piciState: 1,
      studentList: [{ 'index': 1, 'pici': '测试' }]
    }
  },
  methods: {
    changepage () {

    },
    handlePageSize () {

    }

  }
}
</script>
