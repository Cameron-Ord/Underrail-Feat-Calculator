<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios'
import { stat_state } from '../stores/stat_state';
import { skill_state } from '../stores/skill_state';
import { types_state } from '../stores/types_state';
import { feats_state } from '../stores/feats_state'
const stat_inst = stat_state();
const skill_inst = skill_state();
const type_inst = types_state(); 
const feats_inst = feats_state();

const send_data = () =>{
    return new Promise<AxiosResponse>((resolve, reject) => {
        axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/calculate`, {
            stats:stat_inst.get_stat_list(),
            skills:skill_inst.get_skill_list(),
            type:type_inst.get_chosen()
            }).then((response)=>{
                resolve(response);
            }).catch((error)=>{
                reject(error);
        })
    }) 
}

const generate_list = async () =>{
    try {
        const response: AxiosResponse = await send_data();
        if(response.statusText == "OK"){
            feats_inst.set_feats(response.data)
        }   
    } catch (error) {
        console.error("Error:", error)
    }
}

</script>

<template>
    <article class="generator_article">
        <p @click="generate_list">Generate</p>
    </article>
</template>

<style lang="scss" scoped>

</style>