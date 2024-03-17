
<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { skill_state } from '../stores/skill_state';
const skill_inst = skill_state();
const skill_list: Ref<Array<{ skillName: string; skillValue: number }>> = ref(new Array())
let interval_UID: number | undefined;
const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

const increase_skill = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = skill_inst.get_skill_limiter();
  const s_len: number = skill_inst.get_skill_list_len();
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }
  if (lmtr >= 0 && lmtr < 1280) {
    skill_inst.increase_skill(i, event);
    const new_list = skill_inst.get_skill_list();
    skill_list.value = new Array();
    skill_list.value = new_list;
  }
}

const decrease_skill = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = skill_inst.get_skill_limiter();
  const s_len: number = skill_inst.get_skill_list_len();
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }
  if (lmtr > 0 && lmtr <= 1280) {
    skill_inst.decrease_skill(i, event);
    const new_list = skill_inst.get_skill_list();
    skill_list.value = new Array();
    skill_list.value = new_list;
  }
}

const get_list = () => {
  const remembered_list: any = skill_inst.load_from_cookies();
  if (remembered_list == null) {
    skill_list.value = skill_inst.get_skill_list();
  } else {
    skill_list.value = remembered_list;
  }
}


const start_interval_inc = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    interval_UID = setInterval(() => {
      increase_skill(i, event);
    }, 10);
  }
}
const start_interval_dec = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    interval_UID = setInterval(() => {
      decrease_skill(i, event);
    }, 10);
  }
}

const clear_interval_inc = () => {
  if (interval_UID !== undefined) {
    clearInterval(interval_UID);
  }
}

const clear_interval_dec = () => {
  if (interval_UID !== undefined) {
    clearInterval(interval_UID);
  }
}


onBeforeMount(() => {
  get_list();
})

</script>

<template>
  <div class="skills_div">
    <div v-for="(skill, i) in skill_list" :key="i" class="loop_div">
      <h3 class="skill_name">{{ skill.skillName }}</h3>
      <div class="icon_value_div">
        <p>{{ skill.skillValue }}</p>
        <img @click="increase_skill(i, $event)" @touchstart.prevent="start_interval_inc(i, $event)"
          @touchend.prevent="clear_interval_inc" :src="plus" alt="" class="svg">
        <img @click="decrease_skill(i, $event)" @touchstart.prevent="start_interval_dec(i, $event)"
          @touchend.prevent="clear_interval_dec" :src="minus" alt="" class="svg">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skills_div {
  display: grid;
  width: 80%;
  row-gap: 25px;
  overflow-y: auto;
  max-height: 300px;
  padding: 10px;

  >.loop_div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    column-gap: 25px;
    row-gap: 5px;
    justify-self: center;
    width: 90%;

    >.skill_name {}

    >.icon_value_div {
      display: flex;
      align-items: center;
      flex-direction: row;
      column-gap: 15px;
      justify-content: space-evenly;
    }
  }
}


@media only screen and (min-width: 770px) {
  .skills_div {
    width: 70%;
    max-height: 450px;
  }
}

@media only screen and (min-width: 1024px) {
  .skills_div {
    width: 50%;
  }
}
</style>
