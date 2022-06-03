<template>
  <v-container>
    <v-img src="answerCardUrl"></v-img>
    <v-data-table></v-data-table>
  </v-container>
</template>
<!--<script>-->
<!--import axios from "axios";-->
<!--import { Tools } from "@/plugins/tools";-->
<!--import qs from "qs";-->
<!--export default {-->
<!--  name: "ExamDetail",-->
<!--  data: () => ({-->
<!--    answerCardUrl: "",-->
<!--    subject: undefined,-->
<!--    examProblemDetail: {},-->
<!--    subjectInfo: {},-->
<!--  }),-->
<!--  methods: {-->
<!--    getAnswerCardUrl() {-->
<!--      if (this.$cookies.isKey("token") == false) this.$router.push("/login");-->
<!--      let token = this.$cookies.get("token");-->
<!--      try {-->
<!--        axios({-->
<!--          method: "POST",-->
<!--          data: qs.stringify({-->
<!--            asiresponse: this.subjectInfo.asiresponse,-->
<!--            examGuid:-->
<!--          })-->
<!--        })-->
<!--      }catch (error){Tools.handleError(error)};-->

<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->