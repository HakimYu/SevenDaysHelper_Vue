<template>
<div>
  <v-list-item 
    style="margin: 20px" 
    two-line 
  >
    <v-list-item-content>
      <v-list-item-title>
        {{ _item_data.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ _item_data.subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    
  </v-list-item>
  <v-divider></v-divider>
</div>
</template>
<script>
export default {
    props: ["_item_data", "_index"],
}
</script>