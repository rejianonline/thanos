<template>
  <div class="app-container">
    <div v-if="isPartner === 0" class="filter-container">
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
      <el-table-column label="提现金额" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现时间" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="110" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="certItem(row)">详情</el-button>
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
import { mapGetters } from 'vuex'
import { getWithdrawList } from '@/api/cert'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'WidthDrawList',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        phone: '',
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPartner'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    switchPage(p) {
      this.listQuery.pageNumber = p
      this.getList()
    },
    certItem(item) {
      this.$router.push({ name: 'WidthDrawDetails', query: { info: JSON.stringify(item) }})
    },
    getList() {
      this.listLoading = true
      getWithdrawList(this.listQuery).then(res => {
        this.list = res.data.withDrawList
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
</style>
