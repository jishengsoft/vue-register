<template>
<div style="padding:20px;background:#fff;margin:10px">
    
    <ButtonGroup>
        <Button type="primary" icon="plus" @click="add">新增</Button>
        
    </ButtonGroup>

    <Modal
        v-model="modal1"
        :title="state"
        width="350"
        footerHide
       
        @on-cancel="cancel">
        <Form ref="formItem" :label-width="80" :model="formItem" :rules="ruleValidate">
            <FormItem label="认领任务" prop="taskmoney">
                <Select v-model="formItem.taskmoney" placeholder="请选择" style="width:200px">
                    <Option value="0">0</Option>
                    <Option value="2500">2500</Option>
                    <Option value="5000">5000</Option>
                </Select>
            </FormItem>
            <FormItem label="软件" prop="softVersion">
                
                <Select v-model="formItem.softVersion" style="width:200px">
                    <Option v-for="item in softVersionList" :value="item.softVersion" :key="item.softVersion">{{ item.softVersion }}</Option>
                </Select>
            </FormItem>
            <FormItem label="折扣" prop="discount">
                <InputNumber v-model="formItem.discount" placeholder="请输入..."  style="width:200px"></InputNumber>
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
        prop="taskmoney"
        label="认领任务"
        >
      </el-table-column>
      <el-table-column
        prop="softVersion"
        label="软件"
        >
      </el-table-column>
      <el-table-column
        prop="discount"
        label="折扣"
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
                oldtaskmoney:'',
                oldsoftversion:'',
                softVersionList:this.getSoftVersionList(),
                formItem:{
                    taskmoney:0,
                    softVersion:'',
                    discount:0,
                   
                },
                ruleValidate:{
                    taskmoney: [
                        { required: true, message: '认领任务不能为空', trigger: 'change' }
                    ],
                    softVersion: [
                        { required: true, message: '软件不能为空', trigger: 'change' }
                    ],
                    discount: [
                        { required: true,type:'number', message: '折扣不能为空', trigger: 'blur' }
                    ],
                    
                }
            }
        },
        methods:{
            getAgentList(){
                let _this = this;
                util.ajax.get('getDiscount.asp').then(function(response){
                    console.log(response.data);
                    _this.agentList = response.data;
                    _this.alldata = response.data;
                })
            },
            getSoftVersionList(){
                let _this = this;
                util.ajax.get('getSoftPrice.asp').then(function(response){
                    _this.softVersionList = response.data;
                })
            },
            
            
            ok(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        let formdate = this.formItem;
                        formdate.oldtaskmoney = this.oldtaskmoney;
                        formdate.oldsoftversion = this.oldsoftversion;
                        let url = 'addDiscount.asp';
                        if (this.state == '修改定价'){
                            url = 'updateDiscount.asp';
                        }
                        
                        
                        util.ajax.post(url,qs.stringify(formdate)).then(function(response){
                            if (response.data == 'success'){
                                _this.modal1 = false;
                                _this.getAgentList();
                            }else if (response.data == 'exists'){
                                _this.$Message.info('软件存在');
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
                this.formItem.taskmoney = 0;
                this.formItem.softVersion = '';
                this.formItem.discount = 0;
                
                
            },
            add(){
                this.clear();
                this.state = '新增折扣';
                this.modal1 = true;
            },
            delrow(row){
               let _this = this;
               this.$confirm('是否确定删除该折扣?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delDiscount.asp',{params:{oldtaskmoney:row.row.taskmoney,
                    oldsoftversion:row.row.softVersion}}).then(function(response){
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
                this.formItem.taskmoney = parseInt(row.row.taskmoney);
                console.log(row.row.taskmoney);
                this.formItem.softVersion = row.row.softVersion;
                this.formItem.discount = parseFloat(row.row.discount);
                
                this.modal1 = true;
                this.state = '修改折扣';
                this.oldtaskmoney = row.row.taskmoney;
                this.oldsoftversion = row.row.softVersion;
                
            }
        }
    }
</script>