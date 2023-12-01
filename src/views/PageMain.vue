<script setup>
import CalculationButton from '../main_page_components/CalculationButton.vue';
import FeatsContainer from '../main_page_components/FeatsContainer.vue';
import StatContent from '../main_page_components/StatContent.vue';
import ViewSkills from '../main_page_components/ViewSkills.vue';
import ResetStats from '../main_page_components/ResetStats.vue';
import SkillContent from '../main_page_components/SkillContent.vue';
import ResetSkills from '../main_page_components/ResetSkills.vue';
import ViewStats from '../main_page_components/ViewStats.vue';
import BuildSaver from '../main_page_components/BuildSaver.vue';
import { useCookies } from 'vue3-cookies';
import { onBeforeMount,ref,provide, watch} from 'vue';
import { useStatStore } from '../stores/stat_state_store';
import { useSkillStore } from '../stores/skill_state_store';
import { useFeatStore } from '../stores/feat_store';
const {cookies} = useCookies();
const stat_store_instance = useStatStore();
const skill_store_instance = useSkillStore();
const feat_store_instance = useFeatStore();
const featsAreLoaded = ref(false);
const svgsAreLoaded = ref(false);
const canSaveBuild = ref(feat_store_instance.state.can_save_build);
let switch_based_bool = ref(true);

watch(()=>feat_store_instance.state.can_save_build, (boolean) => {
  canSaveBuild.value = boolean;
  console.log('Can save build: ', boolean)
})

const updateFeatsAreLoaded = (newValue) => {
  featsAreLoaded.value = newValue;
}
const updateSvgsAreLoaded = (newValue) => {
  svgsAreLoaded.value = newValue;
}
provide('svgsAreLoaded', svgsAreLoaded)
provide('featsAreLoaded', featsAreLoaded)
provide('updateSvgsAreLoaded', updateSvgsAreLoaded);
provide('updateFeatsAreLoaded', updateFeatsAreLoaded);

const remember_last_viewed = () =>{
  console.log('remembering')
  const last_viewed = cookies.get('last_viewed');
  if(JSON.parse(last_viewed) !== null){
    switch_based_bool.value = JSON.parse(last_viewed);
  }
}
const handle_view = (sent_ref_text) =>{
  console.log(sent_ref_text)
  if(sent_ref_text === "View_Stats"){
    const bool = true
    switch_based_bool.value = bool;
    cookies.set('last_viewed', JSON.stringify(switch_based_bool.value));
  } else if(sent_ref_text === "View_Skills"){
    const bool = false
    switch_based_bool.value = bool;
    cookies.set('last_viewed', JSON.stringify(switch_based_bool.value));
  }
}

const save_cookies = (
  default_stat_limiter,default_stat_items,
  default_skill_limiter,default_skill_items) => {
  cookies.set('stat_count_limiter',JSON.stringify(default_stat_limiter))
  cookies.set('stat_array_values',JSON.stringify(default_stat_items))
  cookies.set('skill_count_limiter',JSON.stringify(default_skill_limiter))
  cookies.set('skill_array_values',JSON.stringify(default_skill_items))
}

const retrieve_cookies = () => {
  const StatCL = cookies.get('stat_count_limiter');
  const StatAV = cookies.get('stat_array_values');
  const SkillCL = cookies.get('skill_count_limiter');
  const SkillAV = cookies.get('skill_array_values');

  try{
    return [
      JSON.parse(SkillCL),
      JSON.parse(SkillAV),
      JSON.parse(StatCL),
      JSON.parse(StatAV)
    ]
  } catch (error) {
    console.error("Error parsing JSON: ", error)
  }
}

const assign_predefined_values = (skill_lmtr,skill_vals,stat_lmtr,stat_vals) => {
  stat_store_instance.state.stat_count_limiter = stat_lmtr
  stat_store_instance.state.stat_items_array = stat_vals;
  skill_store_instance.state.skill_count_limiter = skill_lmtr;
  skill_store_instance.state.skill_items_array = skill_vals
}

const assign_default_values = () =>{
  const [default_stat_limiter, default_stat_items] = stat_store_instance.actions.set_default_values();
  stat_store_instance.state.stat_count_limiter = default_stat_limiter;
  stat_store_instance.state.stat_items_array = default_stat_items;
  const [default_skill_limiter, default_skill_items] = skill_store_instance.actions.set_default_values();
  skill_store_instance.state.skill_count_limiter = default_skill_limiter;
  skill_store_instance.state.skill_items_array = default_skill_items
  console.log(default_stat_items)
  save_cookies(
    default_stat_limiter,default_stat_items,
    default_skill_limiter,default_skill_items
  );
}

onBeforeMount(()=>{
  remember_last_viewed();
  const [
    skill_lmtr,
    skill_vals,
    stat_lmtr,
    stat_vals
  ] = retrieve_cookies();

  let missing_cookies = false;

  for (const value of [skill_lmtr, skill_vals,stat_lmtr,stat_vals]){
    if(value === null){
      missing_cookies = true;
    }
  }
  if(missing_cookies === true){
    assign_default_values();
  } else {
    assign_predefined_values(skill_lmtr, skill_vals, stat_lmtr, stat_vals);
  }
})

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
    <section class="_calculation_container">
      <article class="_calc_wrapper">
        <feats-container v-if="svgsAreLoaded === true && featsAreLoaded === true"></feats-container>
        <div class="feat_viewer_options">
          <calculation-button></calculation-button>
          <build-saver v-if="canSaveBuild === true"></build-saver>
        </div>
      </article>
    </section>
  </main>
</template>
<style lang="scss" scoped>

._page_main.modify_opacity{
  opacity: 0;
}
._page_main{
  transition: opacity 0.5s;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  display: grid;
  align-items: center;
  min-height: 100vh;
  grid-template-rows: 1fr 0.25fr;

  >._calculation_container{
    display: grid;
    align-items: center;
    >._calc_wrapper{
      display: grid;
      align-items: center;
      grid-template-rows: 1fr;
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