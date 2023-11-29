<script setup>
import {inject} from 'vue'
import { useCookies } from 'vue3-cookies';
import { useFeatStore } from '../stores/feat_store';
import axios from 'axios';
const {cookies} = useCookies()
const feat_store_instance = useFeatStore();
const updateFeatsAreLoaded = inject('updateFeatsAreLoaded');
const updateSvgsAreLoaded = inject('updateSvgsAreLoaded');

const set_grid = () => {
    if(feat_store_instance.state.feats_list !== undefined 
    && feat_store_instance.state.svg_list !== undefined){
        let page_main = document.querySelector('._page_main');
        let calc_wrapper = document.querySelector('._calc_wrapper');

        page_main['style']['grid-template-rows'] = '1fr 0.5fr';
        calc_wrapper['style']['grid-template-rows'] = '1fr 0.5fr';
    }
}

const make_visible = () => {
    if(feat_store_instance.state.feats_list !== undefined 
    && feat_store_instance.state.svg_list !== undefined){
        updateFeatsAreLoaded(true)
        updateSvgsAreLoaded(true)
    }
}

const invoke_axios = (stat_items, skill_items) =>{
    return new Promise((resolve, reject) => {
        axios({
        url:`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/calculate`,
        method: "POST",
        data:{
            stats:stat_items,
            skills:skill_items
        }
        }).then((response)=>{
            const response_data = response['data'];
            resolve(response_data);
        }).catch((error)=>{
            reject(error);
        })
    })
}

const generate_feat_list = async () =>  {
    try {
        cookies.remove('chosen_feats');
        const stat_items = cookies.get('stat_array_values');
        const skill_items = cookies.get('skill_array_values');
        const response_data = await invoke_axios(JSON.parse(stat_items), JSON.parse(skill_items));
        
        const plus = 'images/plus.svg';
        let initialized_button_array = [] 
        let i = 0;
        while (i < response_data.length)
        {
            initialized_button_array.push(plus);
            i++;
        }

        feat_store_instance.state.svg_list = initialized_button_array;
        feat_store_instance.state.feats_list = response_data;
        make_visible();
        set_grid();

    } catch (error) {
        console.error('Failed to resolve promise: ',error);
    }
}

</script>

<template>
    <div class="feat_gen_">
        <h3 @click="generate_feat_list" class="generate_button" ref="generate">Generate Feats</h3>
    </div>
</template>

<style lang="scss" scoped>
.feat_gen_{
    display: grid;
    align-items: center;
    justify-items: center;
    >h3{
        text-align: center;
    }
}
</style>