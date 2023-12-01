<script setup>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useMenuStore } from '../../stores/menu_store';
const menu_store_instance = useMenuStore();

const {cookies} = useCookies();

const use_api=(username,password)=>{
    console.log(username, password)
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
        const Client_ID = response['data']['Client_ID_Value'];
        const Client_Session_Token = response['data']['Client_Session_Token']
        try{
            cookies.set('Client_ID', JSON.stringify(Client_ID));
            cookies.set('Client_Session_Token', JSON.stringify(Client_Session_Token));
            menu_store_instance.state.logged_in = true;
        } catch (error) {
            console.error("Error Parsing JSON..")
        }
    }
}
</script>

<template>
    <div class="login_form">
        <input placeholder="Username" type="text" ref="username">
        <input placeholder="..." type="password" ref="password" @keyup.enter="submit_login_form($refs.username.value, $refs.password.value)">
    </div>
</template>

<style lang="scss" scoped>
.login_form{
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-rows: 50px 50px;
    >input{
        width: 70%;
        max-width: 225px;
    }
}
</style>