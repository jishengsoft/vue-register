<template>
    <Table :columns="columns1" :data="agentList" stripe height="600">
        <label slot="footer">123</label>
    </Table>
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
            }
        }
    }
</script>