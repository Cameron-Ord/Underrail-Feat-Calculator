<script setup>
import { useCookies } from 'vue3-cookies';
import { onMounted, ref, watch } from 'vue';
import { useSkillStore } from '../stores/skill_state_store';
const skill_store_instance = useSkillStore();
const {cookies} = useCookies()

let skill_items_array = ref(skill_store_instance.state.skill_items_array);
let skill_count_limiter = ref(skill_store_instance.state.skill_count_limiter);
const skills = skill_store_instance.state.skills_list;
const increm_interval = ref(null);
const decrem_interval = ref(null);

watch(()=> skill_store_instance.state.skill_count_limiter, (newVal) =>{
    skill_count_limiter.value = newVal
    set_cookies();
})
watch(()=> skill_store_instance.state.skill_items_array, (newVal) =>{
    skill_items_array.value = newVal
    set_cookies();
})
const set_cookies = () =>{
    cookies.set('skill_count_limiter', JSON.stringify(skill_count_limiter.value));
    cookies.set('skill_array_values', JSON.stringify(skill_items_array.value));
}
const increaseValue=(i, event)=>{
    if(event.type !== "click"){
        return
    }
    event.target.style.width = '34px';
    event['target']['style']['background-color'] = 'var(--orange_rgba)';
    const max_points = 1280;
    if (skill_count_limiter.value >= 0 && skill_count_limiter.value < 1280) {
        const current_skill_value = skill_store_instance.state.skill_items_array[i].skillValue;
        const maximum_increase = Math.min(max_points - skill_count_limiter.value, 160 - current_skill_value);
        if(maximum_increase > 0){
            let updated_limiter = skill_count_limiter.value
            const updated_array = [...skill_items_array.value];
            let increase_amount;
            if(event.shiftKey){
                increase_amount = Math.min(5, maximum_increase);
            } else if(event.ctrlKey){
                increase_amount = Math.min(80, maximum_increase);
            } else {
                increase_amount = Math.min(1, maximum_increase);
            }
            updated_array[i].skillValue+=increase_amount;
            updated_limiter+=increase_amount;
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter;
        }
    }
    setTimeout(()=>{
        event.target.style.width = '';
        event['target']['style']['background-color'] = '';
    }, 175);
}
const decreaseValue=(i,event)=>{
    if(event.type !== "click"){
        return
    }
    event.target.style.width = '34px';
    event['target']['style']['background-color'] = 'var(--orange_rgba)';

    const minSkillValue = 0
    if (skill_count_limiter.value > 0 && skill_count_limiter.value <= 1280) {
        const current_skill_value = skill_store_instance.state.skill_items_array[i].skillValue;
        if(current_skill_value > minSkillValue){
            let updated_limiter = skill_count_limiter.value;
            const updated_array = [...skill_items_array.value];
            let decrease_amount;
            if(event.shiftKey){
                decrease_amount = Math.min(5, current_skill_value);
            } else if(event.ctrlKey){
                decrease_amount = Math.min(80, current_skill_value);
            } else {
                decrease_amount = Math.min(1, current_skill_value);
            }
            updated_array[i].skillValue-=decrease_amount;
            updated_limiter-=decrease_amount;
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter;
        }
    }
    setTimeout(()=>{
        event.target.style.width = '';
        event['target']['style']['background-color'] = '';
    }, 175);
}


const increase_updater = (i) =>{
    const max_points = 1280;
    if (skill_count_limiter.value >= 0 && skill_count_limiter.value < 1280) {
        const current_skill_value = skill_store_instance.state.skill_items_array[i].skillValue;
        const maximum_increase = Math.min(max_points - skill_count_limiter.value, 160 - current_skill_value);
        if(maximum_increase > 0){
            let updated_limiter = skill_count_limiter.value
            const updated_array = [...skill_items_array.value];
            let increase_amount;
            increase_amount = Math.min(5, maximum_increase);
            updated_array[i].skillValue+=increase_amount;
            updated_limiter+=increase_amount;
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter;
        }
    }
}
const decrease_updater = (i) =>{
    const minSkillValue = 0
    if (skill_count_limiter.value > 0 && skill_count_limiter.value <= 1280) {
        const current_skill_value = skill_store_instance.state.skill_items_array[i].skillValue;
        if(current_skill_value > minSkillValue){
            let updated_limiter = skill_count_limiter.value;
            const updated_array = [...skill_items_array.value];
            let decrease_amount;
            decrease_amount = Math.min(5, current_skill_value);
            updated_array[i].skillValue-=decrease_amount;
            updated_limiter-=decrease_amount;
            skill_store_instance.state.skill_items_array = updated_array;
            skill_store_instance.state.skill_count_limiter = updated_limiter;
        }
        
    }
}

const increase_mobile = (i, event) =>{
    if(event.type !== "touchstart"){
        return
    }
    event.target.style.width = '34px'
    increm_interval.value = setInterval(()=>{
        increase_updater(i)       
    }, 150);
}

const decrease_mobile = (i, event) =>{
    if(event.type !== "touchstart"){
        return
    }
    event.target.style.width = '34px'
    decrem_interval.value = setInterval(()=>{
        decrease_updater(i)       
    }, 150);
}
const end_increase = (event) =>{
    if(event.type !== "touchend"){
        return
    }
    clearInterval(increm_interval.value);
    increm_interval.value = null;
    event.target.style.width = ''
}

const end_decrease = (event) =>{
    if(event.type !== "touchend"){
        return
    }
    clearInterval(decrem_interval.value);
    decrem_interval.value = null;
    event.target.style.width = ''
}



onMounted(()=>{
    setTimeout(()=>{
        let page = document.querySelector('._skill_content');
        if(page !== null){
            page['style']['opacity'] = '1';
        }
    },125)
})

</script>
<template>
    <div class="_skill_content" v-if="skill_items_array !== null">
        <h2 class="limit_counter">Skill Points used: {{ skill_count_limiter }}/1280</h2>
        <span class="element_wrapper">
            <div class="_loop_div" v-for="(value, i) in skill_items_array" :key="i">
                <p class="_skill_tag">{{ skills[i] }}</p>
                <div class="_skill_values">
                    <h3 class="_value">{{ value.skillValue }}</h3>
                    <img
                        src="/images/plus.svg"
                        alt="plus"
                        class="_plus"
                        @click="increaseValue(i,$event)"
                        @touchstart.prevent="increase_mobile(i, $event)"
                        @touchend.prevent="end_increase($event)"
                        :clicked_plus="i"
                        ref="_plus_svg"
                    />
                    <img
                        src="/images/minus.svg"
                        alt="minus"
                        class="_minus"
                        @click="decreaseValue(i,$event)"
                        @touchstart.prevent="decrease_mobile(i, $event)"
                        @touchend.prevent="end_decrease"
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
    opacity: 0;
    transition: 0.3s ease-in-out;
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    row-gap: 25px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;


    >.limit_counter{
        justify-self: center;
        text-align: center;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    >.element_wrapper{
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-columns: 1fr;
        row-gap: 25px;
        height: 300px;
        overflow-y: auto;
        padding-top: 10px;
        padding-bottom: 10px;
        >._loop_div{
            text-align: center;
            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
            justify-items: center;
            grid-template-rows: auto;
            row-gap: 15px;
            width: 90%;


            >._skill_tag{
                padding-top: 2.5px;
                padding-bottom: 2.5px;
                padding-left: 5px;
                padding-right: 5px;
                font-weight: 600;
            }
            
            >._skill_values{
                display: grid;
                align-items: center;
                justify-items: center;
                grid-template-columns: 1fr 1fr 1fr;
                width: 90%;
                max-width: 190px;
                padding-top: 2.5px;
                padding-bottom: 2.5px;

                >._plus{
                    padding: 2.5px;
                    transition: 0.3s ease;
                    border: solid var(--orange) 1px;
                    border-radius: 6px;
                }
                >._minus{
                    padding: 2.5px;
                    transition: 0.3s ease-in-out;
                    border: solid var(--orange) 1px;
                    border-radius: 6px;
                }
            }
        }
    }
}
@media only screen and (min-width: 770px){
    ._skill_content{

    >.limit_counter{
    }
    >.element_wrapper{
        width: 90%;
        height: 400px;
        justify-self: center;
        grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
        >._loop_div{
            >._skill_tag{
            }
            
            >._skill_values{
                >._plus{
                }
                >._minus{
                }
            }
        }
    }
}
}

@media only screen and (min-width: 1024px){
    ._skill_content{
        row-gap: 50px;
        justify-items: center;
>.limit_counter{
}
>.element_wrapper{
    width: 75%;
    height: 450px;
    grid-template-columns: repeat(auto-fit,minmax(600px,1fr));
    >._loop_div{
        >._skill_tag{
        }
        
        >._skill_values{
            >._plus{
            }
            >._minus{
            }
        }
    }
}
}
}
</style>
