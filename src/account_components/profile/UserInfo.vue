<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const user_info = ref({})

const get_user_info = () =>{
    const {cookies} = useCookies();
    const client_id = cookies.get('Client_ID');
    const client_session = cookies.get('Client_Session_Token');
    const parsed_id = JSON.parse(client_id);
    const parsed_session = JSON.parse(client_session) 
    if(parsed_id !== null && parsed_session !== null){
        axios({
            url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-profile-info`,
            method:"GET",
            params:{
                session_token:parsed_session,
                client_id:parsed_id
            }
        }).then((response)=>{
            user_info.value = response['data'];
        }).catch((error)=>{
            error;
        })
    }
}

onBeforeMount(()=>{
    get_user_info()
})
</script>
<template>
    <div class="info_div">
        <h2>Welcome, {{ user_info['Username'] }}</h2>
        <h4>Member since: {{ user_info['Created_at'] }}</h4>
    </div>
</template>
<style lang="scss" scoped>
.info_div{
    display: grid;
    align-items: center;
    justify-items: center;
    text-align: center;
    grid-template-rows: auto;
    gap: 10px;
}
</style>