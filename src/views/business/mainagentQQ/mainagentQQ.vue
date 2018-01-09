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
            <FormItem label="客服名称" prop="qqname">
                <Input v-model="formItem.qqname">
                </Input>
            </FormItem>
            <FormItem label="qq号码" prop="qq">
                <Input v-model="formItem.qq">
                </Input>
            </FormItem>
            
            
            <FormItem>
                <Button type="primary" @click="ok('formItem')">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
        </Form>
    </Modal>
    <el-table 
    :data="qqlist" 
    height="500" 
     
    stripe
    
    highlight-current-row>
    <el-table-column
      type="index"
      >
    </el-table-column>
        <el-table-column
        prop="qqname"
        label="客服名称"
        >
      </el-table-column>
      <el-table-column
        prop="qq"
        label="qq号码"
        >
      </el-table-column>
      
      
      <el-table-column
      
      label="操作"
     >
      <template slot-scope="scope">
      
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
                
                
                alldata:[],
                modal1:false,
                state:'新增',
                oldUsername:'',
                oldtaskmoney:'',
                oldsoftversion:'',
                qqlist:this.getQQList(),
                formItem:{
                    qqname:'',
                    qq:''
                   
                },
                ruleValidate:{
                    qqname: [
                        { required: true, message: '客服名称不能为空', trigger: 'blur' }
                    ],
                    qq: [
                        { required: true, message: 'qq号码不能为空', trigger: 'blur' }
                    ]
                    
                }
            }
        },
        methods:{
            
            getQQList(){
                let _this = this;
                util.ajax.get('getMainAgentQQ.asp').then(function(response){
                    
                    _this.qqlist = response.data.rows;
                })
            },
            
            
            ok(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        let formdate = this.formItem;
                        
                        let url = 'addMainAgentQQ.asp';
                        if (this.state == '修改定价'){
                            url = 'updateDiscount.asp';
                        }
                        
                        
                        util.ajax.post(url,qs.stringify(formdate)).then(function(response){
                            if (response.data == 'success'){
                                _this.modal1 = false;
                                _this.getQQList();
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
                this.formItem.qqname = '';
                this.formItem.qq = '';
                
                
                
            },
            add(){
                this.clear();
                this.state = '新增客服';
                this.modal1 = true;
            },
            delrow(row){
               let _this = this;
               this.$confirm('是否确定删除该客服?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delAgentQQ.asp',{params:{id:row.row.id}}).then(function(response){
                        if(response.data == 'success'){
                            _this.qqlist.splice(row.$index, 1);
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