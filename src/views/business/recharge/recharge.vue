<template>
  <div>
      <Row>
      <Row>
      <Card >
          <p slot="title">
            <Icon type="social-yen"></Icon>
            充值
          </p>
          <Form  :label-width="160" ref="rechange"  :model="rechange" :rules="ruleValidate">
              <FormItem  label="公司名称" prop="username">
                    <Select v-model="rechange.username" style="width:150px" @on-change="select">
                        <Option v-for="item in companyList" :value="item.username" :key="item.username">{{ item.company }}</Option>
                    </Select>
              </FormItem>
              <FormItem label="余额" prop="balance">
                    <InputNumber v-model="rechange.balance" readonly  placeholder="请输入" style="width:150px"></InputNumber>
              </FormItem>
              <FormItem label="充值金额" prop="rechargemoney">
                    <InputNumber v-model="rechange.rechargemoney"  placeholder="请输入" style="width:150px"></InputNumber>
              </FormItem>
              <FormItem  label="备注" prop="remark">
                    <Input v-model="rechange.remark" placeholder="请输入" style="width:150px"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click.prevent="saveRechange('rechange')">确定</Button>
                
              </FormItem>
          </Form>
      </Card>
      </Row>
      
      </Row>
  </div>
</template>
<script>
  import util from '../../../libs/util.js'
  var qs = require('qs');
  export default {
      data(){
          const validateMoney = (rule, value, callback) => {
                
                
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入正确的金额'));
                    } else {
                        if (value <= 0) {
                            callback(new Error('请输入正确的金额'));
                        } else {
                            callback();
                        }
                    }
                
            };
          return {
              showAddNewTodo:false,
              newToDoItemValue:'',
              companyList:this.getCompanyList(),  
                
                rechange:{
                    username:'',
                    balance:0,
                    rechargemoney:0,
                    remark:''
                },
                
                ruleValidate:{
                    username: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    rechargemoney: [
                        { required: true,type:'number', message: '充值金额不能为空', trigger: 'blur' },
                        { validator: validateMoney, trigger: 'blur' }
                    ]
                    }
          }
      },
      methods:{
          
          select(value){
              
              let _this = this;
              this.companyList.forEach(element => {
                  
                  if(element.username == value){
                      
                      _this.rechange.balance = element.jsmoney;
                  }
              });
          },
          getCompanyList(){
              let _this = this;
                util.ajax.get('getCompany.asp').then(function(response){
                    _this.companyList = response.data;
                })
          },
          
          
          
            saveRechange(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        
                        util.ajax.post('addRecharge.asp',qs.stringify(this.rechange)).then(function(response){
                            if (response.data == 'success'){
                                _this.$Message.info('保存成功');
                                _this.getCompanyList();
                                _this.rechange = {
                                    username:'',
                                    balance:0,
                                    rechargemoney:0,
                                    remark:''
                                }
                            }else if (response.data == 'exists'){
                                
                            }
                        })
                        
                    } else {
                        
                        this.modal1 = true;
                        return false;
                    }
                })
            }
      }
  }
</script>
