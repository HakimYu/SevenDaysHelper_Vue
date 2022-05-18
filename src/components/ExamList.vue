<template>
  <v-container>
    <AppBar :backBtn="true" title="七天网络助手"></AppBar>
    <v-row style="margin: 20px" class="d-flex justify-center">
      <v-card width="600px">
        <v-card-title>{{
          "你好，" + this.userInfo.studentName + ":"
        }}</v-card-title>
        <v-divider></v-divider>
        <div v-for="(item, index) in item_data" :key="index">
          <v-list-item style="margin: 20px" two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "./AppBar.vue";
import {Base64} from 'js-base64'
import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
export default {
  name: "ExamList",
  components: {
    AppBar,
  },
  data: () => ({
    needLogin: false,
    isExamPage: false,
    isScorePage: false,
    userInfo: {},
    listInfo: [],
    examInfo: [],
  }),
  methods: {
    getUserInfo() {
      if (this.$cookies.isKey("token")) {
        try {
          axios({
            method: "GET",
            url: this.getUrl("my", "/userInfo/GetUserInfo"),
            headers: {
              token: this.$cookies.get("token"),
              Version: "3.1.4",
            },
          }).then((response) => {
            if (response.data.status != "200") return false;
            else {
              this.$cookies.set(
                "userInfo",
                Base64.encode(response.data.data),
                "1m"
              );
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.router.push("/login");
      }
    },
    getExams() {
      let userInfo = Base64.decode(this.$cookies.get("userInfo"));
      try {
        axios({
          method: "GET",
          url: this.getUrl("score", "/exam/getClaimExams"),
          params: {
            startIndex: 0,
            studentName: userInfo.studentName,
            schoolGuid: userInfo.schoolGuid,
            grade: userInfo.grade,
          },
          headers: {
            token: userInfo.token,
            Version: "3.1.4",
          },
        }).then((response) => {
          this.examInfo = response.data.data.list;
        });
      } catch (error) {
        console.log(error);
      }
    },
    formatExamInfo() {
      let listInfo = [];
      let examInfo = this.examInfo;
      let length = examInfo.length;
      for (let i = 0; i < length; ++i) {
        listInfo.push({
          title: i + "" + examInfo[i]["examName"],
          subtitle: examInfo[i]["time"] + "   " + examInfo[i]["score"],
        });
      }
      return listInfo;
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
  created: async () => {
    this.getUserInfo();
  },
};
</script>