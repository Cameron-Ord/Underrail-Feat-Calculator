<script setup>
import StatsContainer from '../main_page_components/StatsContainer.vue';
import SkillsContainer from '../main_page_components/SkillsContainer.vue';
import FeatsOverview from '../main_page_components/FeatsOverview.vue';
</script>

<template>
  <main class="_page_main">
    <section class="_character_sheet">
      <article class="_sheet_wrapper">
        <stats-container v-if="viewingStats === true && viewingSkills !== true"></stats-container>
        <skills-container v-if="viewingSkills === true && viewingStats !== true"></skills-container>
      </article>
    </section>
    <section class="_calculation_container">
      <article class="_calc_wrapper">
        <feats-overview></feats-overview>
      </article>
    </section>
  </main>
</template>

<script>
    export default {
        data() {
            return {
                viewingStats: false,
                viewingSkills: true
            }
        },

        methods:{

        },

        created(){
            
        }
    }
</script>

<style lang="scss" scoped>

</style>