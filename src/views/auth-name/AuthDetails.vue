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
          <el-form-item class="form-item" label="真实姓名">
            <el-input v-model="details.name" disabled />
          </el-form-item>
          <el-form-item label="身份证">
            <div class="cert-img">
              <img :src="details.idCard ">
            </div>
          </el-form-item>
        </el-form>

        <el-form ref="personInfoForm" :model="personInfoForm" :rules="rules" label-width="100px">
          <el-form-item class="form-item" label="身份证号码" prop="cardNum">
            <el-input v-model="personInfoForm.cardNum" placeholder="输入身份证号码" />
          </el-form-item>
          <el-form-item class="form-item" label="身份证号码" prop="checkCardNum">
            <el-input v-model="personInfoForm.checkCardNum" placeholder="再次输入身份证号码" />
          </el-form-item>
          <el-form-item class="form-item" label="真实姓名" prop="realName">
            <el-input v-model="personInfoForm.realName" placeholder="输入真实姓名" />
          </el-form-item>
          <el-form-item class="form-item" label="真实姓名" prop="checkRealName">
            <el-input v-model="personInfoForm.checkRealName" placeholder="再次输入真实姓名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('personInfoForm')">通过并提交身份信息</el-button>
            <el-button @click="submitForm('personInfoForm')">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>手持身份证认证</span>
        </div>
        <el-form ref="details" :model="details" label-width="80px">
          <el-form-item label="">
            <div class="cert-img">
              <img :src="details.idBody">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="verifyCardImg(1)">通过</el-button>
            <el-button @click="verifyCardImg(-1)">拒绝</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { certCardImg, inputAccountInfo } from '@/api/cert'

export default {
  name: 'AuthDetails',
  data() {
    var validate1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入身份证号'))
      } else if (value !== this.personInfoForm.cardNum) {
        callback(new Error('两次输入身份证号不一致!'))
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入真实姓名'))
      } else if (value !== this.personInfoForm.realName) {
        callback(new Error('两次输入真实姓名不一致!'))
      } else {
        callback()
      }
    }
    return {
      details: {},
      personInfoForm: {
        cardNum: '',
        checkCardNum: '',
        realName: '',
        checkRealName: ''
      },
      rules: {
        cardNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        checkCardNum: [
          { validator: validate1, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        checkRealName: [
          { validator: validate2, trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    const info = JSON.parse(this.$route.query.info)
    this.details = info
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          inputAccountInfo({
            accId: this.details.accId,
            idNo: this.personInfoForm.cardNum,
            realName: this.personInfoForm.realName
          }).then(res => {
            if (res.code === 0) {
              this.$message({ type: 'success', message: '认证成功' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    verifyCardImg(type) {
      certCardImg({
        accId: this.details.accId,
        idStatus: type
      }).then(res => {
        if (type === 1) {
          this.$message({ type: 'success', message: '认证成功' })
        } else {
          this.$message({ type: 'error', message: '拒绝认证' })
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
