<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { universal_store } from '../stores/universal'
const u_inst = universal_store();
const builds: Ref<Array<{
  Build_ID: number,
  Build_Title: string,
  Feat_Slice: Array<{ Name: string, Build_ID: number }>,
  Skill_Slice: Array<{ Name: string, Value: number, Build_ID: number }>,
  Stat_Slice: Array<{ Name: string, Value: number, Build_ID: number }>
}>> = ref(new Array);
const index: Ref<number> = ref(0);
const viewing: Ref<string> = ref("Feats");

onBeforeMount(() => {
  const build_data: any = u_inst.get_general_builds();
  builds.value = build_data;
})


const handle_selection = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    const text: string = (event.target as HTMLElement).innerText;
    switch (text) {
      case "Stats":
        viewing.value = text;
        break;
      case "Skills":
        viewing.value = text;
        break;
      case "Feats":
        viewing.value = text;
        break;
      default:
        break;
    }
  }
}

const next_build = () => {
  const builds_len: number = builds.value.length;
  let t_index: number = index.value;
  t_index++;
  if (t_index > builds_len - 1) {
    t_index = 0;
  }
  index.value = t_index;
}

const previous_build = () => {
  const builds_len: number = builds.value.length;
  let t_index: number = index.value;
  t_index--;
  if (t_index < 0) {
    t_index = builds_len - 1;
  }
  index.value = t_index;
}
</script>

<template>
  <article class="build_article">
    <div class="build_header">
      <h2>Builds</h2>
    </div>
    <div class="build_container">
      <div class="build_title">
        <p>{{ builds[index]['Build_Title'] }}</p>
      </div>
      <div class="bfeats_container" v-if="viewing === 'Feats'">
        <p v-for="(feat, f) in builds[index]['Feat_Slice']" :key="f">
          {{ feat['Name'] }}
        </p>
      </div>
      <div class="bskills_container" v-if="viewing === 'Skills'">
        <div class="skills_loop_cont" v-for="(skill, sk) in builds[index]['Skill_Slice']" :key="sk">
          <p>{{ skill['Name'] }}</p>
          <p>{{ skill['Value'] }}</p>
        </div>
      </div>
      <div class="bstats_container" v-if="viewing === 'Stats'">
        <div class="stats_loop_cont" v-for="(stat, st) in builds[index]['Stat_Slice']" :key="st">
          <p>{{ stat['Name'] }}</p>
          <p>{{ stat['Value'] }}</p>
        </div>
      </div>
    </div>
    <div class="bcontrols">
      <p @click="handle_selection($event)">Stats</p>
      <p @click="handle_selection($event)">Skills</p>
      <p @click="handle_selection($event)">Feats</p>
    </div>
    <div class="bcycler">
      <p @click="previous_build">Prev</p>
      <p @click="next_build">Next</p>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
