import core from '@/libs/ajax'
export default {
  data() {
    return {
      submiting: false,
      formDataLoading: false,
      sendData: {}
    }
  },
  methods: {
    submitForm(
      data,url
      ){
      let self = this;
      self.submiting = true;
      core.post(url, data).done(function (res) {
        self.table = res;
        self.submiting = false;
        }).fail(function (code, msg) {
          self.submiting = false;
          self.$message.error(msg);
        });
    },
    resetForm(name, custom) {
      this.$refs[name].resetFields()
      if (custom && typeof custom == 'function') {
        custom.bind(this)()
      }
    }
  }
}
