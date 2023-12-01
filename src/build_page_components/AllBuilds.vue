
<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
const all_builds = ref([])

const build_API = () =>{
    return new Promise((resolve, reject)=>{
        axios({
            url:`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-all-builds`,
            method: "GET",
        }).then((response)=>{
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}

const get_all_builds = async () =>{
    const response = await build_API();
    if(response.status >= 200 && response.status < 300){
        all_builds.value = response['data'];
    }
}
onBeforeMount(()=>{
    get_all_builds()
})
</script>

<template>
    <div class="all_builds">
        <div class="loop_div" v-for="(item, i) in all_builds" :key="i"> 
            <div class="build_title_div">
                <h3>{{ item['Build_Title'] }}</h3>
            </div>
            <div class="seperator" v-if="all_builds[i]['Feat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>FEATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(feat, f) in item['Feat_Slice']" :key="f">
                        <p>{{ feat['Name'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[i]['Skill_Slice'].length > 0">
                <div class="loop_header">
                    <h3>SKILLS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(skill, s) in item['Skill_Slice']" :key="s">
                        <p>{{ skill['Name'] }} - {{ skill['Value'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[i]['Stat_Slice'].length > 0">
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
.all_builds{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    overflow-y: auto;
    height: 90%;
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