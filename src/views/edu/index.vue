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
      <el-table-column label="学校" width="230px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学历" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.edu }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" width="110" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="certItem(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEduList } from '@/api/cert'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'HouseList',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        phone: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    certItem(item) {
      this.$router.push({ name: 'EduDetails', query: { info: JSON.stringify(item) }})
    },
    getList() {
      this.listLoading = true
      getEduList(this.listQuery).then(res => {
        this.list = res.data.eduDetailList
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>
