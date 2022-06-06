<template>
<div style="height:100px">
  <v-footer absolute>
    <v-card
      flat
      tile
      width="100%"
      class="grey lighten-4 grey--text text--darken-1 text-center"
    >
      <v-card-text class="grey--text text--darken-1">
        Copyright ©{{ new Date().getFullYear() }}
        <a
            class="grey--text text--darken-1"
            style="text-decoration: none"
            href="https://github.com/HakimYu"
            target="_blank"
        >HakimYu
        </a>
        &
        <a
          class="grey--text text--darken-1"
          style="text-decoration: none"
          href="https://github.com/ButForget"
          target="_blank"
      >CaKEntity
        </a><br/>
        All Rights Reserved<br />
        <a
          class="grey--text text--darken-1"
          style="text-decoration: none"
          href="https://beian.miit.gov.cn/"
          rel="noopener"
          target="_blank"
          >赣ICP备2022001931号</a
        ></v-card-text
      >
    </v-card>
  </v-footer>
</div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({}),
};
</script>
