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
    <el-tabs v-model="listQuery.searchType">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name">
        <el-radio-group v-model="listQuery.periodType" style="margin-bottom: 30px;">
          <el-radio-button label="byDay">天</el-radio-button>
          <el-radio-button label="byMonth">月</el-radio-button>
        </el-radio-group>
        <div style="overflow-x:scroll;">
          <line-charts
            :query="listQuery"
            :width="'600px'"
            :height="'400px'"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import LineCharts from './LineCharts'

export default {
  name: 'Partner',
  directives: { waves },
  components: { LineCharts },
  data() {
    return {
      tableKey: 0,
      list: null,
      tabs: [
        { label: '按邀请人数', name: 'inviteCount' },
        { label: '按奖励金额', name: 'inviteProfit' }
      ],
      listQuery: {
        // phone: '',
        searchType: 'inviteCount',
        periodType: 'byDay'
      }
    }
  },
  methods: {
    // handleFilter() {
    //   this.getInfo()
    // }
  }
}
</script>
