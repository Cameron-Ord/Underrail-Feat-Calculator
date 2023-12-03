<script setup>
import { useCookies } from 'vue3-cookies';
import { ref, watch } from 'vue';
import { useStatStore } from '../stores/stat_state_store';
const {cookies} = useCookies()
const stat_store_instance = useStatStore();
let stat_items_array = ref(stat_store_instance.state.stat_items_array);
let stat_count_limiter = ref(stat_store_instance.state.stat_count_limiter);
const stats = stat_store_instance.state.stats_list;

watch(()=> stat_store_instance.state.stat_count_limiter, (newVal) =>{
    stat_count_limiter.value = newVal
    console.log('SET:', newVal)
    set_cookies()
})

watch(()=> stat_store_instance.state.stat_items_array, (newVal) =>{
    stat_items_array.value = newVal
    console.log('SET:', newVal)
    set_cookies()
})
const set_cookies = () =>{
    console.log('setting cookies')
    cookies.set('stat_count_limiter', JSON.stringify(stat_count_limiter.value));
    cookies.set('stat_array_values', JSON.stringify(stat_items_array.value));
}
const increaseValue=(i)=>{
    if (stat_count_limiter.value >= 21 && stat_count_limiter.value < 46) {
        if (stat_store_instance.state.stat_items_array[i].statValue < 20) {
            let updated_limiter = stat_count_limiter.value;
            const updated_array = [...stat_items_array.value];
            updated_array[i].statValue++;
            updated_limiter++;
            stat_store_instance.state.stat_items_array = updated_array;
            stat_store_instance.state.stat_count_limiter = updated_limiter;
        }
    }
}
const decreaseValue=(i)=>{
    if (stat_count_limiter.value > 21 && stat_count_limiter.value <= 46) {
        if (stat_store_instance.state.stat_items_array[i].statValue > 3) {
            let updated_limiter = stat_count_limiter.value
            const updated_array = [...stat_items_array.value];
            updated_array[i].statValue--;
            updated_limiter--;
            stat_store_instance.state.stat_items_array = updated_array;
            stat_store_instance.state.stat_count_limiter = updated_limiter;
        }
    }
}

</script>

<template>
    <div class="_stat_content" v-if="stat_items_array !== null || stat_items_array !== undefined">
        <div class="limit_counter">
            <h3>Stat Points used: {{ stat_count_limiter -21  }}/25</h3>
        </div>
        <span class="element_wrapper">
            <div class="_loop_div" v-for="(value, i) in stat_items_array" :key="i">
                <div class="_header">
                    <p class="_stat_tag">{{ stats[i] }}</p>
                </div>
                <div class="_stat_values">
                    <h3 class="_value">{{ value.statValue }}</h3>
                    <img
                        src="/images/plus.svg"
                        alt="plus"
                        class="_plus"
                        @click="increaseValue(i)"
                        :clicked_plus="i"
                        ref="_plus_svg"
                    />
                    <img
                        src="/images/minus.svg"
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
._stat_content{
    display: grid;
    align-items: center;
    grid-template-rows: auto;
    row-gap: 50px;
    

    >.limit_counter{
        display: grid;
        align-items: center;
        justify-items: center;
        text-align: center;
        >h3{
            padding-top: 5px;
            padding-bottom: 5px;
            border-bottom:solid var(--orange) 1px;
            border-top:solid var(--orange) 1px;
        }
    }
    >.element_wrapper{
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
        height: 350px;
        overflow-y: auto;
        box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.5);
        border-top: solid var(--orange) 1px;
        border-bottom: solid var(--orange) 1px;
        padding-top: 10px;
        padding-bottom: 10px;

        >._loop_div{

            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
            justify-items: center;
            grid-template-rows: auto;
            row-gap: 15px;
            

            >._header{
                display: grid;
                align-items: center;
                justify-items: center;
                font-weight: 600;
                >._stat_tag{
                    padding-top: 2.5px;
                    padding-bottom: 2.5px;
                    padding-left: 5px;
                    padding-right: 5px;
                }

            }
            >._stat_values{
                display: grid;
                align-items: center;
                justify-items: center;
                grid-template-columns: 1fr 1fr 1fr;
                width: 80%;
                padding-top: 2.5px;
                padding-bottom: 2.5px;

                >._plus{
                    border: solid var(--orange) 1px;
                    box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.10);
                }
                >._minus{
                    box-shadow: 0 0 5px 2.5px rgba(226, 113, 0, 0.10);
                    border: solid var(--orange) 1px;
                }
            }
        }
    }
}
</style>