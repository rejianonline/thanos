<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>房产认证详情</span>
        </div>
        <el-form ref="details" :model="details" label-width="100px">
          <el-form-item class="form-item" label="用户名">
            <el-input v-model="details.name" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="学校">
            <el-input v-model="details.school" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="学历">
            <el-input v-model="details.edu" disabled />
          </el-form-item>
          <el-form-item v-for="(item, index) in details.pic" :key="index" label="证书">
            <div class="cert-img">
              <img :src="item">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(1)">通过</el-button>
            <el-button @click="onSubmit(-1)">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { certEdu } from '@/api/cert'

export default {
  name: 'HouseDetails',
  data() {
    return {
      details: {},
      tokenObject: {}
    }
  },

  mounted() {
    const info = JSON.parse(this.$route.query.info)
    info.pic = info.pic.split(',')
    this.details = info
  },

  methods: {
    onSubmit(type) {
      certEdu({
        eduDetailId: this.details.id,
        status: type
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
