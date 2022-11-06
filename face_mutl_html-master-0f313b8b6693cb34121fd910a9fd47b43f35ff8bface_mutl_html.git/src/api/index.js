const api = {
  Login: '/login',
  Logout: '/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/api/user/info',
  UserInfoPassword:'/api/user/info/password',
  sysAdminUser: '/api/admin/user',
  deviceManagement:'/api/device',
  visitor:'/api/visitor',
  // employees:'/api/workuser,'
  home:'/api/homePage',//主页
}
export default api
