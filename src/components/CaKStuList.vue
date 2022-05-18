<template id="stu-list">
  <v-card width="600px">
  <v-card-title>{{"你好，" + this.userInfo.studentName + ":"}}</v-card-title>
    <v-divider></v-divider>
    <CaKStuListItem
      v-for="(item, index) in item_data"
      :_item_data="item"
      :key="index"
      :_index="index"
    ></CaKStuListItem>
  </v-card>
</template>
<script>
import CaKStuListItem from './CaKStuListItem.vue'
export default {
    name: "stu-list",
    props: ["item_data", "userInfo"],
    components: { CaKStuListItem },
}
</script>



