<script setup>
import { useSkillStore } from '../stores/skill_state_store';
import { useCookies } from 'vue3-cookies';
import { inject, onMounted } from 'vue';
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
        const top = document.querySelector('body');
        if(top){
            window.scrollTo({
                top:0,
                behavior:'smooth',
            });
        }
    },175)
}

const set_default_values = (event) =>{
    if(window.innerWidth < 1024){
        event.target.style['font-size'] = '1.10rem';
        event['target']['style']['background-color'] = 'var(--orange_rgba)';
    } else if(window.innerWidth >= 1024){
        event.target.style['font-size'] = '1.25rem';
        event['target']['style']['background-color'] = 'var(--orange_rgba)';
    }
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
    setTimeout(()=>{
        event.target.style['font-size'] = '';
        event['target']['style']['background-color'] = '';
    }, 300);
}


onMounted(()=>{
    let reset_tag = document.querySelector('.skill_reset_tag');
    setTimeout(()=>{
    if(reset_tag !== null){
        reset_tag.style.opacity = '1';
    }
    }, 100);
})
</script>

<template>
    <h3 @click="set_default_values($event)" class="skill_reset_tag">Reset Skills</h3>
</template>

<style lang="scss" scoped>
h3{
    opacity: 0;
    transition: 0.3s ease-in-out;
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
