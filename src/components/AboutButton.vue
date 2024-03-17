<script setup lang="ts">
import { ref, type Ref, nextTick } from 'vue';
const is_open: Ref<boolean> = ref(false);
const { switch_about } = defineProps(['switch_about']);


const btn_handler = (event: EventTarget | null) => {
  if (event) {
    const text = (event as HTMLElement).textContent
    switch (text) {
      case "View about":
        switch_about(true)
        is_open.value = true;
        break;
      case "Close about":
        switch_about(false)
        is_open.value = false;
        break;
      default:
        break;
    }
  }
}

const before_enter = (el: Element) =>{
  if(el instanceof HTMLElement){
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.opacity = '0';
  }
}

const on_enter = async (el: Element)=>{
}

const after_enter = async (el: Element) => {
 if(el instanceof HTMLElement){
    await nextTick();
    let offset: number = 0;
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.transition = '0.3s ease-in-out';
    setTimeout(()=>{
      html_tag.style.opacity = '1';
    }, 25 + offset);
  }
}

const on_leave = (el: Element ) =>{
  if(el instanceof HTMLElement){
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.transition = '0.3s ease-in-out';
    html_tag.style.opacity = '0';
  }
}

</script>

<template>
  <div class="about_crtls">
      <transition
      name="view_about"
      :css="false"
      @before-enter="before_enter"
      @enter="on_enter"
      @after-enter="after_enter"
      @leave="on_leave"
      >
        <h2 @click="btn_handler($event.target)" v-if="!is_open">View about</h2>
      </transition>
      <transition
      name="close_about"
      :css="false"
      @before-enter="before_enter"
      @enter="on_enter"
      @after-enter="after_enter"
      >
        <h2 @click="btn_handler($event.target)" v-if="is_open">Close about</h2>
      </transition>   
  </div>
</template>

<style lang="scss" scoped>
.about_crtls {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
