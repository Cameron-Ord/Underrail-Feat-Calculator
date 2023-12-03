<script setup>
import UserInfo from '../account_components/profile/UserInfo.vue';
import UserBuilds from '../account_components/profile/UserBuilds.vue';
import { useMenuStore } from '../stores/menu_store';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
const router = useRouter();
const {cookies} = useCookies();
const menu_store_instance = useMenuStore();
const check_if_logged = () => {
  const is_logged = cookies.get('is_logged');
  const parsed = JSON.parse(is_logged);
  if(parsed !== null){
    menu_store_instance.state.logged_in = parsed
    if(parsed !== true){
        router.push('/');
    }
  }
}

onBeforeMount(()=>{
    check_if_logged()
})
</script>

<template>
    <main class="profile_page">
        <section class="info_section">
            <user-info></user-info>
        </section>
        <section class="builds_section">
            <user-builds></user-builds>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.profile_page.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
.profile_page{
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s ease-in-out;
    display: grid;
    align-items: center;
    min-height: 100vh;
    row-gap: 50px;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-top: 25px;
    margin-bottom: 25px;
    >.info_section{
        display: grid;
        align-items: center;
    }
    >.builds_section{
        display: grid;
        align-items: center;
    }
}
</style>