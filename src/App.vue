<template>
  <v-app>
    <v-main>
      <router-view @sMessage="sMessage"/>
      <SMessage
          ref="sMsg"
          :timeout="timeout"
          @cli="console.log('clickedsmessagebtn')"
      ></SMessage>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import SMessage from "@/components/SMessage.vue";

export default {
  name: 'App',
  components: {
    Footer,
    SMessage
  },
  data: () => ({
    timeout: null,
    snackbar: false,
  }),
  methods: {
    sMessage(msg, hasB, time) {
      this.timeout = time || null;
      this.$refs.sMsg.sMessage(msg, hasB);
    },
  },
};
</script>
