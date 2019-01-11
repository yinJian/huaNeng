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
                        <Button @click="submitData"  type="info">提交</Button>
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
      commentList: [
        {
          content: '酒店名称',
          fraction: '',
          score: this.$route.query.hotel
        },
        {
          content: '服务态度',
          fraction: 5,
          score: ''
        },
        {
          content: '地理位置',
          fraction: 5,
          score: ''
        },
        {
          content: '设施齐全',
          fraction: 5,
          score: ''
        },
        {
          content: '隔音能力',
          fraction: 5,
          score: ''
        },
        {
          content: '周边环境',
          fraction: 5,
          score: ''
        },
        {
          content: '其他评价或意见',
          fraction: 5,
          score: ''
        },
        {
          content: '',
          fraction: '请输入年份',
          score: ''
        }
      ],
      tHeaderColumn: [
        {
          title: '评分项',
          align: 'center',
          key: 'content'
        },
        {
          title: '分值',
          align: 'center',
          key: 'fraction'
        },
        {
          title: '得分',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.score,
                disabled: params.row.score === this.$route.query.hotel
              },
              on: {
                input: (value) => {
                  this.commentList[params.index].score = value
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

    },
    submitData () {
      let sDate = {
        groupid: this.$route.query.groupid,
        hotel_name: this.$route.query.hotel,
        attitude: this.commentList[1].score,
        position: this.commentList[2].score,
        facilities: this.commentList[3].score,
        sound_insulation: this.commentList[4].score,
        environment: this.commentList[5].score,
        remark: this.commentList[6].score,
        year: this.commentList[6].score
      }
      const { code } = this.api.comment.hotelevaluate(sDate)
      if (code) {

      } else {
        this.$Message.info('创建成功')
        this.$router.replace({
          name: 'expertcomment'
        })
      }
    }
  },
  created () {
    console.log(this.commentList)
    this.query()
  }
}
</script>
