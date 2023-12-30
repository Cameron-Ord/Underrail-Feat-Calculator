<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const get_page=()=>{
    const current_path = router.currentRoute.value.path;
    let page
    switch (current_path) {
        case "/":
            page = document.querySelector('._page_main');
            break;
        case "/login":
            page = document.querySelector('.login_page');
            break;
        case "/signup":
            page = document.querySelector('.signup_page');
            break;
        case "/profile":
            page = document.querySelector('.profile_page');
            break;
        case "/builds":
            page = document.querySelector('.builds_page');
            break;
        case "/about":
            page = document.querySelector('.about_page');
            break
        default:
            page = null;
            break;
    }
    return page
}

const toggleMenu = () => {
    const mobile_menu = document.querySelector('.menu_wrapper');
    const main_div = document.querySelector('.mobile_menu');
    const main_button = document.querySelector('.icon_container');
    const page = get_page();

    if(page !== null){
        page.classList.toggle('modify_opacity');
        mobile_menu.classList.toggle('open');
        main_button.classList.toggle('open');
        main_div.classList.toggle('open');
    }
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
    padding: 6px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.60);
    display: grid;
    align-items: center;
    text-align: start;
    justify-items: start;
    position: fixed;
    left: 15px;
    bottom: 10px;
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(226, 113, 0, 0.10);
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>
