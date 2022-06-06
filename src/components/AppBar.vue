<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-app-bar-nav-icon v-if="backBtn" @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-nav-icon
      v-if="homeBtn"
      @click="$router.push({name: 'Home'})"
    >
      <v-icon>mdi-home</v-icon>
    </v-app-bar-nav-icon>
    <div class="d-flex align-center">
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </div>
    <v-spacer></v-spacer>
    <v-menu
        bottom
        left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-btn text icon v-bind="attrs" @="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          @click="item.action"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    menuItems: [
      {
        title: "退出登录",
        icon: "mdi-logout",
        action: ()=>{this.logout()},
      },
    ],
  }),
  props: ["title", "backBtn", "homeBtn"],
  methods: {
    //logout
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("userInfo");
      this.$cookies.remove("examInfo");
      this.$router.push("/login");
    }
  }
};
</script>
