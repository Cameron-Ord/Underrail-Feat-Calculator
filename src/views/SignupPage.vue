<script setup>
import ClientSignup from '../account_components/signup/ClientSignup.vue';
</script>

<template>
    <main class="signup_page">
        <client-signup></client-signup>
    </main>
</template>

<style lang="scss" scoped>
.signup_page{
    display: grid;
    align-items: center;
    min-height: 100vh;
}
</style>