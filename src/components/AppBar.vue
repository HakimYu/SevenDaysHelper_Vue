<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-app-bar-nav-icon v-if="backBtn" @click="$router.push({ name: 'Home' })">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <div class="d-flex align-center">
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </div>
    <v-btn @click="reLogin">reLogin</v-btn>
<!--    <v-spacer></v-spacer>-->
<!--    <v-btn text icon>-->
<!--      <v-icon>mdi-dots-vertical</v-icon>-->
<!--    </v-btn>-->
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({}),
  props: ["title", "backBtn"],
  methods: {
    reLogin() {
      this.$cookies.remove("token");
      this.$cookies.remove("userInfo");
      this.$cookies.remove("examInfo");
      this.$router.push("/login");
    }
  }
};
</script>
