<script setup>
import {inject, nextTick, ref} from 'vue'
import { useCookies } from 'vue3-cookies';
import { useFeatStore } from '../stores/feat_store';
import { useSkillStore } from '../stores/skill_state_store';
import { useStatStore } from '../stores/stat_state_store';
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
        calc_wrapper['style']['row-gap'] = '50px';
    } else if(window.innerWidth >= 1024){
        calc_wrapper['style']['row-gap'] = '50px';
    }
    let feat_page = document.querySelector('.span_height');
        if(feat_page !== null){
            feat_page['style']['transition'] = '0.6s ease-in-out';

            nextTick(()=>{
                setTimeout(()=>{
                    feat_page['style']['opacity'] = '1';
                },600)
            })
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

const invoke_axios = (stat_items, skill_items, char_type) =>{
    const method = 'POST';
    return new Promise((resolve, reject) => {
        axios({
        url:`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/calculate`,
        method: method,
        data:{
            stats:stat_items,
            skills:skill_items,
            type:char_type
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
    const char_type = cookies.get('char_types_array');
    try {
        const parsed_stat_items = JSON.parse(stat_items);
        const parsed_skill_items = JSON.parse(skill_items);
        let parsed_char_type = JSON.parse(char_type);

        if(parsed_char_type === null || parsed_char_type === undefined) {
            parsed_char_type = new Array
        }

        if(parsed_skill_items === null || parsed_stat_items === null){
            return [[],[],[]]
        } else {
            return [parsed_stat_items, parsed_skill_items, parsed_char_type]
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
        if(status_tag !== null) {
            status_tag.style.opacity = "1";
        }
    }, 100);
}

const status_fade_out = () =>{
    setTimeout(()=>{
        let status_tag = document.querySelector('.status_text');
        if(status_tag !== null) {
            status_tag.style.opacity = "0";
        
            setTimeout(()=>{
                status.value = undefined
            }, 500)
        }
    }, 5000)
}

const reset_button = (event) => {
    setTimeout(()=>{
        event.target.style['font-size'] = '';
        event.target.style['background-color'] = ''
    }, 300)
}

const handle_fail = (event) => {
    status_fade_in()
    status_fade_out()
    feat_store_instance.state.svg_list = undefined;
    feat_store_instance.state.feats_list = undefined;
    make_visible(false);
    reset_grid();
    reset_button(event);
}

const reset_selection_items = () => {
    const skill_st = useSkillStore();
    const stat_st = useStatStore();
    
    const skill_actions = skill_st.actions
    const stat_actions = stat_st.actions
    
    const [stat_lmtr, stat_itms] = stat_actions.set_default_values();
    const [skill_lmtr, skill_itms] = skill_actions.set_default_values();
    
    stat_st.state.stat_count_limiter = stat_lmtr;
    stat_st.state.stat_items_array = stat_itms;
    skill_st.state.skill_count_limiter = skill_lmtr;
    skill_st.state.skill_items_array = skill_itms;
}

const generate_feat_list = async (event) =>  {

    let status_tag = document.querySelector('.status_text');
    if(status_tag !== null) {
        status_tag.style.opacity = '0';
        nextTick(()=>{
            setTimeout(()=>{
                status.value = undefined
            }, 300)
        })
    }

    let feat_page = document.querySelector('.span_height');
        if(feat_page !== null){
            feat_page['style']['opacity'] = '0';
            feat_page['style']['transition'] = 'none';
    }

    if(window.innerWidth < 1024) {
        event.target.style['font-size'] = '1.05rem';
        event.target.style['background-color'] = 'var(--orange_rgba)'
    } else if(window.innerWidth >= 1024){
        event.target.style['font-size'] = '1.15rem';
        event.target.style['background-color'] = 'var(--orange_rgba)'
    }

    cookies.remove('chosen_feats');
    const bool = false
    feat_store_instance.state.can_save_build = bool;
    const [stat_items, skill_items, char_types] = retrieve_cookies();
    
    let response;
    if(stat_items.length > 0 && skill_items.length > 0){
        try{
            response = await invoke_axios(stat_items, skill_items, char_types);
        } catch (error) {
            status.value = {"Status":"Failed to reach server"};
            handle_fail(event);
            return;
        }
    } else {
        status.value = {"Status":"Either stat or skill selection doesn't exist, selections have been reset. Enter your stats/skills and try again."};
        reset_selection_items();
        handle_fail(event);
        return;
    }

    if(response.statusText !== "OK"){
        status.value = {"Status":"Server response failed"};      
        handle_fail(event);
        return;
    }

    if(response['data'] === null){
        status.value = {"Status":"Calculation returned 0 results"};
        handle_fail(event);
        return;
    } else if (response.status > 300) {
        status.value = {"Status":"Server response failed"};
        handle_fail(event);
        return;
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
            reset_button(event);
        }
    }
}    

</script>

<template>
    <h4 class="status_text" v-if="status !== undefined">{{ status["Status"] }}</h4>
    <h3 @click="generate_feat_list($event)" class="generate_button" ref="generate">Generate Feats</h3>
</template>

<style lang="scss" scoped>
.status_text{
    justify-self: center;
    text-align: center;
    opacity: 0;
    transition: 0.3s ease-in-out;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 90%;
}
h3{
    transition: 0.5s ease-in-out;
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
