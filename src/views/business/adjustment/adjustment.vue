<template>
  <div>
      <Row>
      <Row>
      <Card >
          <p slot="title">
            <Icon type="levels"></Icon>
            余额调整
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
              <FormItem label="调整差额" prop="differ">
                    <InputNumber v-model="rechange.differ"   placeholder="请输入" style="width:150px" @on-change="changeDiffer"></InputNumber>
              </FormItem>
              <FormItem label="调整后金额" prop="rechargemoney">
                    <InputNumber v-model="rechange.rechargemoney"  placeholder="请输入" style="width:150px" @on-change="changeBalance"></InputNumber>
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
                        if (value == 0) {
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
                    differ:0,
                    rechargemoney:0,
                    remark:''
                },
                
                ruleValidate:{
                    username: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    differ: [
                        { required: true,type:'number', message: '调整不能为空', trigger: 'blur' },
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
                      _this.rechange.rechargemoney = element.jsmoney;
                      _this.rechange.differ = 0;
                  }
              });
          },
          getCompanyList(){
              let _this = this;
                util.ajax.get('getCompany.asp').then(function(response){
                    _this.companyList = response.data;
                })
          },
          changeDiffer(){
              this.rechange.rechargemoney = this.rechange.balance + this.rechange.differ;
          },
          changeBalance(){
              this.rechange.differ = this.rechange.rechargemoney - this.rechange.balance;
          },
          
            saveRechange(name){
                let _this = this;
               
                this.$refs[name].validate((valid) => {
                    
                    if (valid) {
                        let postData = {
                            username:_this.rechange.username,
                            rechargemoney:_this.rechange.differ,
                            remark:_this.rechange.remark
                        }
                        console.log(postData);
                        util.ajax.post('addMoneyChange.asp',qs.stringify(postData)).then(function(response){
                            if (response.data == 'success'){
                                _this.$Message.info('调整成功');
                                _this.getCompanyList();
                                _this.rechange = {
                                    username:'',
                                    balance:0,
                                    rechargemoney:0,
                                    differ:0,
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
