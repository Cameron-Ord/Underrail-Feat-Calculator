<script setup>
import ClientSignup from '../account_components/signup/ClientSignup.vue';
</script>

<template>
    <main class="signup_page">
        <client-signup></client-signup>
    </main>
</template>

<style lang="scss" scoped>
.signup_page.modify_opacity{
  opacity: 0;
  pointer-events: none;
}
.signup_page{
    pointer-events: auto;
    opacity: 1;
    transition: 0.5s;
    display: grid;
    align-items: center;
    min-height: 100vh;
}
</style>