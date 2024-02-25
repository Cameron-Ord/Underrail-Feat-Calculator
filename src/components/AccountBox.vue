<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import axios, { type AxiosResponse } from 'axios'
import { login_state } from '../stores/login_manager';

const log_inst = login_state();
const signing_up: Ref<boolean> = ref(true);
const clicked_query: Ref<boolean> = ref(false);
const logged_in: Ref<boolean> = ref(false);

onBeforeMount(() => {
  const result: boolean = log_inst.load_session();
  log_inst.set_login_status(result);
  logged_in.value = log_inst.get_login_status();
})

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
  try {
    const response = await axios_login();
    //if the response was successful, reset the original values and set cookies
    if (response.statusText === "OK") {
      clicked_query.value = false;
      signing_up.value = true;
      const resp_data: { Client_Session_Token: string, Client_ID_Value: number } = response.data;
      //if cookies were set successfully, then close the login/signup box
      //if result is false, the login failed.
      const result: boolean = log_inst.save_response(resp_data);
      log_inst.set_login_status(result);
      logged_in.value = log_inst.get_login_status();
    }
  } catch (error: any) {
    console.log(error['response']['data']);
  }
}

const signup = async () => {
  try {
    const response = await axios_signup();
    if (response.statusText === "OK") {
      //going to login if registration was successful
      login();
    }
  } catch (error: any) {
    console.log(error['response']['data']);
  }
}

const get_text_contents = () => {
  const pw_box: HTMLInputElement | null = document.querySelector('.pw');
  if (pw_box == null) {
    return [null, null];
  }
  const usr_box: HTMLInputElement | null = document.querySelector('.usr');
  if (usr_box == null) {
    return [null, null];
  }
  if (pw_box.value !== "" && usr_box.value !== "") {
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

const user_logout = () => {
  log_inst.log_user_out();
  logged_in.value = log_inst.get_login_status();
  clicked_query.value = false;
}

</script>

<template>
  <div class="account">
    <article v-if="!clicked_query && !logged_in" class="query_box">
      <p @click="option_picker($event.target)">Login</p>
      <p @click="option_picker($event.target)">Signup</p>
    </article>
    <article class="box" v-if="clicked_query && !logged_in">
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
    <article class="logout_box" v-if="logged_in">
      <p @click="user_logout">Logout</p>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.account {
  display: grid;
  align-items: center;
  justify-items: center;

  >.query_box {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    column-gap: 10px;
    width: 90%;
  }

  >.box {
    display: grid;
    row-gap: 15px;
    justify-items: center;

    >.input_box {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      width: 90%;
    }

    >.options_box {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 90%;
    }
  }
}

@media only screen and (min-width: 770px) {}

@media only screen and (min-width: 1024px) {}
</style>
