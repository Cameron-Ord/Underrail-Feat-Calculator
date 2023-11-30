
<script setup>
import ClientLogin from '../account_components/login/ClientLogin.vue';
</script>

<template>
    <main class="login_page">
        <client-login></client-login>
    </main>
</template>

<style lang="scss" scoped>
.login_page{
    display: grid;
    align-items: center;
    min-height: 100vh;
}
</style>