<script setup lang="ts">
import BuildTypes from '../components/BuildTypes.vue';
import GenerateBuild from '../components/GenerateBuild.vue';
import AboutSection from '../about/AboutSection.vue';
import AllBuilds from '../userbuilds/AllBuilds.vue';
import AllocatorBox from '../components/AllocatorBox.vue';
import AboutAside from '../about/AboutAside.vue';
import AboutButton from '../components/AboutButton.vue';
import AccountBox from '../components/AccountBox.vue';
import { onBeforeMount, nextTick, ref, type Ref } from 'vue';
import { universal_store } from '../stores/universal'
import type { AxiosResponse } from 'axios';
import { login_state } from '../stores/login_manager';
const log_inst = login_state();
const u_inst = universal_store();
const builds_loaded: Ref<boolean> = ref(false);
const viewing_about: Ref<boolean> = ref(false);


//modifying visibility for the about section 
const switch_about = (signal: boolean) => {
  viewing_about.value = signal
}

const get_builds = async () => {
  let loaded = false;
  try {
    const response: AxiosResponse = await u_inst.fetch_db_builds();
    if (response.statusText === "OK") {
      u_inst.set_general_build(response.data);
    }
  } catch (error) {
    builds_loaded.value = loaded
    console.error("Failed to fetch DB builds: ", error)
    return
  }
  const result: boolean = u_inst.health_checker();
  if (!result) {
    builds_loaded.value = loaded
    return
  }
  loaded = true
  builds_loaded.value = loaded
}

onBeforeMount(() => {
  //loading the session if it exists.
  //if the result is true, then it will hide the account box
  get_builds();
})


const before_enter = (el: Element) => {
  if (el instanceof HTMLElement) {
    let children: NodeListOf<ChildNode> = el.childNodes;
    if(children){
      for(let c = 0; c < children.length; c++){
        let mut_child:HTMLElement = children[c] as HTMLElement;
        mut_child.style.opacity = '0';
      }
    }
  }
}

const on_enter = async (el: Element, done: () => void) => {
  if (el instanceof HTMLElement) {
    await nextTick();
    let timeout_len = 0;
    let children: NodeListOf<ChildNode> = el.childNodes;
    if(children){
     for(let c = 0; c < children.length; c++){
        let mut_child: HTMLElement = children[c] as HTMLElement;
        mut_child.style.transition = '0.3s ease-in-out';
        void mut_child.offsetWidth;
        setTimeout(()=>{
          mut_child.style.opacity = '0.5';
        },25 + timeout_len);
        timeout_len += 50;
      }
    }
  }
  done();
}

const after_enter = (el: Element) => {
  if (el instanceof HTMLElement) {
    let timeout_len = 0;
    let children: NodeListOf<ChildNode> = el.childNodes;
    if(children){
     for(let c = 0; c < children.length; c++){
        let mut_child: HTMLElement = children[c] as HTMLElement;
        mut_child.style.transition = '0.3s ease-in-out';
        setTimeout(()=>{
          mut_child.style.opacity = '1';
        },25 + timeout_len);
        timeout_len += 50;
      }
    }
  }
}

const before_leave = (el: Element) => {

}

const on_leave = async (el: Element, done: ()=>void) => {
  done();
}

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
      <generate-build></generate-build>
    </section>
     <transition 
      @before-enter="before_enter" 
      @enter="on_enter"
      @after-enter="after_enter" 
      @before-leave="before_leave" 
      @leave="on_leave">
    <section class="user_builds" v-if="builds_loaded">
      <all-builds></all-builds>
    </section>
     </transition>
    <transition 
      @before-enter="before_enter" 
      @enter="on_enter"
      @after-enter="after_enter" 
      @before-leave="before_leave" 
      @leave="on_leave">
      <section class="about_section" v-if="viewing_about">
        <about-section></about-section>
        <about-aside></about-aside>
      </section>
    </transition>
    <section class="about_switch">
      <about-button :switch_about="switch_about"></about-button>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.page_main {
  display: grid;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
  row-gap: 50px;

  >.build_info_section {
    display: grid;
    align-items: center;
  }

  >.optional_pre_selectors {
    display: grid;
    align-items: center;
  }

  >.generate_section {
    display: grid;
    align-items: center;
  }

  >.user_builds {
    display: grid;
    align-items: center;
  }

  >.about_section {
    display: grid;
    align-items: center;
    row-gap: 30px;
  }

  >.about_switch {
    display: grid;
    align-items: center;
  }

}


@media only screen and (min-width: 770px) {}

@media only screen and (min-width: 1024px) {
  .page_main {
    >.about_section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
      align-items: center;
      row-gap: 30px;
    }
  }
}
</style>
