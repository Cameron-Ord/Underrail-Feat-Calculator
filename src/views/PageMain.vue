
<script setup lang="ts">
import BuildTypes from '../components/BuildTypes.vue';
import GenerateBuild from '../components/GenerateBuild.vue';
import AboutSection from '../about/AboutSection.vue';
import AllBuilds from '@/userbuilds/AllBuilds.vue';
import AllocatorBox from '@/components/AllocatorBox.vue';
import AboutAside from '@/about/AboutAside.vue';
import AboutButton from '@/components/AboutButton.vue';
import AccountBox from '@/components/AccountBox.vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import {universal_store} from '../stores/universal'
import type { AxiosResponse } from 'axios';
const u_inst = universal_store();
const builds_loaded: Ref<boolean> = ref(false);
const viewing_about: Ref<boolean> = ref(false);
const switch_about = (signal: boolean) => {
    viewing_about.value = signal
}

const get_builds = async () => {
    let loaded = false;
    try {
        const response: AxiosResponse = await u_inst.fetch_db_builds();
        if(response.statusText === "OK"){
            u_inst.set_general_build(response.data);
        }
    } catch (error) {
        builds_loaded.value = loaded
        console.error("Failed to fetch DB builds: ", error)
        return
    }
    const result: boolean = u_inst.health_checker();
    if(!result){
        builds_loaded.value = loaded
        console.log("Malformed build data")
        return
    }
    loaded = true
    builds_loaded.value = loaded
}


onBeforeMount(()=>{
    get_builds();
})

</script>


<template>
    <main class="page_main">
        <section class="page_header">
            <account-box></account-box>
        </section>
        <section class="build_info_section">
            <allocator-box></allocator-box>
        </section>
        <section class="optional_pre_selectors">
            <build-types></build-types>
        </section>
        <section class="generate_section">
            <generate-build ></generate-build>
        </section>
        <section class="user_builds" v-if="builds_loaded">
            <all-builds></all-builds>
        </section>
        <section class="about_section">
            <about-section v-if="viewing_about"></about-section>
            <about-aside v-if="viewing_about"></about-aside>
            <about-button :switch_about="switch_about"></about-button>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.page_main{
    display: grid;
    align-items: center;
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 50px;
    row-gap: 50px;
    >.build_info_section{
        display: grid;
        align-items: center;
    }
    >.optional_pre_selectors{
        display: grid;
        align-items: center;
    }
    >.generate_section{
        display: grid;
        align-items: center;
    }
    >.user_builds{
        display: grid;
        align-items: center;
    }
    >.about_section{
        display: grid;
        align-items: center;
        row-gap: 30px;
    }

}
</style>