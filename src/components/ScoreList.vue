<template>
  <v-container>
    <app-bar></app-bar>
    <v-btn @click="$router.push('/')">back</v-btn>
    <v-row v-for="(item) in examScore" :key="item.title">
      <div >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.km }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.cs }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.us }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <div>{{ item.myScore }}</div>
        </v-list-item>
      </div>
    </v-row>
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
  }),
  methods: {
    getScore() {
      let token = this.$cookies.get("token");
      let examInfo = JSON.parse(Base64.decode(this.$cookies.get("examInfo")))[this.$route.params.index];
      let userInfo = JSON.parse(Base64.decode(this.$cookies.get("userInfo")));
      console.log(userInfo);
      axios({
        method: "POST",
        url: this.getUrl("score", "/Question/Subjects"),
        headers: {
          "token": token,
          "Version": "3.1.4",
        },
        data:  qs.stringify({
          "examGuid": examInfo.examGuid,
          "studentCode": examInfo.studentCode,
          "schoolGuid": userInfo.schoolGuid,
          "grade": userInfo.grade,
          "ruCode": examInfo.ruCode,
        }),
      }).then((response) => {
        if(response.data.status === 200) {
          let tmpScore = response.data.data.subjects;
          for (let i = 0; i < tmpScore.length; ++i) {
            this.examScore.push({
              km: tmpScore[i].km,
              cs: tmpScore[i].cs,
              us: tmpScore[i].us,
              myScore: tmpScore[i].myScore,
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