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
      <el-table-column label="ID" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.accId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房产所在地区" width="230px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
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
  </div>
</template>

<script>
import { getHouseList } from '@/api/cert'
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
      console.log('****', item)
    },
    getList() {
      this.listLoading = true
      getHouseList(this.listQuery).then(res => {
        this.list = [
          {
            'id': 393950895840165888,
            'accId': 393947022320730112,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '333333',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1574091565023',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-18T15:41:18.453'
          },
          {
            'id': 391754801718755328,
            'accId': 391754062372012032,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '33333',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573568087985',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-12T14:14:48.813'
          },
          {
            'id': 389971191550443520,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '33333',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573142841736',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T16:07:23.012'
          },
          {
            'id': 389949106560172032,
            'accId': 385238747995701248,
            'provinceCode': '510000',
            'cityCode': '510100',
            'areaCode': '510104',
            'areaName': '四川省-成都市-锦江区',
            'address': '33331',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573137446066',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:39:37.539'
          },
          {
            'id': 389948657450876928,
            'accId': 385238747995701248,
            'provinceCode': '510000',
            'cityCode': '510100',
            'areaCode': '510104',
            'areaName': '四川省-成都市-锦江区',
            'address': '33331',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573137446066',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:37:50.463'
          },
          {
            'id': 389948567189454848,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '3333',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573137446066',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:37:28.943'
          },
          {
            'id': 389948415552782336,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:36:52.790'
          },
          {
            'id': 389948400801415168,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:36:49.273'
          },
          {
            'id': 389946753824063488,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:30:16.603'
          },
          {
            'id': 389946718453497856,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:30:08.170'
          },
          {
            'id': 389946316563677184,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:28:32.352'
          },
          {
            'id': 389940321670135808,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:04:43.058'
          },
          {
            'id': 389940305379459072,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': '2222',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135475482',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:04:39.174'
          },
          {
            'id': 389939930345766912,
            'accId': 385238747995701248,
            'provinceCode': '110000',
            'cityCode': '110100',
            'areaCode': '110101',
            'areaName': '北京市-北京城区-东城区',
            'address': 'cccc',
            'pic': 'http://reyuan.oss-cn-beijing.aliyuncs.com/renzheng/house/2019/11/1573135384892',
            'verify': 0,
            'status': 1,
            'createTime': '2019-11-07T14:03:09.759'
          }
        ]
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>
