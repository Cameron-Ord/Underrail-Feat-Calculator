<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios'
import { stat_state } from '../stores/stat_state';
import { skill_state } from '../stores/skill_state';
import { types_state } from '../stores/types_state';
import { feats_state } from '../stores/feats_state';
import { ref, type Ref } from 'vue';

const feats_list_exists: Ref<boolean> = ref(false);
const retrieved_feat_list: Ref<Array<{ Feat: string, Desc: string }>> = ref(new Array())
const stat_inst = stat_state();
const skill_inst = skill_state();
const type_inst = types_state();
const feats_inst = feats_state();

const send_data = () => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    console.log(type_inst.get_chosen())
    axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/calculate`, {
      stats: stat_inst.get_stat_list(),
      skills: skill_inst.get_skill_list(),
      type: type_inst.get_chosen_type_only()
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  })
}

const generate_list = async () => {

  const types = type_inst.get_chosen();
  console.log("TYPES: ", types);

  console.log("Generating list..")
  const new_list: boolean = feats_inst.reset_feat_list();
  if (!new_list) {
    console.error("Failed to create new list at function entry");
  }
  try {
    const response: AxiosResponse = await send_data();
    if (response.statusText == "OK") {
      console.log("..Response OK")
      const is_set: boolean = feats_inst.set_feats(response.data)
      if (!is_set) {
        feats_list_exists.value = false;
        const new_list: boolean = feats_inst.reset_feat_list();
        if (!new_list) {
          console.error("Failed to create new list at response entry");
        }
        console.error("Feat list values were not set");
        return;
      }
      const result: Array<{ Feat: string, Desc: string }> | null = feats_inst.get_feats();
      if (result === null || result.length === 0) {
        feats_list_exists.value = false;
        const new_list: boolean = feats_inst.reset_feat_list();
        if (!new_list) {
          console.error("Failed to create new list after response entry");
        }
        console.error("Feat values do not exist with correct properties");
        return;
      }
      console.log("Assigning result..")
      retrieved_feat_list.value = result;
      feats_list_exists.value = true;
    }
  } catch (error) {
    feats_list_exists.value = false;
    const new_list: boolean = feats_inst.reset_feat_list();
    if (!new_list) {
      console.error("Failed to create new list at promise failure");
    }
    console.error("Failed to resolve HTTP promise: ", error);
    return
  }
}

</script>

<template>
  <article class="generator_article">
    <div class="generate_btn_div">
      <p @click="generate_list">Generate</p>
    </div>
    <div v-if="feats_list_exists" class="feat_list_div">
      <div class="feat_container" v-for="(feat, f) in retrieved_feat_list" :key="f">
        <p>{{ feat['Feat'] }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.generator_article {
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 30px;

  >.generate_btn_div {
    display: flex;
    flex-wrap: wrap;
  }

  >.feat_list_div {
    text-align: center;
    width: 80%;
    row-gap: 20px;
    column-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
