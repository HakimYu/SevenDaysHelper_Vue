<template>
  <v-container>
    <AppBar :back-btn="true" :home-btn="true" :title="$route.params.subject"></AppBar>
    <div v-viewer v-for="(item, index) in answerCardUrl" :key="index">
      <img
        :src="item"
        onclick=""
      >
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="THs"
      mobile-breakpoint="0"
      class="elevation-1 col-md-8"
    ></v-data-table>
  </v-container>
</template>
<script>
import axios from "axios";
import 'viewerjs/dist/viewer.css';
import {directive as viewer} from "v-viewer";
import {Tools} from "@/plugins/tools";
import qs from "qs";
import AppBar from "@/components/AppBar";
import {Base64} from "js-base64";

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

export default {
  name: "ExamDetail",
  directives: {
    viewer: viewer({debug: true}),
  },
  components: {AppBar},
  data: () => ({
    answerCardUrl: [],
    imgIndex: 0,
    subjectInfo: {},
    THs: [],
    tableHeaders: [
      {
        text: "题号",
        align: "left",
        sortable: false,
        value: "TH",
      },
      {
        text: "得分",
        align: "left",
        sortable: true,
        value: "Score",
      },
      {
        text: "满分",
        align: "left",
        sortable: true,
        value: "totalScore",
      },
      {
        text: "我的答案",
        align: "left",
        sortable: false,
        value: "Content",
      },
      {
        text: "标准答案",
        align: "left",
        sortable: false,
        value: "trueAnswer",
      },

    ]
  }),
  methods: {
    getAnswerCardUrl() {
      if (this.$cookies.isKey("token") === false) this.$router.push("/login");
      let token = this.$cookies.get("token");
      try {
        axios({
          method: "POST",
          data: qs.stringify(this.subjectInfo.answerCardInfo),
          headers: {
            "token": token,
            "Version": "3.1.4",
          },
          url: Tools.getUrl("score", "/Question/AnswerCardUrl"),
        }).then((response) => {
          if (response.data.status !== 200) Tools.handleError(response.data.message)
          else this.answerCardUrl = response.data.data;
        });
      }catch (error){Tools.handleError(error)}
    },

  },
  mounted() {
    this.subjectInfo = JSON.parse(Base64.decode(sessionStorage.getItem("subjectInfo")));
    if (
        this.subjectInfo.index !== this.$route.params.index
        ||
        this.subjectInfo.subject !== this.$route.params.subject
    ) this.$router.go(-1);
    this.getAnswerCardUrl();
    let THs = this.subjectInfo.THs;
    for (let i = 0; i < THs.length; ++i){
      if (THs[i].Content === "") THs[i].Content = "略";
      if (THs[i].trueAnswer === "") THs[i].trueAnswer = "略";
    }
    this.THs = THs;
  },
}
</script>