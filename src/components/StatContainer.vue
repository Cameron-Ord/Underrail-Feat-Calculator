<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { stat_state } from '../stores/stat_state'
const stat_inst = stat_state();
const stat_list: Ref<Array<{statName: string; statValue: number}>> = ref(new Array())

const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

const decrease_stat = (i: number, event: MouseEvent | null) =>{
    const lmtr: number = stat_inst.get_limiter_value();
    const s_len: number = stat_inst.get_stat_list_len();
    if(i > s_len || i < 0){
        return
    }
    if(!event){
        return
    }
    if(lmtr > 21 && lmtr <= 46){
        stat_inst.decrease_stat(i, event);
        const new_list = stat_inst.get_stat_list();
        stat_list.value = new Array();
        stat_list.value = new_list;
    }
}

const increase_stat = (i: number, event: MouseEvent | null) => {
    const lmtr: number = stat_inst.get_limiter_value();
    const s_len: number = stat_inst.get_stat_list_len();
    if(i > s_len || i < 0){
        return
    }
    if(!event){
        return
    }
    if(lmtr >= 21 && lmtr < 46){
        stat_inst.increase_stat(i, event);
        const new_list = stat_inst.get_stat_list();
        stat_list.value = new Array();
        stat_list.value = new_list;
    }
}

onBeforeMount(()=>{
    stat_list.value = stat_inst.get_stat_list();
})

</script>

<template>
    <div class="stats_div">
        <div v-for="(stat, i) in stat_list" :key="i" class="loop_div">
            <p class="stat_name">{{ stat.statName }}</p>
            <div class="icon_value_div">
                <p>{{ stat.statValue }}</p>
                <img @click="increase_stat(i, $event)" :src="plus" alt="" class="svg">
                <img @click="decrease_stat(i, $event)" :src="minus" alt="" class="svg">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.stats_div{
    display: grid;
    width: 80%;
    row-gap: 25px;
    overflow-y: auto;
    max-height: 350px;
    >.loop_div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 25px;
        row-gap: 5px;
        >.stat_name{
            max-width: 125px;
        }
        >.icon_value_div{
            align-items: center;
            display: flex;
            flex-direction: row;
            column-gap: 15px;
            justify-content: space-evenly;
        }
    }
}
</style>