<script setup>
import axios from 'axios';
import QueryString from 'qs';
import { Tools } from '../tools';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {userStore} from "../store";
import { useRoute } from 'vue-router';
import { ref } from 'vue';
axios.defaults.headers.post["Content-Type"] =  "application/x-www-form-urlencoded";

const theUser  = userStore();
const route    = useRoute()

let scoreStatus = 1;
let subjects    = [];
let exam        = ref([]);

getScore();

function getScore() {
    let examInfo = theUser.getExamData(route.params.index);
    let token = theUser.getToken();
    let userInfo = theUser.userInfo;

    axios({
        method: "POST",
        url: Tools.getUrl("score", "/Question/Subjects"),
        headers: {
            "token": token,
            "Version": "3.1.4",
        },
        data: QueryString.stringify({
            "examGuid": examInfo.examGuid,
            "studentCode": examInfo.studentCode,
            "schoolGuid": userInfo.schoolGuid,
            "grade": userInfo.grade,
            "ruCode": examInfo.ruCode,
        }),
        }).then((response) => {
        if (response.data.status !== 200) Tools.handleError(response.data.message)
        else {
            subjects = response.data.data.subjects;
            scoreStatus = response.data.data.scoreStatus;
            for (let i = 0; i < subjects.length; ++i) {
                exam.value.push({
                    subjectName: subjects[i].km,
                    classRanking: subjects[i].cs,
                    schoolRanking: subjects[i].us,
                    myScore: subjects[i].myScore,
                });
            }
        }
    })
}






</script>
<template>
<div class="flex col">
    <DataTable class="col-6 col-offset-3" :value="exam" responsive-layout="scroll">
        <Column field="subjectName" header="Subject"></Column>
        <Column field="classRanking" header="Ranking of class"></Column>
        <Column field="schoolRanking" header="Ranking of grade"></Column>
        <Column field="myScore" header="Score"></Column>
    </DataTable>

</div>


</template>