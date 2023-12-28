<script setup>
import { onBeforeMount } from 'vue';
import AllBuilds from '../build_page_components/AllBuilds.vue';
import { useMenuStore } from '../stores/menu_store';
import { useCookies } from 'vue3-cookies';
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
    <main class="builds_page">
        <section class="every_build_ever">
            <all-builds></all-builds>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.builds_page.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
.builds_page{
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s ease-in-out;
    display: grid;
    align-items: center;
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-top: 25px;
    margin-bottom: 25px;
    >.every_build_ever{
        display: grid;
        align-items: center;
    }
}
</style>
