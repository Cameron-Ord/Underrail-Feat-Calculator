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
import BuildTypes from '../main_page_components/BuildTypes.vue';
import TypeFiltering from '../main_page_components/TypeFiltering.vue';
import { useCookies } from 'vue3-cookies';
import { onBeforeMount,ref,provide, watch, onMounted, onBeforeUnmount, onUnmounted} from 'vue';
import { useStatStore } from '../stores/stat_state_store';
import { useSkillStore } from '../stores/skill_state_store';
import { useFeatStore } from '../stores/feat_store';
import { useMenuStore } from '../stores/menu_store';

const {cookies} = useCookies();
const stat_store_instance = useStatStore();
const skill_store_instance = useSkillStore();
const feat_store_instance = useFeatStore();
const menu_store_instance = useMenuStore();
const featsAreLoaded = ref(false);
const svgsAreLoaded = ref(false);
const canSaveBuild = ref(feat_store_instance.state.can_save_build);
const is_logged_in = ref(menu_store_instance.state.logged_in)
let switch_based_bool = ref(true);

watch(()=>menu_store_instance.state.logged_in, (boolean)=>{
  is_logged_in.value = boolean;
})

watch(()=>feat_store_instance.state.can_save_build, (boolean) => {
  canSaveBuild.value = boolean;
})

const get_expiry = () =>{
  const current_date = new Date();
  const expiry = new Date(current_date);
  expiry.setFullYear(current_date.getFullYear() + 50);
  return expiry;
}

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
  const last_viewed = cookies.get('last_viewed');
  if(JSON.parse(last_viewed) !== null){
    switch_based_bool.value = JSON.parse(last_viewed);
  }
}
const handle_view = (sent_ref_text) =>{
  if(sent_ref_text === "View Stats"){
    const bool = true
    switch_based_bool.value = bool;
    cookies.set('last_viewed', JSON.stringify(switch_based_bool.value), null);
  } else if(sent_ref_text === "View Skills"){
    const bool = false
    switch_based_bool.value = bool;
    cookies.set('last_viewed', JSON.stringify(switch_based_bool.value), null);
  }
}

const save_cookies = (
  default_stat_limiter,default_stat_items,
  default_skill_limiter,default_skill_items) => {
  cookies.set('stat_count_limiter',JSON.stringify(default_stat_limiter), get_expiry())
  cookies.set('stat_array_values',JSON.stringify(default_stat_items), get_expiry())
  cookies.set('skill_count_limiter',JSON.stringify(default_skill_limiter), get_expiry())
  cookies.set('skill_array_values',JSON.stringify(default_skill_items), get_expiry())
}

const retrieve_cookies = () => {
  const StatCL = cookies.get('stat_count_limiter');
  const StatAV = cookies.get('stat_array_values');
  const SkillCL = cookies.get('skill_count_limiter');
  const SkillAV = cookies.get('skill_array_values');
  const cookie_arr = [{"TYPE": "STAT_LIMITER" ,"VALUE": StatCL}, {"TYPE": "STAT_VALUES", "VALUE": StatAV}, {"TYPE": "SKILL_LIMITER","VALUE": SkillCL}, {"TYPE": "SKILL_VALUES", "VALUE": SkillAV}]
  try{
    for (let c_index = 0; c_index < cookie_arr.length; c_index++){
      const array_item = cookie_arr[c_index];
      const parsed_item = JSON.parse(array_item["VALUE"])
      array_item["VALUE"] = parsed_item;
    }
    return cookie_arr;
  } catch {
    console.log("ERROR PARSING JSON..");
    return [null, null, null, null];
  }
}

const assign_predefined_values = (item_map, item_type) => {
  const item = item_map.get(item_type)
  switch (item_type) {
    case "STAT_LIMITER":
      stat_store_instance.state.stat_count_limiter = item;
      break;
    case "STAT_VALUES":
      stat_store_instance.state.stat_items_array = item;
      break;
    case "SKILL_LIMITER":
      skill_store_instance.state.skill_count_limiter = item;
      break;
    case "SKILL_VALUES":
      skill_store_instance.state.skill_items_array = item;
      break;
    default:
      break;
  }

}


const assign_default_values = () =>{  
  let st_state = stat_store_instance.state;
  let st_actions = stat_store_instance.actions;

  let sk_state = skill_store_instance.state;
  let sk_actions = skill_store_instance.actions;

  const [default_stat_limiter, default_stat_items] = st_actions.set_default_values();
  st_state.stat_count_limiter = default_stat_limiter;
  st_state.stat_items_array = default_stat_items;
  
  const [default_skill_limiter, default_skill_items] = sk_actions.set_default_values();
  sk_state.skill_count_limiter = default_skill_limiter;
  sk_state.skill_items_array = default_skill_items
  
  save_cookies(
    default_stat_limiter,default_stat_items,
    default_skill_limiter,default_skill_items
  );
}

const check_if_logged = () => {
  const is_logged = cookies.get('is_logged');
  try {
    const parsed = JSON.parse(is_logged);
    if(parsed !== null){
      menu_store_instance.state.logged_in = parsed;
    }
  } catch (error) {
    console.log("Error parsing JSON: ", error);
  }
}

onMounted(()=>{

})

onUnmounted(()=>{
})

onBeforeUnmount(()=>{

})

onBeforeMount(()=>{
  const false_bool = false
  feat_store_instance.state.can_save_build = false_bool;
  remember_last_viewed();

  const cookie_arr = retrieve_cookies();
  let missing_cookies = false;
  for (let i = 0; i < cookie_arr.length; i++){
    const value = cookie_arr[i]['VALUE'];
    if(value === null || value === undefined){
      missing_cookies = true;
      assign_default_values();
      console.log("ASSIGNED DEFAULTS");
      return 
     }
  }
  
  if(missing_cookies === false) {
    let cookies_map = new Map();
    for(let c_map_i = 0; c_map_i < cookie_arr.length; c_map_i++){
      const item_type = cookie_arr[c_map_i]["TYPE"];
      if(!cookies_map.has(item_type)){
        cookies_map.set(item_type, cookie_arr[c_map_i]["VALUE"]);
      }
      assign_predefined_values(cookies_map, item_type);
    }

    console.log("ASSIGNED PRE-EXISTING");
  } 
  check_if_logged()
})

</script>
<template>
  <main class="_page_main">
    <section class="_character_sheet">
      <article class="_sheet_wrapper" v-if="switch_based_bool === true">
          <stat-content></stat-content>
      </article>
      <article v-if="switch_based_bool === true" class="view_controls">
          <view-skills :handle_view="handle_view"></view-skills>
          <reset-stats></reset-stats>
      </article>
      <article class="_sheet_wrapper" v-if="switch_based_bool !== true">
          <skill-content></skill-content>
      </article>
      <article v-if="switch_based_bool !== true" class="view_controls">
        <view-stats :handle_view="handle_view"></view-stats>
        <reset-skills></reset-skills>
      </article>
    </section>
    <section class="type_selection">
      <article class="span_text">
        <type-filtering></type-filtering>
      </article>
      <article class="selection_article">
        <build-types></build-types>
      </article>
    </section>
    <section class="_calculation_container">
      <article class="_calc_wrapper">
        <calculation-button></calculation-button>
        <feats-container class="opacity_setter" v-if="svgsAreLoaded === true && featsAreLoaded === true"></feats-container>
        <build-saver v-if="canSaveBuild === true && is_logged_in === true"></build-saver>
      </article>
    </section>
  </main>
</template>
<style lang="scss" scoped>

._page_main.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
._page_main{
  pointer-events: auto;
  transition: opacity 0.5s;
  opacity: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  display: grid;
  align-items: center;
  min-height: 100vh;
  row-gap: 75px;
  grid-template-rows: auto auto auto;

  >._calculation_container{
    display: grid;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    >._calc_wrapper{
      display: grid;
      align-items: center;
      grid-template-rows: 1fr;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  >._character_sheet{
    display: grid;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    row-gap: 20px;
    
      >.view_controls{
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        justify-self: center;
        align-items: center;
        row-gap: 10px;
        column-gap: 10px;
      }
    >._sheet_wrapper{
      display: grid;
      align-items: center;
      padding-top: 20px;
      padding-bottom: 20px;

    }
  }
  >.type_selection{
    display: grid;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    row-gap: 35px;
    >.span_text{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
    }
    >.selection_article{
      display: grid;
      align-items: center;
      justify-self: center;
      justify-items: center;
      row-gap: 30px;
      padding-top: 20px;
      padding-bottom: 20px;
      width: 80%;
      overflow-y: auto;
      height: 200px;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }
}
@media only screen and (min-width: 770px){
  ._page_main{
 
  >._calculation_container{
    >._calc_wrapper{
    }
  }

  >._character_sheet{
 
 
      >.view_controls{
        width: 80%;
      }
    >._sheet_wrapper{
      justify-items: center;
    }
  }
  >.type_selection{


    >.span_text{
      
    }
    >.selection_article{
      height: 300px;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      width: 80%;
    }
  }
}
}
@media only screen and (min-width: 1024px){
  ._page_main{
 
 >._calculation_container{
   >._calc_wrapper{
   }
 }

 >._character_sheet{

     >.view_controls{
       width: 70%;
     }
   }
   >._sheet_wrapper{
    row-gap: 100px;
     justify-items: center;

 }
  >.type_selection{


    >.span_text{
      
    }
    >.selection_article{
      height: 350px;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      width: 60%;
    }
  }
}
}
</style>
