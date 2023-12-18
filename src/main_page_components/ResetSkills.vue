<script setup>
import { useSkillStore } from '../stores/skill_state_store';
import { useCookies } from 'vue3-cookies';
import { inject } from 'vue';
import { useFeatStore } from '../stores/feat_store';
const feat_store_instance = useFeatStore();
const skill_store_instance = useSkillStore();
const {cookies} = useCookies();
const updateFeatsAreLoaded = inject('updateFeatsAreLoaded');


const reset_grid=()=>{
    let page_main = document.querySelector('._page_main');
    let calc_wrapper = document.querySelector('._calc_wrapper');
    page_main['style']['grid-template-rows'] = '';
    calc_wrapper['style']['grid-template-rows'] = '';
}

const go_to_top=()=>{
    setTimeout(()=>{
        const top = document.querySelector('._sheet_wrapper');
        if(top){
            const element_rect = top.getBoundingClientRect();
            const element_y = window.scrollY + element_rect.top;
            window.scrollTo({
                top:element_y,
                behavior:'smooth',
            });
        }
    },100)
}

const set_default_values = () =>{
    updateFeatsAreLoaded(false);
    const false_bool = false
    feat_store_instance.state.can_save_build = false_bool;
    const chosen_feats = cookies.get('chosen_feats');
    if(JSON.parse(chosen_feats) !== null){
        cookies.remove('chosen_feats');
    }
    const skill_limiter = 0;
    const skill_items = [];
    for(let i = 0; i < skill_store_instance.state.skills_list.length; i++){
        const skill = skill_store_instance.state.skills_list[i];
        skill_items.push({
            skillName: skill,
            skillValue: 0
        });
    }
    skill_store_instance.state.skill_count_limiter = skill_limiter;
    skill_store_instance.state.skill_items_array = skill_items;
    reset_grid()
    go_to_top()
}
</script>

<template>
    <h3 @click="set_default_values">Reset Skills</h3>
</template>

<style lang="scss" scoped>
h3{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
    border: solid var(--orange) 1px;
    border-radius: 10px;
    cursor: pointer;
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>