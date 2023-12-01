<script setup>
import { RouterView } from 'vue-router'
import AppMenu from './menu_components/AppMenu.vue';
import MenuButton from './menu_components/MenuButton.vue';
</script>

<template>
  <RouterView />
  <menu-button></menu-button>
  <app-menu></app-menu>
</template>

<style scoped>

</style>
