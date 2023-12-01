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
    let page_main = document.querySelector('._page_main');
    let calc_wrapper = document.querySelector('._calc_wrapper');

    page_main['style']['grid-template-rows'] = '1fr 0.75fr';
    calc_wrapper['style']['grid-template-rows'] = '1fr 0.5fr';
}

const make_visible = () => {
    updateFeatsAreLoaded(true)
    updateSvgsAreLoaded(true)
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
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    })
}

const retrieve_cookies = () => {
    const stat_items = cookies.get('stat_array_values');
    const skill_items = cookies.get('skill_array_values');
    try {
        const parsed_stat_items = JSON.parse(stat_items);
        const parsed_skill_items = JSON.parse(skill_items);
        if(parsed_skill_items === null || parsed_stat_items === null){
            return [[],[]]
        } else {
            return [parsed_stat_items, parsed_skill_items]
        }
    } catch (error) {
        console.log('Error parsing JSON')
        return [[],[]]
    }
}

const create_buttons = (response_data) => {
    const plus = '/images/plus.svg';
    const initialized_button_array = [] 
    let i = 0;
    while (i < response_data.length){
        initialized_button_array.push(plus);
        i++;
    }
    if(initialized_button_array.length > 0){
        return initialized_button_array
    } else {
        return []
    }
}

const generate_feat_list = async () =>  {
    try {
        cookies.remove('chosen_feats');
        const bool = feat_store_instance.mutators.update_can_save_build(false);
        feat_store_instance.state.can_save_build = bool;
        const [stat_items, skill_items] = retrieve_cookies();
        if(stat_items.length > 0 && skill_items.length > 0){
            const response = await invoke_axios(stat_items, skill_items);
            if(response.status >= 200 && response.status < 300){
                const response_data = response['data'];
                const initialized_button_array = create_buttons(response_data)
                if(response_data.length > 0 && initialized_button_array.length > 0){
                    feat_store_instance.state.svg_list = initialized_button_array;
                    feat_store_instance.state.feats_list = response_data;
                    if(feat_store_instance.state.svg_list !== undefined
                    && feat_store_instance.state.feats_list !== undefined){
                        make_visible();
                        set_grid();
                    }
                } else {
                    console.log('Query returned 0 results.')
                }
            }
        }        
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