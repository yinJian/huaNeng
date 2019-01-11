const CONSTS = {
  // 用户类型
  UTYPE: {
    ADMIN: 10, // 管理员
    PROJECTMANAGER: 20, // 项目经理
    HOTEL_ADMIN: 30, // 酒店管理员
    CONFERCE_ADMIN: 40, // 会务管理员
    EXPERT: 50, // 专家
    LEADER: 60, // 领导
    DELEGATORL: 70 // 代理方
  },
  MAX_COUNT: 10,
  USERSTATE: {
    NORMAL: 10,
    DISABLED: 20
  },
  UTYPE_DESC_OBJ: {
    '10': '管理员',
    '20': '项目经理',
    '30': '酒店管理员',
    '40': '会务管理员',
    '50': '专家',
    '60': '领导',
    '70': '代理方'
  }
}
export default CONSTS
