
<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
const all_builds = ref([])
let index = ref(0)
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
const decrement = () =>{
    if(index.value < all_builds.value.length){
        let index_copy = index.value;
        index_copy = (index.value - 1 + all_builds.value.length) % all_builds.value.length;
        index.value = index_copy;
    }
}

const increment = () =>{
    if(index.value < all_builds.value.length){
        let index_copy = index.value;
        index_copy = (index.value + 1) % all_builds.value.length;
        index.value = index_copy;
    }
}
onBeforeMount(()=>{
    get_all_builds()
})
</script>

<template>
    <div class="all_builds" v-if="all_builds.length > 0">
        <div class="loop_div"> 
            <div class="build_title_div">
                <h3>{{ all_builds[index]['Build_Title'] }}</h3>
            </div>
            <div class="seperator" v-if="all_builds[index]['Feat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>FEATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(feat, f) in all_builds[index]['Feat_Slice']" :key="f">
                        <p>{{ feat['Name'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[index]['Skill_Slice'].length > 0">
                <div class="loop_header">
                    <h3>SKILLS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(skill, s) in all_builds[index]['Skill_Slice']" :key="s">
                        <p>{{ skill['Name'] }} - {{ skill['Value'] }}</p>
                    </div>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[index]['Stat_Slice'].length > 0">
                <div class="loop_header">
                    <h3>STATS:</h3>
                </div>
                <div class="loop_container">
                    <div class="inner_loop_div" v-for="(stat, t) in all_builds[index]['Stat_Slice']" :key="t">
                        <p>{{ stat['Name'] }} - {{ stat['Value'] }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="index_controls">
            <p @click="decrement">arrow</p>
            <p @click="increment">arrow</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.all_builds{
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