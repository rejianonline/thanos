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
          <el-form-item class="form-item" label="提现金额">
            <el-input v-model="details.amount" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="账户金额">
            <el-input v-model="details.amountNumber" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="支付宝">
            <el-input v-model="details.aliAccount" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="邀请充值人数">
            <el-input v-model="details.name" disabled />
          </el-form-item>
          <el-form-item class="form-item" label="历史提现总额">
            <el-input v-model="details.totalWithDrawAmount" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(2)">通过</el-button>
            <el-button @click="submitForm(-1)">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { withdrawDetails, certWithDraw } from '@/api/cert'

export default {
  name: 'WidthDrawDetails',
  data() {
    return {
      details: {}
    }
  },

  mounted() {
    const info = JSON.parse(this.$route.query.info)
    this.details = info
    this.getDetails()
  },

  methods: {
    submitForm(status) {
      certWithDraw({ withDrawId: this.details.id, status }).then(res => {
        if (status === 1) {
          this.$message({ type: 'success', message: '认证成功' })
        } else {
          this.$message({ type: 'error', message: '拒绝认证' })
        }
      })
    },

    getDetails() {
      withdrawDetails({ accId: this.details.accId }).then(res => {
        const { totalWithDrawAmount, amount, inviteCount } = res.data
        this.details.totalWithDrawAmount = totalWithDrawAmount
        this.$set(this.details, 'amountNumber', amount)
        this.$set(this.details, 'inviteCount', inviteCount)
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
