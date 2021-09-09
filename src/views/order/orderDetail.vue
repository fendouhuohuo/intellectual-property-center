<template>
  <div class="aa">
    <!--  :model="formInline"-->
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="ID:">
            <span style="font-size: 15px">{{orderDetail.id}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="orderID:">
            <span style="font-size: 15px">{{orderDetail.orderId}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单名称:">
            <span style="font-size: 15px">{{orderDetail.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="买家id:">
            <span >{{orderDetail.buyerId}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="卖家id:">
            <span style="font-size: 15px">{{orderDetail.sellerId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务id:">
            <span >{{orderDetail.address}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="价格:">
            <span >{{orderDetail.price}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="买家步骤:">
            <span >{{orderDetail.buyerStep}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <span style="font-size: 15px">{{orderDetail.createTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新时间:">
            <span style="font-size: 15px">{{orderDetail.updateTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div v-if=" orderDetail.status===0">
            <!--          <i class="el-icon-star-off" />-->
            <el-button type="primary">未沟通</el-button>
          </div>
          <div v-else-if="orderDetail.status===1">
            <el-button type="primary">已沟通</el-button>
          </div>
          <div v-else-if="orderDetail.status===2">
            <el-button type="primary" >未评价</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order';

export default {
  name: "order_detail",
  data() {
    return {
      id: '',
      orderDetail: {
      },
      acceptanceUploadFleList: [], // 附件列表
    }
  },
  methods: {
    getOrderDetail() {
      getOrderDetail(this.id).then((response) => {
        this.orderDetail = response.data.orderInfo
        this.revertUrl()
      });
    },
    getId() {
      this.id = this.$route.params.id
      
    },
    
    pdfShow(fileUrl) {
      window.open("/pdf/web/viewer.html?file=" + fileUrl);
    },
    revertUrl() {
      this.orderDetail.contractForSeller
        .split(",")
        .slice(-1)
        .map((item) => {
          this.acceptanceUploadFleList.push({
            fileName: item
              .split("/")
              .slice(-1)[0]
              .split("_")
              .slice(1)
              .toString(),
            fileUrl: item,
          });
        });
    }
  },
  mounted() {
    this.getId()
    this.getOrderDetail()
  }
}
</script>

<style scoped>
.demo-form-inline{
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.qwer{
  margin-left: 100px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.po{
  position: relative;
  left: 60%;
  margin-bottom: 20px;
}
.qw{
  font-size: 25px;
}
.qwe{
  font-size: 25px;
  margin-left: 30px;
}
.aa{
  /*position: relative;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%);*/
}

</style>
