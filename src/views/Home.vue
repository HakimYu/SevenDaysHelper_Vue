<template>
  <v-container>
    <AppBar title="七天网络助手"></AppBar>
    <v-row style="margin-top: 20px" class="d-flex justify-center align-center">
      <v-skeleton-loader
        class="align-center"
        width="600px"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </v-row>
    <v-row v-show="logined">
      <ExamList></ExamList>
    </v-row>
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
import ExamList from "../components/ExamList.vue";
export default {
  name: "Home",
  components: {
    AppBar,
    SMessage,
    ExamList,
  },
  data: () => ({
    logined: false,
    message: null,
    timeout: 2000,
    snackbar: false,
  }),
  methods: {
    sMessage(msg, hasB, time) {
      this.timeout = time || null;
      this.$refs.sMsg.sMessage(msg, hasB);
    },
  },
  mounted() {
    if (!this.$cookies.isKey("token")) {
      this.$router.push("/login");
    }
  },
};
</script>
