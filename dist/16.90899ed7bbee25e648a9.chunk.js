webpackJsonp([16],{781:function(e,t,r){var o=r(38)(r(817),r(885),null,null);o.options.__file="G:\\html\\iview-admin\\src\\views\\business\\appRegister\\appRegister.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] appRegister.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},806:function(e,t,r){"use strict";var o=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},807:function(e,t,r){"use strict";var o=Object.prototype.hasOwnProperty,n=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var o=[],n=0;n<t.length;++n)void 0!==t[n]&&o.push(t[n]);r.obj[r.prop]=o}}return t};t.arrayToObject=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(r[o]=e[o]);return r},t.merge=function(e,r,n){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(n.plainObjects||n.allowPrototypes||!o.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var a=e;return Array.isArray(e)&&!Array.isArray(r)&&(a=t.arrayToObject(e,n)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,a){o.call(e,a)?e[a]&&"object"==typeof e[a]?e[a]=t.merge(e[a],r,n):e.push(r):e[a]=r}),e):Object.keys(r).reduce(function(e,a){var i=r[a];return o.call(e,a)?e[a]=t.merge(e[a],i,n):e[a]=i,e},a)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",o=0;o<t.length;++o){var a=t.charCodeAt(o);45===a||46===a||95===a||126===a||a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122?r+=t.charAt(o):a<128?r+=n[a]:a<2048?r+=n[192|a>>6]+n[128|63&a]:a<55296||a>=57344?r+=n[224|a>>12]+n[128|a>>6&63]+n[128|63&a]:(o+=1,a=65536+((1023&a)<<10|1023&t.charCodeAt(o)),r+=n[240|a>>18]+n[128|a>>12&63]+n[128|a>>6&63]+n[128|63&a])}return r},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],o=0;o<t.length;++o)for(var n=t[o],i=n.obj[n.prop],l=Object.keys(i),s=0;s<l.length;++s){var c=l[s],u=i[c];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:c}),r.push(u))}return a(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},808:function(e,t,r){"use strict";var o=r(810),n=r(809),a=r(806);e.exports={formats:a,parse:n,stringify:o}},809:function(e,t,r){"use strict";var o=r(807),n=Object.prototype.hasOwnProperty,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:o.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var r={},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,l=o.split(t.delimiter,i),s=0;s<l.length;++s){var c,u,p=l[s],f=p.indexOf("]="),d=-1===f?p.indexOf("="):f+1;-1===d?(c=t.decoder(p,a.decoder),u=t.strictNullHandling?null:""):(c=t.decoder(p.slice(0,d),a.decoder),u=t.decoder(p.slice(d+1),a.decoder)),n.call(r,c)?r[c]=[].concat(r[c]).concat(u):r[c]=u}return r},l=function(e,t,r){for(var o=t,n=e.length-1;n>=0;--n){var a,i=e[n];if("[]"===i)a=[],a=a.concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(l,10);!isNaN(s)&&i!==l&&String(s)===l&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(a=[],a[s]=o):a[l]=o}o=a}return o},s=function(e,t,r){if(e){var o=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=a.exec(o),c=s?o.slice(0,s.index):o,u=[];if(c){if(!r.plainObjects&&n.call(Object.prototype,c)&&!r.allowPrototypes)return;u.push(c)}for(var p=0;null!==(s=i.exec(o))&&p<r.depth;){if(p+=1,!r.plainObjects&&n.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+o.slice(s.index)+"]"),l(u,t,r)}};e.exports=function(e,t){var r=t?o.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||o.isRegExp(r.delimiter)?r.delimiter:a.delimiter,r.depth="number"==typeof r.depth?r.depth:a.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:a.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:a.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:a.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:a.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:a.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:a.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:a.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var n="string"==typeof e?i(e,r):e,l=r.plainObjects?Object.create(null):{},c=Object.keys(n),u=0;u<c.length;++u){var p=c[u],f=s(p,n[p],r);l=o.merge(l,f,r)}return o.compact(l)}},810:function(e,t,r){"use strict";var o=r(807),n=r(806),a={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:o.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,n,a,i,s,c,u,p,f,d,m){var y=t;if("function"==typeof c)y=c(r,y);else if(y instanceof Date)y=f(y);else if(null===y){if(a)return s&&!m?s(r,l.encoder):r;y=""}if("string"==typeof y||"number"==typeof y||"boolean"==typeof y||o.isBuffer(y)){if(s){return[d(m?r:s(r,l.encoder))+"="+d(s(y,l.encoder))]}return[d(r)+"="+d(String(y))]}var g=[];if(void 0===y)return g;var h;if(Array.isArray(c))h=c;else{var v=Object.keys(y);h=u?v.sort(u):v}for(var b=0;b<h.length;++b){var w=h[b];i&&null===y[w]||(g=Array.isArray(y)?g.concat(e(y[w],n(r,w),n,a,i,s,c,u,p,f,d,m)):g.concat(e(y[w],r+(p?"."+w:"["+w+"]"),n,a,i,s,c,u,p,f,d,m)))}return g};e.exports=function(e,t){var r=e,i=t?o.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var c=void 0===i.delimiter?l.delimiter:i.delimiter,u="boolean"==typeof i.strictNullHandling?i.strictNullHandling:l.strictNullHandling,p="boolean"==typeof i.skipNulls?i.skipNulls:l.skipNulls,f="boolean"==typeof i.encode?i.encode:l.encode,d="function"==typeof i.encoder?i.encoder:l.encoder,m="function"==typeof i.sort?i.sort:null,y=void 0!==i.allowDots&&i.allowDots,g="function"==typeof i.serializeDate?i.serializeDate:l.serializeDate,h="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:l.encodeValuesOnly;if(void 0===i.format)i.format=n.default;else if(!Object.prototype.hasOwnProperty.call(n.formatters,i.format))throw new TypeError("Unknown format option provided.");var v,b,w=n.formatters[i.format];"function"==typeof i.filter?(b=i.filter,r=b("",r)):Array.isArray(i.filter)&&(b=i.filter,v=b);var I=[];if("object"!=typeof r||null===r)return"";var j;j=i.arrayFormat in a?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var O=a[j];v||(v=Object.keys(r)),m&&v.sort(m);for(var x=0;x<v.length;++x){var _=v[x];p&&null===r[_]||(I=I.concat(s(r[_],_,O,u,p,f?d:null,b,m,y,g,w,h)))}var k=I.join(c),A=!0===i.addQueryPrefix?"?":"";return k.length>0?A+k:""}},817:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(116),n=function(e){return e&&e.__esModule?e:{default:e}}(o),a=r(808);t.default={data:function(){return{searchCompany:"",companyList:this.getCompanyList(),alldata:[],modal1:!1,state:"新增",oldUsername:"",currentPage:1,totalRecord:0,pageSize:10,agentList:this.getAgentList(),border:!0,formItem:{company:"",User:"",uuid:"",version:"0",remark:"",agent:""},ruleValidate:{company:[{required:!0,message:"公司名称不能为空",trigger:"blur"}],User:[{required:!0,message:"用户名不能为空",trigger:"blur"}],uuid:[{required:!0,message:"注册码不能为空",trigger:"blur"}],version:[{required:!0,message:"版本不能为空",trigger:"change"}],agent:[{required:!0,message:"代理商不能为空",trigger:"change"}]}}},methods:{getAgentList:function(){var e=this,t=this.pageSize||"10",r=this.currentPage||"1",o=this.searchCompany||"";n.default.ajax.get("getAppRegister.asp?rows="+t+"&page="+r+"&company="+o).then(function(t){console.log(t.data),e.totalRecord=t.data.total,e.agentList=t.data.rows,e.alldata=t.data.rows})},getCompanyList:function(){var e=this;n.default.ajax.get("getCompany.asp").then(function(t){e.companyList=t.data})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.getAgentList()},handleCurrentChange:function(e){this.currentPage=e,this.getAgentList()},filterTag:function(e,t){return t.taskmoney==e},getSummaries:function(e){var t=e.columns,r=e.data,o=[];return t.forEach(function(e,t){if(0===t)return void(o[t]="合计");if(t<4)return void(o[t]="N/A");var n=r.map(function(t){return Number(t[e.property])});n.every(function(e){return isNaN(e)})?o[t]="N/A":o[t]=n.reduce(function(e,t){var r=Number(t);return isNaN(r)?e:e+t},0)}),o},searchByCompany:function(){this.currentPage=1,this.getAgentList()},ok:function(e){var t=this;this.$refs[e].validate(function(e){var r=t;if(!e)return t.modal1=!0,!1;var o=t.formItem;o.old=t.oldUsername;var i="addAPPRegister.asp";"修改用户"==t.state&&(i="updateAppRegister.asp"),console.log(o),n.default.ajax.post(i,a.stringify(o)).then(function(e){"success"==e.data?(r.modal1=!1,r.getAgentList()):"exists"==e.data&&r.$Message.info("该信息已存在")})})},cancel:function(){this.modal1=!1},clear:function(){this.formItem.User="",this.formItem.uuid="",this.formItem.company="",this.formItem.remark="",this.formItem.version="0",this.formItem.agent=""},add:function(){this.clear(),this.state="新增用户",this.modal1=!0},delrow:function(e){var t=this;this.$confirm("是否确定删除该注册信息?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.default.ajax.get("delAppRegister.asp",{params:{old:e.row.id}}).then(function(r){"success"==r.data&&(t.agentList.splice(e.$index,1),t.$message({type:"success",message:"删除成功!"}))})}).catch(function(){})},editrow:function(e){this.formItem.User=e.row.User,this.formItem.uuid=e.row.uuid,this.formItem.company=e.row.Company,this.formItem.agent=e.row.realagent,this.formItem.version=""+e.row.realversion,this.formItem.remark=e.row.remark,this.modal1=!0,this.state="修改用户",this.oldUsername=e.row.id,console.log(e)}}}},885:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{padding:"20px",background:"#fff",margin:"10px"}},[r("Form",{ref:"formInline",attrs:{inline:"","label-position":"right","label-width":80}},[r("FormItem",{attrs:{label:"公司名称",prop:"searchCompany"}},[r("Input",{attrs:{placeholder:"请输入"},model:{value:e.searchCompany,callback:function(t){e.searchCompany=t},expression:"searchCompany"}})],1),e._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary"},on:{click:e.searchByCompany}},[e._v("查询")])],1)],1),e._v(" "),r("ButtonGroup",{staticStyle:{"margin-bottom":"10px"}},[r("Button",{attrs:{type:"primary",icon:"plus"},on:{click:e.add}},[e._v("新增")])],1),e._v(" "),r("Modal",{attrs:{title:e.state,footerHide:""},on:{"on-cancel":e.cancel},model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[r("Form",{ref:"formItem",attrs:{"label-width":80,model:e.formItem,rules:e.ruleValidate}},[r("FormItem",{attrs:{label:"公司名称",prop:"company"}},[r("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formItem.company,callback:function(t){e.$set(e.formItem,"company",t)},expression:"formItem.company"}})],1),e._v(" "),r("FormItem",{attrs:{label:"用户名",prop:"User"}},[r("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formItem.User,callback:function(t){e.$set(e.formItem,"User",t)},expression:"formItem.User"}})],1),e._v(" "),r("FormItem",{attrs:{label:"注册码",prop:"uuid"}},[r("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formItem.uuid,callback:function(t){e.$set(e.formItem,"uuid",t)},expression:"formItem.uuid"}})],1),e._v(" "),r("FormItem",{attrs:{label:"版本",prop:"version"}},[r("Select",{attrs:{placeholder:"请选择版本"},model:{value:e.formItem.version,callback:function(t){e.$set(e.formItem,"version",t)},expression:"formItem.version"}},[r("Option",{attrs:{value:"0"}},[e._v("普通版")]),e._v(" "),r("Option",{attrs:{value:"1"}},[e._v("客户跟踪")]),e._v(" "),r("Option",{attrs:{value:"2"}},[e._v("增强版")])],1)],1),e._v(" "),r("FormItem",{attrs:{label:"备注",prop:"remark"}},[r("Input",{attrs:{placeholder:"请输入..."},model:{value:e.formItem.remark,callback:function(t){e.$set(e.formItem,"remark",t)},expression:"formItem.remark"}})],1),e._v(" "),r("FormItem",{attrs:{label:"代理商",prop:"agent"}},[r("Select",{model:{value:e.formItem.agent,callback:function(t){e.$set(e.formItem,"agent",t)},expression:"formItem.agent"}},e._l(e.companyList,function(t){return r("Option",{key:t.username,attrs:{value:t.username}},[e._v(e._s(t.company))])}))],1),e._v(" "),r("FormItem",[r("Button",{attrs:{type:"primary"},on:{click:function(t){e.ok("formItem")}}},[e._v("确定")]),e._v(" "),r("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:e.cancel}},[e._v("取消")])],1)],1)],1),e._v(" "),r("el-table",{attrs:{data:e.agentList,height:"500",size:"mini",border:e.border,stripe:"","highlight-current-row":""}},[r("el-table-column",{attrs:{type:"index",width:"40"}}),e._v(" "),r("el-table-column",{attrs:{prop:"Company",label:"公司名称",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"User",label:"用户名",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"uuid",label:"注册码",width:"250"}}),e._v(" "),r("el-table-column",{attrs:{prop:"date",label:"日期",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"version",label:"版本",width:"70"}}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"agent",label:"代理商",width:"100"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){e.editrow(t)}}},[e._v("修改")]),e._v(" "),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){e.delrow(t)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalRecord},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});