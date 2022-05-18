<template>
<v-row>
  <div class="d-flex-none hidden-md-and-up mx-5 mt-13">
    <v-card-title class="d-flex justify-center text-h5" primary-title>
      登录
    </v-card-title>
    <v-card-title
      class="d-flex justify-center subtitle-1"
      style="margin-top: -24px"
      primary-title
    >
      使用您的七天网络账号
    </v-card-title>
    <v-card-actions>
      <v-row class="d-flex justify-center no-gutters">
        <v-col cols="12" sm="12">
          <v-text-field
            label="手机号码"
            v-model="userCode"
            prepend-icon="mdi-phone"
            color="#1a73e8"
            outlined
          ></v-text-field>
        </v-col>
        <v-col v-show="!msgLogin" key="pwdf" cols="12" sm="12">
          <form>
            <v-text-field
              label="密码"
              prepend-icon="mdi-lock"
              color="#1a73e8"
              autocomplete="off"
              v-model="password"
              :append-icon="pwdEye"
              :type="isPwd ? 'password' : 'text'"
              @click:append="
                pwdEye == 'mdi-eye-off'
                  ? (pwdEye = 'mdi-eye')
                  : (pwdEye = 'mdi-eye-off');
                isPwd = !isPwd;
              "
              outlined
            ></v-text-field>
          </form>
        </v-col>
        <v-col v-show="msgLogin" sm="12">
          <v-text-field
            width="366px"
            label="验证码"
            v-model="smsCode"
            prepend-icon="mdi-message-text"
            color="#1a73e8"
            outlined
          >
            <template v-slot:append-outer>
              <v-btn
                class="float-right align-center align-self-center"
                style="margin-top: -5px"
                small
                v-text="sendSmsBtnText"
                :disabled="sendSmsBtnDisabled"
                v-show="msgLogin"
                @click="sendSms"
                color="secondary"
                >发送验证码</v-btn
              >
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="9"></v-col>
        <v-col class="mt-10 align-self-center" sm="6"
          ><v-btn
            style="margin-left: -15px"
            small
            text
            v-html="msgLogin ? '密码登录' : '短信登录'"
            @click="msgLogin = !msgLogin"
            color="#1a73e8"
            >短信登录</v-btn
          ></v-col
        >
        <v-col class="mt-10" sm="6">
          <v-btn
            class="float-right"
            color="#1a73e8"
            dark
            elevation="0"
            @click="login()"
            >登录</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </div>

    <v-card
      class="hidden-sm-and-down align-self-center"
      elevation="0"
      style="text-align: center"
      width="448px"
      height="500px"
      rounded="lg"
      outlined
    >
      <v-card-title
        class="justify-center text-h5"
        style="margin-top: 60px"
        primary-title
      >
        登录
      </v-card-title>
      <v-card-actions>
        <v-row class="justify-center no-gutters">
          <v-col sm="10">
            <v-text-field
              width="366px"
              label="手机号码"
              v-model="userCode"
              :rules="[rules.required, rules.phone]"
              prepend-icon="mdi-phone"
              color="#1a73e8"
              outlined
            ></v-text-field>
          </v-col>
          <v-col v-show="!msgLogin" sm="10">
            <form>
              <v-text-field
                width="366px"
                label="密码"
                v-model="password"
                autocomplete="off"
                color="#1a73e8"
                prepend-icon="mdi-lock"
                :append-icon="pwdEye"
                :type="isPwd ? 'password' : 'text'"
                @click:append="
                  pwdEye == 'mdi-eye-off'
                    ? (pwdEye = 'mdi-eye')
                    : (pwdEye = 'mdi-eye-off');
                  isPwd = !isPwd;
                "
                outlined
              ></v-text-field>
            </form>
          </v-col>
          <v-col v-show="msgLogin" sm="10">
            <v-text-field
              width="366px"
              label="验证码"
              v-model="smsCode"
              :rules="[rules.required, rules.msg]"
              prepend-icon="mdi-message-text"
              color="#1a73e8"
              outlined
            >
              <template v-slot:append-outer>
                <v-btn
                  class="float-right align-center align-self-center"
                  style="margin-top: -5px"
                  small
                  v-text="sendSmsBtnText"
                  :disabled="sendSmsBtnDisabled"
                  @click="sendSms"
                  v-show="msgLogin"
                  color="secondary"
                  >发送验证码</v-btn
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col sm="5"
            ><v-btn
              class="float-left"
              style="margin-left: -10px"
              small
              text
              color="#1a73e8"
              v-html="msgLogin ? '密码登录' : '短信登录'"
              @click="msgLogin = !msgLogin"
              >短信登录</v-btn
            ></v-col
          >
          <v-col cols="5">
            <v-btn
              class="float-right"
              color="#1a73e8"
              dark
              elevation="0"
              @click="login()"
              >登录</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <!-- CardLay -->
</v-row>
</template>

<script>
import axios from "axios";
import qs from "qs";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let Base64 = require("js-base64").Base64;
export default {
  name: "LoginDialog",
  data: () => ({
    pwdEye: "mdi-eye-off",
    Version: "3.1.0",
    isPwd: true,
    msgLogin: false,
    userCode: "",
    password: "",
    smsCode: "",
    smsToken: "",
    sendSmsBtnText: "发送验证码",
    sendSmsBtnDisabled: false,

    //输入框验证规则
    rules: {
      required: (value) => !!value || "必填项",
      phone: (value) => {
        const pattern = /^1+[\d]{10}$/;
        return pattern.test(value) || "手机号格式错误";
      },
      msg: (value) => {
        const pattern = /^[\d]{1,6}$/;
        return pattern.test(value) || "验证码格式错误";
      },
    },
  }),
  methods: {
    login() {
      if (!this.msgLogin) {
        this.pLogin();
      } else {
        this.sLogin();
      }
    },
    pLogin() {
      axios({
        method: "post",
        url: this.getUrl("my", "/login"),
        data: qs.stringify({
          userCode: this.userCode,
          password: Base64.encode(this.password),
        }),
        headers: {
          Version: this.Version,
        },
        dataType: "json",
      })
        .then((response) => {
          if (response.data.status == 200) {
            this.$cookies.set("cak_stu_token", response.data.data.token, "1m");
            this.$emit("loginOK");
            this.$emit("sMessage", "登录成功");
            //todo 取用户信息
          } else {
            this.$emit("sMessage", response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendSms() {
      axios({
        method: "post",
        url: this.getUrl("my", "/login/sendsms"),
        data: qs.stringify({
          userCode: Base64.encode(this.userCode),
        }),
        headers: {
          Version: this.Version,
        },
        dataType: "json",
      })
        .then((response) => {
          if (response.data.status == 200) {
            this.smsToken = response.data.data.token;
            this.countDown(61, (lefttime) => {
              if (lefttime > 0) {
                this.sendSmsBtnDisabled = true;
                this.sendSmsBtnText =
                  "发送验证码" + "(" + String(lefttime) + ")";
              } else {
                this.sendSmsBtnText = "发送验证码";
                this.sendSmsBtnDisabled = false;
              }
            });
          } else {
            this.$emit("sMessage", response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sLogin() {
      axios({
        method: "post",
        url: this.getUrl("my", "/login/entry"),
        data: qs.stringify({
          userCode: this.userCode,
          verifyCode: this.smsCode,
          token:this.smsToken,
        }),
        headers: {
          Version: this.Version,
        },
        dataType: "json",
      })
        .then((response) => {
          if (response.data.status == 200) {
            this.$cookies.set("cak_stu_token", response.data.data.token);
            this.$emit("loginOK");
            this.$emit("sMessage", "登录成功");
            //todo 取用户信息
          } else {
            this.$emit("sMessage", response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    countDown(lefttime, callback) {
      lefttime--;
      if (lefttime > 0) {
        setTimeout(() => {
          this.countDown(lefttime, callback);
        }, 1000);
      }
      callback(lefttime);
    },
    getUrl(host, path) {
      switch (host) {
        case "my":
          return "https://szone-my.7net.cc" + path;
        /*case "old":
          return "https://szone-api.7net.cc" + path;*/
        case "score":
          return "https://szone-score.7net.cc" + path;
        default:
          break;
      }
    },
  },
  created: function(){

  }
};
</script>

<style></style>
