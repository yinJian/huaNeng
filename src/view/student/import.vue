<style>
@import "../../styles/common.less";
</style>

<template>
  <div>
    <div>
      <span class="inline-block line-height-50 font-size-16 font-weight">学生管理/导入</span>
    </div>
    <div>
      <Button size="large" type="primary" @click="downLoad">下载模板</Button>
    </div>
    <Card class="margin-top-20" style="height: 500px;">
      <div
        style="text-align:center;margin-top: 150px;width: 300px;margin-left: auto;margin-right: auto;"
      >
        <Upload
          ref="uploadButton"
          :action="uploadUrl"
          name="file"
          :format="['xls']"
          :on-success="handleSuccess"
          :on-format-error="formatError"
        >
          <Button style="width: 100%;" type="primary" size="large">选择上传文件</Button>
        </Upload>
        <div class="margin-top-20 tx-l">注意事项：</div>
        <div class="margin-top-20 tx-l">请先下载模板，添加学生信息后，然后导入系统</div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadUrl: this.$config.baseUrl.pro + '/cmsxls/importStudents'
    }
  },
  methods: {
    handleSuccess (response, file, fileList) {
      let that = this
      if (response.code === 0) {
        this.$router.push({
          name: 'student_list' // 打开的页面名字
        })
      } else {
        this.$Notice.error({
          title: '失败',
          desc: response.codemsg
        })
        setTimeout(() => {
          that.$refs.uploadButton.clearFiles()
        }, 2000)
      }
    },
    formatError () {
      this.$Notice.error({
        title: '失败',
        desc: '请上传"xls"类型的文件'
      })
    },
    downLoad () {
      location.href = this.$config.baseUrl.pro + '/student.xls'
    }
  }
}
</script>
