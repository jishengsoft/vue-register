<template>
<div style="padding:20px;background:#fff;margin:10px">
    <Form ref="formInline" inline label-position="right" :label-width="80">
        <FormItem label="公司名称" prop="searchCompany">
        <Input  placeholder="请输入" v-model="searchCompany"></Input>
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="searchByCompany" >查询</Button>
        </FormItem>
    </Form>
    <ButtonGroup>
        <Button type="primary" icon="plus" @click="add">新增</Button>
        
    </ButtonGroup>

    <Modal
        v-model="modal1"
        :title="state"
        footerHide
       
        @on-cancel="cancel">
        <Form ref="formItem" :label-width="80" :model="formItem" :rules="ruleValidate">
            <FormItem label="公司名称" prop="company">
                <Input v-model="formItem.company" placeholder="请输入..."  ></Input>
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input v-model="formItem.username" placeholder="请输入..." :readonly='isDisabled'></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formItem.password" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="APP版本" prop="version">
                <Select v-model="formItem.version" placeholder="请选择版本">
                    <Option v-for="item in vList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    <!-- <Option value="0">普通版</Option>
                    <Option value="1">客户跟踪</Option>
                    <Option value="2">增强版</Option> -->
                </Select>
            </FormItem>
            <FormItem label="站点数" prop="count">
                <InputNumber v-model="formItem.count"  :min="1"></InputNumber>
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

    stripe
    highlight-current-row>
    <el-table-column
      type="index"
      >
    </el-table-column>
        <el-table-column
        prop="company"
        label="公司名称"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        >
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        >
      </el-table-column>
      <el-table-column
        prop="version"
        label="APP版本">
        <!-- sortable   -->
        
      </el-table-column>
      <el-table-column
        prop="count"
        label="站点数">
        <!-- :filters="[{ text: '0', value: '0' }, { text: '2500', value: '2500' },{ text: '5000', value: '5000' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end" -->

      </el-table-column>
      <el-table-column
      
      label="操作"
     >
      <template slot-scope="scope">
        <el-button @click="editrow(scope)" type="text" size="small">修改</el-button>
        <el-button @click="delrow(scope)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
import util from '../../../libs/util.js'
    var qs = require('qs');
    export default {
        data () {
            return {
                vList: [
                    {
                        value: '0',
                        label: '普通版'
                    },
                    {
                        value: '1',
                        label: '客户跟踪'
                    },
                    {
                        value: '2',
                        label: '增强版'
                    },
                ],
                searchCompany:'',
                isDisabled:false,
                agentList: this.getAgentList(),
                alldata:[],
                modal1:false,
                state:'新增',
                oldUsername:'',
                formItem:{

                    company:'',
                    username:'',
                    password:'',
                    version:'0',
                    count:'1'
                },
                ruleValidate:{

                }
            }
        },
        methods:{
            getAgentList(){
                let _this = this;
                util.ajax.get('getAppUser.asp').then(function(response){
                    for(var i in response.data.rows){
                        var v_number = response.data.rows[i].version;
                        switch(v_number){
                            case '0':
                               response.data.rows[i].version = '普通版' ;
                               break;
                            case '1':
                               response.data.rows[i].version = '客户跟踪' ;
                               break;
                            case '2':
                               response.data.rows[i].version = '增强版' ;
                               break;

                        }
                    }
                    _this.agentList = response.data.rows;
                    _this.alldata = response.data.rows;
                })
            },
            editrow(row){
                this.formItem.username = row.row.username;
                this.formItem.password = row.row.password;
                this.formItem.company = row.row.company;
                switch(row.row.version){
                            case '普通版':
                               this.formItem.version = '0' ;
                               break;
                            case '客户跟踪':
                               this.formItem.version = '1' ;
                               break;
                            case '增强版':
                               this.formItem.version = '2' ;
                               break;

                        }
                // this.formItem.version = row.row.version;
                this.formItem.count = row.row.count;

                this.modal1 = true;
                this.isDisabled = true;
                this.state = '修改用户';
                this.oldUsername = row.row.username;
                console.log(row);
            },
            ok(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        let formdate = this.formItem;
                        formdate.old = this.oldUsername;
                        let url = 'addAppUser.asp';
                        if (this.state == '修改用户'){
                            url = 'updateAppUser.asp';
                        }
                        
                        util.ajax.post(url,qs.stringify(formdate)).then(function(response){
                            if (response.data == 'success'){
                                _this.modal1 = false;
                                _this.getAgentList();
                            }else if (response.data == 'exists'){
                                _this.$Message.info('用户已存在');
                            }else if (response.data == 'failed'){
                                _this.$Message.info('用户不存在');
                            }
                        }).catch(error=>{
                            _this.$message({
                                type: 'error',
                                message: '数据异常，操作失败!'
                            });
                        })
                        
                    } else {
                        
                        this.modal1 = true;
                        return false;
                    }
                })
            },
            cancel(){
                this.modal1 = false;
            },
            clear(){
                this.formItem.username = '';
                this.formItem.password = '';
                this.formItem.company = '';
                this.formItem.version = '0';
                this.formItem.count = '1';
                
            },
            add(){
                this.clear();
                this.state = '新增用户';
                this.isDisabled = false;
                this.modal1 = true;
            },
            delrow(row){
               let _this = this;
               this.$confirm('是否确定删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delAppUser.asp',{params:{old:row.row.username}}).then(function(response){
                        if(response.data == 'success'){
                            _this.agentList.splice(row.$index, 1);
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else if (response.data == 'failed'){
                            _this.$message({
                                type: 'error',
                                message: '用户不存在!'
                            });
                        }
                    })
                    
                    }).catch(() => {
                            
                    });
                
            },
            searchByCompany(){
                let companyname = this.searchCompany;
                this.agentList = this.alldata.filter(function(val){
                   return val.company.indexOf(companyname) >= 0;
                })
            },
        }
    }            
</script>