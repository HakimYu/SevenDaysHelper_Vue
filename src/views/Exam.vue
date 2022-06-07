<template>
  <v-container>
    <div>
      <v-text-field v-model="superStudentCode"></v-text-field>
      <v-btn @click="superExam"></v-btn>
    </div>

    <AppBar :title="examName" :homeBtn="true" :back-btn="true"></AppBar>
    <v-col class="d-flex justify-center">
        <v-data-table
          :headers="this.tableHeaders"
          :items="this.examScore"
          mobile-breakpoint="0"
          hide-default-footer
          class="elevation-1 col-md-8"
          @click:row="goToDetail">
        </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import AppBar from "@/components/AppBar";
import {Base64} from "js-base64";
import qs from "qs"
import {Tools} from "@/plugins/tools";
import {TYPE} from "vue-toastification";

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
export default {
  name: "ScoreList",
  components: {
    AppBar,
  },
  data: () => ({
    examScore: [],
    superStudentCode: undefined,
    examInfo: {},
    examName: "",
    scoreStatus: 1,
    subjects: [],
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
    superExam() {
      this.$toast("实验性功能, 任何bug, 都是正常的.", {type: TYPE.WARNING});
      this.examInfo.studentCode = this.superStudentCode;
      this.examScore = [];
      this.getScore();
    },
    goToDetail(rowInfo, tableInfo) {
      if (tableInfo.index === 0) return;
      let examInfo = this.examInfo;
      let userInfo = JSON.parse(Base64.decode(sessionStorage.getItem("userInfo")));
      let subjects = this.subjects[tableInfo.index];
      let subjectName = rowInfo.subjectName;
      let subjectIndex = tableInfo.index;
      sessionStorage.setItem("subjectInfo",
        Base64.encode(JSON.stringify({
          index: Number(this.$route.params.index),
          subject: String(subjectName),
          "subjectIndex": subjectIndex,
          "THs": subjects.question.THs,
          "answerCardInfo": {
          "asiresponse": subjects.question.asiresponse,
          "studentName": userInfo.studentName,
          "scoreStatus": this.scoreStatus,
          "examType": examInfo.examType,
          "examGuid": examInfo.examGuid,
          "schoolGuid": userInfo.schoolGuid,
          "ruCode": examInfo.ruCode,
          }
        }))
      );
      this.$router.push({
        name: "ExamDetail",
        params: {
          index: Number(this.$route.params.index),
          subject: String(subjectName),
        }
      });
    },
    getScore() {
      let token = this.$cookies.get("token");
      let examInfo = this.examInfo;
      this.examName = examInfo.examName;

      let userInfo = JSON.parse(Base64.decode(sessionStorage.getItem("userInfo")));
      axios({
        method: "POST",
        url: Tools.getUrl("score", "/Question/Subjects"),
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
        if (response.data.status !== 200) Tools.handleError(response.data.message)
        else {
          let subjects = response.data.data.subjects;
          this.scoreStatus = response.data.data.scoreStatus;
          this.subjects = subjects;
          for (let i = 0; i < subjects.length; ++i) {
            this.examScore.push({
              subjectName: subjects[i].km,
              classRanking: subjects[i].cs,
              schoolRanking: subjects[i].us,
              myScore: subjects[i].myScore,
            });
          }
        }
      })
    },

  },
  created() {
    this.examInfo = JSON.parse(Base64.decode(sessionStorage.getItem("examData")))[this.$route.params.index];
    this.getScore();
  }
}

</script>