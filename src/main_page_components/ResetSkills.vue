<script setup>
import { useSkillStore } from '../stores/skill_state_store';
const skill_store_instance = useSkillStore();
const set_default_values = () =>{
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