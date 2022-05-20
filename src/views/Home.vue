<template>
  <v-container>
    <AppBar ref="AppBar" title="七天网络助手"></AppBar>
    <ExamList
      @loaded="loaded = true"
      @invalidToken="$refs.AppBar.logout()"
      v-show="logined"
      :logined.sync="logined"
    ></ExamList>
    <v-skeleton-loader
      v-if="!loaded"
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
};
</script>
