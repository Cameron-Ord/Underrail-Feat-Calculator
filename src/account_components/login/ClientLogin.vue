<script setup>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useMenuStore } from '../../stores/menu_store';
import { useRouter } from 'vue-router';
const router = useRouter()
const menu_store_instance = useMenuStore();

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
        const Client_ID = response['data']['Client_ID_Value'];
        const Client_Session_Token = response['data']['Client_Session_Token']
        try{
            cookies.set('Client_ID', JSON.stringify(Client_ID));
            cookies.set('Client_Session_Token', JSON.stringify(Client_Session_Token));
            menu_store_instance.state.logged_in = true;
            cookies.set('is_logged', JSON.stringify(true));
            router.push('/');
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
        <h3 @click="submit_login_form($refs.username.value, $refs.password.value)">Login</h3>
    </div>
</template>

<style lang="scss" scoped>
.login_form{
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-rows: 50px 50px 75px;
    >h3{
        padding-top: 5px;
        padding-bottom: 5px;
        border-top: solid var(--orange) 1px;
        border-bottom: solid var(--orange) 1px;
    }
    >input{
        box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.2);
        border-width: 1px;
        border-radius: 5px;
        border-color: var(--orange);
        padding: 2.5px;
        background-color: var(--black);
        text-align: center;
        color: var(--orange);
        font-weight: 900;
        width: 70%;
        font-size: 16px;
        max-width: 175px;
    }
}
</style>