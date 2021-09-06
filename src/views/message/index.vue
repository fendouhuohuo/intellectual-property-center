<template>
  <div v-if="message_total>0" class="my-news">
    <Message
      :indexss_inform="message_list"
      :indexss_no_read="this.message_list_no"
      :total="message_total"
      :total_no_read="message_list_no_total"
    >
      <div slot="page_1" class="common-pagination container">
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="currentPage1"
            :page-size="15"
            layout="total, prev, pager, next"
            :total="message_total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div slot="page_2" class="common-pagination container">
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="currentPage2"
            :page-size="15"
            layout="total, prev, pager, next"
            :total="message_list_no_total"
            @current-change="handleCurrentChange1"
          />
        </div>
      </div>
    </Message>

  </div>
  <div v-else class="public-order-info-null">
    当前暂无数据，请刷新重试。
  </div>
</template>

<script>
import Message from './message'
import { getAllMessage, getNotReadMessage,changeState,deleteInform } from '@/api/message'
export default {
  name: 'MyNews',
  components: { Message },
  props: ['id'],
  inject: ['reload'],
  data() {
    return {
      currentPage1: 1,
      currentPage2: 1,
      message_list_have: [], // 存放已读消息
      message_list: [], // 存放消息列表
      message_total: 0, // 获取消息总数
      message_list_no: [], // 存放未读消息
      message_list_no_total: 0, // 存放未读消息总数
      is_read: 1, // 消息已读未读
      activeName: 'first',
      activeNames: [''],
    }
  },

  async created() {
    // 获取消息
    // await this.getMessageList()
    this.getMessageList()
    // 获取未读消息
    // await this.getMessageListNoRead()
    this.getMessageListNoRead()
  },
  methods: {
    // 获取全部消息的方法
    getMessageList() {
      getAllMessage(this.currentPage1, 10,4).then((response) => {
        this.message_total = response.data.messagePage.total
        this.message_list = response.data.messagePage.records
      })
    },
    getMessageListNoRead() {
      getNotReadMessage(this.currentPage2, 10, 0,4).then((response) => {
        this.message_list_no_total = response.data.messagePage.total
        this.message_list_no = response.data.messagePage.records
      })
    },
    // 删除消息的方法
    async deleteInform(delete_val) {
      deleteInform(delete_val).then((response)=>{
        this.reload()
      })
    },
    // 改变消息状态已读到全部
    changeMessageState(val) {
      changeState(val).then((response) => {
       this.reload()
      })
    },
    async handleCurrentChange() {
      await this.getMessageList()
    },
    handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange1() {
      await this.getMessageListNoRead()
    }
  }
}
</script>

<style lang="scss" scoped>
.public-order-info-null {
  height:500px;
}
.my-news {
  .common-pagination{
    height:60px;
    position:relative;
    .pagination {
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%,-50%);
    }
  }
  width: 100%;
  margin-left: 100px;
  .delete{
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }
  .inform_title{
    width: 100%;
    .data{
      float: right;
      margin-right: 100px;
    }
  }

}
</style>
