<template>
  <v-container>
    <AppBar title="七天网络助手"></AppBar>
    <v-row  v-if="needLogin">
    <CaKStuLoginCard
     
      @loginOK="this.loginOKCallBack()"
      @sMessage="sMessage" 
    ></CaKStuLoginCard>
    </v-row>
    <v-row v-else>
    <CaKStuList
      :item_data="this.listInfo"
      :userInfo="this.userInfo"
    ></CaKStuList>
    </v-row>
    <SMessage
      ref="sMsg"
      :timeout="timeout"
      @cli="console.log('clickedsmessagebtn')"
    ></SMessage>
    
  </v-container>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import SMessage from "../components/SMessage.vue";
import axios from "axios";
import CaKStuList from "../components/CaKStuList.vue"
// import QueryString from "qs";
import CaKStuLoginCard from "../components/CaKStuLoginCard.vue";
export default {
  name: "SevenDaysHelper",
  components: {
    AppBar,
    SMessage,
    CaKStuList,
    CaKStuLoginCard,
},
  data: () => ({
    token: "",
    userInfo: {},
    examInfo: [],
    listInfo: [],
    isExamPage: false,
    isScorePage: false,
    needLogin: false,
    message: null,
    hasBtn: false,
    timeout: null,
    snackbar: false,
  }),
  watch: {
    token: function(){this.getUserInfo();},
    userInfo: function(){
      this.fetchExamInfo();
    },
    examInfo: function(){this.configureList()},
    scoreInfo: function(){this.configureList()},
  },
  methods: {
    loginOKCallBack(){
      this.token = this.$cookies.get("stu_stu_token");
      this.needLogin = false;
      this.isExamPage = true;
    },
    sMessage(msg, hasB, time) {
      this.timeout = time || null;
      this.$refs.sMsg.sMessage(msg,hasB);
    },
    async getUserInfo(){
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
            if(response.data.status != "200"){
              this.$cookies.delete("cak_stu_token");
              return false;

            }
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
    async fetchExamInfo(){
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
    fomatExamInfo(){
      let listInfo = [];
      let examInfo = this.examInfo;
      let length = examInfo.length;
      for(let i = 0; i < length; ++i)
      {
        listInfo.push({
          "title": i + "" + ": "+ examInfo[i]["examName"],
          "subtitle": examInfo[i]["time"] + "   " + examInfo[i]["score"],
        })
      }
      return listInfo;
    },
    configureList(){

      //this.fethc_score_info(exam_index);
      if(this.isExamPage == true)
        this.listInfo = this.fomatExamInfo();
      else if (this.isScorePage == true)
        this.listInfo = this.formatScoreInfo();
      else
        alert("出事了，为什么不重启试试呢？");

    },
  },
  created: async function(){
    let signal = await this.getUserInfo();
    if(signal == false)
    {
      this.needLogin = true;
      return;
    }
    signal = sessionStorage.getItem("isScorePage");

    if(signal == null || signal == false)
    {
      this.isExamPage  = true;
      this.isScorePage = false;
    }
    else
    {
      this.isExamPage  = false;
      this.isScorePage = true;
    } 
    await this.fetchExamInfo();
  }
};
</script>

<style></style>
