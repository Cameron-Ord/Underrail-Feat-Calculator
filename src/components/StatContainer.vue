<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { stat_state } from '../stores/stat_state'
const stat_inst = stat_state();
const stat_list: Ref<Array<{ statName: string; statValue: number }>> = ref(new Array())
let interval_UID: number | undefined;
const plus = '/svgs/plus.svg';
const minus = '/svgs/minus.svg';

const decrease_stat = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = stat_inst.get_limiter_value();
  const s_len: number = stat_inst.get_stat_list_len();
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }
  if (lmtr > 21 && lmtr <= 46) {
    stat_inst.decrease_stat(i, event);
    const new_list = stat_inst.get_stat_list();
    stat_list.value = new Array();
    stat_list.value = new_list;
  }
}

const increase_stat = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = stat_inst.get_limiter_value();
  const s_len: number = stat_inst.get_stat_list_len();
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }
  if (lmtr >= 21 && lmtr < 46) {
    stat_inst.increase_stat(i, event);
    const new_list = stat_inst.get_stat_list();
    stat_list.value = new Array();
    stat_list.value = new_list;
  }
}

const get_list = () => {
  const remembered_list: any = stat_inst.load_from_cookies();
  if (remembered_list == null) {
    stat_list.value = stat_inst.get_stat_list();
  } else {
    stat_list.value = remembered_list;
  }
}

const start_interval_inc = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    interval_UID = setInterval(() => {
      increase_stat(i, event);
    }, 100);
  }
}
const start_interval_dec = (i: number, event: TouchEvent | null) => {
  if (event !== null) {
    interval_UID = setInterval(() => {
      decrease_stat(i, event);
    }, 100);
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
  <div class="stats_div">
    <div v-for="(stat, i) in stat_list" :key="i" class="loop_div">
      <h3 class="stat_name">{{ stat.statName }}</h3>
      <div class="icon_value_div">
        <p>{{ stat.statValue }}</p>
        <img @click="increase_stat(i, $event)" @touchstart.prevent="start_interval_inc(i, $event)"
          @touchend.prevent="clear_interval_inc" :src="plus" alt="" class="svg">
        <img @click="decrease_stat(i, $event)" @touchstart.prevent="start_interval_dec(i, $event)"
          @touchend.prevent="clear_interval_dec" :src="minus" alt="" class="svg">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats_div {
  display: grid;
  width: 80%;
  row-gap: 25px;
  overflow-y: auto;
  max-height: 350px;

  >.loop_div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 25px;
    row-gap: 5px;

    >.stat_name {}

    >.icon_value_div {
      align-items: center;
      display: flex;
      flex-direction: row;
      column-gap: 15px;
      justify-content: space-evenly;
    }
  }
}


@media only screen and (min-width: 770px) {
  .stats_div {
    width: 70%;
    max-height: 450px;
  }
}

@media only screen and (min-width: 1024px) {
  .stats_div {
    width: 50%;
  }
}
</style>
