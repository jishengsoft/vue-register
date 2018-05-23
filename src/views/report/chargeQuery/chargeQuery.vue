<template>
<div style="padding:20px;background:#fff;margin:10px">
    <Form ref="formInline" inline label-position="right" :label-width="80">
        <FormItem label="公司名称" prop="searchCompany">
        <Select v-model="searchCompany" style="width:120px" clearable>
                        <Option v-for="item in companyList" :value="item.username" :key="item.username">{{ item.company }}</Option>
        </Select>
        </FormItem>
        <FormItem label="开始日期">
            <DatePicker v-model="beginDate" format="yyyy-MM-dd" type="date" placeholder="" style="width: 120px"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
            <DatePicker v-model="endDate" type="date" placeholder="" style="width: 120px"></DatePicker>
        </FormItem>
        
        <FormItem>
            <Button type="primary" @click="searchByCompany" >查询</Button>
            <Button type="primary" @click="export2Excel" >导出</Button>
        </FormItem>
    </Form>
    

    
    <el-table 
    :data="agentList" 
    height="500" 
    size="small"
    :border = "border"
    stripe
    show-summary
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
        prop="rechargedate"
        label="日期"
        
        >
      </el-table-column>
      <el-table-column
        prop="rechargemoney"
        label="充值金额"
        
        >
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注"
        
        >
      </el-table-column>
      
      
      
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40,50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecord">
    </el-pagination>
    </div>
</template>
<script>
    import util from '../../../libs/util.js'
    var qs = require('qs');
    export default {
        data () {
            return {
                searchCompany:'',
                companyList:this.getCompanyList(), 
                beginDate:util.getMonthBeginDay(),
                endDate:'',
                queryModel:'0',
                alldata:[],
                modal1:false,
                state:'新增',
                oldUsername:'',
                currentPage:1,
                totalRecord:0,
                pageSize:10,
                agentList: [],
                border:true,
                formItem:{
                    company:'',
                    User:'',
                    uuid:'',
                    version:'0',
                    remark:'',
                    agent:''
                },
                ruleValidate:{
                    company: [
                        { required: true, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    User: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    uuid: [
                        { required: true, message: '注册码不能为空', trigger: 'blur' }
                    ],
                    
                    version: [
                        { required: true, message: '版本不能为空', trigger: 'change' }
                    ],
                    agent: [
                        { required: true, message: '代理商不能为空', trigger: 'change' }
                    ]
                }
            }
        },
        mounted:function(){
                this.getAgentList();
        },
        methods:{
            getAgentList(){
                let _this = this;
                let pageSize = this.pageSize||'10';
                let currentPage = this.currentPage||'1';
                let searchCompany = this.searchCompany||'';
                let searchDate = this.beginDate?util.formatDate(this.beginDate):'';
                let searchEndDate = this.endDate?util.formatDate(this.endDate):'';
                util.ajax.get('getRecharge.asp?rows='+pageSize+'&page='+currentPage+'&searchusername='+searchCompany+
                '&searchDate='+searchDate+'&searchEndDate='+searchEndDate)
                .then(function(response){
                   
                    _this.totalRecord = response.data.total;
                    _this.agentList = response.data.rows;
                    _this.alldata = response.data.rows;
                })
            },
            getCompanyList(){
              let _this = this;
                util.ajax.get('getCompany.asp').then(function(response){
                    _this.companyList = response.data;
                })
            },
            handleSizeChange(apageSize){
                this.pageSize = apageSize;
                this.currentPage = 1;
                this.getAgentList();
            },
            handleCurrentChange(acurrentPage){
                this.currentPage = acurrentPage;
                this.getAgentList();
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
                if (index != 3){
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
                this.currentPage = 1;
                this.getAgentList();
                console.log(this.agentList);
            },
            export2Excel() {
               let  companyName = '';
               if (this.searchCompany){
                   companyName = this.companyList.find(item => item.username === this.searchCompany)['company'];
               }
               
               let tHeader = [ '公司名称',  '日期', '充值金额','备注']; //对应表格输出的title
    　　　　　　let filterVal = [ 'company',  'rechargedate','rechargemoney','memo']; // 对应表格输出的数据
               let list = this.agentList;
                util.export2Excel(companyName+'_充值查询',tHeader,filterVal,list);
               
    　　　　}
        }
    }
</script>