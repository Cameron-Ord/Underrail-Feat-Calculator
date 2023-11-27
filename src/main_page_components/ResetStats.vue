
<script setup>
import { useStatStore } from '../stores/stat_state_store';
const stat_store_instance = useStatStore();
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
</script>

<template>
    <div class="reset_btn_div">
        <h3 @click="set_default_values">Reset Stats</h3>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.reset_btn_div{
    display: grid;
    align-items: center;
    justify-items: center;
}
</style>