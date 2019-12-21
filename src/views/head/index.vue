<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.phone"
        placeholder="输入手机号码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="用户名" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" min-width="110px">
        <template slot-scope="{row}">
          <div>
            <img :src="row.avatar" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="110" class-name="small-padding fixed-width">
        <el-button type="primary" @click="submitForm(item, 1)">通过</el-button>
        <el-button @click="submitForm(item, -1)">拒绝</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAvatarList, certAvatar } from '@/api/cert'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'PhotoList',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        phone: '',
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    certItem(item, status) {
      certAvatar({ accId: item.accId, status }).then(res => {
        if (status === 1) {
          this.$message({ type: 'success', message: '认证成功' })
        } else {
          this.$message({ type: 'error', message: '拒绝认证' })
        }
      })
    },
    getList() {
      this.listLoading = true
      getAvatarList(this.listQuery).then(res => {
        this.list = res.data.accountList
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>
