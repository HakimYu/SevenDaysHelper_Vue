<template>
  <v-container>
    <AppBar ref="AppBar" title="七天网络助手"></AppBar>
    <ExamList
      @loaded="loaded = true"
      @loading="loaded = false"
      v-show="loaded"
      @invalidToken="$refs.AppBar.logout()"
    ></ExamList>
    <v-card
        v-show="!loaded"
        class="rounded-lg pb-1 mx-3 mt-3">
      <v-skeleton-loader
          class="align-center"
          width="94%"
          type="list-item"
      ></v-skeleton-loader>
      <v-skeleton-loader
          v-for="i in 4"
          :key="i"
          class="align-center"
          width="94%"
          type="list-item-two-line"
      ></v-skeleton-loader>
    </v-card>


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
    if (this.$cookies.isKey("token") === false) this.$router.push("/login");
  }
};
</script>
