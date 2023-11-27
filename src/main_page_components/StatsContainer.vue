<script setup>
import StatContent from './StatContent.vue';
import ViewSkills from './ViewSkills.vue';
import ResetStats from './ResetStats.vue';
</script>
<script>
    export default {
        components:{
            ViewSkills,ResetStats,StatContent
        },
        methods:{
            emit_to_main(stats_ref_text){
                this.$emit('view-skills', stats_ref_text);
            }
        }
    }
</script>
<template>
    <div class="stats_cont_wrapper">
        <stat-content></stat-content>
        <div class="controls_wrapper">
            <view-skills @send_input="emit_to_main"></view-skills>
            <reset-stats></reset-stats>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.stats_cont_wrapper{
    display: grid;
    align-items: center;
    grid-template-rows: 1fr 0.5fr;
    >.controls_wrapper{
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(125px,1fr));
    }
}
</style>