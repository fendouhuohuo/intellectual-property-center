<template>
<div class="aa">
<!--  :model="formInline"-->
  <el-form :inline="true" class="demo-form-inline">
    <el-row>
      <el-col :span="24">
        <el-form-item label="ID:">
          <span style="font-size: 15px">{{reqDetail.id}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="需求名称:">
        <span style="font-size: 15px">{{reqDetail.name}}</span>
      </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求单位:">
        <span >{{reqDetail.company}}</span>
      </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系方式:">
          <span style="font-size: 15px">{{reqDetail.telephone}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系人:">
          <span >{{reqDetail.contact}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="创建时间:">
          <span style="font-size: 15px">{{reqDetail.createTime}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系地址:">
          <span >{{reqDetail.address}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="截止时间:">
          <span style="font-size: 15px">{{reqDetail.deadline}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="关键字:">
          <span >{{reqDetail.keywords}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="附件:">
          <span style="font-size: 15px"> <el-button v-for="(item,index) in acceptanceUploadFleList" :key="index" type="text" class="btn" @click="pdfShow(item.fileUrl)"
          >{{ item.fileName}}
      </el-button></span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求类别:">
          <span >知识产权</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="需求简介:">
          <el-input
            type="textarea"
            autosize
            v-model="textarea"
            style="width: 800px">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
import { getReqDetailById } from "@/api/demand";
export default {
  name: 'detail',
  data() {
    return {
      id: '',
      reqDetail: {},
      textarea: '',
      acceptanceUploadFleList: [], // 附件列表
    }
  },
  created() {},
  methods: {
    getReqDetail() {
      getReqDetailById(this.id).then((response) => {
        this.reqDetail = response.data.requirement
        this.textarea = this.reqDetail.content
        this.revertUrl()
      });
    },
    getReqId() {
      this.id = this.$route.params.id
    },
    pdfShow(fileUrl) {
      window.open("/pdf/web/viewer.html?file=" + fileUrl);
    },
    revertUrl() {
      this.reqDetail.attachments
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
    this.getReqId()
    this.getReqDetail()
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
</style>
