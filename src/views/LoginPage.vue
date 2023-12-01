
<script setup>
import ClientLogin from '../account_components/login/ClientLogin.vue';
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