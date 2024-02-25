<script setup lang="ts">
import { ref, type Ref } from 'vue';
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

</script>

<template>
  <div class="about_crtls">
    <h2 @click="btn_handler($event.target)" v-if="!is_open">View about</h2>
    <h2 @click="btn_handler($event.target)" v-if="is_open">Close about</h2>
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
