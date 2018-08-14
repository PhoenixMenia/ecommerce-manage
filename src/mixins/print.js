import core from "@/libs/ajax";
export default {
  computed: {
    currentUser() {
      return this.$store.getters.CURRENT_USER;
    }
  },
  methods:{
    sendToPrint(data,hasMsg){
      core
        .postPrint("/api/printClient/sendTicketPrintRequest", {
          message: JSON.stringify(data),
          merchantAccount:this.currentUser.merchantAccount,
          vendorTbId: null
        })
        .done(data => {
          // .log(JSON.parse(data.transactionDetail));
          if(hasMsg){
            this.$message.success("打印请求已发送!");
          }
        })
        .fail((code, msg) => {
          this.$message.error(msg);
        });
    }
  }
}
