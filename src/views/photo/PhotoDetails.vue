<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>身份认证</span>
        </div>
        <el-form :model="details" label-width="100px">
          <el-form-item class="form-item" label="用户名">
            <el-input v-model="details.name" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="实名认证状态">
            <span :class="{red: !identify || identify.idStatus === -1}">
              {{ status || '没有提交认证' }}
            </span>
          </el-form-item>
          <el-form-item label="实名认证照片">
            <div v-if="identify && identify.idBody" class="cert-img">
              <img :src="identify.idBody">
            </div>
            <span v-else>无</span>
          </el-form-item>
          <el-form-item label="真人认证照片">
            <div v-if="identify && identify.pose" class="cert-img">
              <img :src="identify.pose">
            </div>
            <span v-else>无</span>
          </el-form-item>
        </el-form>
        <div v-if="selectPicList && selectPicList.length">
          <div v-for="(item, index) in selectPicList" :key="index">
            <p class="item-title">{{ item.status === 1 ? '已经通过审核的精选照片' : '待审核的精选照片' }}</p>
            <div class="item-img">
              <img :src="item.url" alt="">
            </div>
            <div v-if="item.status !== 1">
              <el-button type="primary" @click="submitForm(item, 1)">通过</el-button>
              <el-button @click="submitForm(item, -1)">拒绝</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { certPhotoDetails, certPhoto } from '@/api/cert'

export default {
  name: 'PhotoDetails',
  data() {
    return {
      details: {},
      selectPicList: [],
      identify: null
    }
  },

  computed: {
    status() {
      const stext = {
        '-1': '失败',
        '0': '信息不全,没有开始认证',
        '1': '成功',
        '2': '认证中'
      }
      return this.identify && stext[this.identify.idStatus]
    }
  },

  mounted() {
    const info = JSON.parse(this.$route.query.info)
    this.details = info
    this.getDetails()
  },

  methods: {
    submitForm(item, status) {
      certPhoto({ selectPicId: item.id, status }).then(res => {
        console.log('认证：', res)
        if (status === 1) {
          this.$message({ type: 'success', message: '认证成功' })
        } else {
          this.$message({ type: 'error', message: '拒绝认证' })
        }
      })
    },

    getDetails() {
      certPhotoDetails({ accId: this.details.id }).then(res => {
        this.selectPicList = res.data.selectPicList
        this.identify = res.data.identify
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
.item-title {
  font-weight: bold;
}
.item-img {
  max-width: 300px;
  margin-bottom: 10px;
  img {
    display: block;
    width: 100%;
  }
}
.red {
  color: rgb(255, 58, 58);
}
</style>
