<script setup>
import StatContent from './StatContent.vue';
import ViewSkills from './ViewSkills.vue';
import ResetStats from './ResetStats.vue';
</script>

<template>
    <div>
        <stat-content></stat-content>
        <view-skills @send_input="emit_to_main"></view-skills>
        <reset-stats></reset-stats>
    </div>
</template>

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

<style lang="scss" scoped>

</style>