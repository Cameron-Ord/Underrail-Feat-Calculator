<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue'
import { stat_state } from '../stores/stat_state'
const stat_inst = stat_state()
const stat_list: Ref<Array<{ statName: string; statValue: number }>> = ref(new Array())
let interval_UID: number | undefined
const plus = '/svgs/plus.svg'
const minus = '/svgs/minus.svg'

const decrease_stat = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = stat_inst.get_limiter_value()
  const s_len: number = stat_inst.get_stat_list_len()
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }

  if (event instanceof MouseEvent) {
    apply_click_effect(event.target)
  }

  if (lmtr > 21 && lmtr <= 46) {
    stat_inst.decrease_stat(i, event)
    const new_list = stat_inst.get_stat_list()
    stat_list.value = new Array()
    stat_list.value = new_list
  }
}

const increase_stat = (i: number, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = stat_inst.get_limiter_value()
  const s_len: number = stat_inst.get_stat_list_len()
  if (i > s_len || i < 0) {
    return
  }
  if (!event) {
    return
  }

  if (event instanceof MouseEvent) {
    const max_stat_points: number = 20
    apply_click_effect(event.target)
    const val: number = stat_inst.get_specific_value(i)
    if (val === max_stat_points && interval_UID !== undefined) {
      clearInterval(interval_UID)
      return
    }
  }

  if (lmtr >= 21 && lmtr < 46) {
    stat_inst.increase_stat(i, event)
    const new_list = stat_inst.get_stat_list()
    stat_list.value = new Array()
    stat_list.value = new_list
  }
}

const extract_filename = (f_filename: string): string => {
  let index = f_filename.indexOf('/svgs/')
  let filename = f_filename.substring(index)
  let char_index = filename.lastIndexOf('.')
  let src_str = filename.substring(0, char_index)
  return src_str
}

const apply_click_effect = (target: EventTarget | null) => {
  if (target instanceof HTMLImageElement) {
    let e = target as HTMLImageElement
    const orig_src: string = e.src
    e.style.transition = '100ms ease-in-out'
    e.style.width = '27px'
    e.style.borderColor = 'var(--black)'
    let filename: string = extract_filename(e.src)
    const new_src: string = filename + 'blk' + '.svg'
    e.src = new_src
    setTimeout(() => {
      e.style.color = ''
      e.style.width = ''
      e.style.borderColor = ''
      let stripped_src: string = extract_filename(orig_src)
      e.src = stripped_src + '.svg'
    }, 100)
  }
}

const get_list = () => {
  const remembered_list: any = stat_inst.load_from_cookies()
  if (remembered_list == null) {
    stat_list.value = stat_inst.get_stat_list()
    stat_inst.set_base_cookies()
  } else {
    stat_list.value = remembered_list
  }
}

const start_interval_inc = (i: number, event: TouchEvent | null) => {
  document.body.addEventListener('touchstart', touch_preventer)
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = '30px'
    }
    interval_UID = setInterval(() => {
      increase_stat(i, event)
    }, 100)
  }
}
const start_interval_dec = (i: number, event: TouchEvent | null) => {
  document.body.addEventListener('touchstart', touch_preventer)
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = '30px'
    }
    interval_UID = setInterval(() => {
      decrease_stat(i, event)
    }, 100)
  }
}
const touch_preventer = (event: TouchEvent) => {
  event.preventDefault()
}

const clear_interval_inc = (event: TouchEvent | null) => {
  document.body.removeEventListener('touchstart', touch_preventer)
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = ''
    }
  }
  if (interval_UID !== undefined) {
    clearInterval(interval_UID)
  }
}

const clear_interval_dec = (event: TouchEvent | null) => {
  document.body.removeEventListener('touchstart', touch_preventer)
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = ''
    }
  }
  if (interval_UID !== undefined) {
    clearInterval(interval_UID)
  }
}

onBeforeMount(() => {
  get_list()
})
</script>

<template>
  <div class="stats_div">
    <div v-for="(stat, i) in stat_list" :key="i" class="loop_div">
      <h3 class="stat_name">{{ stat.statName }}</h3>
      <div class="icon_value_div">
        <p>{{ stat.statValue }}</p>
        <img
          @click="increase_stat(i, $event)"
          @touchstart.prevent="start_interval_inc(i, $event)"
          @touchend.prevent="clear_interval_inc($event)"
          :src="plus"
          alt=""
          class="svg"
        />
        <img
          @click="decrease_stat(i, $event)"
          @touchstart.prevent="start_interval_dec(i, $event)"
          @touchend.prevent="clear_interval_dec($event)"
          :src="minus"
          alt=""
          class="svg"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats_div {
  display: grid;
  width: 80%;
  row-gap: 25px;
  padding: 5px;
  max-width: 375px;
  > .loop_div {
    border: solid var(--orange) 1px;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    column-gap: 25px;
    row-gap: 5px;
    justify-self: center;
    width: 90%;
    color: var(--orange);
    > .stat_name {
    }

    > .icon_value_div {
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
  }
}

@media only screen and (min-width: 1024px) {
  .stats_div {
    row-gap: 40px;

    > .loop_div {
      transition: 150ms ease-in-out;
      &:hover {
        color: var(--white);
        border: solid var(--white) 1px;
      }
    }
  }
}
</style>
