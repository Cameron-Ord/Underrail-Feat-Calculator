<script setup>
import { useCookies } from 'vue3-cookies';
import { onMounted, ref, watch } from 'vue';
import { useStatStore } from '../stores/stat_state_store';
const {cookies} = useCookies()
const stat_store_instance = useStatStore();
let stat_items_array = ref(stat_store_instance.state.stat_items_array);
let stat_count_limiter = ref(stat_store_instance.state.stat_count_limiter);
const stats = stat_store_instance.state.stats_list;
const increm_interval = ref(null);
const decrem_interval = ref(null);

watch(()=> stat_store_instance.state.stat_count_limiter, (newVal) =>{
    stat_count_limiter.value = newVal
    set_cookies()
})

watch(()=> stat_store_instance.state.stat_items_array, (newVal) =>{
    stat_items_array.value = newVal
    set_cookies()
})
const set_cookies = () =>{
    cookies.set('stat_count_limiter', JSON.stringify(stat_count_limiter.value));
    cookies.set('stat_array_values', JSON.stringify(stat_items_array.value));
}
const increaseValue=(i, event)=>{
    if(event.type !== "click"){
        return
    }
    event.target.style.width = '34px';
    event['target']['style']['background-color'] = 'var(--orange_rgba)';
    const max_points = 46;
    if (stat_count_limiter.value >= 21 && stat_count_limiter.value < 46) {
        const current_stat_value = stat_store_instance.state.stat_items_array[i].statValue;
        const maximum_increase = Math.min(max_points - stat_count_limiter.value, 20 - current_stat_value);   
        if(maximum_increase > 0) {
            let updated_limiter = stat_count_limiter.value;
            const updated_array = [...stat_items_array.value];
            let increase_amount;
            if(event.shiftKey === true){
                increase_amount = Math.min(5, maximum_increase);
            }else if(event.ctrlKey === true){
                increase_amount = Math.min(10, maximum_increase);
            }else{
                increase_amount = Math.min(1, maximum_increase);
            }
            updated_array[i].statValue += increase_amount;
            updated_limiter += increase_amount;
            stat_store_instance.state.stat_items_array = updated_array;
            stat_store_instance.state.stat_count_limiter = updated_limiter;
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
    const minStatValue = 3;
    if (stat_count_limiter.value > 21 && stat_count_limiter.value <= 46) {
        const currentStatValue = stat_store_instance.state.stat_items_array[i].statValue;
        if (currentStatValue > minStatValue) {
            let updatedLimiter = stat_count_limiter.value;
            const updatedArray = [...stat_items_array.value];
            let decreaseAmount;
            if (event.shiftKey) {
                decreaseAmount = Math.min(5, currentStatValue - minStatValue);
            } else if (event.ctrlKey) {
                decreaseAmount = Math.min(10, currentStatValue - minStatValue);
            } else {
                decreaseAmount = Math.min(1, currentStatValue - minStatValue);
            }

            updatedArray[i].statValue -= decreaseAmount;
            updatedLimiter -= decreaseAmount;

            stat_store_instance.state.stat_items_array = updatedArray;
            stat_store_instance.state.stat_count_limiter = updatedLimiter;
        }
    }
    setTimeout(()=>{
        event.target.style.width = '';
        event['target']['style']['background-color'] = '';
    }, 175);
}
const decrease_updater = (i) =>{
    const minStatValue = 3;
    if (stat_count_limiter.value > 21 && stat_count_limiter.value <= 46) {
        const currentStatValue = stat_store_instance.state.stat_items_array[i].statValue;
        if (currentStatValue > minStatValue) {
            let updatedLimiter = stat_count_limiter.value;
            const updatedArray = [...stat_items_array.value];
            let decreaseAmount;
            decreaseAmount = Math.min(1, currentStatValue - minStatValue);
            updatedArray[i].statValue -= decreaseAmount;
            updatedLimiter -= decreaseAmount;
            stat_store_instance.state.stat_items_array = updatedArray;
            stat_store_instance.state.stat_count_limiter = updatedLimiter;
        }
    }
}

const increase_updater = (i) =>{
    const max_points = 46;
    if (stat_count_limiter.value >= 21 && stat_count_limiter.value < 46) {
        const current_stat_value = stat_store_instance.state.stat_items_array[i].statValue;
        const maximum_increase = Math.min(max_points - stat_count_limiter.value, 20 - current_stat_value);   
        if(maximum_increase > 0) {
            let updated_limiter = stat_count_limiter.value;
            const updated_array = [...stat_items_array.value];
            let increase_amount;
            increase_amount = Math.min(1, maximum_increase);
            updated_array[i].statValue += increase_amount;
            updated_limiter += increase_amount;
            stat_store_instance.state.stat_items_array = updated_array;
            stat_store_instance.state.stat_count_limiter = updated_limiter;
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
        let page = document.querySelector('._stat_content');
        page['style']['opacity'] = '1';
    },125)
})

</script>

<template>
    <div class="_stat_content" v-if="stat_items_array !== null || stat_items_array !== undefined">
        <h2 class="limit_counter">Stat Points used: {{ stat_count_limiter -21  }}/25</h2>
        <span class="element_wrapper">
            <div class="_loop_div" v-for="(value, i) in stat_items_array" :key="i">
                <p class="_stat_tag">{{ stats[i] }}</p>
                <div class="_stat_values">
                    <h3 class="_value">{{ value.statValue }}</h3>
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
                        @touchend.prevent="end_decrease($event)"
                        :clicked_minus="i"
                        ref="_minus_svg"
                    />
                </div>
            </div>
        </span>
    </div>
</template>
<style lang="scss" scoped>
._stat_content{
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
        height: 500px;
        row-gap: 25px;
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
        
            >._stat_tag{
                font-weight: 600;
                padding-top: 2.5px;
                padding-bottom: 2.5px;
                padding-left: 5px;
                padding-right: 5px;
            }

        
            >._stat_values{
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
                    transition: 0.3s ease-in-out;
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
    ._stat_content{

    >.limit_counter{
    }
    >.element_wrapper{
        width: 90%;
        justify-self: center;
        grid-template-columns: repeat(auto-fit,minmax(300px,1fr));

        >._loop_div{
            >._stat_tag{
            }

        
            >._stat_values{
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
    ._stat_content{
        justify-items: center;
        row-gap: 50px;
>.limit_counter{
}
>.element_wrapper{
    height: 525px;
    width: 75%;
    grid-template-columns: repeat(auto-fit,minmax(600px,1fr));

    >._loop_div{
        >._stat_tag{
        }

    
        >._stat_values{
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