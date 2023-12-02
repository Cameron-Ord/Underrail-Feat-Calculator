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
}
</script>

<template>
    <div class="reset_btn_div">
        <h3 @click="set_default_values">Reset Skills</h3>
    </div>
</template>

<style lang="scss" scoped>
.reset_btn_div{
    display: grid;
    align-items: center;
    justify-items: center;
}
</style>