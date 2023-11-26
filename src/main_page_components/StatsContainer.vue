<script setup>
import StatContent from './StatContent.vue';
import ViewSkills from './ViewSkills.vue';
import ResetStats from './ResetStats.vue';
</script>

<template>
    <div>
        <stat-content></stat-content>
        <view-skills></view-skills>
        <reset-stats></reset-stats>
    </div>
</template>

<script>
    export default {
        components:{
            ViewSkills,ResetStats,StatContent
        }
    }
</script>

<style lang="scss" scoped>

</style>