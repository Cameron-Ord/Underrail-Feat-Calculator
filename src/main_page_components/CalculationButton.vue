<script setup>
import {inject, ref} from 'vue'
import { useCookies } from 'vue3-cookies';
import { useFeatStore } from '../stores/feat_store';
import axios from 'axios';
const {cookies} = useCookies()
const feat_store_instance = useFeatStore();
const updateFeatsAreLoaded = inject('updateFeatsAreLoaded');
const updateSvgsAreLoaded = inject('updateSvgsAreLoaded');
const status = ref(undefined);
const set_grid = () => {
    let page_main = document.querySelector('._page_main');
    let calc_wrapper = document.querySelector('._calc_wrapper');

    if(window.innerWidth < 1024){
        page_main['style']['row-gap'] = "50px"
        page_main['style']['grid-template-rows'] = 'auto auto';
        calc_wrapper['style']['row-gap'] = '25px';
    } else if(window.innerWidth >= 1024){
        calc_wrapper['style']['row-gap'] = '25px';
    }
}

const reset_grid = () => {
    let page_main = document.querySelector('._page_main');
    let calc_wrapper = document.querySelector('._calc_wrapper');

    if(window.innerWidth < 1024){
        page_main['style']['grid-template-rows'] = '';
        calc_wrapper['style']['row-gap'] = '';
    } else if(window.innerWidth >= 1024){
        calc_wrapper['style']['row-gap'] = '';
    }
}

const make_visible = (sent_bool) => {
    updateFeatsAreLoaded(sent_bool)
    updateSvgsAreLoaded(sent_bool)
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

const status_fade_in = () =>{
    setTimeout(()=>{
        let status_tag = document.querySelector('.status_text');
        status_tag.style.opacity = "1";
    }, 100);
}

const status_fade_out = () =>{
    setTimeout(()=>{
        let status_tag = document.querySelector('.status_text');
        status_tag.style.opacity = "0";

        setTimeout(()=>{
            status.value = undefined
        }, 500)
    }, 1500)
}


const move_viewpoint = () =>{
    setTimeout(()=>{
        const calc_button = document.querySelector('.generate_button');
        if(calc_button){
            const element_rect = calc_button.getBoundingClientRect();
            const element_y = window.scrollY + element_rect.top;
            window.scrollTo({
                top:element_y,
                behavior:'smooth',
            });
        }
    },100);
}

const generate_feat_list = async () =>  {

    cookies.remove('chosen_feats');
    const bool = feat_store_instance.mutators.update_can_save_build(false);
    feat_store_instance.state.can_save_build = bool;
    const [stat_items, skill_items] = retrieve_cookies();
    let response;
    if(stat_items.length > 0 && skill_items.length > 0){
        try{
                response = await invoke_axios(stat_items, skill_items);
        } catch (error) {
            console.log("failed to resolve promise");
            feat_store_instance.state.svg_list = undefined;
            feat_store_instance.state.feats_list = undefined;
            make_visible(false);
            reset_grid();
            return
        }
    } else {
        return
    }

    if(response.statusText !== "OK"){
        feat_store_instance.state.svg_list = undefined;
        feat_store_instance.state.feats_list = undefined;
        make_visible(false);
        reset_grid();
        return
    }

    if(response['data'] === null){
        status.value = {"Status":"Calculation returned 0 results"};
        status_fade_in()
        status_fade_out()
        feat_store_instance.state.svg_list = undefined;
        feat_store_instance.state.feats_list = undefined;
        make_visible(false);
        reset_grid();
        return
    } else if (response.status > 300) {
        feat_store_instance.state.svg_list = undefined;
        feat_store_instance.state.feats_list = undefined;
        make_visible(false);
        reset_grid();
        return
    }
    
    const response_data = response['data'];
    const initialized_button_array = create_buttons(response_data)
    if(response_data.length > 0 && initialized_button_array.length > 0){
        feat_store_instance.state.svg_list = initialized_button_array;
        feat_store_instance.state.feats_list = response_data;
        if(feat_store_instance.state.svg_list !== undefined
        && feat_store_instance.state.feats_list !== undefined){
            make_visible(true);
            set_grid();
            move_viewpoint()
        }
    }
}    


</script>

<template>
    <h4 class="status_text" v-if="status !== undefined">{{ status["Status"] }}</h4>
    <h3 @click="generate_feat_list" class="generate_button" ref="generate">Generate Feats</h3>
</template>

<style lang="scss" scoped>
.status_text{
    justify-self: center;
    text-align: center;
    opacity: 0;
    transition: 0.3s ease-in-out;
    padding-top: 10px;
    padding-bottom: 10px;
}
h3{
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
    border: solid var(--orange) 1px;
    border-radius: 10px;
    cursor: pointer;
    justify-self: center;
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>