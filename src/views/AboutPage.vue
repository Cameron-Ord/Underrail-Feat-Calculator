<script setup>
import AboutHeader from '../about_components/AboutHeader.vue';
import AboutMiddle from '../about_components/AboutMiddle.vue';
import AboutEnd from '../about_components/AboutEnd.vue';
import AboutLinks from '../about_components/AboutLinks.vue';
import { useMenuStore } from '../stores/menu_store';
import { useCookies } from 'vue3-cookies';
import { nextTick, onBeforeMount, onMounted } from 'vue';
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

onMounted(()=>{
  let about_pg_tags = document.querySelectorAll('.hero_about');
  nextTick(()=>{
    setTimeout(() => {
      for(let i = 0; i < about_pg_tags.length; i++){
          let tag = about_pg_tags[i];

          if(tag !== null){
            tag.style.opacity = '1';
          }
      }
    }, 100)
  })
})
</script>

<template>
    <main class="about_page">
      <div class="about_section">
        <about-header></about-header>
        <about-middle></about-middle>
        <about-end></about-end>
      </div>
      <div class="about_section">
        <about-links></about-links>
      </div>
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
    grid-template-rows: auto auto;
    display: grid;
    justify-items: center;
    row-gap: 35px;
    align-items: center;
    min-height: 100vh;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    >.about_section{
      display: grid;
      align-items: center;
      justify-items: center;
      row-gap: 50px;
    }
}
@media only screen and (min-width: 770px){
  .about_page{
    >.about_section{
    }
}
}
@media only screen and (min-width: 1024px){
  .about_page{
    row-gap: 50px;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
   
    >.about_section{
      display: grid;
      align-items: center;
      justify-items: center;
      row-gap: 50px;
    }
}
}
</style>
