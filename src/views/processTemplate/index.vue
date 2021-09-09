<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.name" placeholder="请输入名称" style="width: 200px;" class="filter-item"  />
      <el-button type="primary" icon="el-icon-search" class="filter-item" @click="select" >查 询</el-button>
      <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="openAddDialog">新  增</el-button>
<!--      <el-button type="primary" class="filter-item" icon="el-icon-refresh" >重 置</el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="modelList"
      border
      width="100%"
    >
      <el-table-column label="id" prop="id" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="流程模板名称" prop="name" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程模板类别" prop="categoryName" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程模板节点数量" prop="number" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程模板创建时间" prop="createTime" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="操作">
        <template slot-scope="scope">
          <el-popover placement="left" width="500" trigger="hover" style="">
            <div style="padding:10px">
              <el-steps>
                <el-step :title="item" v-for="(item,index) in stepsName" :key="index"></el-step>
              </el-steps>
            </div>
            <el-button size="mini" type="success" icon="el-icon-view" slot="reference"  circle title="查看进度" @mousemove.native="lookSteps(scope.row)"/>
          </el-popover>
          <el-button size="mini" type="primary" icon="el-icon-edit" circle title="修改" @click="openEidtDialog(scope.row)" style="margin-left:10px"/>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle title="删除" @click="deleteModel(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="getList"/>

    <!--新增编辑表单-->
    <el-dialog :visible.sync="dialogFormVisible" title="添加流程模板" center>
      <el-form ref="dataForm" :model="model" label-width="125px" label-position="left">
        <el-form-item label="流程模板名称" prop="name">
          <el-input v-model="model.name"/>
        </el-form-item>
        <el-form-item label="所属类别" prop="categoryId">
          <!-- <el-input v-model="model.category"/> -->
          <div class="block">
            <el-cascader
              v-model="categoryId"
              :options="chooseCategory"></el-cascader>
          </div>
        </el-form-item>
      </el-form>
      <el-form style="border:1px #DCDFE6 solid; padding:10px; border-radius:10px; position:relative;"  ref="dynamicValidateForm" label-position="left" label-width="125px">
        <el-form-item
          v-for="(step, index) in steps"
          :label="'第' + (index+1)+'个节点'"
          :key="step.id">
          <el-input v-model="step.value" style="width:90%">
          </el-input><el-button  type="text"  icon="el-icon-delete" circle title="删除"  @click.prevent="removeStep(step)" style="color:red"/>
        </el-form-item>
        <span style="position: absolute;right:20px;bottom:0;font-size:30px;cursor: pointer;"  @click="addNode()">+</span>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addModel()">添 加</el-button>
        </span>
    </el-dialog>
    <!--修改编辑表单-->
    <el-dialog :visible.sync="editFormVisible" title="修改流程节点" center>
      <el-form style="border:1px #DCDFE6 solid; padding:10px; border-radius:10px; position:relative;"  ref="dynamicValidateForm" label-position="left" label-width="125px">
        <el-form-item
          v-for="(step, index) in steps"
          :label="'第' + (index+1)+'个节点'"
          :key="step.id">
          <el-input v-model="step.value" style="width:90%">
          </el-input><el-button  type="text"  icon="el-icon-delete" circle title="删除"  @click.prevent="removeStep(step)" style="color:red"/>
        </el-form-item>
        <span style="position: absolute;right:20px;bottom:0;font-size:30px;cursor: pointer;"  @click="addNode()">+</span>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNode()">修 改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/views/processTemplate/pagination'
import { getReqList, getStepsName,addflowModel,updateNode,getAllCategory,delModel } from '@/api/processTemplate'

export default {
  data(){
    return{
      listLoading:true,
      modelList:[],
      total:20,
      pageNo:1,
      pageSize:5,
      query:{
        categoryId:1
      },
      model:{},
      steps: [{
        id: 1,
        value: ''
      }],
      categoryId:[],
      chooseCategory:[],//选择分类
      stepsName:[],
      editNodeId:0,
      dialogFormVisible:false,
      editFormVisible:false
    }
  },
  components:{
    pagination
  },
  methods:{
    openAddDialog(){
      this.dialogFormVisible = true
      getAllCategory().then((response)=>{
        this.chooseCategory = JSON.parse(JSON.stringify(response.data.firstCategoryList).replace(/id/g,"value").replace(/name/g,"label"))
      })
    },
    //根据条件进行搜索
    select(){
      this.getReqData()
    },
    addModel(){
      //将节点数组进行拼串
      var stepsname =''
      for(var i=0;i<this.steps.length;i++){
        stepsname = stepsname + this.steps[i].value+","
      }
      var reg=/,$/gi;
      stepsname=stepsname.replace(reg,"");
      this.$set(this.model,'categoryId',this.categoryId.join())
      this.$set(this.model,'number',this.steps.length)
      this.$set(this.model,'node',stepsname)
      addflowModel(this.model).then((response)=>{
        this.dialogFormVisible = false
        // this.$router.go(0)
        this.getReqData()
        //清空表单数据
        this.model = {}
        this.steps = [{
          id: 1,
          value: ''
        }]
        this.categoryId = []
      }).catch((error)=>{
        console.log(error)
      })
    },
    deleteModel(val){
      delModel(val.id).then((response)=>{
        this.getReqData()//删除成功之后刷新页面
      })
    },
    openEidtDialog(val){
      this.editFormVisible = true
      this.steps = []
      var arrNodeName = []
      var _this = this
      this.editNodeId = val.id
      getStepsName(val.id).then((response) => {
        arrNodeName = response.data.strings
        for(var i=0;i<arrNodeName.length;i++){
          _this.steps.push({
            id: i+1,
            value: arrNodeName[i]
          })
        }
      })
    },
    //添加进程节点
    addNode(){
      var val = this.steps[this.steps.length-1].id+1
      this.steps.push({
        id: val,
        value: ''
      })
    },
    //修改进程节点
    editNode(){
      var stepsname =''
      for(var i=0;i<this.steps.length;i++){
        stepsname = stepsname + this.steps[i].value+","
      }
      var reg=/,$/gi;
      stepsname=stepsname.replace(reg,"");
      updateNode({number:this.steps.length,node:stepsname,id:this.editNodeId}).then((response)=>{
        this.editFormVisible = false
        this.getReqData()
      })
    },
    //移除流程节点
    removeStep(item){
      var index = this.steps.indexOf(item)
      if (index !== 0) {
        this.steps.splice(index, 1)
      }
    },
    getList(val){
      getReqList(val.page,val.limit,this.query).then((response) =>{
        this.modelList = response.data.flowPage.records
      })
    },
    lookSteps(val){
      //根据id得到节点数组
      getStepsName(val.id).then((response) => {
        this.stepsName = response.data.strings
      })
    },
    getReqData(){
      // 请求数据 进行渲染
      getReqList(this.pageNo, this.pageSize, this.query).then((response) => {
        this.modelList = response.data.flowPage.records
        this.total = response.data.flowPage.total
        if(this.modelList!=null){
          this.listLoading = false
        }else{
          this.listLoading = true
        }
      })
    }
  },
  created(){
    this.getReqData()
  }
}
</script>

<style scope>
.app-container{
  padding: 20px;
}
.filter-container {
  padding-bottom: 10px;
}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-left: 10px;

}
</style>
