<template>
  <div class="tab-container">
    <template>
      <el-card>
        <!-- 发布需求条件搜索框 -->
        <el-row :gutter="20">
          <el-col :span="7">
            <div v-if="activeName == 'first'">
              <el-input v-model="query.name" placeholder="请输入需求名称">
                <el-button slot="append" icon="el-icon-search" @click="SelectReq(query.name)" />
              </el-input>
            </div>
            <div v-else>
              <el-input v-model="query.name" placeholder="请输入子需求名称">
                <el-button slot="append" icon="el-icon-search" @click="SelectSubReq(query.name)" />
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-tabs
          v-model="activeName"
          style="margin-top: 15px"
          @tab-click="handleClick"
        >
          <!-- 需求审核面板 -->
          <el-tab-pane label="需求管理" name="first">
            <el-table
              v-loading="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%; margin-top: 20px"
              :data="reqList"
            >
              <el-table-column type="index" />
              <el-table-column
                prop="id"
                label="ID"
                width="95"
              />
              <el-table-column
                prop="name"
                label="需求名称"
              />
              <el-table-column
                prop="company"
                label="需求单位"
                width="180"
              />
              <el-table-column
                prop="categoryId"
                label="需求类别"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="发布时间"
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
                width="150"
              >
                <template slot-scope="scope">
                  <div v-if=" scope.row.status===3">
                    <i class="el-icon-star-off" />
                    <span>未拆分</span>
                  </div>
                  <div v-else-if="scope.row.status===4">
                    <i class="el-icon-star-on" />
                    <span>已拆分</span>
                  </div>
                  <div v-else-if="scope.row.status===5">
                    <i class="el-icon-star-on" />
                    <span>用户确认拆分结果</span>
                  </div>
                  <div v-else-if="scope.row.status===6">
                    <i class="el-icon-star-on" />
                    <span>已提交第三方</span>
                  </div>
                  <div v-else-if="scope.row.status===7">
                    <i class="el-icon-star-on" />
                    <span>第三方已返回服务</span>
                  </div>
                  <div v-else-if="scope.row.status===8">
                    <i class="el-icon-star-on" />
                    <span>已提交服务</span>
                  </div>
                  <div v-else-if="scope.row.status===9">
                    <i class="el-icon-star-on" />
                    <span>已生成订单</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="showReq(scope.row.id)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页条 -->
            <el-pagination
              background
              :current-page="page"
              layout="total,prev, pager, next"
              style="margin-top: 15px"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="子需求管理" name="second">
            <el-table
              v-loading="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%; margin-top: 20px"
              :data="subReqList"
            >
              <el-table-column type="index" />
              <el-table-column
                prop="id"
                label="ID"
                width="95"
              />
              <el-table-column
                prop="name"
                label="需求名称"
              />
              <el-table-column
                prop="company"
                label="需求单位"
                width="180"
              />
              <el-table-column
                prop="createTime"
                label="发布时间"
                width="200"
              >
                <template slot-scope="scope">
                  <i class="el-icon-time" />
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="showSubReq(scope.row.id)"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页条 -->
            <el-pagination
              background
              :current-page="page"
              layout="total,prev, pager, next"
              style="margin-top: 15px"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </div>
</template>

<script>
import {getAllReqList,getAllSubReqList} from '@/api/demand'

export default {
  data() {
    return {
      data: [],
      activeName: 'first', // 当前panel  根据panel标签的name属性
      reqList: [], // 列表数据,根据不同的标签去重新填充
      subReqList: [],
      listLoading: true,
      page: 1,
      limit: 10,
      total: 0, // 总记录数
      query2: { categoryId: '1' },
      query: {
        categoryId: '1',
        name: '',
        status: 15 }// 搜索条件 切换标签时需值为空,
    }
  },
  created() {
    this.fetchData('first') // 默认第一个面板
    // this.getmatchdata()
  },
  methods: {
    fetchData(activeName) {
      this.listLoading = true
      if (activeName == 'first') { // 需求审核
        getAllReqList(this.page, this.limit, this.query).then((response) => {
          this.total = response.data.requireList.total
          this.reqList = response.data.requireList.records
        })
      } else if (activeName == 'second') { // 服务审核
        getAllSubReqList(this.page, this.limit, this.query2).then((response) => {
          this.total = response.data.subRequireList.total
          this.subReqList = response.data.subRequireList.records
        })
      } else if (activeName == 'third') { // 需求修改申请

      } else if (activeName == 'fourth') { // 服务修改申请

      }
      this.listLoading = false
    },
    SelectReq(name) {
      this.fetchData('first')
    },
    SelectSubReq(name) {
      this.fetchData('second')
    },
    showReq(id) {
      this.$router.push({name:'reqDetail',params:{id:id}})
    },
    showSubReq(id) {
      this.$router.push({name:'subReqDetail',params:{id:id}})
    },
    // 切换panel
    handleClick(tab, event) {
      this.activeName = tab.name
      this.page = 1
      this.fetchData(this.activeName) // 重新获取table内容
    },
    handleCurrentChange(newPage) {
      // 上下分页
      this.page = newPage
      this.fetchData(this.activeName)
    },
  }
}
</script>

