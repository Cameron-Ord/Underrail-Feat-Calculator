<script setup>
import CalculationButton from '../main_page_components/CalculationButton.vue';
import FeatsContainer from '../main_page_components/FeatsContainer.vue';
import StatContent from '../main_page_components/StatContent.vue';
import ViewSkills from '../main_page_components/ViewSkills.vue';
import ResetStats from '../main_page_components/ResetStats.vue';
import SkillContent from '../main_page_components/SkillContent.vue';
import ResetSkills from '../main_page_components/ResetSkills.vue';
import ViewStats from '../main_page_components/ViewStats.vue';
</script>
<script>
    export default {
        data() {
            return {
                switch_based_bool: true,
                ison: false
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
<template>
  <main class="_page_main">
    <section class="_character_sheet">
      <article class="_sheet_wrapper">
        <div class="stats_cont_wrapper" v-if="switch_based_bool === true">
          <stat-content></stat-content>
          <div class="controls_wrapper">
              <view-skills @send_input="handle_view"></view-skills>
              <reset-stats></reset-stats>
          </div>
        </div>
        <div class="skills_cont_wrapper"  v-if="switch_based_bool !== true">
          <skill-content></skill-content>
          <div class="controls_wrapper">
              <view-stats @send_input="handle_view"></view-stats>
              <reset-skills></reset-skills>
          </div>
        </div>
      </article>
    </section>
    <section class="_calculation_container" v-if="ison === true">
      <article class="_calc_wrapper">
        <feats-container></feats-container>
        <calculation-button></calculation-button>
      </article>
    </section>
  </main>
</template>
<style lang="scss" scoped>
._page_main{
  display: grid;
  align-items: center;
  min-height: 100vh;

  >._calculation_container{
    display: grid;
    align-items: center;
    >._calc_wrapper{
      display: grid;
      align-items: center;
    }
  }

  >._character_sheet{
    display: grid;
    align-items: center;
   

    >._sheet_wrapper{
      display: grid;
      align-items: center;

      >.skills_cont_wrapper{
          display: grid;
          align-items: center;
          grid-template-rows: 1fr 0.4fr;
          >.controls_wrapper{
              display: grid;
              align-items: center;
              grid-template-columns: repeat(auto-fit, minmax(125px,1fr));
          }
      }

      >.stats_cont_wrapper{
        display: grid;
        align-items: center;
        grid-template-rows: 1fr 0.4fr;
        >.controls_wrapper{
            display: grid;
            align-items: center;
            grid-template-columns: repeat(auto-fit, minmax(125px,1fr));
        }
      }

    }
  }
}

</style>