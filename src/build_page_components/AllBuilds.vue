
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
    if(response.statusText === "OK"){
        all_builds.value = response['data'];
        console.log(all_builds.value)
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
        <h3 class="build_title">{{ all_builds[index]['Build_Title'] }}</h3>
        <div class="loop_div"> 
            <div class="seperator" v-if="all_builds[index]['Feat_Slice'].length > 0">
                <h3 class="loop_header">FEATS:</h3>
                <div class="loop_container">
                    <p v-for="(feat, f) in all_builds[index]['Feat_Slice']" :key="f">{{ feat['Name'] }}</p>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[index]['Skill_Slice'].length > 0">
                <h3 class="loop_header">SKILLS:</h3>
                <div class="loop_container">
                    <p v-for="(skill, s) in all_builds[index]['Skill_Slice']" :key="s"> {{ skill['Name'] }} - {{ skill['Value'] }}</p>
                </div>
            </div>
            <div class="seperator" v-if="all_builds[index]['Stat_Slice'].length > 0">
                <h3 class="loop_header">STATS:</h3>
                <div class="loop_container">
                    <p v-for="(stat, t) in all_builds[index]['Stat_Slice']" :key="t">{{ stat['Name'] }} - {{ stat['Value'] }}</p>
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
.all_builds{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    width: 100%;
    row-gap: 25px;
    justify-items: center;

        >.build_title{
            justify-self: center;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 7.5px;
            padding-right: 7.5px;
            border: solid var(--orange) 1px;
            border-radius: 10px;
        }
        
    >.index_controls{
        justify-items: center;
        display: grid;
        align-items: center;
        row-gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
        width: 85%;
        >p{
            cursor: pointer;
            justify-self: center;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 7.5px;
            padding-right: 7.5px;
            border: solid var(--orange) 1px;
            border-radius: 10px;
        }
    }
    >.loop_div{
        width: 100%;
        display: grid;
        align-items: center;
        grid-template-rows: auto;
        row-gap:25px;
        padding-top: 25px;
        padding-bottom: 25px;

        >.seperator{
            width: 100%;
            display: grid;
            align-items: center;
            grid-template-rows: auto;
            row-gap: 25px;
            justify-items: center;

            >.loop_header{
                justify-self: center;
                text-align: center;
            }
            >.loop_container{
                text-align: center;
                width: 90%;
                display: grid;
                align-items: center;
                justify-items: center;
                grid-template-rows: auto;
                grid-template-columns: repeat(auto-fit, minmax(175px,1fr));
                row-gap: 10px;
                padding-top: 25px;
                padding-bottom: 25px;
                >p{
                    width: 100%;
                }
            }
        }
    }
}
@media only screen and (min-width: 770px){
    .all_builds{
    
    >.build_title{
    }
    
>.index_controls{
    width: 75%;
    >p{
    }
}
>.loop_div{

    >.seperator{
      
        >.loop_header{
        }
        >.loop_container{
            width: 80%;
            grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
            >p{
            }
        }
    }
}
}
}

@media only screen and (min-width: 1024px){
    .all_builds{
    
    >.build_title{
    }
    
>.index_controls{
    width: 45%;
    >p{
    }
}
>.loop_div{
    grid-template-columns: 1fr 1fr 1fr;

    >.seperator{
      
        >.loop_header{
        }
        >.loop_container{
            grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
            >p{
            }
        }
    }
}
}
}
</style>