<script setup>
import SkillContent from './SkillContent.vue';
import ResetSkills from './ResetSkills.vue';
import ViewStats from './ViewStats.vue';
</script>

<template>
    <div class="skills_cont_wrapper">
        <skill-content></skill-content>
        <div class="controls_wrapper">
            <view-stats @send_input="emit_to_main"></view-stats>
            <reset-skills></reset-skills>
        </div>
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
.skills_cont_wrapper{
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