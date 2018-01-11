import Main from './views/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['./views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./views/error_page/404.vue'], resolve); }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => { require(['./views/error_page/401.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => { require(['./views/error_page/500.vue'], resolve); }
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['./views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['./views/message/message.vue'], resolve); } }
    ]
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['./views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['./views/main_components/locking-page.vue'], resolve); }
};

export const appRouter = [
    {
        path: '/systemInfo',
        
        icon: 'navicon-round',
        name: 'systemInfo',
        title: '基础资料',
        component: Main,
        children: [
            { path: 'agent', title: '用户管理', name: 'agent', icon:'ios-people',
            component: resolve => { require(['./views/systemInfo/agent/agent.vue'], resolve); } },
            { path: 'pricing', title: '软件定价', name: 'pricing', icon:'flag',
            component: resolve => { require(['./views/systemInfo/pricing/pricing.vue'], resolve); } },
            { path: 'discount', title: '折扣标准', name: 'discount', icon:'bookmark',
            component: resolve => { require(['./views/systemInfo/discount/discount.vue'], resolve); } },
            { path: 'systemSetting', title: '系统设置', name: 'systemSetting', icon:'gear-b',
            component: resolve => { require(['./views/systemInfo/systemSetting/systemSetting.vue'], resolve); } },
        ]
    },
    {
        path: '/business',
        
        icon: 'social-windows',
        name: 'business',
        title: '功能',
        component: Main,
        children: [
            { path: 'deliver', title: '发空狗', name: 'deliver', icon:'locked',
            component: resolve => { require(['./views/business/deliver/deliver.vue'], resolve); } },
            { path: 'recharge', title: '充值', name: 'recharge', icon:'social-yen',
            component: resolve => { require(['./views/business/recharge/recharge.vue'], resolve); } },
            { path: 'register', title: '加密狗注册', name: 'register', icon:'pin',
            component: resolve => { require(['./views/business/register/register.vue'], resolve); } },
            { path: 'adjust', title: '余额调整', name: 'adjust', icon:'levels',
            component: resolve => { require(['./views/business/adjustment/adjustment.vue'], resolve); } },
            { path: 'app', title: 'APP注册信息', name: 'app', icon:'iphone',
            component: resolve => { require(['./views/business/appRegister/appRegister.vue'], resolve); } },
            { path: 'service', title: '客服管理', name: 'service', icon:'social-whatsapp',
            component: resolve => { require(['./views/business/mainagentQQ/mainagentQQ.vue'], resolve); } },
        ]
    },
    {
        path: '/report',
        
        icon: 'connection-bars',
        name: 'report',
        title: '查询',
        component: Main,
        children: [
            { path: 'chargeQuery', title: '充值查询', name: 'chargeQuery', icon:'arrow-graph-up-right',
            component: resolve => { require(['./views/report/chargeQuery/chargeQuery.vue'], resolve); } },
            { path: 'registerQuery', title: '注册查询', name: 'registerQuery', icon:'arrow-graph-down-right',
            component: resolve => { require(['./views/report/registerQuery/registerQuery.vue'], resolve); } },
            { path: 'dogEndQuery', title: '加密狗到期查询', name: 'dogEndQuery', icon:'clock',
            component: resolve => { require(['./views/report/dogExpire/dogExpire.vue'], resolve); } },
            { path: 'buyDogQuery', title: '买空狗查询', name: 'buyDogQuery', icon:'unlocked',
            component: resolve => { require(['./views/report/buyDogQuery/buyDogQuery.vue'], resolve); } },
            { path: 'accountChecking', title: '对账单', name: 'accountChecking',icon:'checkmark-circled', 
            component: resolve => { require(['./views/report/accountChecking/accountChecking.vue'], resolve); } },
            { path: 'remoteInformation', title: '客户远程信息', name: 'remoteInformation', icon:'ios-cloud',
            component: resolve => { require(['./views/report/remoteInformation/remoteInformation.vue'], resolve); } },
            { path: 'trialQuery', title: '试用版注册查询', name: 'trialQuery',icon:'ios-pulse', 
            component: resolve => { require(['./views/report/trialQuery/trialQuery.vue'], resolve); } },
        ]
    },
    
];

export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page401,
    page404
];
