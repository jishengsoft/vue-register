<template>
  <div>
      <Row>
      <Row>
      <Card style="width:450px">
          <p slot="title">
            <Icon type="gear-a"></Icon>
            系统设置
          </p>
          <Form  :label-width="160" ref="setting"  :model="setting" :rules="ruleValidate">
              <FormItem  label="每年开始计算日期" prop="year">
                    <Input v-model="setting.year" placeholder="请输入" style="width:150px"></Input>
              </FormItem>
              <FormItem label="每期月数" prop="month">
                    <InputNumber v-model="setting.month"  placeholder="请输入" style="width:150px"></InputNumber>
              </FormItem>
              <FormItem label="空狗价格" prop="dogprice">
                    <InputNumber v-model="setting.dogprice"  placeholder="请输入" style="width:150px"></InputNumber>
              </FormItem>
              <FormItem>
                <Button type="primary" @click.prevent="saveSetting('setting')">确定</Button>
                
              </FormItem>
          </Form>
      </Card>
      </Row>
      <Row class="margin-top-10">
        <Card style="width:450px">
            <p slot="title">
                
                <Icon type="iphone"></Icon>
                提醒手机号码
            </p>
            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                <Icon type="plus-round"></Icon>
            </a>
            <Modal
                v-model="showAddNewTodo"
                title="添加新的手机号"
                @on-ok="addNew"
                @on-cancel="cancelAdd">
                <Row type="flex" justify="center">
                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                </Row>
                <Row slot="footer">
                    <Button type="text" @click="cancelAdd">取消</Button>
                    <Button type="primary" @click="addNew">确定</Button>
                </Row>
            </Modal>
            <Table :columns="columns1" :data="data1"></Table>
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
          return {
              showAddNewTodo:false,
              newToDoItemValue:'',
                columns1: [
                     {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        key: 'number'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: this.getData(),
                setting:{
                    year:'',
                    month:0,
                    dogprice:0
                },
                ruleValidate:{
                    year: [
                        { required: true, message: '开始日期不能为空', trigger: 'blur' }
                    ],
                    month: [
                        { required: true,type:'number', message: '每期月数不能为空', trigger: 'blur' }
                    ],
                    dogprice: [
                        { required: true,type:'number', message: '空狗价格不能为空', trigger: 'blur' }
                    ]
                    }
          }
      },
      methods:{
          getData(){
              let _this = this;
                util.ajax.get('getNumber.asp').then(function(response){
                  
                    _this.data1 = response.data;
                   
                })
                util.ajax.get('getSetting.asp').then(function(response){
                    
                    _this.setting.year = response.data.year;
                    _this.setting.month = parseInt(response.data.month);
                   
                    _this.setting.dogprice = parseInt(response.data.dogprice);
                })
          },
          remove(params){
             
              let _this = this;
               this.$confirm('是否确定删除该号码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    util.ajax.get('delNumber.asp',{params:{old:params.row.number}}).then(function(response){
                        if(response.data == 'success'){
                            _this.data1.splice(params.index, 1);
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                    
                    }).catch(() => {
                            
                    });
          },
          addNewToDoItem () {
            this.showAddNewTodo = true;
          },
          addNew () {
                let _this = this;
                if (this.newToDoItemValue.length !== 0) {
                    util.ajax.post('addNumber.asp',qs.stringify({number:this.newToDoItemValue})).then(function(response){
                        if (response.data == 'success'){
                                _this.showAddNewTodo = false;
                                _this.newToDoItemValue = '';
                                _this.getData();
                            }else if (response.data == 'exists'){
                                _this.$Message.info('号码已存在');
                            }
                    })
                    
                } else {
                    this.$Message.error('请输入手机号');
                }
            },
            cancelAdd () {
                this.showAddNewTodo = false;
                this.newToDoItemValue = '';
            },
            saveSetting(name){
                this.$refs[name].validate((valid) => {
                    let _this = this;
                    if (valid) {
                        
                        util.ajax.post('saveSetting.asp',qs.stringify(this.setting)).then(function(response){
                            if (response.data == 'success'){
                                _this.$Message.info('保存成功');
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
