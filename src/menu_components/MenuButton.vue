<script setup>

const toggleMenu = () => {
    const mobile_menu = document.querySelector('.menu_wrapper');
    const main_div = document.querySelector('.mobile_menu');
    const main_button = document.querySelector('.icon_container');
    const _page_main = document.querySelector('._page_main');

    _page_main.classList.toggle('modify_opacity');
    mobile_menu.classList.toggle('open');
    main_button.classList.toggle('open');
    main_div.classList.toggle('open');
}
</script>
<template>
    <div class="icon_container">
        <h2 @click="toggleMenu">MENU</h2>
    </div>
</template>

<style lang="scss" scoped>
.icon_container.open{
    opacity: 0;
}
.icon_container{
    display: grid;
    align-items: center;
    text-align: start;
    justify-items: start;
    position: fixed;
    left: 10px;
    bottom: 10px;
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
}
</style>