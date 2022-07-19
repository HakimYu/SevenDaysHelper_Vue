<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import QueryString from "qs";
import { Base64 } from "js-base64";
import { Tools } from "../tools";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { userStore } from "../store";
import {useToast} from "vue-toastification";
import  Button  from "primevue/button";
import { loginStore } from "../store";

const schema = yup.object({
  phoneNumber: yup.string().required().matches(/^1+\d{10}$/),
  password: yup.string().required(),
});
useForm({
  validationSchema: schema,
});

const {errorMessage: phoneNumberErrorMsg, value: phoneNumber} = useField('phoneNumber');
const {errorMessage: passwordErrorMsg, value: password}       = useField('password');
const theLoginStore = loginStore();
const theUserStore  = userStore();
const toast         = useToast();
const router        = useRouter();
let   isSCode       = false;

if (theUserStore.getToken() !== "" && theUserStore.getToken() !== null) router.push("/");

function login() {
  /*
   * 若存在电话错误信息 或者 存在密码错误信息,
   * 报错并返回.
   */
  if (
    (phoneNumberErrorMsg !== undefined && phoneNumberErrorMsg.value !== undefined)
    ||
    (passwordErrorMsg !== undefined && passwordErrorMsg.value !== undefined)
  ) {
    toast.error("账号或密码格式不正确.", {position: "top-center"});
    return;
  }
  if (isSCode !== true) {
    axios({
        method: "POST",
        url: Tools.getUrl("my", "/login"),
        data: QueryString.stringify({
        userCode: phoneNumber.value,
        password: Base64.encode(password.value),
      }),
      headers: {
        Version: "3.1.4",
      },
      dataType: "json",
    }).then((response) => {
      if (response.data.status !== 200) {
        switch (response.data.status) {
          case 404:
            toast.error("账号密码不能为空.", {position: "top-center"});
            break;
          case 403:
            toast.error(response.data.message, {position: "top-center"});
            break;
          default:
            toast.info("未知错误, 详见log.");
            console.log(response.data.message);
            break;
        }
      } else {
        theLoginStore.load(response.data.data.token);
        toast.success("Welcome!");
        router.push("/");
      }
    });
  } else {
  }
  // router.push('/'); 
}

</script>

<template >
  <div class="flex align-self-center  align-items-center justify-content-center">
    <Card
      id="LoginCard"
      class="flex mt-8 w-25rem"
    >
      <template #title>
        <h5 class="flex" >登录</h5>
      </template>
      <template #subtitle><p class="flex">使用您最爱的七天学堂账号</p></template>
      <template #content>
        <div class="p-float-label mx-8">
          <InputText
            id="userName"
            type="text"
            v-model="phoneNumber"
            name="phoneNumber"
            :class="{'p-invalid': phoneNumberErrorMsg !== undefined}"


          ></InputText>

          <label for="userName">
            <span :class="{'p-error': phoneNumberErrorMsg !== undefined}">Phone Number</span>
          </label>
            
        </div>
        <div class="mx-8">
          <small class="p-error" v-show="phoneNumberErrorMsg !== undefined">给我正确的手机号！</small>
        </div>
        <Password :feedback="false" v-model="password" class="flex mt-6 mx-8" ></Password>
      </template>
      <template #footer>
        <Button label="Login" @click="login"></Button>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* #LoginCard {
    width: 448px;
    height: 500px;
} */
</style>