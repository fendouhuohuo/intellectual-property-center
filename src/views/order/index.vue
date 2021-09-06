<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入订单名称" v-model="query.name">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search()"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="list"
        stripe
        fit
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column type="index" />
        <el-table-column
          prop="id"
          label="订单号"
          width="95"
        >
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单名称"
        />
        <el-table-column
          prop="type"
          label="服务类别"
          width="180"
        >
          <template >
            <span>知识产权</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="订单生成时间"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if=" scope.row.status===1">
              <i class="el-icon-star-off" />
              <span>待沟通</span>
            </div>
            <div v-else-if="scope.row.status===2">
              <i class="el-icon-error" />
              <span>审核失败</span>
            </div>
            <div v-else-if="scope.row.status===3">
              <i class="el-icon-star-on" />
              <span>进行中</span>
            </div>
            <div v-else-if="scope.row.status===4">
              <i class="el-icon-success" />
              <span>已验收</span>
            </div>
            <div v-else-if="scope.row.status===5">
              <i class="el-icon-star-on" />
              <span>已评价</span>
            </div>
            <div v-else-if="scope.row.status===6">
              <i class="el-icon-error" />
              <span>订单失败</span>
            </div>
            <div v-else-if="scope.row.status===7">
              <i class="el-icon-error" />
              <span>订单撤销</span>
            </div>
            <div v-else-if="scope.row.status===8">
              <i class="el-icon-star-on" />
              <span>订单异常</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              @click="show(scope.row.id)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="total,prev, pager, next"
        style="margin-top: 15px"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'


export default {
  name: 'Index',
  data() {
    return {
      total: 0,
      list: [],
      page: 1,
      query: {
        status: '',
        name: '' //需求名称查
      },
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getOrder(this.page, this.query).then((response) => {
        this.total = response.data.total;
        this.list = response.data.orderList;
      });
    },

    handleCurrentChange(newPage) {
      this.page = newPage;
      this.fetchData();
    },
    search() {
      this.page = 1
      this.fetchData()
    },
    show(id) {
      this.$router.push({name:'orderDetail',params:{id:id}})
    },
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
