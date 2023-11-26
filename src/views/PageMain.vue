<script setup>
import StatsContainer from '../main_page_components/StatsContainer.vue';
import SkillsContainer from '../main_page_components/SkillsContainer.vue';
import FeatsOverview from '../main_page_components/FeatsOverview.vue';
</script>

<template>
  <main class="_page_main">
    <section class="_character_sheet">
      <article class="_sheet_wrapper">
        <stats-container @view-skills="handle_view" v-if="switch_based_bool === true"></stats-container>
        <skills-container @view-stats="handle_view" v-if="switch_based_bool !== true"></skills-container>
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
                switch_based_bool: true,
            }
        },

        methods:{
          remember_last_viewed(){
            const last_viewed = JSON.parse(this.$cookies.get('last_viewed'));
            if(last_viewed !== null){
              this.switch_based_bool = last_viewed
            }
          },
          handle_view(sent_ref_text){
            console.log(sent_ref_text)
            if(sent_ref_text === "View_Stats"){
              this.switch_based_bool = true;
              this.$cookies.set('last_viewed', JSON.stringify(this.switch_based_bool))
            } else if(sent_ref_text === "View_Skills"){
              this.switch_based_bool = false
              this.$cookies.set('last_viewed', JSON.stringify(this.switch_based_bool))
            }
          },
        },

        created(){
            this.remember_last_viewed();
        }
    }
</script>

<style lang="scss" scoped>

</style>