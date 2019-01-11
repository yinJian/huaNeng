import Main from '@/components/main'
import CONST from '@/libs/consts'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/home/home')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },

  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      title: '用户管理',
      access: [CONST.UTYPE.ADMIN]
    },
    children: [
      {
        path: 'list',
        name: 'user_list',
        meta: {
          title: '用户管理',
          access: [CONST.UTYPE.ADMIN]
        },
        component: () => import('@/view/user/list.vue')
      },
      {
        path: 'dept',
        name: 'user_dept',
        meta: {
          title: '部门管理',
          access: [CONST.UTYPE.ADMIN]
        },
        component: () => import('@/view/user/dept.vue')
      },
      {
        path: 'add',
        name: 'user_add',
        meta: {
          title: '用户新增',
          access: [CONST.UTYPE.ADMIN],
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/user/add.vue')
      }
    ]
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: Main,
    meta: {
      title: '会务管理'
    },
    children: [
      {
        path: 'tendering',
        name: 'tendering',
        meta: {
          title: '招标管理',
          access: [CONST.UTYPE.PROJECTMANAGER]
        },
        component: () => import('@/view/meeting/tendering.vue')
      },
      {
        path: 'meet',
        name: 'meet',
        meta: {
          title: '会议室管理',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER]
        },
        component: () => import('@/view/meeting/applyHotel.vue')
      },
      {
        path: 'meetRecord',
        name: 'meetRecord',
        meta: {
          title: '会议室管理',
          access: [CONST.UTYPE.PROJECTMANAGER]
        },
        component: () => import('@/view/meeting/meetingRecord.vue')
      },
      {
        path: 'requestmeet',
        name: 'requestmeet',
        meta: {
          title: '会议室管理',
          access: [CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/meeting/requestMeeting.vue')
      },
      {
        path: 'hotelRecord',
        name: 'hotelRecord',
        meta: {
          title: '酒店管理',
          access: [CONST.UTYPE.PROJECTMANAGER]
        },
        component: () => import('@/view/meeting/hotelRecord.vue')
      },
      {
        path: 'hotel',
        name: 'hotel',
        meta: {
          title: '酒店管理',
          access: [CONST.UTYPE.HOTEL_ADMIN]
        },
        component: () => import('@/view/meeting/requestHotel.vue')
      },
      {
        path: 'desktop',
        name: 'desktop',
        meta: {
          title: '云桌面管理',
          access: [CONST.UTYPE.PROJECTMANAGER]
        },
        component: () => import('@/view/meeting/desktop.vue')
      }
    ]
  },
  {
    path: '/authorize',
    name: 'authorize',
    component: Main,
    meta: {
      title: '智能管控'
    },
    children: [
      {
        path: 'machine',
        name: 'machine',
        meta: {
          title: '闸机授权信息管理',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/machine.vue')
      },
      {
        path: 'machineAuthAdd',
        name: 'machineAuthAdd',
        meta: {
          title: '闸机授权',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/machineAuthAdd.vue')
      },
      {
        path: 'machineEntrance',
        name: 'machineEntrance',
        meta: {
          title: '闸机授权信息管理',
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/machineEntrance.vue')
      },
      {
        path: 'authmeeting',
        name: 'authmeeting',
        meta: {
          title: '会议室授权管理',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/meeting.vue')
      },
      {
        path: 'meetingAuthAdd',
        name: 'meetingAuthAdd',
        meta: {
          title: '会议室授权管理',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/meetingAuthAdd.vue')
      },
      {
        path: 'meetingEntrance',
        name: 'meetingEntrance',
        meta: {
          title: '会议室授权管理',
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/meetingEntrance.vue')
      },
      {
        path: 'alarm',
        name: 'alarm',
        meta: {
          title: '报警信息管理',
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/alarm.vue')
      },
      {
        path: 'defence',
        name: 'defence',
        meta: {
          title: ' 布防',
          access: [CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/defence.vue')
      },
      {
        path: 'trailEntrance',
        name: 'trailEntrance',
        meta: {
          title: '轨迹管理',
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/trailEntrance.vue')
      },
      {
        path: 'trail',
        name: 'trail',
        meta: {
          title: '专家轨迹',
          hideInMenu: true,
          access: [CONST.UTYPE.PROJECTMANAGER, CONST.UTYPE.CONFERCE_ADMIN]
        },
        component: () => import('@/view/authorize/trail.vue')
      }
    ]
  },
  {
    path: '/comment',
    name: 'comment',
    component: Main,
    meta: {
      title: '评价系统'
    },
    children: [
      {
        path: 'mangerpici',
        name: 'mangerpici',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          title: '评价'
        },
        component: () => import('@/view/comment/mangerPici.vue')
      },
      {
        path: 'mangercomment',
        name: 'mangercomment',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          hideInMenu: true,
          title: '评价'
        },
        component: () => import('@/view/comment/mangerComment.vue')
      },
      {
        path: 'commentmangelist',
        name: 'commentmangelist',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          hideInMenu: true,
          title: '评价列表'
        },
        component: () => import('@/view/comment/commentMangeList.vue')
      },
      {
        path: 'commenttable',
        name: 'commenttable',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          hideInMenu: true,
          title: '评价内容'
        },
        component: () => import('@/view/comment/commentTable.vue')
      },
      {
        path: 'expertcomment',
        name: 'expertcomment',
        meta: {
          access: [CONST.UTYPE.EXPERT],
          title: '评价'
        },
        component: () => import('@/view/comment/expertComment.vue')
      },
      {
        path: 'experttable',
        name: 'experttable',
        meta: {
          hideInMenu: true,
          access: [CONST.UTYPE.EXPERT],
          title: '评价内容'
        },
        component: () => import('@/view/comment/expertTable.vue')
      },
      {
        path: 'weituocomment',
        name: 'weituocomment',
        meta: {
          access: [CONST.UTYPE.DELEGATORL],
          title: '评价'
        },
        component: () => import('@/view/comment/weituoComment.vue')
      },
      {
        path: 'weituotable',
        name: 'weituotable',
        meta: {
          access: [CONST.UTYPE.DELEGATORL],
          hideInMenu: true,
          title: '评价内容'
        },
        component: () => import('@/view/comment/weituoTable.vue')
      },
      {
        path: 'commentmange',
        name: 'commentmange',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          title: '评价管理'
        },
        component: () => import('@/view/comment/commentMange.vue')
      },
      {
        path: 'commenttotal',
        name: 'commenttotal',
        meta: {
          hideInMenu: true,
          title: '评价统计'
        },
        component: () => import('@/view/comment/commentTotal.vue')
      }

    ]
  },
  {
    path: '/cost',
    name: 'cost',
    component: Main,
    meta: {
      title: '费用管理'
    },
    children: [
      {
        path: 'setcost',
        name: 'setcost',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '费率配置'
        },
        component: () => import('@/view/cost/setcost.vue')
      },
      {
        path: 'resultcost',
        name: 'resultcost',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          title: '费用核算'
        },
        component: () => import('@/view/cost/resultcost.vue')
      },
      {
        path: 'costdetail',
        name: 'costdetail',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          hideInMenu: true,
          title: '费用详情'
        },
        component: () => import('@/view/cost/costdetail.vue')
      }
    ]
  },
  {
    path: '/environment',
    name: 'environment',
    component: Main,
    meta: {
      title: '评标环境管理'
    },
    children: [
      {
        path: 'reenvironment',
        name: 'reenvironment',
        meta: {
          access: [CONST.UTYPE.PROJECTMANAGER],
          title: '环境管理'
        },
        component: () => import('@/view/environment/reenvironment.vue')
      },
      {
        path: 'livevideo',
        name: 'livevideo',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '视频直播'
        },
        component: () => import('@/view/environment/livevideo.vue')
      },
      {
        path: '/backvideo',
        name: 'backvideo',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '视频回放'
        },
        component: () => import('@/view/environment/backvideo.vue')
      }
    ]
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: Main,
    meta: {
      title: '数据字典',
      access: [CONST.UTYPE.ADMIN]
    },
    children: [
      {
        path: '/addcomputer',
        name: 'addcomputer',
        meta: {
          title: '添加设备',
          access: [CONST.UTYPE.ADMIN]
        },
        component: () => import('@/view/equipment/computer/add.vue')
      },
      {
        path: '/computerlist',
        name: 'computerlist',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '设备列表'
        },
        component: () => import('@/view/equipment/computer/list.vue')
      },
      {
        path: '/editcomputer',
        name: 'editcomputer',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          hideInMenu: true,
          title: '编辑设备'
        },
        component: () => import('@/view/equipment/computer/edit.vue')
      },
      {
        path: '/adddesktop',
        name: 'adddesktop',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '添加云桌面'
        },
        component: () => import('@/view/equipment/desktop/add.vue')
      },
      {
        path: '/desktoplist',
        name: 'desktoplist',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          title: '云桌面列表'
        },
        component: () => import('@/view/equipment/desktop/list.vue')
      },
      {
        path: '/editdesktop',
        name: 'editdesktop',
        meta: {
          access: [CONST.UTYPE.ADMIN],
          hideInMenu: true,
          title: '编辑云桌面'
        },
        component: () => import('@/view/equipment/desktop/edit.vue')
      }
    ]
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: Main,
    meta: {
      title: '统计管理',
      access: [CONST.UTYPE.LEADER]
    },
    children: [
      {
        path: 'project',
        name: 'projectStatistic',
        meta: {
          title: '项目统计'
        },
        component: () => import('@/view/statistic/project.vue')
      },
      {
        path: 'meeting',
        name: 'meetingStatistic',
        meta: {
          title: '会议室统计'
        },
        component: () => import('@/view/statistic/meeting.vue')
      },
      {
        path: 'expert',
        name: 'expertStatistic',
        meta: {
          title: '专家统计'
        },
        component: () => import('@/view/statistic/expert.vue')
      },
      {
        path: 'alarm',
        name: 'alarmStatistic',
        meta: {
          title: '告警统计'
        },
        component: () => import('@/view/statistic/alarm.vue')
      },
      {
        path: 'desktop',
        name: 'desktopStatistic',
        meta: {
          title: '云桌面统计'
        },
        component: () => import('@/view/statistic/desktop.vue')
      }
    ]
  }
]
