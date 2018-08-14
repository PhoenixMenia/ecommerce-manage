export function formatTsType(index) {

  var _type = {
    "1": "储值充值",
    "2": "储值充值撤销",
    "3": "储值赠送",
    "4": "储值赠送撤销",
    "5": "储值消费",
    "6": "储值消费撤销",
    "7": "实收金额",
    "8": "实收金额撤销",
    "9": "积分奖励",
    "10": "积分奖励撤销",
    "11": "积分消费",
    "12": "积分消费撤销",
    "13": "代金券消费",
    "14": "礼品券消费",
    "17": "推荐奖励"
  };

  return _type[index];
}
export function shiftFormatType(index, key) {
  var __type = [{
    "1": "储值消费",
    "2": "储值本金消费",
    "3": "储值赠送消费",
    "4": "积分消费",
    "5": "实收金额（现金）",
    "6": "实收金额（刷卡）",
    "7": "实收金额（微信）",
    "8": "实收金额（支付宝）",
    "9": "实收金额（旺支付）",
    "10": "实收金额（其他）",
    "11": "代金券消费",
    "12": "礼品券消费",
    "13": "积分奖励"
  }, {
    "1": "储值充值（现金）",
    "2": "储值充值（刷卡）",
    "3": "储值充值（微信）",
    "4": "储值充值（支付宝）",
    "5": "储值充值（旺支付）",
    "6": "储值充值（其他）",
    "7": "储值赠送"
  }, {
    "1": "储值消费撤销",
    "2": "储值本金消费撤销",
    "3": "储值赠送消费撤销",
    "4": "积分消费撤销",
    "5": "实收金额撤销",
    "6": "代金券消费撤销",
    "7": "礼品券消费撤销",
    "8": "积分奖励撤销",
    "9": "储值本金撤销",
    "10": "储值赠送撤销"
  }];
  return __type[index][key];
}

export function formatOpType(index) {

  var _type = {
    "0": "账号锁定",
    "1": "账号解锁"
  };

  return _type[index];
}
//门店管理方式
export function formatAcType(index) {

  var _type = {
    "0": "门店",
    "1": "集团"
  };

  return _type[index];
}
// 活动类型
export function formatRegisterType(index) {

  var _type = {
    "0": "会员注册奖励",
    "1": "推荐返利",
    "2": "精准发券",
    "7": "消费返券",
    "8": "精准短信",
  };

  return _type[index] || "";
}
// calculate consumer score cash
export function calculateConsumerScore(score) {
  return Math.floor(score / 10);
}
//卡属类型
export function formatCardType(index) {

  var _type = {
    "0": "门店卡",
    "1": "集团卡"
  };

  return _type[index];
}
//卡属类型
export function formatlockStatus(index) {

  var _type = {
    "0": "锁定",
    "1": "正常"
  };

  return _type[index];
}
//支付方式
export function formatpayType(index) {

  var _type = {
    "1": "现金",
    "2": "刷卡",
    '3': '支付宝',
    '4': '微信',
    '5': '其他',
    '6': "旺支付"
  };

  return _type[index];
}

export function filterGender(str) {
  if (str == 1) {
    return '男';
  } else if (str == 2) {
    return '女';
  } else {
    return '';
  }
}

export function filterLockStatus(str) {
  if (str == 0) {
    return '锁定';
  } else {
    return '正常';
  }
}

export function filterRoleState(str) {
  if (str == 0) {
    return '已删除';
  } else if (str == 1) {
    return '禁用';
  } else if (str == 2) {
    return '正常';
  }
}

export function filterRoleUserType(str) {
  if (str == 0) {
    return '门店普通用户';
  } else if (str == 1) {
    return '门店管理员';
  } else if (str == 2) {
    return '集团管理员';
  } else if (str == 6) {
    return '集团普通用户';
  }
}
export function filterCardStatus(index) {
  var _type = {
    "0": "已停用",
    "1": "正常"
  };

  return _type[index];
}

export function calculateJsonType(rules, type) {
  let formatRules = '',
    description = '';
  if (type === "object") {
    formatRules = rules;
  } else {
    try {
      formatRules = JSON.parse(rules);
    } catch (e) {
      return ''
    }
  }
  if (formatRules && formatRules.cardInfoRechargeRuleList && formatRules.cardInfoRechargeRuleList.length > 0) {
    formatRules.cardInfoRechargeRuleList.forEach((item) => {
      if (item.rechargeType == 1) {
        description += `充 ${item.rechargeAmount} 元 送${item.giveAmount}% (赠送${item.rechargeAmount * item.giveAmount / 100}元);`;
      } else {
        description += `充 ${item.rechargeAmount} 元 送 ${item.giveAmount} 元;`;
      }
    })
  }
  return description;
}
//消费金额类型
export function filterConsumeType(index) {
  var _type = {
    "1": "实收金额",
    "2": "储值消费",
    "3": "实收金额、储值消费"
  };
  return _type[index];
}

//积分规则 是否抵用现金
export function filterIsForCash(index) {
  var _type = {
    "0": "不能",
    "1": "能"
  };
  return _type[index];
}

//积分规则 期限
export function filterTimeLimit(index) {
  var _type = {
    "0": "永久",
    "1": "次年年底"
  };
  return _type[index];
}

export function formatGeneralTsType(index) {
  var _type = {
    "0": "充值",
    "1": "消费",
    "2": "充值撤销",
    "3": "消费撤销"
  };

  return _type[index];
}

export function formatSourceType(index) {
  // 2017-08-29, 该死的产品又tmd的改了。。。
  // 2017-12-05, 添加引导注册来源
  var _type = {
    "0": "微信点餐",
    "1": "公众号注册",
    "2": "红包注册",
    "3": "导入",
    "4": "门店二维码",
    "5": "推荐注册",
    "6": "引导注册"
  };

  return _type[index];
}

export function formatTransFlag(str) {
  if (str == 4) {
    return '导入';
  } else {
    return '';
  }
}

export function formatExtendLimit(str) {
  if (str == -1) {
    return '无限制';
  } else {
    return str;
  }
}
export function formatTotalSum(v1, v2) {
  /// <summary>精确计算加法。语法：Math.add(v1, v2)</summary>
  /// <param name="v1" type="number">操作数。</param>
  /// <param name="v2" type="number">操作数。</param>
  /// <returns type="number">计算结果。</returns>
  var r1, r2, m;
  try {
    r1 = v1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = v2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));

  return (v1 * m + v2 * m) / m;
}
export function calcRewardAmount(giveAmount, rechargeType, rechargeAmount) {
  if (rechargeType == 1) {
    return Math.floor(rechargeAmount * giveAmount / 100);
  } else {
    return giveAmount;
  }
}
export function editCardLimitRule(giveAmount, rechargeAmount, rechargeType) {
  if (rechargeType == 1) {
    return `充 ${rechargeAmount} 元 送 ${giveAmount}% (赠送${rechargeAmount * giveAmount / 100}元)`;
  } else {
    return `充 ${rechargeAmount} 元 送 ${giveAmount} 元`;
  }
}
//会员权益条数
export function vipPowerNum(str, oneTime, schedule) {
  let num = 0;
  if (str && str.replace(/(^\s*)|(\s*$)/g, "")) {
    num += str.split("&").length;
  }
  if (oneTime && oneTime > 0) {
    num++;
  }
  if (schedule && schedule > 0) {
    num++;
  }
  if (num > 0) {
    return `共${num}权益`;
  } else {
    return '';
  }
}
//会员升级规则
export function upGradeLimit(signLimit, consumerLimit) {
  if (signLimit && consumerLimit) {
    return `签到满${signLimit}次或消费满${consumerLimit}元`
  } else if (signLimit) {
    return `签到满${signLimit}次`
  } else if (consumerLimit) {
    return `消费满${consumerLimit}元`
  } else {
    return ''
  }
}
//优惠券使用时间
export function couponTime(startTime, endTime) {
  if (startTime && endTime) {
    return `${startTime.split(' ')[0]} 至 ${endTime.split(' ')[0]}`
  } else {
    return ' '
  }
}
//优惠券创建者
export function couponCreate(create, time) {
  if (time) {
    return `${time.split(' ')[0]} ${create} 创建`
  } else {
    return `${create} 创建`
  }
}
//日期使用限制
export function weekFun(str) {
  const weekName = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (str) {
    return str.split(',').sort().map((item) => {
      return weekName[item - 1]
    }).join(',');
  } else {
    return '无限制'
  }
}
//优惠卷使用日期
export function useTime(end, time, native) {
  if (native) {
    return `券启用之日起${native}日有效`;
  } else if (end && time) {
    return `${time.split(' ')[0]} 至 ${end.split(' ')[0]}`
  } else {
    return ``
  }
}
//适用门店
export function merchantFun(str) {
  if (str) {
    return str.split(',').map((item) => {
      return item.split('|')[2];
    }).join('、');
  } else {
    return '无限制'
  }
}
export function activityStatusText(activityStatus) {
  if (activityStatus == 0) {
    return '尚未执行'
  } else if (activityStatus == 1) {
    return '进行中'
  } else {
    return '已终止'
  }
}
export function justDisplayDate(dateTime) {
  if (!dateTime) {
    return '';
  }
  return dateTime.split(' ')[0]
}
//计算优惠券使用率
export function formatCouponUsage(couponUsedSum, couponSendNum) {
  if (couponSendNum != 0 && couponUsedSum != 0) {
    return `${((couponUsedSum / couponSendNum)*100).toFixed(2)}%`;
  } else {
    return '0%';
  }
}

//计算营销活动的带动交易金额
export function calcTransationMoney(deductibleMoney, storeCost, cashCost, scoreCost) {
  return parseFloat(deductibleMoney) + parseFloat(storeCost) + parseFloat(cashCost) + parseFloat(scoreCost);
}

//营销效果列表的活动名称组装
export function formatActivityName(activityType, levelRank, registerName, levelName) {
  if (activityType == 1) {
    return `V${levelRank} - ${levelName}`;
  } else if (activityType == 0 || activityType == 3 || activityType == 4 || activityType == 5 || activityType == 6 || activityType == 7) {
    return registerName;
  }
}

//营销活动类型
export function formatActivityType(str) {
  if (str == 0) {
    return '会员注册';
  } else if (str == 1) {
    return '会员等级';
  } else if (str == 3) {
    return '推荐返利';
  } else if (str == 4) {
    return '精准发券';
  } else if (str==5) {
    return '充值赠券';
  } else if (str==6) {
    return '生日赠券';
  } else if(str==7) {
    return '消费返券'
  } else if (str == 8) {
    return '精准短信';
  }else {
    return '';
  }
}
//会员等级变动记录的变动类型
export function formatChangeType(str) {
  if (str == 0) {
    return '升级';
  } else if (str == 1) {
    return '降级';
  } else {
    return '';
  }
}
//会员优惠券来源
export function formatCouponResource(str) {
  if (str == 0) {
    return '会员注册奖励';
  } else if (str == 1) {
    return '等级权益';
  } else if (str == 2) {
    return '手动添加';
  } else if (str == 3) {
    return '推荐返利';
  } else if (str==4) {
    return '精准营销';
  } else if (str==5) {
    return '充值赠券';
  } else if (str==6) {
    return '生日赠券'
  } else if(str==7) {
    return '消费返券'
  } else {
    return '';
  }
}
//会员优惠券来源
export function formatCouponType(type) {
  if (type == 0) {
    return '代金券';
  } else if (type == 1) {
    return '礼品券';
  } else if (type == 2) {
    return '赠品券';
  }
}
export function formatRank(levelRank) {
  if (levelRank) {
    return `Lv${levelRank}`;
  }
}

export function formatUnicode(value) {
  return value && value.split(/\\/).length > 1 ? value.split(/\\/).filter(data => data).map(data => String.fromCharCode(data.replace(/\u/g, '0x'))).join('') : value;
}
export function subFirstWord(str) {
  if (str && str.length > 0) {
    str = str.substring(0, 1);
  }
  return str;
}
//信息类型
export function formatMsgType(type) {
  if (type == 2) {
    return '微信';
  } else if (type == 1) {
    return '短信';
  } else {
    return '';
  }
}

//时间截取
export function formatDateWithoutTime(str) {
  if (str && str.length > 0) {
    str = str.substring(0,10)
  }
  return str;
}

//工商局项目列表 回复状态  0 未回复 1已回复
export function formatGsjStatusType(type) {
  if (type == 0) {
    return '未回复';
  } else if (type == 1) {
    return '已回复';
  } else{
    return '';
  }
}

// 时间戳时间转换
export const formatTimeFromUnix = function (value, format) {
  if (!value)
    return value;
  let date = new Date(value);
  return date.format(format);
};

// 桌牌綁定狀態
export const distributionStatus = function (item) {
  if (item.tableSnType == 0) {
    return '绑定';
  } else if (item.tableSnType == 1) {
    return item.tableName;
  } else{
    return '';
  }
};
// 储值提成规则
export function rechargeRuleFormat(rechargeMoneyLimit, rechargeBonus, type,topBonus) {
  // rechargeBonus 提成金额	，rechargeMoneyLimit 充值金额 ， topBonus	最高提成
  // 类型 0定额 1 比例
  if (type == 1) {
    if(topBonus){
      return `充值≥ ${rechargeMoneyLimit} 元, 提成 ${rechargeBonus}% (${rechargeMoneyLimit * rechargeBonus / 100}元), 最高提成额${topBonus}元`;
    }else{
      return `充值≥ ${rechargeMoneyLimit} 元, 提成 ${rechargeBonus}% (${rechargeMoneyLimit * rechargeBonus / 100}元)`;
    }
  } else {
    return `充值≥ ${rechargeMoneyLimit} 元, 提成 ${rechargeBonus} 元`;
  }
}

// 提成状态
export function bonusStatusFormat(type) {
  // 0 未结算 1 结算 2 成功 3 撤销
  if (type == 0) {
    return '未结算'
  } else if(type == 1){
    return '已结算'
  }else if(type == 2){
    return '成功'
  }else if(type == 3){
    return '已撤销'
  }else{
    return ''
  }
}
export function bonusTypeFormat(type) {
  // 0 充值 1 注册
  if (type == 1) {
    return '注册提成'
  } else if(type == 0) {
    return '储值提成'
  }else{
    return ''
  }
}
/**
 * 金额补零
 * @param cellValue
 * @returns {string|*}
 */
export function retainedDecimal(cellValue) {
  // 处理0或者非数字
  if(!cellValue) {
    return '0.00'
  };
  let len = 2;
  cellValue = cellValue ? cellValue : 0;
  cellValue += '';
  //清除字符串中的非数字非.字符
  cellValue = cellValue.replace(/[^0-9|\-\.]/g, '');
  //清除字符串开头的0
  if (/^0+/ && cellValue > 1) {
    cellValue = cellValue.replace(/^0+/, '');
  }
  let tempArr = ['0', '00', '000', '0000', '00000', '000000'];
  if (cellValue.indexOf('.') > -1) {
    //有小数点
    if (len - cellValue.split('.')[1].length > 0) {
      cellValue = cellValue + tempArr[len - cellValue.split('.')[1].length - 1];
    }
  } else {
    //没小数点
    cellValue = cellValue + '.' + tempArr[len - 1];
  }
  return cellValue;
}
// 开票状态
export function formatInvoiceStatus(status) {
  // 0 充值 1 注册
  if (status == 'C') {
    return '已开出'
  } else if(status == 'D') {
    return '信息有误'
  }else if(status == 'A' || status == 'B'){
    return '处理中'
  }
}
// 消费返券 奖励范围
export function giveScopeFun(type) {
  // 0消费总额 1消费现金加积分 2仅现金
  if (type == 0) {
    return '消费总额'
  } else if(type == 1) {
    return '现金和储值消费'
  }else if(type == 2){
    return '仅现金消费'
  }
}
//日期使用限制
export function weekFilter(str) {
  const weekName = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (str) {
    let arr = str.split(',');
    if(arr.length == 7){
      return '周一至周日'
    }else {
      return str.split(',').sort().map((item) => {
        return weekName[item - 1]
      }).join(',');
    }
  }
}
