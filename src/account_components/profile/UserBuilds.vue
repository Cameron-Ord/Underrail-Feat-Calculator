<script setup>
import axios from 'axios';
import { onBeforeMount,ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const user_builds = ref([])
let index = ref(0);
const get_user_builds = () =>{
    const {cookies} = useCookies();
    const client_id = cookies.get('Client_ID');
    const client_session = cookies.get('Client_Session_Token');
    const parsed_id = JSON.parse(client_id);
    const parsed_session = JSON.parse(client_session) 
    axios({
        url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-user-builds`,
        method:"GET",
        params:{
            session_token:parsed_session,
            client_id:parsed_id
        }
    }).then((response)=>{
        user_builds.value = response['data'];
    }).catch((error)=>{
        error;
    })
}

const decrement = () =>{
    if(index.value < user_builds.value.length){
        let index_copy = index.value;
        index_copy = (index.value - 1 + user_builds.value.length) % user_builds.value.length;
        index.value = index_copy;
    }
}

const increment = () =>{
    if(index.value < user_builds.value.length){
        let index_copy = index.value;
        index_copy = (index.value + 1) % user_builds.value.length;
        index.value = index_copy;
    }
}

onBeforeMount(()=>{
    get_user_builds()
})

</script>
<template>
    <div class="user_builds" v-if="user_builds.length > 0">
        <div class="loop_div"> 
            <div class="build_title_div">
                <h3>{{ user_builds[index]['Build_Title'] }}</h3>
            </div>
            <div class="seperator" v-if="user_builds[index]['Feat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>FEATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(feat, f) in user_builds[index]['Feat_Slice']" :key="f">
                        <p>{{ feat['Name'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="user_builds[index]['Skill_Slice'].length > 0">
                <div class="loop_header">
                    <h3>SKILLS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(skill, s) in user_builds[index]['Skill_Slice']" :key="s">
                        <p>{{ skill['Name'] }} - {{ skill['Value'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="user_builds[index]['Stat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>STATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(stat, t) in user_builds[index]['Stat_Slice']" :key="t">
                        <p>{{ stat['Name'] }} - {{ stat['Value'] }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="index_controls">
            <p @click="decrement">Previous</p>
            <p @click="increment">Next</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user_builds{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    width: 100%;
    row-gap: 50px;
    justify-items: center;

    >.index_controls{
        justify-items: center;
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr;
        width: 80%;
        >p{
            cursor: pointer;
            padding: 5px;
            border-top: solid var(--orange) 1px;
            border-bottom: solid var(--orange) 1px;
        }
    }
    >.loop_div{
        box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.5);
        width: 90%;
        display: grid;
        align-items: center;
        grid-template-rows: auto;
        row-gap:25px;
        border: solid var(--orange) 1px;
        padding-top: 25px;
        padding-bottom: 25px;
        >.build_title_div{
            padding-top: 10px;
            padding-bottom: 10px;
            display: grid;
            align-items: center;
            justify-items: center;
            >h3{
                padding: 5px;
                border-top: solid var(--orange) 1px;
                border-bottom: solid var(--orange) 1px;
            }
        }
        >.seperator{
            display: grid;
            align-items: center;
            grid-template-rows: auto;
            row-gap: 25px;
            justify-items: center;
            >.loop_header{
                display: grid;
                justify-items: center;
                text-align: center;
            }
            >.loop_container{
                display: grid;
                align-items: center;
                grid-template-columns: repeat(auto-fit, minmax(125px,1fr));
                justify-items: center;
                grid-template-rows: auto;
                row-gap: 10px;
                width: 85%;
                padding-top: 25px;
                padding-bottom: 25px;
                border-bottom: solid var(--orange) 1px;
                border-top: solid var(--orange) 1px;
                
                >.inner_loop_div{
                    display: grid;
                    justify-items: center;
                    text-align: center;
                    width: 80%;
                }
            }
        }
    }
}
</style>