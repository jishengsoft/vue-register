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
            { path: 'index', title: '软件定价', name: 'pricing', icon:'flag',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '折扣标准', name: 'discount', icon:'bookmark',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '系统设置', name: 'setting', icon:'gear-b',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
        ]
    },
    {
        path: '/access',
        
        icon: 'social-windows',
        name: 'business',
        title: '功能',
        component: Main,
        children: [
            { path: 'index', title: '发空狗', name: 'deliver', icon:'locked',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '充值', name: 'recharge', icon:'social-yen',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '加密狗注册', name: 'register', icon:'pin',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '余额调整', name: 'adjust', icon:'levels',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: 'APP注册信息', name: 'app', icon:'iphone',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '客服管理', name: 'service', icon:'social-whatsapp',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
        ]
    },
    {
        path: '/access',
        
        icon: 'connection-bars',
        name: 'report',
        title: '查询',
        component: Main,
        children: [
            { path: 'index', title: '充值查询', name: 'chargeQuery', icon:'arrow-graph-up-right',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '注册查询', name: 'registerQuery', icon:'arrow-graph-down-right',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '加密狗到期查询', name: 'dogEndQuery', icon:'clock',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '买空狗查询', name: 'buyDogQuery', icon:'unlocked',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '对账单', name: 'accountChecking',icon:'checkmark-circled', 
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '客户远程信息', name: 'remoteInformation', icon:'ios-cloud',
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
            { path: 'index', title: '试用版注册查询', name: 'trialQuery',icon:'ios-pulse', 
            component: resolve => { require(['./views/access/access.vue'], resolve); } },
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index' }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editer',
                icon: 'compose',
                name: 'text-editer',
                title: '富文本编辑器',
                component: resolve => { require(['./views/my_components/text-editer/textEditer.vue'], resolve); }
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: resolve => { require(['./views/my_components/markdown-editor/markdown-editor.vue'], resolve); }
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: resolve => { require(['./views/my_components/draggable-list/draggable-list.vue'], resolve); }
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: resolve => { require(['./views/my_components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                component: resolve => { require(['./views/my_components/count-to/count-to.vue'], resolve); }
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'articalpublish', icon: 'compose', component: resolve => { require(['./views/form/article-publish/article-publish.vue'], resolve); } },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['./views/form/work-flow/work-flow.vue'], resolve); } }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('./views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('./views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragableTable', icon: 'arrow-move', component: resolve => { require(['./views/tables/dragable-table.vue'], resolve); } },
            { path: 'editableTable', title: '可编辑表格', name: 'editableTable', icon: 'edit', component: resolve => { require(['./views/tables/editable-table.vue'], resolve); } },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportableTable', icon: 'code-download', component: resolve => { require(['./views/tables/exportable-table.vue'], resolve); } },
            { path: 'table2image', title: '表格转图片', name: 'table2image', icon: 'images', component: resolve => { require(['./views/tables/table-to-image.vue'], resolve); } }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['./views/error_page/error-page.vue'], resolve); } }
        ]
    }
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
