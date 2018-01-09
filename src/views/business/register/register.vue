<template>
  <Card>
    <Form>
        <FormItem label="用户" prop="username" :label-width="160">
            <Select v-model="username" style="width:300px">
                <Option v-for="item in companyList" :value="item.username" :key="item.username">{{ item.company }}</Option>
            </Select>
        </FormItem>
        <FormItem label="软件" prop="software" :label-width="160">
            <Select v-model="state" style="width:300px">
                <Option value="0">商务</Option>
                <Option value="1">汽修</Option>
            </Select>
        </FormItem>
        <FormItem label="请求码" prop="requestCode" :label-width="160">
            <Input v-model="requestCode" style="width:450px">

            </Input>
            <Button type="primary" @click.prevent="getCode">
                获取
            </Button>
        </FormItem>
        <FormItem label="加密狗号" prop="dogNumber" :label-width="160">
            <Input v-model="dogNumber" style="width:300px" readonly>

            </Input>
            
        </FormItem>
        <FormItem label="客户" prop="client" :label-width="160">
            <Input v-model="client" style="width:300px" >

            </Input>
            
        </FormItem>
        <FormItem label="备注" prop="remark" :label-width="160">
            <Input v-model="remark" style="width:300px" >

            </Input>
            
        </FormItem>
        <FormItem label="老软件" prop="oldSoft" :label-width="160">
            <Input v-model="oldSoft" style="width:300px" readonly>

            </Input>
            
        </FormItem>
        <FormItem label="新软件" prop="newSoft" :label-width="160">
            <Input v-model="newSoft" style="width:300px" readonly>

            </Input>
            
        </FormItem>
        <FormItem label="注册码" prop="registerCode" :label-width="160">
            <Input v-model="registerCode" style="width:450px" readonly>

            </Input>
            <Button type="primary" @click.prevent="getRegisterCode">
                请求
            </Button> 
            <p>(将此注册码复制到软件的注册界面)</p>
        </FormItem>
    </Form>
  </Card>
</template>
<script>
    import util from '../../../libs/util.js'
    var qs = require('qs');
    export default{
        data(){
            return{
                username:'',
                state:'0',
                requestCode:'',
                dogNumber:'',
                client:'',
                remark:'',
                oldSoft:'',
                newSoft:'',
                registerCode:'',
                companyList:this.getCompanyList(), 
                newversionhidden:'',
                newnumber:'',
                oldversion:'',
                newversion:'',
                oldnumber:''
            }
        },
        methods:{
            getCompanyList(){
                let _this = this;
                util.ajax.get('getCompany.asp').then(function(response){
                    _this.companyList = response.data;
                })
            },
            getCode(){
                let _this = this;
                if(!this.requestCode){
                    this.$Message.error('请输入请求码');
                    return;
                }
                util.ajax.get('getDecode.asp?registerCode='+this.requestCode).then(function(response){
                    let msg = response.data;
                    if(msg == 'error'){
                        _this.$Message.error('请求码错误');
                    }
                    else{
                    
                    _this.dogNumber = msg.dogCode
                    
                    _this.newversionhidden = msg.priceVersion;
                    let priceversion = '';
					switch(msg.priceVersion){
						case 0:
							priceversion = _this.state==0?'商业经典版':'汽车美容';
							break;
						case 1:
							priceversion = _this.state==0?'商业标准版':'汽车美容(多店面)';
							break;
						case 2:
							priceversion = _this.state==0?'商业增强版':'一站式(多店面)';
							break;
						case 3:
							priceversion = '商业全能版';
							break;
						case 4:
							priceversion = '工业经典版';
							break;
						case 5:
							priceversion = _this.state==0?'工业标准版':'汽修';
							break;
						case 6:
							priceversion = '工业增强版';
							break;
						case 7:
							priceversion = _this.state==0?'工业全能版':'一站式';
							break;
						case 8:
						    priceversion = '汽修(多店面)';
							break;
						default :
						    priceversion = msg.priceVersion;
					};
					
                    _this.newversion = priceversion;
                    _this.newnumber = msg.number;
					_this.newSoft = priceversion +':'+msg.number;
					let oldpriceversion = '';
					switch(msg.oldPriceVersion){
						case 0:
							oldpriceversion = '空';
							break;
						case 6:
							oldpriceversion = _this.state==0? '商业经典版':'汽车美容';
							break;
						case 2:
							oldpriceversion = _this.state==0? '商业标准版':'汽车美容(多店面)';
							break;
						case 1:
							oldpriceversion = _this.state==0? '商业增强版':'一站式(多店面)';
							break;
						case 5:
							oldpriceversion = '商业全能版';
							break;
						case 9:
							oldpriceversion = '工业经典版';
							break;
						case 8:
							oldpriceversion = _this.state==0? '工业标准版':'汽修';
							break;
						case 7:
							oldpriceversion = '工业增强版';
							break;
						case 4:
							oldpriceversion = _this.state==0? '工业全能版':'一站式';
							break;
						case 3:
							oldpriceversion = '汽修(多店面)';
							break;
						default :
						    oldpriceversion = msg.oldPriceVersion;
					};
					
                _this.oldversion = oldpriceversion;
                _this.oldnumber = msg.oldNumber;
                _this.oldSoft = oldpriceversion + ':'+msg.oldNumber;
				}
                })
            },
            getRegisterCode(){
                let _this = this;
                if(!this.username){
                    _this.$Message.info('请选择用户');
                    return;
                }
                if(this.oldSoft == this.newSoft){
                    _this.$Message.info('本次注册软件没有变化');
                    return;
                }
                let postData = {
                    oldversion:this.oldversion,
                    newnumber:this.newnumber,
                    oldnumber:this.oldnumber,
                    dogCode:this.dogNumber,
                    newversion:this.newversion,
                    client:this.username

                }
                util.ajax.post('getMainRegisterMoney.asp',qs.stringify(postData)).then(function(response){
                    let msg = response.data;
                    if (msg.state == 3)
					{
						
                        _this.$Message.info('注册版本不可低于老版本');
					}
					else if (msg.state == 4){
						
                        _this.$Message.info('余额不足，请先联系济胜软件充值');
					} 
					else if (msg.state == 2){
						
                        _this.$Message.info('注册的老版本跟登记不符');
					} 
					else{
                        _this.$confirm('本次注册费用为:'+msg.money+',是否确认注册?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            let postData1 = {
                                dogCode:_this.dogNumber,
                                newversioncode:_this.newversionhidden,
                                newnumber:_this.newnumber,
                                client:_this.client,
                                remark:_this.remark,
                                oldversion:_this.oldversion,
                                newversion:_this.newversion,
                                oldnumber:_this.oldnumber,
                                registerCharge:msg.money,
                                discount:msg.discount,
                                username:_this.username,
                                state:_this.state
                            };
                            util.ajax.post('getMainRegisterCode.asp',qs.stringify(postData1)).then(function(response){
                                _this.registerCode = response.data;
                            })
                        
                        }).catch(() => {
                                
                        });    
                    /*
					$.messager.confirm('确认','本次注册费用为:'+msg.money+'是否确认注册?',function(r){
                        if (r){
							$('#registerCharge').val(msg.money);
							$('#discount').val(msg.discount);
                            $.post('getMainRegisterCode.asp',{dogCode:$('#dognumber').val(),newversioncode:$('#newversionhidden').val(),newnumber:$('#newnumber').val(),
							client:$('#client').val(),remark:$('#remark').val(),oldversion:$('#oldversion').val(),newversion:$('#newversion').val(),
							oldnumber:$('#oldnumber').val(),registerCharge:$('#registerCharge').val(),
							discount:$('#discount').val(),client:$('#company').combobox('getValue'),state:$('#state').combobox('getValue')},
								function(msg){
									
									$('#registercode').textbox('setValue',msg);
								});
							}
                        });
                        */
                    } 
                })
            }

        }
    }
</script>
