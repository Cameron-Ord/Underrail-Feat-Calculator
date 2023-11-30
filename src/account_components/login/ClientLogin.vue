<script setup>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies();

const use_api=(username,password)=>{
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
        })
    })
}

const submit_login_form = async (username, password) =>{
    const response = await use_api(username, password)
    if(response.status >= 200 && response.status < 300){
        cookies.set('client_session', JSON.stringify(response['data']));
    }
}
</script>

<template>
    <div class="login_form">
        <input placeholder="Username" type="text" ref="username">
        <input placeholder="..." type="password" ref="password" @keyup.enter="submit_login_form($refs.username, $refs.password)">
    </div>
</template>

<style lang="scss" scoped>

</style>