<template>
  <div class="app-container">
    <!-- <div class="filter-container">
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
    </div> -->

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
      <el-table-column label="头像" min-width="100px">
        <template slot-scope="{row}">
          <el-image
            class="head-img"
            style="width: 100px; height: 100px"
            :src="row.avatar"
            :preview-src-list="[row.avatar]"
          />
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" @click="certItem(row, 2)">通过</el-button>
          <el-button @click="certItem(row, -1)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="listQuery.pageSize"
        :total="total"
        @current-change="switchPage"
      />
    </div>
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
      total: 0,
      listQuery: {
        // phone: '',
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    switchPage(p) {
      this.listQuery.pageNumber = p
      this.getList()
    },
    certItem(item, status) {
      certAvatar({ accId: item.id, status }).then(res => {
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
        this.total = res.data.total || 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
}
.head-img {
  width: 100px;
}
</style>
