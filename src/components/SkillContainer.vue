<script setup lang="ts">
interface Skill {
  skillName: string
  skillValue: number
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

import { onBeforeMount, ref, type Ref, nextTick } from 'vue'
import { skill_state } from '../stores/skill_state'
const skill_inst = skill_state()
const skill_list: Ref<SkillCategory[]> = ref(new Array())
const Selected: Ref<SkillCategory> = ref({ category: '', skills: [] })
const first_index: Ref<number> = ref(0)
const is_loaded: Ref<boolean> = ref(false)

let interval_UID: number | undefined
const plus = '/svgs/plus.svg'
const minus = '/svgs/minus.svg'

const increase_skill = (skill_name: string, event: MouseEvent | TouchEvent | null) => {
  const list = skill_inst.get_flattened_list();  
  const lmtr: number = skill_inst.get_skill_limiter()

  if (!event) {
    return
  }


  if (event instanceof MouseEvent) {
    apply_click_effect(event.target)
  }

    
    if (lmtr >= 0 && lmtr < 1280) {
      skill_inst.increase_skill(skill_name, event)
      const new_list = skill_inst.get_skill_list()
      skill_list.value = new Array()
      skill_list.value = new_list
    }
}

const decrease_skill = (skill_name: string, event: MouseEvent | TouchEvent | null) => {
  const lmtr: number = skill_inst.get_skill_limiter()
  if (!event) {
    return
  }

  if (event instanceof MouseEvent) {
    apply_click_effect(event.target)
  }

  if (lmtr > 0 && lmtr <= 1280) {
    skill_inst.decrease_skill(skill_name, event)
    const new_list = skill_inst.get_skill_list()
    skill_list.value = new Array()
    skill_list.value = new_list
  }
}

const get_list = () => {
  const remembered_list: any = skill_inst.load_from_cookies()
  if (remembered_list == null) {
    skill_list.value = skill_inst.get_skill_list()
    skill_inst.set_base_cookies()
  } else {
    skill_list.value = remembered_list
  }
  if (skill_list.value !== undefined) {
    Selected.value = skill_list.value[0]
    get_target(skill_list.value[0]['category'])
    is_loaded.value = true
  }
}
// get list is called before mount, need to await the next tick
const get_target = async (target_str: string) => {
  await nextTick()
  let str_nodes: NodeList = document.querySelectorAll('.category_target')
  for (let i = 0; i < str_nodes.length; i++) {
    const node: Node | null = str_nodes[i]
    if (node !== null && node instanceof HTMLElement) {
      const text: string = node.innerText
      if (text === target_str) {
        set_base_style(node)
        return
      }
    }
  }
}

const set_base_style = (t: HTMLElement) => {
  t.style.transition = '350ms ease-in-out'
  t.style.border = 'solid var(--orange) 1px'
  t.style.borderRadius = '5px'
  t.style.color = 'var(--orange)'
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

const start_interval_inc = (skill_name: string, event: TouchEvent | null) => {
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = '30px'
    }
    interval_UID = setInterval(() => {
      increase_skill(skill_name, event)
    }, 10)
  }
}
const start_interval_dec = (skill_name:string, event: TouchEvent | null) => {
  if (event !== null) {
    if (event.target instanceof HTMLImageElement) {
      let t: HTMLImageElement = event.target as HTMLImageElement
      t.style.transition = '150ms ease-in-out'
      t.style.width = '30px'
    }
    interval_UID = setInterval(() => {
      decrease_skill(skill_name, event)
    }, 10)
  }
}

const clear_interval_inc = (event: TouchEvent | null) => {
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

const change_skill_tab = (j: number, target: EventTarget | null) => {
  is_loaded.value = false
  set_style_on_btn(target)
  first_index.value = j
  find_by_index(j)
}

const find_by_index = (j: number) => {
  Selected.value = skill_list.value[j]
  is_loaded.value = true
}

const clear_styles = () => {
  let nodes: NodeListOf<Element> | null = document.querySelectorAll('.category_target')
  if (nodes !== null) {
    for (let i = 0; i < nodes.length; i++) {
      let node: Node = nodes[i]
      if (node !== null && node instanceof HTMLElement) {
        node.style.transition = '350ms ease-in-out'
        node.style.border = ''
        node.style.borderRadius = ''
        node.style.color = ''
      }
    }
  }
}

const set_style_on_btn = (target: EventTarget | null) => {
  clear_styles()
  if (target !== null) {
    if (target instanceof HTMLElement) {
      let t: HTMLElement = target as HTMLElement
      t.style.transition = '350ms ease-in-out'
      t.style.border = 'solid var(--orange) 1px'
      t.style.borderRadius = '5px'
      t.style.color = 'var(--orange)'
    }
  }
}

const hover_effect = (target: EventTarget | null) => {
  if (target !== null && target instanceof HTMLElement) {
    target.style.transition = '150ms ease-in-out'
    target.style.color = 'var(--orange)'
    target.style.cursor = 'pointer'
  }
}

const clear_effect = (target: EventTarget | null, j: number) => {
  if (target !== null && target instanceof HTMLElement) {
    target.style.transition = '150ms ease-in-out'
    if (first_index.value !== j) {
      target.style.color = ''
    }
    target.style.cursor = ''
  }
}

const before_enter = (el: Element) => {
  if (el instanceof HTMLElement) {
    let html_tag: HTMLElement = el as HTMLElement
    html_tag.style.opacity = '0'
    html_tag.style.transition = '100ms ease-in-out'
  }
}

const on_enter = async (el: Element, done: () => void) => {
  if (el instanceof HTMLElement) {
    await nextTick()
    let html_tag: HTMLElement = el as HTMLElement
    void html_tag.offsetWidth
    html_tag.style.opacity = '1'
  }
  done()
}

const on_leave = async (el: Element, done: () => void) => {
  if (el instanceof HTMLElement) {
    let html_tag: HTMLElement = el as HTMLElement
    html_tag.style.transition = '100ms ease-in-out'
    html_tag.style.opacity = '0'
  }
  done()
}

onBeforeMount(() => {
  get_list()
})
</script>

<template>
  <transition appear :css="false" @before-enter="before_enter" @enter="on_enter" @leave="on_leave">
    <div class="skills_div" v-if="is_loaded">
      <div v-for="(item, i) in Selected['skills']" :key="i" class="sk_inner_loop">
        <h3 class="skill_name">{{ item.skillName }}</h3>
        <div class="icon_value_div">
          <p class="skill_value">{{ item.skillValue }}</p>
          <img
            @click="increase_skill(item.skillName, $event)"
            @touchstart.prevent="start_interval_inc(item.skillName, $event)"
            @touchend.prevent="clear_interval_inc($event)"
            :src="plus"
            alt=""
            class="svg"
          />
          <img
            @click="decrease_skill(item.skillName, $event)"
            @touchstart.prevent="start_interval_dec(item.skillName, $event)"
            @touchend.prevent="clear_interval_dec($event)"
            :src="minus"
            alt=""
            class="svg"
          />
        </div>
      </div>
      <div class="skill_tab_buttons">
        <p
          v-for="(skill, j) in skill_list"
          :key="j"
          @click="change_skill_tab(j, $event.target)"
          class="category_target"
          @mouseenter="hover_effect($event.target)"
          @mouseleave="clear_effect($event.target, j)"
        >
          {{ skill['category'] }}
        </p>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.skills_div {
  display: grid;
  width: 80%;
  row-gap: 25px;
  padding: 10px;
  max-width: 375px;

  > .skill_tab_buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    row-gap: 15px;
    column-gap: 15px;

    > p {
      padding: 5px;
    }
  }

  > .sk_inner_loop {
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

    > .icon_value_div {
      align-items: center;
      display: flex;
      flex-direction: row;
      column-gap: 15px;
      justify-content: space-evenly;
    }

    > .skill_value {
    }

    > .skill_name {
      max-width: 150px;
    }
  }
}

@media only screen and (min-width: 770px) {
  .skills_div {
  }
}

@media only screen and (min-width: 1024px) {
  .skills_div {
    > .sk_inner_loop {
      &:hover {
        color: var(--white);
        border: solid var(--white) 1px;
      }

      transition: 150ms ease-in-out;
    }
  }
}
</style>
