<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useSkillStore } from '../stores/skill_state_store';
const skill_store_instance = useSkillStore();
let skill_items_array = ref(skill_store_instance.state.skill_items_array);
let skill_count_limiter = ref(skill_store_instance.state.skill_count_limiter);
const skills = skill_store_instance.state.skills_list;


watch(()=> skill_store_instance.state.skill_count_limiter, (newVal) =>{
    skill_count_limiter.value = newVal
    console.log(skill_count_limiter.value, "new value")
})

watch(()=> skill_store_instance.state.skill_items_array, (newVal) =>{
    skill_items_array.value = newVal
    console.log(skill_items_array.value)
})

const increaseValue=(i)=>{
    if (skill_count_limiter.value >= 0 && skill_count_limiter.value < 1280) {
        if (skill_store_instance.state.skill_items_array[i].skillValue < 160) {
            skill_store_instance.state.skill_items_array[i].skillValue+=5;
            skill_store_instance.state.skill_count_limiter+=5;
        }
    }
}
const decreaseValue=(i)=>{
    if (skill_count_limiter.value > 0 && skill_count_limiter.value <= 1280) {
        if (skill_store_instance.state.skill_items_array[i].skillValue > 0) {
            skill_store_instance.state.skill_items_array[i].skillValue-=5;
            skill_store_instance.state.skill_count_limiter-=5;
        }
    }
}

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
onBeforeMount(()=>{
    set_default_values()
})
</script>
<template>
    <div class="skillsParent" v-if="skill_items_array !== null">
      <span class="btnSpan">
        <div class="skillsContainer" v-for="(value, i) in skill_items_array" :key="i">
          <div class="nameSeperator">
            <p class="skillName">{{ skills[i] }}</p>
          </div>
          <div class="skillSeperator">
            <h3 class="value">{{ value.skillValue }}</h3>
            <img
              src="images/plus.svg"
              alt="plus"
              class="plus"
              @click="increaseValue(i)"
              :clicked_plus="i"
              ref="plusClicked"
            />
            <img
              src="images/minus.svg"
              alt="minus"
              class="minus"
              @click="decreaseValue(i)"
              :clicked_minus="i"
              ref="minusClicked"
            />
          </div>
        </div>
        <div class="skill_counter">
            <p class="skill_pts_used">Skill Points used: {{ skill_count_limiter }}</p>
        </div>
      </span>
    </div>
  </template>

<style lang="scss" scoped>

</style>