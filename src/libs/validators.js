import lodash from 'lodash'
/*
该文件用于编写基于element-ui表单控件的自定义验证器,
传参的方式比较特别，使用bind方法传递验证所需要的参数,
并且通过this来调用，因为element-ui的自定义验证器的参数
固定为rule,value,callback，参数说明请参考element-ui的
官方文档。
*/
/*
验证数字
@args min 最小值
@args max 最大值
*/
export const validateNumber = function (rule, value, callback) {
  if (value === '' || value === null) {
    return callback()
  }
  let args = this,
    min = args.min,
    max = args.max,
    type = args.type,
    number = lodash.toNumber(value)
  if (type == "int" && !/^-?\d+$/.test(value)) {
    return callback(new Error('只能输入整数，不能有小数位'))
  }
  if (!lodash.isNumber(number) || lodash.isNaN(number)) {
    return callback(new Error('只能输入数字'))
  } else {
    if (number >= min && number <= max) {
      return callback()
    } else {
      if (number < min) {
        return callback('输入数字不能小于' + min)
      }
      if (number > max) {
        return callback('输入数字不能大于' + max)
      }
    }
  }
}

export const validatePeriodOfValidity = function (rule, value, callback) {
  let type = value.usageDuringType,
    days = lodash.toNumber(value.usageDuring_LastDays),
    dateRange = value.usageDuring_dateTime
  if (type == 'relative') {
    if (!lodash.isNumber(days) || lodash.isNaN(days) || days == 0) {
      return callback('请输入券启用后使用有效天数，不能为空')
    } else {
      if (days > 99999) {
        return callback('只能输入小于99999的数字')
      } else {
        return callback()
      }
    }
  } else {
    if (lodash.isArray(dateRange) && dateRange.length == 2) {
      if (lodash.every(dateRange, d => {
          return !!d
        })) {
        return callback()
      } else {
        return callback(new Error('请选择有效期范围，不能为空'))
      }
    } else {
      return callback(new Error('请选择有效期范围，不能为空'))
    }
  }
}

export const isRequired = function (rule, value, callback) {
  let message = this.message
  // console.log(value)
  if (typeof value == 'undefined' || value === '') {
    return callback(message)
  } else {
    if (lodash.isString(value) && value.trim()) {
      return callback()
    } else if (lodash.isArray(value) && value.length != 0) {
      return callback()
    } else if (lodash.isObject(value) && !lodash.isEmpty()) {
      return callback()
    } else if (lodash.isNumber(value)) {
      return callback()
    } else {
      return callback(message)
    }
  }
}

/**
 * 时间段验证
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const isDateArray = function (rule, value, callback) {
  let message = this.message
  if (lodash.isArray(value) && value.length != 0) {
    value.map(function (item) {
      if (item) {
        //  passed
      } else {
        return callback(message);
      }
    });
    return callback()
  } else {
    return callback(message)
  }
}

export const couponSelectCheck = function (rule, value, callback) {
  lodash.forEach(value, v => {
    let oneTimeSend = lodash.toNumber(v.oneTimeSend),
      stock = lodash.toNumber(v.stock)
    if (!Number.isInteger(oneTimeSend) || oneTimeSend <= 0) {
      return callback('每次发放张数须输入大于0的正整数')
    }
    if (!Number.isInteger(stock) || stock <= 0) {
      return callback('上限张数须输入大于0的正整数')
    }
    if (oneTimeSend > stock) {
      return callback('每次发放张数不能超过上限张数')
    }
    if (stock > 9999999) {
      return callback('上限张数不能超过9999999')
    }
  })
  if (value && value.length > 0) {
    if (value.length > 5) {
      return callback('最多添加五种优惠券')
    } else {
      return callback()
    }
  } else {
    return callback('至少选择一种优惠券')
  }
}

//生日赠券适用（不含上限，发放张数有限制  最多9张）
export const couponSelectCheckWithBirth = function (rule, value, callback) {
  lodash.forEach(value, v => {
    let oneTimeSend = lodash.toNumber(v.oneTimeSend);
    if (!Number.isInteger(oneTimeSend) || oneTimeSend <= 0 || oneTimeSend >= 10) {
      return callback('每次发放张数须输入大于0且小于10的正整数')
    }
  });
  if (value && value.length > 0) {
    if (value.length > 5) {
      return callback('最多添加五种优惠券')
    } else {
      return callback()
    }
  } else {
    return callback('至少选择一种优惠券')
  }
}

export const couponCheckWithoutStock = function (rule, value, callback) {
  lodash.forEach(value, v => {
    let oneTimeSend = lodash.toNumber(v.oneTimeSend)
    if (!Number.isInteger(oneTimeSend) || oneTimeSend <= 0) {
      return callback('每次发放张数须输入大于0的正整数')
    }
  })
  if (value && value.length > 0) {
    if (value.length > 5) {
      return callback('最多添加五种优惠券')
    } else {
      return callback()
    }
  } else {
    return callback('至少选择一种优惠券')
  }
}

//消费返券适用（不含上限，发放张数有限制  最多999张 ，优惠券种类最多3种）
export const couponSelectCheckWithConsume = function (rule, value, callback) {
  lodash.forEach(value, v => {
    let oneTimeSend = lodash.toNumber(v.oneTimeSend);
    if (!Number.isInteger(oneTimeSend) || oneTimeSend <= 0 || oneTimeSend > 999) {
      return callback('每次发放张数须输入大于0且小于1000的正整数')
    }
  });
  if (value && value.length > 0) {
    if (value.length > 3) {
      return callback('最多添加三种优惠券')
    } else {
      return callback()
    }
  } else {
    return callback('至少选择一种优惠券')
  }
}

/**
 * 验证服务员编号
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export const validateEmployeeNumber = function (rule, value, callback) {
  let reg = /^[1-9]\d{0,2}$/;
  if (value != '' && !reg.test(value)) {
    return callback(new Error('服务员编号错误,请输入1-999的数字'));
  } else {
    return callback();
  }
}

/**
 * 验证手机号码
 */
export const validateMobilePhone = function (rule, value, callback) {
  var reg = /^1[0-9]{10}$/;
  if (!reg.test(value)) {
    return callback(new Error('请正确输入手机号码'));
  } else {
    return callback();
  }
};
/**
 * 验证固定电话号码
 */
export const validatePhone = function (rule, value, callback) {
  var reg = /^[0-9]{11,12}$/;
  if (!reg.test(value)) {
    return callback(new Error('请正确输入电话号码'));
  } else {
    return callback();
  }
};
/**
 * 验证电话号码(固话和手机)
 */
export const validateMixPhone = function (rule, value, callback) {
  var reg = /^[0-9]{8,12}$/;
  if (!reg.test(value)) {
    return callback(new Error('请正确输入电话号码'));
  } else {
    return callback();
  }
};
