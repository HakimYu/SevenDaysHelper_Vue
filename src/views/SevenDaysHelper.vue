<template>
  <v-container>
    <AppBar title="七天网络助手"></AppBar>
    <LoginDialog
      :needLogin="needLogin"
      @close="needLogin = false"
    ></LoginDialog>
    <SMessage
      :message="message"
      :hasBtn="hasBtn"
      :snackbar="sBar"
      :timeout="timeout"
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
    needLogin: true,
    message: null,
    hasBtn: false,
    timeout: null,
    sBar: false,
  }),
  methods: {
    sMessage(msg, hasB, time) {
      this.timeout = time || null;
      this.hasBtn = hasB || false;
      this.message = msg;
      this.sBar = true;
    },
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      // this.needLogin = true;
    }
  },
};
</script>

<style></style>
