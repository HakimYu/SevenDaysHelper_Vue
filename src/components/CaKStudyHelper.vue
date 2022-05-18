<template>
  <v-container>
    <AppBar :backBtn="true" title="CaK七天助手"></AppBar>
    <v-row v-if="this.is_need_login" class="d-flex justify-center">
      <CaKStuLoginCard style="margin: 50px;" @login-ok="login"
      ></CaKStuLoginCard>
    </v-row>
    <v-row 
      style="margin: 20px"
      v-else
      class="d-flex justify-center"
    >
      <CaKStuList
      :item_data="this.listInfo"
      :userInfo="this.userInfo"
      ></CaKStuList>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import CaKStuLoginCard from "../components/CaKStuLoginCard.vue";
import { Base64 } from "js-base64"
import axios from "axios";
import QueryString from "qs";
import CaKStuList from "../components/CaKStuList.vue";

export default {
  name: "StuHelper",
  components:  {
    AppBar,
    CaKStuLoginCard,
    CaKStuList
  },
  data: () => ({
    is_need_login: false,
    is_exam_page:  false,
    is_score_page: false,
    userInfo: {},
    listInfo: [],
    examInfo: [],
  }),
  methods: {
    login(_userInfo){
      let userCode = _userInfo["userCode"];
      let password = Base64.encode(_userInfo["password"]);
      axios({
        url: "https://szone-my.7net.cc/login",
        method: "POST",
        data: QueryString.stringify({
          "userCode": userCode,
          "password": password
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        let token =  response.data.data.token;
        this.$cookies.set("cak_stu_token", token, "1m");
      });
      this.get_user_info();
    },
    async get_user_info(){
      if(this.$cookies.isKey("cak_stu_token") == true)
      {
        try{
          await axios({
            method: "GET",
            url: "https://szone-my.7net.cc/userInfo/GetUserInfo",
            headers:{
              "token": this.$cookies.get("cak_stu_token"),
              "Accept-Charset": "UTF-8",
              "X-CodePush-Plugin-Name": "cordova-plugin-code-push",
              "Version": "3.1.4",
              "X-CodePush-SDK-Version": "3.0.1",
              "X-CodePush-Plugin-Version": "1.13.1",
            }
          }).then((response) => {
            if(response.data.status != "200")
              return false;
            else {
              let _userInfo = response.data.data;
              this.userInfo = {
                ruCode: _userInfo.ruCode,
                schoolGuid: _userInfo.schoolGuid,
                studentName: _userInfo.studentName,
                grade: _userInfo.period,
                token: this.$cookies.get("cak_stu_token"),
              };
              return true;
            }
            
          });
        }catch(error){console.log(error);} 
      }else{return false;}
    },
    async fetch_exam_info(){
      try{
        await axios({
          method: "GET",
          url: "https://szone-score.7net.cc/exam/getClaimExams",
          params: {
            startIndex: 0,
            studentName: "CaK",
            schoolGuid: this.userInfo.schoolGuid,
            grade: this.userInfo.grade,
          },
          headers: {
            "token": this.userInfo.token,
            "Accept-Charset": "UTF-8",
            "X-CodePush-Plugin-Name": "cordova-plugin-code-push",
            "Version": "3.1.4",
            "X-CodePush-SDK-Version": "3.0.1",
            "X-CodePush-Plugin-Version": "1.13.1",
          },
        }).then((response) => {
          this.examInfo = response.data.data.list;

        });
      }catch(error){console.log(error);} 
    },
    format_exam_info(){
      let listInfo = [];
      let examInfo = this.examInfo;
      let length = examInfo.length;
      for(let i = 0; i < length; ++i)
      {
        listInfo.push({
          "title": i + "" + examInfo[i]["examName"],
          "subtitle": examInfo[i]["time"] + "   " + examInfo[i]["score"],
        })
      }
      return listInfo;
    },
    configure_list(){

      //this.fethc_score_info(exam_index);
      if(this.is_exam_page == true)
        this.listInfo = this.format_exam_info();
      else if (this.is_score_page == true)
        this.listInfo = this.format_score_info();
      else
        alert("出事了，为什么不重启试试呢？");

    },

  },
  created: 
    async function(){
      let signal = await this.get_user_info();
      if(signal == false)
      {
        this.is_need_login = true;
        return;
      }
      signal = sessionStorage.getItem("is_score_page");
      await this.fetch_exam_info();
      if(signal == null || signal == false)
      {
        this.is_exam_page  = true;
        this.is_score_page = false;
      }
      else
      {
        this.is_exam_page  = false;
        this.is_score_page = true;
      }
      this.configure_list();
    },
}
</script>

<style></style>
