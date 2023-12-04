<script setup>
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { useMenuStore } from '../stores/menu_store';
import { ref, watch } from 'vue';
const menu_store_instance = useMenuStore();
let logged_in = ref(menu_store_instance.state.logged_in);
const router = useRouter();


watch(()=>menu_store_instance.state.logged_in, (value)=>{
    logged_in.value = value;
})

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

const toggle_menu = () =>{
    const mobile_menu = document.querySelector('.menu_wrapper');
    const main_div = document.querySelector('.mobile_menu');
    const main_button = document.querySelector('.icon_container');
    const current_page = get_page();
    if(current_page !== null){
        current_page.classList.toggle('modify_opacity');
        main_button.classList.toggle('open');
        mobile_menu.classList.toggle('closing');
        main_div.classList.toggle('closing');
    }
    if(main_div.classList.contains('closing')){
        setTimeout(()=>{
            main_div.classList.toggle('open');
            mobile_menu.classList.toggle('open');
            mobile_menu.classList.toggle('closing');
            main_div.classList.toggle('closing');
        }, 300);
    }
}

const go_home=()=>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/'){
        toggle_menu()
        router.push('/')
    } else {
        toggle_menu();
    }
}

const view_profile = () =>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/profile'){
        toggle_menu()
        router.push('/profile')
    } else {
        toggle_menu();
    }
}
const log_out = () =>{
    const {cookies} = useCookies();
    cookies.remove('Client_ID');
    cookies.remove('Client_Session_Token');
    menu_store_instance.state.logged_in = false;
    cookies.set('is_logged', JSON.stringify(false));
    const current_location = router.currentRoute.value.path;
    if(current_location != '/'){
        toggle_menu()
        router.push('/')
    } else {
        router.go();
    }

}
const view_all = () =>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/builds'){
        toggle_menu()
        router.push('/builds')
    } else {
        toggle_menu();
    }
}
const goto_log_in = () =>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/login'){
        toggle_menu()
        router.push('/login')
    } else {
        toggle_menu();
    }
}
const goto_sign_up = () =>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/signup'){
        toggle_menu()
        router.push('/signup')
    } else {
        toggle_menu();
    }
}
const goto_about = () =>{
    const current_location = router.currentRoute.value.path;
    if(current_location != '/about'){
        toggle_menu()
        router.push('/about')
    } else {
        toggle_menu();
    }
}

</script>

<template>
    <div class="mobile_menu">
        <div class="menu_wrapper">
            <div class="content_div">
                <h3 @click="go_home">Home</h3>
            </div>
            <div class="content_div" v-if="logged_in === true">
                <h3 @click="view_profile">Profile</h3>
            </div>
            <div class="content_div" v-if="logged_in === true">
                <h3 @click="log_out">Logout</h3>
            </div>
            <div class="content_div">
                <h3 @click="view_all">All Builds</h3>
            </div>
            <div class="content_div" v-if="logged_in === false">
                <h3 @click="goto_log_in">Login</h3>
            </div>
            <div class="content_div" v-if="logged_in === false">
                <h3 @click="goto_sign_up">Signup</h3>
            </div>
            <div class="content_div">
                <h3 @click="goto_about">About</h3>
            </div>
            <div class="content_div">
                <h3 @click="toggle_menu">Close</h3>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mobile_menu.open.closing{
    opacity: 0;
    pointer-events: none;
}
.mobile_menu.open{
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.mobile_menu{
    pointer-events: none;
    display: grid;
    align-items: center;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    transform: translateY(100%);
    height: 50%;
    position: fixed;

    >.menu_wrapper.open.closing{
        opacity: 0;
    }
    >.menu_wrapper.open{
        opacity: 1;
        transform: translateY(0);
        height: 100%;
    }
    >.menu_wrapper{
        display: grid;
        align-items: center;
        opacity: 0;
        padding-top: 5px;
        transition: opacity 0.3s, transform 0.3s;
        transform: translateY(100%);
        grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
        grid-template-rows: auto;
        gap: 25px;
        >.content_div{
            display: grid;
            align-items: center;
            justify-items: center;
            >h3{
                padding-bottom: 5px;
                padding-top: 5px;
                cursor: pointer;
                border-top: solid var(--orange) 1px;
                border-bottom: solid var(--orange) 1px;
            }
        }
    }
}
@media only screen and (min-width: 770px){
    .mobile_menu{
    >.menu_wrapper{
        grid-template-columns: repeat(auto-fit, minmax(275px,1fr));
        >.content_div{
            >h3{
            }
        }
    }
}
}

@media only screen and (min-width: 1024px){

}
</style>