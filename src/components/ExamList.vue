<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col class="col-md-8">
      <v-card class="rounded-lg pb-1">
        <v-btn icon @click="refresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-card-title>{{
            "你好，" + this.userInfo.studentName + ":"
          }}
        </v-card-title>
        <v-divider></v-divider>
        <div class="rounded-pill mx-2 px-2" v-ripple @click="goToExamPage(index)" v-for="(item, index) in examOverview"
             :key="index">
          <v-list-item two-line class="my-3">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <div class="d-flex float-right justify-center text-h5">{{ item.fullScore }}</div>
          </v-list-item>
        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Base64} from 'js-base64'
import axios from "axios";
import {Tools} from "@/plugins/tools";

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
export default {
  name: "ExamList",
  data: () => ({
    userInfo: {},
    examData: {},
    examOverview: [],
    // unClaimCount: 0,
    rows: 114514,
    startIndex: 0,
  }),
  props: {},
  methods: {
    goToExamPage(index) {
      this.$router.push({
        name: "Exam",
        params: {
          index: index,
        },
      });
    },
    getUserInfo(callback) {
      if (!this.$cookies.isKey("token")) this.$router.push("/login");
      try {
        axios({
          method: "GET",
          url: Tools.getUrl("my", "/userInfo/GetUserInfo"),
          headers: {
            token: this.$cookies.get("token"),
            Version: "3.1.4",
          },
        }).then((response) => {
          if (response.data.status === 200) {
            sessionStorage.setItem(
                "userInfo",
                Base64.encode(JSON.stringify(response.data.data)),
            );
            this.userInfo = response.data.data;

            callback();
          } else {
            this.$emit("sMessage", response.data.message);
            this.$emit("invalidToken");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    getExams() {
      let userInfo = this.userInfo;
      let token = this.$cookies.get("token");
      try {
        axios({
          method: "GET",
          url: Tools.getUrl("score", "/exam/getClaimExams"),
          params: {
            startIndex: this.startIndex,
            studentName: userInfo.studentName,
            schoolGuid: userInfo.schoolGuid,
            grade: userInfo.grade,
            rows: this.rows,
          },
          headers: {
            token: token,
            Version: "3.1.4",
          },
        }).then((response) => {
          if (response.data.status === 200) {
            this.examData = response.data.data.list;
            sessionStorage.setItem(
                "examData",
                Base64.encode(JSON.stringify(this.examData)),
            );
            this.getExamOverview();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    getExamOverview() {
      let tmpExamOverView = [];
      for (let i = 0; i < this.examData.length; i++) {
        tmpExamOverView.push({
          title: i + 1 + ". " + this.examData[i]["examName"],
          subtitle: this.examData[i]["time"],
          fullScore: this.examData[i]["score"]
        });
      }
      this.examOverview = tmpExamOverView;
      this.$emit("loaded");

    },
    refresh() {
      this.$emit("loading");
      this.getUserInfo(this.getExams);
    },
    // getUnClaimExamCount() {
    //   let token = this.$cookies.get("token");
    //   let userInfo = JSON.parse(Base64.decode(this.$cookies.get("userInfo")));
    //   axios({
    //     method: "GET",
    //     url: this.getUrl("score", "/exam/getExamCount"),
    //     headers: {
    //       Version: "3.1.4",
    //       token: token,
    //     },
    //     params: {
    //       studentName: userInfo.studentName,
    //       schoolGuid: userInfo.schoolGuid,
    //     },
    //   }).then((response) => {
    //     if (response.data.status !== 200){
    //       Tools.handleError(response.data.message);
    //     }else if (response.data.data.unClaimCount > 0) {
    //       let unClaimCount = response.data.data.unClaimCount;
    //       this.unClaimCount = unClaimCount;
    //       this.getUnClaimExams(userInfo, token);
    //     }
    //
    //   })
    // },
    // getUnClaimExams(userInfo, token) {
    //   axios({
    //     method: "GET",
    //     url: Tools.getUrl("score", "/exam/getUnClaimExams"),
    //     params: {
    //       studentName: userInfo.studentName,
    //       schoolGuid: userInfo.schoolGuid,
    //     },
    //     headers: {
    //       Version: "3.1.4",
    //       token: token,
    //     }
    //   }).then((response) => {
    //     if (response.data.status != 200){
    //       Tools.handleError(response.data.message);
    //     } else{
    //       let unClaimExams = response.data.data;
    //       let unClaimExamsList = [];
    //       for(let i = 0; i < unClaimExams.length; ++i) {
    //         unClaimExamsList.push({
    //           examGuid: unClaimExams[i].examGuid,
    //
    //         })
    //       }
    //     }
    //   })
    // },
  },
  created() {
    if (!this.$cookies.isKey("token")) {
      this.$router.push("/login");
    }

    if (
      sessionStorage.getItem("userInfo") != null
      &&
        sessionStorage.getItem("examData") != null
    ) {
      this.userInfo = JSON.parse(Base64.decode(sessionStorage.getItem("userInfo")));
      this.examData = JSON.parse(Base64.decode(sessionStorage.getItem("examData")));
      this.getExamOverview();
      this.$emit("loaded");
    } else{this.refresh();}
  },
};
</script>