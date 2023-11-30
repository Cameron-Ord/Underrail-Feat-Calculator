
<script setup>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies();
const log_user_in = (username, password) => {
    return new Promise((resolve, reject)=>{
        axios({
            url:`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/login`,
            method: "POST",
            data:{
                username: username,
                password: password
            }
        }).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        });
    })
}

const signup_api = (username, password) => {
    return new Promise((resolve, reject)=>{
        axios({
            url:`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/signup`,
            method: "POST",
            data:{
                username: username,
                password: password
            }
        }).then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        });
    })
}

const submit_signup_form = async (username, password) =>{
    const signup_response = await signup_api(username, password);
    if(signup_response.status >= 200 && signup_response.status < 300){
        const login_response = await log_user_in(username,password);
        if(login_response.status >= 200 && login_response.status < 300){
            cookies.set('client_session', JSON.stringify(login_response['data']));
        } else {
            console.log("Error logging in.")
        }
    } else {
        console.log("Error signing in.")
    }
}

</script>

<template>
    <div class="signup_form">
        <input placeholder="Username" type="text" ref="username">
        <input placeholder="..." type="password" ref="password" @keyup.enter="submit_signup_form($refs.username, $refs.password)">
    </div>
</template>

<style lang="scss" scoped>

</style>