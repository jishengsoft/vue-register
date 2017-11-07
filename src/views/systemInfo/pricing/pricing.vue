<template>
    <el-table 
    :data="agentList" 
    height="600" 
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
    </el-table>
</template>
<script>
    import util from '../../../libs/util.js'
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'company'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    
                    {
                        title: '手机号',
                        key: 'number'
                    },
                    {
                        title: '结余济胜币',
                        key: 'jsmoney',
                        sortable: true
                    },
                    {
                        title: '认领任务',
                        key: 'taskmoney'
                    },
                    {
                        title: '起始日期',
                        key: 'begindate'
                    }
                ],
                agentList: this.getAgentList()
            }
        },
        methods:{
            getAgentList(){
                let _this = this;
                util.ajax.get('getAgent.asp').then(function(response){
                    console.log(response.data);
                    _this.agentList = response.data.rows;
                })
            },
            filterTag(value, row){
                console.log(value);
                console.log(row.taskmoney);
                console.log(row.taskmoney == value);
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
      }
        }
    }
</script>