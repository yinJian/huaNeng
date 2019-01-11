<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Row class="margin-top-20">
      <Card>
        <Row class="margin-top-10 searchable-table-con1">
          <Col span="24">
            <Row :gutter="10" class="margin-top-20">
              <Col span="24">
                <div v-if="piciState == 1" class="edittable-table-height-con">
                  <can-edit-table
                    refs="student"
                    :border="true"
                    :columnsList="tHeaderColumn"
                    :thisTableData="commentList"
                  ></can-edit-table>
                  <div class="margin-top-20 tx-c">
                        <Button @click="submitTable" type="info">提交</Button>
                    </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>
<script>
import canEditTable from '@/components/can-edit-table/can-edit-table.vue'
export default {
  components: {
    canEditTable
  },

  data () {
    return {
      isWatchEvaluate: '',
      project_id: '',
      modal1: false,
      total: 0,
      page: 1,
      count: 10,
      piciState: 1,
      project: '',
      projectList: [],
      commentList: [],
      tHeaderColumn: [
        {
          title: '序号',
          align: 'center',
          key: 'sort'
        },
        {
          title: '评价内容',
          align: 'center',
          key: 'content'
        },
        {
          title: '分值',
          align: 'center',
          key: 'fraction'
        },
        {
          title: '扣分项',
          align: 'center',
          key: 'deductioncontent'
        },
        {
          title: '得分',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.newfraction
              },
              on: {
                input: (value) => {
                  params.row.newfraction = value
                  this.commentList[params.index].newfraction = value
                }
              }
            })
          }
        }
      ]

    }
  },
  methods: {
    changepage () {},
    handlePageSize () {},
    showModal () {
      this.modal1 = true
    },
    async query () {
      // let name = '?isWatchEvaluate=' + this.isWatchEvaluate + '&project_id=' + this.project_id
      const { code, data } = await this.api.comment.getKongbaiPage()
      // console.log(code)
      if (code) {

      } else {
        this.commentList = data.records
        this.commentList.forEach((item, index) => {
          item.newfraction = ''
        })
      }
    },
    async submitTable () {
      let sData = {
        'evaluate': {
          'expertId': this.$route.query.expertId,
          'expertName': this.$route.query.expertName,
          'fraction': 0,
          'groupid': this.$route.query.groupid
        }
      }
      sData.itemArchives = []
      let count = 0
      this.commentList.forEach((item, index) => {
        sData.itemArchives.push({
          evaluateItemId: item.evaluateItemId,
          fraction: item.newfraction
        })
        count = parseInt(count) + parseInt(item.newfraction)
      })
      sData.evaluate.fraction = count
      const { code } = await this.api.comment.saveMangerExpertTable(sData)
      if (code) {

      } else {
        this.$Message.success('保存成功')
        let argu = { 'groupid': this.$route.query.groupid }
        this.$router.push({
          name: 'mangercomment',
          query: argu
        })
      }
    }
  },
  created () {
    this.query()
  }
}
</script>
