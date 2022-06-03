<template>
  <v-container>
    <AppBar ref="AppBar" title="七天网络助手"></AppBar>
    <ExamList
      @loaded="loaded = true"
      @loading="loaded = false"
      v-show="loaded"
      @invalidToken="$refs.AppBar.logout()"
    ></ExamList>
    <v-skeleton-loader
      v-show="!loaded"
      class="align-center"
      width="600px"
      type="list-item-two-line"
    ></v-skeleton-loader>
  </v-container>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ExamList from "@/components/ExamList.vue";

export default {
  name: "Home",
  components: {
    AppBar,
    ExamList,
  },
  data: () => ({
    loaded: false,
    logined: false,
    message: null,
    snackbar: false,
  }),
  methods: {},
  created() {
    if (this.$cookies.isKey("token") == false) this.$router.push("/login");
  }
};
</script>
