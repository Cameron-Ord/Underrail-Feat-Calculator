<script setup>
import SkillContent from './SkillContent.vue';
import ResetSkills from './ResetSkills.vue';
import ViewStats from './ViewStats.vue';
</script>

<template>
    <div>
        <skill-content></skill-content>
        <view-stats></view-stats>
        <reset-skills></reset-skills>
    </div>
</template>

<script>
    export default {
        components:{
            SkillContent,
            ResetSkills,
            ViewStats
        }
    }
</script>

<style lang="scss" scoped>

</style>