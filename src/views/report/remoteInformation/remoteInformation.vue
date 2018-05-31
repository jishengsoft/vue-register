<template>
<div style="padding:20px;background:#fff;margin:10px">
    <Form ref="formInline" inline label-position="right" :label-width="80">
        <FormItem label="公司名称" prop="searchCompany">
        <Input v-model="searchCompany"></Input>
       
        </FormItem>
        
        
        <FormItem>
            <Button type="primary" @click="searchByCompany" >查询</Button>
            <Button type="primary" icon="plus" @click="add">新增</Button>
        </FormItem>
    </Form>

    <Modal
      v-model="modal1"
      :title="state"
      footerHide
      @on-cancel="cancel">
      <Form ref="formItem" :label-width="80" :model="formItem" :rules="ruleValidate">
        <FormItem label="公司名称" prop="company">
                <Input v-model="formItem.Company" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input v-model="formItem.UserName" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formItem.Password" placeholder="请输入..." type="password"></Input>
            </FormItem>
            <FormItem label="服务器IP" prop="serverIp">
                <Input v-model="formItem.ServerIP" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="域名" prop="domain">
                <Input v-model="formItem.Domain" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="域名2" prop="domain1">
                <Input v-model="formItem.domain1" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input v-model="formItem.remark" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="ok('formItem')">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
    </Form>
    </Modal>
    
    <el-table 
    :data="agentList" 
    height="500" 
    size="small"
    :border = "border"
    stripe
    
    highlight-current-row>
    <el-table-column
      type="index"
      
      >
    </el-table-column>
        <el-table-column
        prop="Company"
        label="公司名称"
        
        >
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="用户名"
        width=100
        >
      </el-table-column>
      <el-table-column
        prop="Password"
        label="密码"
        width=100
        >
      </el-table-column>
      <el-table-column
        prop="ServerIP"
        label="服务器IP"
        
        >
      </el-table-column>
      <el-table-column
        prop="domain"
        label="域名1"
        
        >
      </el-table-column>
      <el-table-column
        prop="domain1"
        label="域名2"
        
        >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        
        >
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="editrow(scope)" type="text" size="small">修改</el-button>
        <el-button @click="delrow(scope)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
      
      
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecord">
    </el-pagination>
    </div>
</template>
<script>
import util from "../../../libs/util.js";
var qs = require("qs");
export default {
  data() {
    return {
      modal1:false,
      searchCompany: "",
      companyList: this.getCompanyList(),
      beginDate: util.getMonthBeginDay(),
      endDate: "",
      queryModel: "0",
      alldata: [],
      modal1: false,
      state: "新增",
      oldUsername: "",
      currentPage: 1,
      totalRecord: 0,
      pageSize: 10,
      agentList: [],
      border: true,
      formItem: {
        Company: '',
        UserName:'',
        Password:'',
        Domain: '',
        domain1:'',
        remark: '',
      },
      ruleValidate: {
        // company: [
        //   { required: true, message: "公司名称不能为空", trigger: "blur" }
        // ]
        // User: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        // uuid: [{ required: true, message: "注册码不能为空", trigger: "blur" }],

        // version: [
        //   { required: true, message: "版本不能为空", trigger: "change" }
        // ],
        // agent: [
        //   { required: true, message: "代理商不能为空", trigger: "change" }
        // ]
      }
    };
  },
  mounted: function() {
    this.getAgentList();
  },
  methods: {
    getAgentList() {
      let _this = this;
      let pageSize = this.pageSize || "10";
      let currentPage = this.currentPage || "1";
      let searchCompany = this.searchCompany || "";

      util.ajax
        .get(
          "getClientRemoteInformation.asp?rows=" +
            pageSize +
            "&page=" +
            currentPage +
            "&company=" +
            searchCompany
        )
        .then(function(response) {
          _this.totalRecord = response.data.total;
          _this.agentList = response.data.rows;
          _this.alldata = response.data.rows;
        });
    },
    getCompanyList() {
      let _this = this;
      util.ajax.get("getCompany.asp").then(function(response) {
        _this.companyList = response.data;
      });
    },
    handleSizeChange(apageSize) {
      this.pageSize = apageSize;
      this.currentPage = 1;
      this.getAgentList();
    },
    handleCurrentChange(acurrentPage) {
      this.currentPage = acurrentPage;
      this.getAgentList();
    },
    filterTag(value, row) {
      return row.taskmoney == value;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index != 4) {
          sums[index] = "N/A";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    searchByCompany() {
      this.currentPage = 1;
      this.getAgentList();
      console.log(this.agentList);
    },
    clear(){
                this.formItem.Company = '';
                this.formItem.UserName = '';
                this.formItem.Password = '';
                this.formItem.ServerIP = '';
                this.formItem.Domain = '';
                this.formItem.domain1 = '';
                this.formItem.remark = '';
                
            },
            add(){
                this.clear();
                this.state = '新增客户远程信息';
                this.modal1 = true;
            },
    cancel(){
      this.modal1 = false;
    },
    ok(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        let formdate = this.formItem;
                        formdate.old = this.oldUsername;
                        let url = 'addRemote.asp';
                        if (this.state == '修改客户远程信息'){
                            url = 'updateRemote.asp';
                        }
                        
                        util.ajax.post(url,qs.stringify(formdate)).then(function(response){
                            if (response.data == 'success'){
                                _this.modal1 = false;
                                _this.getAgentList();
                            }
                        })
                        _this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                    } else {
                        
                        this.modal1 = true;
                        return false;
                    }
                })
            },
    editrow(row){
                this.formItem.Company = row.row.Company;
                this.formItem.UserName = row.row.UserName;
                this.formItem.Password = row.row.Password;
                this.formItem.ServerIP = row.row.ServerIP;
                this.formItem.Domain = row.row.domain;
                this.formItem.domain1 = row.row.domain1 ||'';
                this.formItem.remark = row.row.remark ||'';
                this.modal1 = true;
                this.state = '修改客户远程信息';
                this.oldUsername = row.row.UserName;
            },
    delrow(row){
               let _this = this;
               this.$confirm('是否确定删除该客户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delRemote.asp',{params:{old:row.row.UserName}}).then(function(response){
                        if(response.data == 'success'){
                            _this.agentList.splice(row.$index, 1);
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                    
                    }).catch(() => {
                            
                    });
                
            },
  }
};
</script>