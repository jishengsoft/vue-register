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
                <Input v-model="formItem.company" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input v-model="formItem.username" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formItem.password" placeholder="请输入..." type="password"></Input>
            </FormItem>
            <FormItem label="手机号" prop="number">
                <Input v-model="formItem.number" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="认领任务" prop="taskmoney">
                <Select v-model="formItem.taskmoney" placeholder="请选择">
                    <Option value="0">0</Option>
                    <Option value="2500">2500</Option>
                    <Option value="5000">5000</Option>
                </Select>
            </FormItem>
            <FormItem label="起始日期" prop="begindate">
                 <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="formItem.begindate"></DatePicker>
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
    show-summary 
    stripe
    :summary-method="getSummaries" 
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
        prop="number"
        label="手机号"
        >
      </el-table-column>
      <el-table-column
        prop="jsmoney"
        label="结余济胜币"
        sortable  
        >
      </el-table-column>
      <el-table-column
        prop="taskmoney"
        label="认领任务"
        :filters="[{ text: '0', value: '0' }, { text: '2500', value: '2500' },{ text: '5000', value: '5000' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        >
      </el-table-column>
      <el-table-column
        prop="begindate"
        label="起始日期"
        >
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
                searchCompany:'',
                
                agentList: this.getAgentList(),
                alldata:[],
                modal1:false,
                state:'新增',
                oldUsername:'',
                formItem:{
                    company:'',
                    username:'',
                    password:'',
                    mobile:'',
                    taskmoney:0,
                    begindate:''
                },
                ruleValidate:{
                    company: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        {  pattern: /^1[0-9]{10}$|^[569][0-9]{7}$/, message: '请填写正确的手机号码'}
                    ],
                    taskmoney: [
                        { required: true, message: '认领任务不能为空', trigger: 'change' }
                    ],
                    begindate: [
                        { required: true,type:'date', message: '起始日期不能为空', trigger: 'change' }
                    ],
                }
            }
        },
        methods:{
            getAgentList(){
                let _this = this;
                util.ajax.get('getAgent.asp').then(function(response){
                  
                    _this.agentList = response.data.rows;
                    _this.alldata = response.data.rows;
                })
            },
            filterTag(value, row){
                
                return row.taskmoney == value;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if (index < 4){
                    sums[index] = 'N/A';
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
                    sums[index] = 'N/A';
                }
                });

                return sums;
            },
            searchByCompany(){
                let companyname = this.searchCompany;
                this.agentList = this.alldata.filter(function(val){
                   return val.company.indexOf(companyname) >= 0;
                })
            },
            ok(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        let formdate = this.formItem;
                        formdate.old = this.oldUsername;
                        let url = 'addAgent.asp';
                        if (this.state == '修改用户'){
                            url = 'updateAgent.asp';
                        }
                        
                        formdate.begindate = util.formatDate(this.formItem.begindate);
                        util.ajax.post(url,qs.stringify(formdate)).then(function(response){
                            if (response.data == 'success'){
                                _this.modal1 = false;
                                _this.getAgentList();
                            }else if (response.data == 'exists'){
                                _this.$Message.info('用户已存在');
                            }
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
                this.formItem.number = '';
                this.formItem.taskmoney = '0';
                this.formItem.begindate = '';
                
            },
            add(){
                this.clear();
                this.state = '新增用户';
                this.modal1 = true;
            },
            delrow(row){
               let _this = this;
               this.$confirm('是否确定删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delAgent.asp',{params:{old:row.row.username}}).then(function(response){
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
            editrow(row){
                this.formItem.username = row.row.username;
                this.formItem.password = row.row.password;
                this.formItem.company = row.row.company;
                this.formItem.number = row.row.number;
                this.formItem.taskmoney = ''+row.row.taskmoney;
                this.formItem.begindate = row.row.begindate;
                this.modal1 = true;
                this.state = '修改用户';
                this.oldUsername = row.row.username;
                console.log(row);
            }
        }
    }
</script>