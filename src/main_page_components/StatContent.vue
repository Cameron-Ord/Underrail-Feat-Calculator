<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useStatStore } from '../stores/stat_state_store';

const stat_store_instance = useStatStore();
let stat_items_array = ref(stat_store_instance.state.stat_items_array);
let stat_count_limiter = ref(stat_store_instance.state.stat_count_limiter);
const stats = stat_store_instance.state.stats_list;

watch(()=> stat_store_instance.state.stat_count_limiter, (newVal) =>{
    stat_count_limiter.value = newVal
    console.log(stat_count_limiter.value, "new value")
})

watch(()=> stat_store_instance.state.stat_items_array, (newVal) =>{
    stat_items_array.value = newVal
    console.log(stat_items_array.value)
})

const increaseValue=(i)=>{
    if (stat_count_limiter.value >= 21 && stat_count_limiter.value < 46) {
        if (stat_store_instance.state.stat_items_array[i].statValue < 20) {
            stat_store_instance.state.stat_items_array[i].statValue++;
            stat_store_instance.state.stat_count_limiter++;
        }
    }
}
const decreaseValue=(i)=>{
    if (stat_count_limiter.value > 21 && stat_count_limiter.value <= 46) {
        if (stat_store_instance.state.stat_items_array[i].statValue > 3) {
            stat_store_instance.state.stat_items_array[i].statValue--;
            stat_store_instance.state.stat_count_limiter--;
        }
    }
}
const set_default_values = () =>{
    const stat_limiter = 35;
    const stat_items = [];
    for(let i = 0; i < stat_store_instance.state.stats_list.length; i++){
        const stat = stat_store_instance.state.stats_list[i];
        stat_items.push({
            statName: stat,
            statValue: 5
        });
    }
    stat_store_instance.state.stat_count_limiter = stat_limiter;
    stat_store_instance.state.stat_items_array = stat_items;
}

onBeforeMount(()=>{
    set_default_values()
})

</script>

<template>
    <div class="_stat_content" v-if="stat_items_array !== null">
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
._stat_content{
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
            >._stat_values{
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