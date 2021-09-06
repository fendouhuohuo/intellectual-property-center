<template>
  <div class="aa">
    <el-form :inline="true"  class="demo-form-inline">
      <el-row>
        <el-col :span="24">
          <el-form-item label="ID:">
            <span style="font-size: 15px">{{subReqDetail.id}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="需求名称:">
            <span style="font-size: 15px">{{subReqDetail.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需求单位:">
            <span >{{subReqDetail.company}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系方式:">
            <span style="font-size: 15px">{{subReqDetail.telephone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人:">
            <span >{{subReqDetail.contact}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <span style="font-size: 15px">{{subReqDetail.createTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系地址:">
            <span >{{subReqDetail.address}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="截止时间:">
            <span style="font-size: 15px">{{subReqDetail.deadline}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关键字:">
            <span >{{subReqDetail.keywords}}</span>
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
import { getSubReqDetail  } from "@/api/demand";
export default {
  // 子需求详情
  name: 'Subreq',
  data() {
    return {
      id: '',
      subReqDetail: {},
      req: {},
      textarea: ''
    }
  },
  created() {},
  methods: {
    getSubReqDetail() {
      getSubReqDetail(this.id).then((response) => {
        this.subReqDetail = response.data.subRequire;
        this.textarea = this.subReqDetail.content
        this.id = this.subReqDetail.requirementId
      });
    },
    getSubReqId() {
      this.id = this.$route.params.id
    },
  },
  mounted() {
    this.getSubReqId()
    this.getSubReqDetail()
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
