import {
  mapGetters
} from 'vuex'
import lodash from 'lodash'
import core from '@/libs/ajax'
import utils from '@/libs/utils'
import {
  validateNumber,
  validatePeriodOfValidity,
  isRequired
} from '@/libs/validators'

let formInit = {
  name: '',
  cost: '',
  costForLipinjuan: '',
  costType: 'fixed',
  limitPrice: '',
  usageCount: '',
  mixinUsable: 'yes',
  usageDays: '',
  periodOfValidity: {
    usageDuringType: 'absolute',
    usageDuring_LastDays: '',
    usageDuring_dateTime: ''
  },
  usageWeeks: ['1', '2', '3', '4', '5', '6', '7'],
  select_merchants: [],
  desc: ''
}

export default {
  props: ['coupontype'],
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  },
  data() {
    var _self = this
    return {
      loading: false,
      title: '',
      currentForm: '',
      coupon: null,
      type: '',
      visible: false,
      merchants: [],
      allEditable: 0,
      rules: {
        name: [{
          validator: isRequired.bind({
            message: '请输入券名称'
          }),
          trigger: 'blur'
        }, {
          max: 10,
          message: '最大字数为10字',
          trigger: 'blur'
        }],
        cost: [{
          validator: isRequired.bind({
            message: '请输入面值'
          }),
          trigger: 'blur'
        }, {
          validator: validateNumber.bind({
            min: 1,
            max: 99999,
            type: 'int'
          }),
          trigger: 'blur'
        }],
        costForLipinjuan: [{
          validator: isRequired.bind({
            message: '请输入面值'
          }),
          trigger: 'blur'
        }, {
          validator: validateNumber.bind({
            min: 0,
            max: 99999,
            type: 'int'
          }),
          trigger: 'blur'
        }],
        limitPrice: {
          validator: validateNumber.bind({
            min: 1,
            max: 99999,
            type: 'int'
          }),
          trigger: 'blur'
        },
        usageCount: {
          validator: validateNumber.bind({
            min: 1,
            max: 999,
            type: 'int'
          }),
          trigger: 'blur'
        },
        usageDays: [{
          validator: isRequired.bind({
            message: '请输入启用时间'
          }),
          trigger: 'blur'
        }, {
          validator: validateNumber.bind({
            min: 0,
            max: 999,
            type: 'int'
          }),
          trigger: 'blur'
        }],
        periodOfValidity: {
          validator: validatePeriodOfValidity,
          trigger: 'change'
        },
        usageWeeks: {
          validator: isRequired.bind({
            message: '请至少选择一个时间段'
          }),
          trigger: 'change'
        },
        select_merchants: {
          validator: isRequired.bind({
            message: '请至少选择一家门店'
          }),
          trigger: 'change'
        },
        desc: {
          max: 100,
          message: '最大字数为100字',
          trigger: 'blur'
        }
      },
      form: lodash.cloneDeep(formInit)
    }
  },
  watch: {
    'form.periodOfValidity.usageDuringType': function (val, oldVal) {
      if (val != oldVal) {
        this.checkPeriodOfValidity()
      }
    },
    'form.periodOfValidity.usageDuring_LastDays': function (val, oldVal) {
      if (val != oldVal) {
        this.checkPeriodOfValidity()
      }
    },
    'form.periodOfValidity.usageDuring_dateTime': function (val, oldVal) {
      if (lodash.every(val, v => {
          return !v
        })) {
        return
      }
      this.checkPeriodOfValidity()
    }
  },
  methods: {
    checkPeriodOfValidity() {
      this.$refs[this.currentForm] && this.$refs[this.currentForm].validateField('periodOfValidity')
    },
    getMerchants() {
      // console.log(this.CURRENT_USER)
      return core.get('/institution/findInstitutionList.htm', {
        parentAccount: this.CURRENT_USER.organizationAccount
      }).fail((code, msg) => {
        this.$message.error(msg);
      });
    },
    getSendData() {
      let self = this,
        merchants = this.merchants,
        form = this.form,
        _sendData = {
          couponName: form.name,
          couponType: this._props.coupontype,
          consumerLimit: lodash.isNull(form.limitPrice) ? '' : form.limitPrice,
          oneTimeConsumerLimit: lodash.isNull(form.usageCount) ? '' : form.usageCount,
          mixFlag: self.coupontype == 2?'':(form.mixinUsable == 'yes' ? 1 : 0), //1表示可以混用 0表示不可以混用
          effectiveDate: lodash.isNull(form.usageDays) ? '' : form.usageDays,
          relativeDate: form.periodOfValidity.usageDuringType == 'relative' ?
            (lodash.isNull(form.periodOfValidity.usageDuring_LastDays) ? '' : form.periodOfValidity.usageDuring_LastDays) : '',
          absoluteStartTime: form.periodOfValidity.usageDuringType == 'absolute' && form.periodOfValidity.usageDuring_dateTime[0] ?
            utils.formatDate.format(form.periodOfValidity.usageDuring_dateTime[0], 'yyyy-MM-dd') + ' 00:00:00' : '',
          absoluteEndTime: form.periodOfValidity.usageDuringType == 'absolute' && form.periodOfValidity.usageDuring_dateTime[1] ?
            utils.formatDate.format(form.periodOfValidity.usageDuring_dateTime[1], 'yyyy-MM-dd') + ' 00:00:00' : '',
          weeklyLimit: form.usageWeeks.join(','),
          couponNote: lodash.isNull(form.desc) ? '' : form.desc,
          customPriceFlag: self.coupontype == 2?'':(form.costType == 'fixed' ? 0 : 1), //0表示固定面值 1表示收银员自定义
          price: (function () {
            if (self.coupontype == 1) {
              if (form.costType == 'fixed') {
                return form.costForLipinjuan
              } else {
                return ''
              }
            } else if(self.coupontype == 2){
              return ''
            }else{
              return form.cost
            }
          }()),
          applyMerchant: lodash.map(form.select_merchants, id => {
            let merchant = lodash.find(merchants, m => {
              return id == m.institutionId
            })
            return '|' + merchant.account + '|' + merchant.name + '|'
          }).join(','),
        }
      return _sendData
    },
    save() {
      let aftersave = (res) => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$emit('save')
        this.close()
      }
      this.$refs[this.currentForm].validate(flag => {
        if (!flag) {
          return
        }
        if (this._data.coupon != null) {
          let sendData = this.getSendData()
          sendData.couponId = this._data.coupon.couponid
          core.post('/coupon/updateCouponInfo.htm', sendData).then(aftersave).fail((code, msg) => {
            this.$message.error(msg);
          });
        } else {
          core.post('/coupon/addCouponInfo.htm', this.getSendData()).then(aftersave).fail((code, msg) => {
            this.$message.error(msg);
          });
        }
      })
    },
    save_and_use() {
      this.$refs[this.currentForm].validate(flag => {
        if (!flag) {
          return
        }
        core.post('/coupon/addCouponInfo.htm', this.getSendData()).then(res => {
          let newCoupon = lodash.defaultsDeep({
            couponid: res,
          }, this.getSendData())
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          newCoupon.coupontype = newCoupon.couponType
          this.$emit('save-and-use', newCoupon)
          this.close()
        }).fail((code, msg) => {
          this.$message.error(msg);
        });
      })
    },
    resetFields(done) {
      this.close()
      done()
    },
    close() {
      this.visible = false
      this.$refs[this.currentForm].resetFields()
    },
    selectAllMerchants() {
      this.form.select_merchants = lodash.map(this.merchants, m => {
        return m.institutionId
      }) || []
    },
    resetSelectMerchants() {
      this.form.select_merchants = []
    }
  },
  created() {
    this.getMerchants().then(res => {
      this.merchants = res
    })
  },
  mounted() {
    let eventName
    // console.log(this._props.coupontype)
    if (this._props.coupontype == '0') {
      eventName = 'SHOW_CREATE_DAIJINJUAN'
      this.currentForm = 'form_daijinjuan'
    } else if (this._props.coupontype == '1') {
      eventName = 'SHOW_CREATE_LIPINJUAN'
      this.currentForm = 'form_lipinjuan'
    } else {
      eventName = 'SHOW_CREATE_ZENGPINJUAN'
      this.currentForm = 'form_zengpinjuan'
    }
    this.$on(eventName, (args) => {
      //重置表单
      if (eventName == 'SHOW_CREATE_DAIJINJUAN') {
        this.title = '代金券'
      } else if (eventName == 'SHOW_CREATE_LIPINJUAN') {
        this.title = '礼品券'
      } else {
        this.title = '赠品券'
      }
      this.coupon = null
      this.form = lodash.cloneDeep(formInit)
      this.allEditable = 0 //先将所有表单项定为可编辑状态
      this.visible = true
      this.loading = false
      this.$refs[this.currentForm] && this.$refs[this.currentForm].resetFields()
      //接收父组件参数
      this.type = args.type
      if (args.payload != null) {
        window.setTimeout(() => {
          let coupon = this.coupon = args.payload,
            form = this.form,
            merchants = this.merchants
          this.loading = true
          core.get('/coupon/findIsCouponInfo.htm', {
            couponId: coupon.couponid
          }).then(res => {
            this.allEditable = res
            this.loading = false
          }).fail((code, msg) => {
            this.$message.error(msg);
          });
          this.title = '编辑' + this.title
          this.form = {
            name: coupon.couponName,
            cost: coupon.price,
            costForLipinjuan: coupon.price,
            costType: coupon.customPriceFlag == 0 ? 'fixed' : 'poserInput',
            limitPrice: coupon.consumerLimit,
            usageCount: coupon.oneTimeConsumerLimit,
            mixinUsable: coupon.mixFlag == 1 ? 'yes' : 'no',
            usageDays: coupon.effectiveDate,
            periodOfValidity: {
              usageDuringType: coupon.absoluteStartTime ? 'absolute' : 'relative',
              usageDuring_LastDays: coupon.relativeDate,
              usageDuring_dateTime: coupon.absoluteStartTime ? [new Date(coupon.absoluteStartTime), new Date(coupon.absoluteEndTime)] : '',
            },
            usageWeeks: coupon.weeklyLimit.split(','),
            select_merchants: coupon.applyMerchant ? lodash.map(coupon.applyMerchant.split(','), m => {
              // console.log(m)
              let account = m.split('|')[1],
                match_merchant = lodash.find(merchants, merchant => {
                  return merchant.account == account
                })
              if (match_merchant) {
                return match_merchant.institutionId
              }
            }) : [],
            desc: coupon.couponNote
          }
          window.setTimeout(() => {
            this.checkPeriodOfValidity()
          })
        })
      } else {
        this.title = '创建' + this.title
      }
    })
  }
}
