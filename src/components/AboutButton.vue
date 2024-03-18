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
    html_tag.style.transition = '0.3s ease-in-out';
  }
}

const on_enter = async (el: Element, done: ()=>void)=>{
  if(el instanceof HTMLElement){
    await nextTick();
    let html_tag: HTMLElement = el as HTMLElement;
    void html_tag.offsetWidth;
    html_tag.style.opacity = '1';
  }
  done();
}

const after_enter = (el: Element) => {

}

const on_leave = async (el: Element, done: ()=>void) =>{
  if(el instanceof HTMLElement){
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.transition = '0.3s ease-in-out';
    html_tag.style.opacity = '0';
  }
  done();
}

</script>

<template>
  <div class="about_crtls">
      <transition
      :css="false"
      @before-enter="before_enter"
      @enter="on_enter"
      @after-enter="after_enter"
      @leave="on_leave"
      >
        <h2 @click="btn_handler($event.target)" v-if="!is_open">View about</h2>
        <h2 @click="btn_handler($event.target)" v-else-if="is_open">Close about</h2>
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
