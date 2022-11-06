// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  BlankLayout,
  PageView
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {

    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'menu.home',
      permission: ['user',"admin"]
    },
    redirect: '/sysadmin/account',
    children: [
      {
        path: 'home/homePage',    //路径
        name: 'homePage',         
        component: () => import('@/views/home/homePage'),
        meta: {
          title: 'menu.home',     //路由标题名称
          keepAlive: true,        
          icon: "desktop",        //图标
          permission: ['user'],
        },
      },

      {
        path: '/deviceManagement',
        name: 'deviceManagement',
        redirect: '/deviceManagement/deviceManagement',
        component: RouteView,
        meta: {
          title: 'menu.deviceManagement',
          keepAlive: true,
          icon: "desktop",
          permission: ['user']
        },
        children: [{
            path: '/deviceManagement/deviceManagement',
            name: 'deviceManagement',
            component: () => import('@/views/deviceManagement/deviceManagement'),
            meta: {
              title: 'menu.deviceManagement',
              keepAlive: true,
              permission: ['user'],

            }
          },

        ]
      },
      {
        path: '/personnel',
        name: 'personnel',
        redirect: '/personnel/employees',
        component: RouteView,
        meta: {
          title: 'menu.personnel.title',
          keepAlive: true,
          icon: "team",
          permission: ['user'],
        },
        children: [{
            path: '/personnel/employees',
            name: 'employees',
            component: () => import('@/views/personnel/employees'),
            meta: {
              title: 'menu.personnel.employees',
              keepAlive: true,
              permission: ['user']

            }
          },
          {
            path: '/personnel/visitor',
            name: 'visitor',
            component: () => import('@/views/personnel/visitor'),
            meta: {
              title: 'menu.personnel.visitor',
              keepAlive: true,
              permission: ['user']

            }
          },

        ]
      },
      {
        path: '/device',
        name: 'device',
        redirect: '/device/user',
        component: RouteView,
        meta: {
          title: 'menu.device.title',
          icon: "solution",
          permission: ['user']
        },
        children: [{
            path: '/device/user',
            name: 'deviceuser',
            component: () => import('@/views/device/user'),
            meta: {
              title: 'menu.device.user',
              keepAlive: true,
              permission: ['user']

            }
          },
          {
            path: "/device/record",
            name: "record",
            component: () => import('@/views/device/record'),
            meta: {
              title: 'menu.device.record',
              keepAlive: true,
              permission: ['user']
            }

          }
        ]
      },

      {
        path: '/workManage',
        name: 'workManage',
        redirect: '/workManage/attendance',
        component: RouteView,
        meta: {
          title: 'menu.workManagement',
          icon: "schedule",
          permission: ['user']
        },
        children: [{
            path: '/workManage/attendance',
            name: 'attendance',
            component: () => import('@/views/workManage/attendance'),
            meta: {
              title: 'menu.attendance',
              keepAlive: true,
              permission: ['user']
            }
          },
          {
            path: "/workManage/attendanceLog",
            name: "attendanceLog",
            component: () => import('@/views/workManage/attendanceLog'),
            meta: {
              title: 'menu.attenRecord',
              keepAlive: true,
              permission: ['user']
            }

          }
        ]
      },
      {
        path: '/sysadmin',
        name: 'sysadmin',
        redirect: '/sysadmin/user',
        component: RouteView,
        meta: {
          title: 'menu.sysadmin.title',
          icon: "setting",
          permission: ['admin',"user"]
        },
        children: [{
            path: '/sysadmin/user',
            name: 'adminuser',
            component: () => import('@/views/sysadmin/user'),
            meta: {
              title: 'menu.sysadmin.user',
              keepAlive: true,
              permission: ['admin']
            }
          },
          {
            path: "/sysadmin/account",
            name: "account",
            component: () => import('@/views/sysadmin/account'),
            meta: {
              title: 'menu.sysadmin.set',
              keepAlive: true,
              permission: ['admin',"user"]
            }
          }
        ]
      },
      // {
      //   path: '/workManagement',
      //   name: 'workManagement',
      //   redirect: '/workManagement/attendance',
      //   component: RouteView,
      //   meta: { title: 'menu.workManagement', icon: bxAnaalyse, permission: ['dashboard'] },
      //   children: [
      //     {
      //       path: '/workManagement/attendance',
      //       name: 'attendance',
      //       component: () => import('@/views/workManagement/attendance'),
      //       meta: { title: 'menu.attendance', keepAlive: true, permission: ['dashboard'] }
      //     },
      //   ]
      // },


      //  {
      //    path: 'test/test',
      //    name: 'test',
      //    // redirect: '/deviceManagement/deviceManagement',
      //    component: () => import('@/views/test/test'),
      //    meta: { title: 'test', keepAlive: true, icon: "desktop", permission: ['dashboard'] },
      //  },


      // forms

      // list


      // profile


      // result


      // Exception


      // account
      /*
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },
      */

      // other
      /*
            {
              path: '/other',
              name: 'otherPage',
              component: PageView,
              meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
              redirect: '/other/icon-selector',
              children: [
                {
                  path: '/other/icon-selector',
                  name: 'TestIconSelect',
                  component: () => import('@/views/other/IconSelectorView'),
                  meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
                },
                {
                  path: '/other/list',
                  component: RouteView,
                  meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
                  redirect: '/other/list/tree-list',
                  children: [
                    {
                      path: '/other/list/tree-list',
                      name: 'TreeList',
                      component: () => import('@/views/other/TreeList'),
                      meta: { title: '树目录表格', keepAlive: true }
                    },
                    {
                      path: '/other/list/edit-table',
                      name: 'EditList',
                      component: () => import('@/views/other/TableInnerEditList'),
                      meta: { title: '内联编辑表格', keepAlive: true }
                    },
                    {
                      path: '/other/list/user-list',
                      name: 'UserList',
                      component: () => import('@/views/other/UserList'),
                      meta: { title: '用户列表', keepAlive: true }
                    },
                    {
                      path: '/other/list/role-list',
                      name: 'RoleList',
                      component: () => import('@/views/other/RoleList'),
                      meta: { title: '角色列表', keepAlive: true }
                    },
                    {
                      path: '/other/list/system-role',
                      name: 'SystemRole',
                      component: () => import('@/views/role/RoleList'),
                      meta: { title: '角色列表2', keepAlive: true }
                    },
                    {
                      path: '/other/list/permission-list',
                      name: 'PermissionList',
                      component: () => import('@/views/other/PermissionList'),
                      meta: { title: '权限列表', keepAlive: true }
                    }
                  ]
                }
              ]
            }*/

    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
