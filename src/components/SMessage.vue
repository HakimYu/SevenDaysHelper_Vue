<template>
   <v-snackbar
      v-model="snackbar"
    >
      {{ message }}

      <template v-if="hasBtn" v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="$emit('click')"
        >
          确定
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
name: "SMessage",
props:["message","hasBtn","time","snackbar"],
}
</script>

<style>

</style>