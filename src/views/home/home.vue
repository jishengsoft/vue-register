<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            
            <Col span="12" class-name="padding-left-5">
                
                <Row class="margin-top-10" >
                    <Card :padding="0" style="height:400px">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            上周注册
                        </p>
                        <div class="map-con">
                            <el-table 
                            :data="registerList" 
                            show-summary
                            :summary-method="getSummaries" 
                            size="small"
                            height="350"
                            stripe
                             
                            highlight-current-row>
                            <el-table-column
                            type="index"
                            
                            >
                            </el-table-column>
                                <el-table-column
                                prop="company"
                                label="公司名称"
                                width="100"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="oldversion"
                                label="老版本"
                                width="100"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="newversion"
                                label="新版本"
                                width="100"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="consumeJS"
                                label="金额"
                                width="60"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="registerdate"
                                label="注册时间"
                                width="150"
                                >
                            </el-table-column>
                           
                            
                            </el-table>
                            
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col span="12" class-name="padding-left-5">
                
                <Row class="margin-top-10" >
                    <Card :padding="0" style="height:400px">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            上周充值
                        </p>
                        <div class="map-con">
                            <el-table 
                            :data="chargeList" 
                            height="350"
                            size="small"
                            show-summary
                            :summary-method="getChargeSummaries"
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
                            
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import util from '../../libs/util.js';

export default {
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            
            
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: '',
            registerList:this.getRegisterList(),
            chargeList:this.getChargeList()
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(function () {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        getRegisterList(){
            let _this = this;
            let pageSize = this.pageSize||'100';
            let currentPage = this.currentPage||'1';
            let searchCompany = this.searchCompany||'';
            let now = new Date();
            
            let begint = now.getTime()-1000*60*60*24*(6+now.getDay());

            let lastWeekBegin = new Date(begint);
            let endtt = now.getTime()-1000*60*60*24*(now.getDay());
            let lastWeekEnd = new Date(endtt);
            
            let searchDate = util.formatDate(lastWeekBegin);
            let searchEndDate = util.formatDate(lastWeekEnd);
            util.ajax.get('getMainRegisterQuery.asp?rows='+pageSize+'&page='+currentPage+'&client='+searchCompany+
            '&searchDate='+searchDate+'&searchEndDate='+searchEndDate)
            .then(function(response){
                for (var i=0;i<response.data.rows.length;i++){                  
                    if (response.data.rows[i].type == 1){
                        response.data.rows.splice(i--,1);
                    }
                }
                
                _this.registerList = response.data.rows;
              
            })
        },
        getSummaries(param) {
				let _this = this;
                const { columns, data } = param;
                const sums = [];
                
                columns.forEach((column, index) => {
				if (index === 0) {
                    var jsonLength = 0;
                    for(var item in _this.registerList){
                        jsonLength++;
                    }
                    sums[index] = jsonLength + '套';
                    return;
                }
                if (index === 1) {
                    sums[index] = '合计';
                    return;
                }
                if (index != 4){
                    sums[index] = '';
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
        getChargeList(){
            let _this = this;
            let pageSize = this.pageSize||'100';
            let currentPage = this.currentPage||'1';
            let searchCompany = this.searchCompany||'';
            let now = new Date();
            
            let begint = now.getTime()-1000*60*60*24*(6+now.getDay());

            let lastWeekBegin = new Date(begint);
            let endtt = now.getTime()-1000*60*60*24*(now.getDay());
            let lastWeekEnd = new Date(endtt);
            
            let searchDate = util.formatDate(lastWeekBegin);
            let searchEndDate = util.formatDate(lastWeekEnd);
            util.ajax.get('getRecharge.asp?rows='+pageSize+'&page='+currentPage+'&client='+searchCompany+
            '&searchDate='+searchDate+'&searchEndDate='+searchEndDate)
            .then(function(response){
                for (var i=0;i<response.data.rows.length;i++){                  
                    if (response.data.rows[i].type == 1){
                        response.data.rows.splice(i--,1);
                    }
                }
                
                _this.chargeList = response.data.rows;
              
            })
        },
        getChargeSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if (index != 3){
                    sums[index] = '';
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
    }
};
</script>
