import { Base64 } from "js-base64";
import { defineStore } from "pinia";

export const userStore = defineStore('userStore', {
    state: () => {
        return{
            Version: "3.1.4",
            isLogined: false,
            userInfo: {},
            examOverviews: [],
            token: "",
            examData: [],
        }
    },
    actions: {
        clear() {
            this.$reset();
        },
        loadExamData(examData) {
            this.examData = examData
        },
        loadExamOverviews(examData) {
            let tmpExamOverView = [];
            for (let i = 0; i < examData.length; i++) {
              tmpExamOverView.push({
                title: i + 1 + ". " + examData[i]["examName"],
                subtitle: examData[i]["time"],
                fullScore: examData[i]["score"]
              });
            }
            this.examOverviews = tmpExamOverView;
        },
        loadToken(_token) {
            this.token     = _token;
            this.isLogined = true;
        },
        loadUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        getExamData(index) {
            return this.examData[index];
        },
        getToken() {
            return this.isLogined == true? this.token: null;
        }
    },   
    persist: {
        key: "user",
        storage: window.sessionStorage,
        // serializer: {
        //     serialize  : Base64.encode,
        //     deserialize: Base64.decode,
        // }
    
    },    
});

export const loginStore = defineStore("loginStore", {
    state: ()=>({
        token: "",
        isLogged: false,
    }),
    actions: {
        load(token) {
            const theUser = userStore();
            theUser.loadToken(token);
            this.token    = token;
            this.isLogged = true;
        }
    },
    persist: {
        key: "loginStore",
        storage: window.localStorage,
        // serializer: {
        //     serialize  : Base64.encode,
        //     deserialize: Base64.decode,
        // },
    }
})