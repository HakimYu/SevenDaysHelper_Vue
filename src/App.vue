<template>
  <v-app>
    <v-main>
      <router-view />
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components:{
      Footer,
  },
  data: () => ({
  }),
};
</script>
