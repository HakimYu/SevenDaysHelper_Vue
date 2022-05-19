<template>
  <v-container>
    <AppBar :title="examName" :back-btn="true"></AppBar>
    <v-col class="d-flex justify-center">
        <v-data-table
          :headers="this.tableHeaders"
          :items="this.examScore"
          hide-default-footer
          class="elevation-1 col-md-8">
        </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import AppBar from "@/components/AppBar";
import {Base64} from "js-base64";
import qs from "qs"

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
export default {
  name: "ScoreList",
  components: {
    AppBar,
  },
  data: () => ({
    examScore: [],
    examName: "",
    tableHeaders: [
      {
        text: "科目",
        align: "left",
        sortable: true,
        value: "subjectName",
      },
      {
        text: "班级排名",
        align: "left",
        sortable: true,
        value: "classRanking",
      },
      {
        text: "学校排名",
        align: "left",
        sortable: true,
        value: "schoolRanking",
      },
      {
        text: "成绩",
        align: "left",
        sortable: true,
        value: "myScore",
      },
    ],
  }),
  methods: {
    getScore() {
      let token = this.$cookies.get("token");
      let examInfo = JSON.parse(Base64.decode(this.$cookies.get("examInfo")))[this.$route.params.index];
      this.examName = examInfo.examName;
      let userInfo = JSON.parse(Base64.decode(this.$cookies.get("userInfo")));
      axios({
        method: "POST",
        url: this.getUrl("score", "/Question/Subjects"),
        headers: {
          "token": token,
          "Version": "3.1.4",
        },
        data: qs.stringify({
          "examGuid": examInfo.examGuid,
          "studentCode": examInfo.studentCode,
          "schoolGuid": userInfo.schoolGuid,
          "grade": userInfo.grade,
          "ruCode": examInfo.ruCode,
        }),
      }).then((response) => {
        if (response.data.status === 200) {
          let subjects = response.data.data.subjects;
          for (let i = 0; i < subjects.length; ++i) {
            this.examScore.push({
              subjectName: subjects[i].km,
              classRanking: subjects[i].cs,
              schoolRanking: subjects[i].us,
              myScore: subjects[i].myScore,
            })
          }
        }
      })
    },
    getUrl(host, path) {
      switch (host) {
        case "my":
          return "https://szone-my.7net.cc" + path;
        case "score":
          return "https://szone-score.7net.cc" + path;
        default:
          break;
      }
    },
  },
  created() {
    this.getScore();
  }
}

</script>