<template>
  <v-container>
    <AppBar title="七天网络助手"></AppBar>
    <LoginDialog :needLogin="needLogin" @sMessage="sMessage"></LoginDialog>
    <SMessage
      ref="sMsg"
      :timeout="timeout"
      @cli="console.log('clickedsmessagebtn')"
    ></SMessage>
  </v-container>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import SMessage from "../components/SMessage.vue";
import LoginDialog from "../components/LoginDialog.vue";
export default {
  name: "SevenDaysHelper",
  components: {
    AppBar,
    LoginDialog,
    SMessage,
  },
  data: () => ({
    needLogin: false,
    message: null,
    hasBtn: false,
    timeout: null,
    snackbar: false,
  }),
  methods: {
    sMessage(msg, hasB, time) {
      this.timeout = time || null;
      this.$refs.sMsg.sMessage(msg,hasB);
    },
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      this.needLogin = true;
    }
  },
};
</script>

<style></style>
