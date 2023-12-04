
<script setup>
import { useStatStore } from '../stores/stat_state_store';
import { useCookies } from 'vue3-cookies';
import { inject } from 'vue';
import { useFeatStore } from '../stores/feat_store';
const feat_store_instance = useFeatStore();

const stat_store_instance = useStatStore();
const {cookies} = useCookies();
const updateFeatsAreLoaded = inject('updateFeatsAreLoaded');

const reset_grid=()=>{
    let page_main = document.querySelector('._page_main');
    let calc_wrapper = document.querySelector('._calc_wrapper');
    page_main['style']['grid-template-rows'] = '';
    calc_wrapper['style']['grid-template-rows'] = '';
}

const set_default_values = () =>{
    updateFeatsAreLoaded(false);
    const false_bool = false
    feat_store_instance.state.can_save_build = false_bool;
    const chosen_feats = cookies.get('chosen_feats');
    if(JSON.parse(chosen_feats) !== null){
        cookies.remove('chosen_feats');
    }
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
    reset_grid()
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
    >h3{
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom:solid var(--orange) 1px;
        border-top:solid var(--orange) 1px;
        cursor: pointer;
    }
}
@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>