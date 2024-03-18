
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

  if(event instanceof MouseEvent){
    apply_click_effect(event.target);
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

  if(event instanceof MouseEvent){
    apply_click_effect(event.target);
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

const extract_filename = (f_filename: string): string => {
  let index = f_filename.indexOf('/svgs/');
  let filename = f_filename.substring(index);
  let char_index = filename.lastIndexOf('.');
  let src_str = filename.substring(0, char_index);
  return src_str;
}


const apply_click_effect = (target: EventTarget | null) => {
  if(target instanceof HTMLImageElement){
    let e = target as HTMLImageElement;
    const orig_src: string = e.src;
    e.style.transition = '100ms ease-in-out';
    e.style.width = '27px';
    e.style.borderColor = 'var(--black)';
    e.style.backgroundColor = 'var(--transp_orange)';
    let filename: string = extract_filename(e.src);
    const new_src: string = filename + "blk" + ".svg";
    e.src = new_src;
    setTimeout(()=>{
      e.style.backgroundColor = '';
      e.style.color = '';
    e.style.width = '';
      e.style.borderColor = '';
      let stripped_src: string = extract_filename(orig_src);
      e.src = stripped_src + ".svg";
    }, 100);
  }
}


const start_interval_inc = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    if(event.target instanceof HTMLImageElement){
      let t: HTMLImageElement = event.target as HTMLImageElement;
      t.style.transition = '150ms ease-in-out';
      t.style.width = '30px';
    }
    interval_UID = setInterval(() => {
      increase_skill(i, event);
    }, 10);
  }
}
const start_interval_dec = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    if(event.target instanceof HTMLImageElement){
      let t: HTMLImageElement = event.target as HTMLImageElement;
      t.style.transition = '150ms ease-in-out';
      t.style.width = '30px';
    }
    interval_UID = setInterval(() => {
      decrease_skill(i, event);
    }, 10);
  }
}

const clear_interval_inc = (event: TouchEvent | null) => {
  if(event !== null){
    if(event.target instanceof HTMLImageElement){
        let t: HTMLImageElement = event.target as HTMLImageElement;
        t.style.transition = '150ms ease-in-out';
        t.style.width = '';
    }
  }
  if (interval_UID !== undefined) {
    clearInterval(interval_UID);
  }
}

const clear_interval_dec = (event: TouchEvent | null) => {
  if(event !== null){
    if(event.target instanceof HTMLImageElement){
        let t: HTMLImageElement = event.target as HTMLImageElement;
        t.style.transition = '150ms ease-in-out';
        t.style.width = '';
    }
  }
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
          @touchend.prevent="clear_interval_inc($event)" :src="plus" alt="" class="svg">
        <img @click="decrease_skill(i, $event)" @touchstart.prevent="start_interval_dec(i, $event)"
          @touchend.prevent="clear_interval_dec($event)" :src="minus" alt="" class="svg">
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
