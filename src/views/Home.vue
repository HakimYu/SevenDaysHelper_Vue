<template>
  <v-container>
    <AppBar title="七天网络助手"></AppBar>
    <ExamList v-show="logined" :logined.sync="logined"></ExamList>
<!--    <v-skeleton-loader-->
<!--        v-if="!logined"-->
<!--        class="align-center"-->
<!--        width="600px"-->
<!--        type="list-item-two-line"-->
<!--    ></v-skeleton-loader>-->
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
    logined: false,
    message: null,
    snackbar: false,
  }),
  methods: {},
};
</script>
