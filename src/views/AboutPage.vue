<script setup>
import AboutHeader from '../about_components/AboutHeader.vue';
import AboutMiddle from '../about_components/AboutMiddle.vue';
import AboutEnd from '../about_components/AboutEnd.vue';
import { useMenuStore } from '../stores/menu_store';
import { useCookies } from 'vue3-cookies';
import { onBeforeMount } from 'vue';
const {cookies} = useCookies();
const menu_store_instance = useMenuStore();
const check_if_logged = () => {
  const is_logged = cookies.get('is_logged');
  const parsed = JSON.parse(is_logged);
  if(parsed !== null){
    menu_store_instance.state.logged_in = parsed
  }
}

onBeforeMount(()=>{
  check_if_logged()
})
</script>

<template>
    <main class="about_page">
        <section class="about_section">
            <about-header></about-header>
        </section>
        <section class="about_section">
            <about-middle></about-middle>
        </section>
        <section class="about_section">
            <about-end></about-end>
        </section>
    </main>
</template>

<style lang="scss" scoped>

.about_page.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
.about_page{
    padding-top: 50px;
    padding-bottom: 50px;
    grid-template-rows: 0.75fr 1fr 0.75fr;
    display: grid;
    align-items: center;
    min-height: 100vh;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    >.about_section{
      display: grid;
      align-items: center;
    }
}
</style>