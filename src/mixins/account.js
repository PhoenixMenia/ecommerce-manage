import {
  mapActions
} from 'vuex';
import core from '@/libs/ajax';
import CONFIG from '@/config/index'
export default {
  methods: {
    ...mapActions([
      'setCurrentUser',
      'setCurrentMenu'
    ]),
    loginOut() {
      let self = this;
      let loadingInstance = self.$loading({
        text: '正在退出登录...'
      });
      core.get('/login/logout').done(res => {
        this.setCurrentUser({});
        this.setCurrentMenu([]);
        window.setTimeout(function () {
          loadingInstance.close();
          window.location.href = CONFIG['authFailPage'];
        }, 2000);
      }).fail(function (code, msg) {
        loadingInstance.close();
        self.$message.error(msg);
      });
    },
  }
}
