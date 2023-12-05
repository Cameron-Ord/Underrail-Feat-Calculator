
<script setup>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';
const router = useRouter();
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
            const Client_ID = login_response['data']['Client_ID_Value'];
            const Client_Session_Token = login_response['data']['Client_Session_Token']
            try{
                cookies.set('Client_ID', JSON.stringify(Client_ID));
                cookies.set('Client_Session_Token', JSON.stringify(Client_Session_Token));
                router.push('/');
                cookies.set('is_logged', JSON.stringify(true));
            } catch (error) {
                console.log('Error parsing JSON..')
            }
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
        <input placeholder="..." type="password" ref="password" @keyup.enter="submit_signup_form($refs.username.value, $refs.password.value)">
        <h3 @click="submit_signup_form($refs.username.value, $refs.password.value)">Signup</h3>
    </div>
</template>

<style lang="scss" scoped>
.signup_form{
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