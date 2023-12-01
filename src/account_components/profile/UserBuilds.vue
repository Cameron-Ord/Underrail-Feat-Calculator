<script setup>
import axios from 'axios';
import { onBeforeMount,ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const user_builds = ref([])

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

onBeforeMount(()=>{
    get_user_builds()
})

</script>
<template>
    <div class="user_builds">
        <div class="loop_div" v-for="(item, i) in user_builds" :key="i"> 
            <div class="build_title_div">
                <h3>{{ item['Build_Title'] }}</h3>
            </div>
            <div class="seperator" v-if="user_builds[i]['Feat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>FEATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(feat, f) in item['Feat_Slice']" :key="f">
                        <p>{{ feat['Name'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="user_builds[i]['Skill_Slice'].length > 0">
                <div class="loop_header">
                    <h3>SKILLS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(skill, s) in item['Skill_Slice']" :key="s">
                        <p>{{ skill['Name'] }} - {{ skill['Value'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="user_builds[i]['Stat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>STATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(stat, t) in item['Stat_Slice']" :key="t">
                        <p>{{ stat['Name'] }} - {{ stat['Value'] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user_builds{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    overflow-y: auto;
    height: 375px;
    width: 100%;
    gap: 50px;
    >.loop_div{
        display: grid;
        align-items: center;
        grid-template-rows: auto;
        gap: 25px;
        >.build_title_div{
            display: grid;
            align-items: center;
            justify-items: center;
        }
        >.seperator{
            display: grid;
            align-items: center;
            grid-template-rows: auto;
            gap: 15px;

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
                gap: 10px;
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