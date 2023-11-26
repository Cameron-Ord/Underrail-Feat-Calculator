<script setup>
import SkillContent from './SkillContent.vue';
import ResetSkills from './ResetSkills.vue';
import ViewStats from './ViewStats.vue';
</script>

<template>
    <div>
        <skill-content></skill-content>
        <view-stats @send_input="emit_to_main"></view-stats>
        <reset-skills></reset-skills>
    </div>
</template>

<script>
    export default {
        components:{
            SkillContent,
            ResetSkills,
            ViewStats
        },
        methods:{
            emit_to_main(skills_ref_text){
                this.$emit('view-stats', skills_ref_text);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>