<template>
  <v-container>
    <AppBar :backBtn="true" title="七天网络助手"></AppBar>
    <v-row class="d-flex justify-center">
      <v-col class="col-md-8">
      <v-card class="rounded-lg pb-1">
        <v-card-title>{{
            "你好，" + this.userInfo.studentName + ":"
          }}
        </v-card-title>
        <v-divider></v-divider>
        <div class="rounded-pill mx-2 px-2" v-ripple v-for="(item, index) in examOverview" :key="index">
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
    userInfo: {},
    examData: {},
    examOverview: [],
  }),
  props: {
    logined: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setLoginedState(state) {
      this.$emit("update:logined", state);
    },
    getUserInfo() {
      if (this.$cookies.isKey("token")) {
        //has token
        try {
          axios({
            method: "GET",
            url: this.getUrl("my", "/userInfo/GetUserInfo"),
            headers: {
              token: this.$cookies.get("token"),
              Version: "3.1.4",
            },
          }).then((response) => {
            if (response.data.status === 200) {
              this.$cookies.set(
                  "userInfo",
                  Base64.encode(JSON.stringify(response.data.data)),
                  "1m"
              );
              this.userInfo = response.data.data;
              this.setLoginedState(true);
            } else {
              this.$emit("sMessage", response.data.message);
              this.$router.push("/login");
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        //no token(need login)
        this.$router.push("/login");
      }
    },
    getExams() {
      let userInfo = JSON.parse(Base64.decode(this.$cookies.get("userInfo")));
      let token = this.$cookies.get("token");
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
            token: token,
            Version: "3.1.4",
          },
        }).then((response) => {
          this.examData = response.data.data;
          this.getExamOverview();
        });
      } catch (error) {
        console.log(error);
      }
    },
    getExamOverview() {
      for (let i = 0; i < this.examData.list.length; i++) {
        this.examOverview.push({
          title: i + 1 + ". " + this.examData.list[i]["examName"],
          subtitle: this.examData.list[i]["time"],
          fullScore: this.examData.list[i]["score"]
        });
      }
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
  mounted() {
    if (!this.$cookies.isKey("token")) {
      this.$router.push("/login");
    }
    this.getUserInfo();
    this.getExams();
  },
};
</script>