import lodash from 'lodash'
import core from '@/libs/ajax'
export default {
  data() {
    return {
      levelInfos: []
    }
  },
  computed: {
    isTopLevelRank() {
      return lodash.every(this.levelinfos, l => {
        if (l.levelStatus == 1) {
          if (this.consumerInfo.levelRank >= l.levelRank) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })
    }
  },
  methods: {
    showUpdateRank(type) {
      let item = {
        type: type,
        levelRank: this.consumerInfo.levelRank,
        rankData: this.levelinfos
      }
      this.$root.broadcast('UpdateRank', 'SHOW_UPDATE_RANK_POPUP', item)
    },
    saveRankUpdate(operateType, levelId, fn) {
      core.post('/vipCustomer/updateCustomerLevelInfo.htm', {
        vipId: this.consumerInfo.vipId,
        levelId,
        operateType
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$root.broadcast('UpdateRank', 'HIDE_UPDATE_RANK_POPUP');
        if(typeof fn == 'function') {
          fn();
        }
      }).fail((code, msg) => {
        this.$message.error(msg);
      });
    }
  },
  created() {
    core.get('/customerLevelInfo/selectCustomerLevelInfo.htm').then(res => {
      this.levelinfos = res
    }).fail((code, msg) => {
      this.$message.error(msg);
    });
  }
}
