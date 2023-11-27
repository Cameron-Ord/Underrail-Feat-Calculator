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
        //Creating copies of values and modifying them
            let updated_limiter = skill_count_limiter.value
            const updated_array = [...skill_items_array.value];
            updated_array[i].skillValue+=5;
            updated_limiter+=5;
        /*
          After being modified, 
          I assign them back to the state variables.*/
        /*
          This is done to maintain immutability,
          which is important to maintain when working with vue.
        */    
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter
        }
        /*
          Basically, I am simply avoiding direct 
          modifications/mutations with the variables
          I want to be reactive.
        */
    }
}
const decreaseValue=(i)=>{
    if (skill_count_limiter.value > 0 && skill_count_limiter.value <= 1280) {
        if (skill_store_instance.state.skill_items_array[i].skillValue > 0) {
            let updated_limiter = skill_count_limiter.value
            const updated_array = [...skill_items_array.value];
            updated_array[i].skillValue-=5;
            updated_limiter-=5;
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter;
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
    <div class="_skill_content" v-if="skill_items_array !== null">
        <div class="limit_counter">
            <h3>Stat Points used: {{ skill_count_limiter }}/1280</h3>
        </div>
        <span class="element_wrapper">
            <div class="_loop_div" v-for="(value, i) in skill_items_array" :key="i">
                <div class="_header">
                    <p class="_skill_tag">{{ skills[i] }}</p>
                </div>
                <div class="_skill_values">
                    <h3 class="_value">{{ value.skillValue }}</h3>
                <img
                    src="images/plus.svg"
                    alt="plus"
                    class="_plus"
                    @click="increaseValue(i)"
                    :clicked_plus="i"
                    ref="_plus_svg"
                />
                <img
                    src="images/minus.svg"
                    alt="minus"
                    class="_minus"
                    @click="decreaseValue(i)"
                    :clicked_minus="i"
                    ref="_minus_svg"
                />
                </div>
            </div>
        </span>
    </div>
  </template>

<style lang="scss" scoped>
._skill_content{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    gap: 50px;


    >.limit_counter{
        display: grid;
        align-items: center;
        justify-items: center;
        text-align: center;
    }
    >.element_wrapper{
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit,minmax(125px,1fr));
        grid-template-rows: auto;
        gap: 50px;
        height: 350px;
        overflow-y: auto;
        >._loop_div{
            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit,minmax(125px,1fr));


            >._header{
                display: grid;
                align-items: center;
                justify-items: center;

            }
            >._skill_values{
                display: grid;
                align-items: center;
                justify-items: center;
                grid-template-columns: 1fr 1fr 1fr;

                >._plus{

    }
                >._minus{

                }
            }
        }
    }
}
</style>