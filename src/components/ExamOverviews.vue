<script setup>
import Card from 'primevue/card';
import axios from 'axios';
import { userStore } from '../store';
import { Tools } from '../tools';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from 'primevue/button';
const theUserStore = userStore();
const router       = useRouter();
const toast        = useToast();

getUserInfo();
getExams();

function getExams() {
  let userInfo   = theUserStore.userInfo;
  let token      = theUserStore.token;
  let startIndex = 0;
  let rows       = 114514;
  try {
    axios({
      method: "GET",
      url: Tools.getUrl("score", "/exam/getClaimExams"),
      params: {
        startIndex: startIndex,
        studentName: userInfo.studentName,
        schoolGuid: userInfo.schoolGuid,
        grade: userInfo.grade,
        rows: rows,
      },
      headers: {
        token: token,
        Version: theUserStore.Version,
      },
    }).then((response) => {
      if (response.data.status === 200) {
        let examData = response.data.data.list;
        theUserStore.loadExamData(examData);
        theUserStore.loadExamOverviews(examData);
        // this.$emit("loaded");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function getUserInfo() {
  let token = theUserStore.getToken();
  if (token === null || token === "") router.push({name: 'Login'});
  axios({
    method: "GET",
    url: Tools.getUrl("my", "/userInfo/GetUserInfo"),
    headers: {
      token: token,
      Version: theUserStore.Version,
    },
  }).then((response) => {
    if (response.data.status !== 200) {

      toast.error(response.data.message === null? response.data.message: response.data);
      theUserStore.clear();
      router.push({name: "Login"});
      //to-do: more detail to handle error.
    }
    
    theUserStore.loadUserInfo(response.data.data);
  });
}
function goToExamPage(index) {
  router.push({name: "Exam", params: {index: index}});
}
</script>
<template>
<div>
  <RouterView />
  <div class="grid my-6 mx-6" >
    <div class="col-8 col-offset-2 " v-for="(content, index) in theUserStore.examOverviews">
      <Card class="m-0" :key="index">
        <template #title>
          {{content.title}}
        </template>
        <template #subtitle>
          {{content.subtitle}}
        </template>
        <template #content>
          <div class="flex grid">
            <Button @click="goToExamPage(index)" class="col-offset-9" >{{content.fullScore}}</Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</div>
</template>

<style scoped>


</style>