
<script setup>
import ClientLogin from '../account_components/login/ClientLogin.vue';
import { useMenuStore } from '../stores/menu_store';
import { useCookies } from 'vue3-cookies';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const {cookies} = useCookies();
const router = useRouter();
const menu_store_instance = useMenuStore();
const check_if_logged = () => {
  const is_logged = cookies.get('is_logged');
  const parsed = JSON.parse(is_logged);
  if(parsed !== null){
    menu_store_instance.state.logged_in = parsed
    if(parsed === true){
        console.log('already logged in..');
        router.push('/')
    }
  }
}

onBeforeMount(()=>{
  check_if_logged()
})
</script>

<template>
    <main class="login_page">
        <client-login></client-login>
    </main>
</template>

<style lang="scss" scoped>
.login_page.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
.login_page{
    pointer-events: auto;
    opacity: 1;
    transition: opacity 0.5s;
    display: grid;
    align-items: center;
    min-height: 100vh;
}
</style>