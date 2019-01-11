<style lang="less">
@import "./home.less";
</style>
<template>
  <div class="height-point-100">
    <div class="height-point-100 flex border-radius-4 bg-white">
      <div class="width-point-100">
        <div class="home_center">
          <!-- <img @click="runTo1" src="../../assets/images/banner.png"> -->
          <div>欢迎使用华能招标协同平台</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      category: true
    }
  },
  computed: {},
  create () {
    let self = this
    self.$store.commit('clearAllTags')
    self.$store.state.app.tagsList = []
    self.$store.commit('setAvator', self)
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      let self = this
      if (self.$store.state.app.access === 2010) {
        self.category = true
      } else {
        self.category = false
      }
    },
    runTo1 () {
      this.$router.push({
        name: 'student-list'
      })
    }
  }
}
</script>
