<template>
  <v-snackbar v-model="snackbar">
    {{ message }}
    <template v-if="hasBtn" v-slot:action="{ attrs }">
      <v-btn color="secondary" text v-bind="attrs" @click="$emit('cli')">
        确定
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SMessage",
  data: () => ({
    hasBtn: false,
    message: "",
    snackbar: false,
  }),
  methods: {
    sMessage(msg, hasB) {
      this.hasBtn = hasB || false;
      this.message = msg;
      this.snackbar = true;
    },
  },
};
</script>