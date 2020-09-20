<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>姿势照片认证</span>
        </div>
        <el-form ref="details" :model="details" label-width="80px">
          <el-form-item label="">
            <div class="cert-img">
              <img :src="details.pose">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="verifyPoseImg(1)">通过</el-button>
            <el-button @click="verifyPoseImg(-1)">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { certPoseImg } from '@/api/cert'

export default {
  name: 'AuthDetails',
  data() {
    return {
      details: {}
    }
  },

  mounted() {
    const info = JSON.parse(this.$route.query.info)
    this.details = info
  },

  methods: {
    verifyPoseImg(type) {
      certPoseImg({
        accId: this.details.accId,
        poseStatus: type
      }).then(res => {
        if (type === 1) {
          this.$message({ type: 'success', message: '认证成功' })
        } else {
          this.$message({ type: 'error', message: '拒绝认证成功' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cert-img {
  img {
    display: block;
    width: 100%;
    max-width: 300px;
  }
}
.form-item {
  max-width: 500px;
}
</style>
