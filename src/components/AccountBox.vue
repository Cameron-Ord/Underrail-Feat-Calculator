<script setup lang="ts">
import { ref, type Ref } from 'vue';
import axios, { type AxiosResponse } from 'axios'
const signing_up: Ref<boolean> = ref(true);
const clicked_query: Ref<boolean> = ref(false);

const option_picker = (target: EventTarget | null) => {
  const html_target = target as HTMLElement;
  const text = html_target.textContent
  switch (text) {
    case "Login":
      clicked_query.value = true
      signing_up.value = false;
      break;
    case "Signup":
      clicked_query.value = true;
      signing_up.value = true;
      break;
    case "Back":
      clicked_query.value = false;
      signing_up.value = true;
      break;
    default:
      break;
  }
}

const login = async () => {
  try{ 
    const response = await axios_login();
    const resp_data = response.data;
  } catch (error: any) {
    console.log(error['response']['data']);
  }
}

const signup = async () => {
  try{ 
    const response = await axios_signup();
    const resp_data = response.data;
  } catch (error: any) {
    console.log(error['response']['data']);
  }
}

const get_text_contents = () => {
  const pw_box: HTMLInputElement | null = document.querySelector('.pw');
  const usr_box: HTMLInputElement | null = document.querySelector('.usr');
  if (pw_box !== null && usr_box !== null) {
    return [usr_box.value, pw_box.value];
  }
  return [null, null];
}


const axios_login = () => {
  const [usr, pw] = get_text_contents();
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/login`, {
      username: usr,
      password: pw,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};


const axios_signup = () => {
  const [usr, pw] = get_text_contents();
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/signup`, {
      username: usr,
      password: pw,
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};



</script>

<template>
  <div class="account">
    <article v-if="!clicked_query" class="query_box">
      <p @click="option_picker($event.target)">Login</p>
      <p @click="option_picker($event.target)">Signup</p>
    </article>
    <article class="box" v-if="clicked_query">
      <div class="input_box">
        <input class="usr" placeholder="username.." type="text">
        <input class="pw" placeholder="password.." type="password">
      </div>
      <div class="options_box">
        <p v-if="clicked_query" @click="option_picker($event.target)">Back</p>
        <p v-if="signing_up" @click="signup">Signup</p>
        <p v-if="!signing_up" @click="login">Login</p>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.account{
  display: grid;
  align-items: center;
  justify-items: center;
  >.query_box{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    column-gap: 10px;
    width: 90%;
  }

  >.box{
    display: grid;
    row-gap: 15px;
    justify-items: center;
    >.input_box{
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      width: 90%;
    }
    >.options_box{
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 90%;
    }
  }
}
</style>
