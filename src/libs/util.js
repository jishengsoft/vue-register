import axios from 'axios';
import env from '../config/env';
import dateUtil from './date';

let util = {

};
util.title = function (title) {
    title = title || '济胜软件售后服务平台';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1/register'
    : env === 'production'
    ? ''
    : 'http://127.0.0.1/register';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    
});

util.ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getPathObjByName = function (vm, name) {
    let pathObj = vm.$store.state.routers.filter((item) => {
        if (item.children.length <= 1) {
            return item.name === name;
        } else {
            let i = 0;
            let childArr = item.children;
            let len = childArr.length;
            while (i < len) {
                if (childArr[i].name === name) {
                    return true;
                }
                i++;
            }
            return false;
        }
    })[0];
    return pathObj;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    vm.$store.state.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = item.title;
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = child.title;
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ];
    } else if (name.indexOf('_index') >= 0 && name !== 'home_index') {
        currentPathArr = [
            {
                title: '首页',
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openPage = function (vm, name, title) {
    vm.$router.push({
        name: name
    });
    let hasOpened = false;
    vm.pageTagsList.forEach((item, index) => {
        if (item.name === name) {
            hasOpened = true;
            vm.$store.commit('moveToSecond', index);
        }
    });
    if (!hasOpened) {
        vm.$store.commit('increateTag', {name: name, title: title});
    }
};

util.toDate = function(date) {
    let _date = new Date(date);
    // IE patch start (#1422)
    if (isNaN(_date.getTime()) && typeof date === 'string'){
        _date = date.split('-').map(Number);
        _date[1] += 1;
        _date = new Date(..._date);
    }
    // IE patch end

    if (isNaN(_date.getTime())) return null;
    return _date;
};

util.formatDate = function(date, format) {
   // date = toDate(date);
   // if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};

util.getMonthBeginDay = function(){
    let now = new Date();
    console.log(now.getFullYear() +'-'+ formatDay(now.getMonth()+1)+'-'+'01');
    return now.getFullYear() +'-'+ formatDay(now.getMonth()+1)+'-'+'01'; 
}

function formatDay(day){
  return day<10?'0'+day:day;
}

util.export2Excel = function(companyName,tHeader,filterVal,list) {
    //let companyName = this.companyList.find(item => item.username === this.searchCompany)['company'];
　　　　　　require.ensure([], () => {
　　　　　　　　const { export_json_to_excel } = require('../vendor/Export2Excel');
　　　　　　　//　const tHeader = [ '操作','客户名称', '加密狗号', '老版本', '新版本','金额','余额','注册时间','注册码','备注']; //对应表格输出的title
　　　　　　//　　const filterVal = [ '操作','client', 'dognumber', 'oldversion', 'newversion','consumeJS','jsmoney','registerdate','registercode','memo']; // 对应表格输出的数据
　　　　　//　　　const list = this.agentList;
              
　　　　　　　　const data = formatJson(filterVal, list);
        
　　　　　　　　export_json_to_excel(tHeader, data, companyName); //对应下载文件的名字
　　　　　　})
　　　　}
　function　formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　　}

export default util;
