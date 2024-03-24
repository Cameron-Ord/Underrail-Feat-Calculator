<script setup lang="ts">
import BuildTypes from '../components/BuildTypes.vue';
import GenerateBuild from '../components/GenerateBuild.vue';
import AboutSection from '../about/AboutSection.vue';
import AllBuilds from '../userbuilds/AllBuilds.vue';
import AllocatorBox from '../components/AllocatorBox.vue';
import AboutAside from '../about/AboutAside.vue';
import AboutButton from '../components/AboutButton.vue';
import AccountBox from '../components/AccountBox.vue';
import UserBuilds from '../userdetails/UserBuilds.vue';
import BuildSwitch from '../components/BuildSwitch.vue';
import { onBeforeMount, nextTick, ref, type Ref } from 'vue';
import { universal_store } from '../stores/universal'
import type { AxiosResponse } from 'axios';
import { login_state } from '../stores/login_manager';
const log_inst = login_state();
const u_inst = universal_store();
const builds_loaded: Ref<boolean> = ref(false);
const usr_builds_loaded: Ref<boolean> = ref(false);
const viewing_about: Ref<boolean> = ref(false);
const current_build_view: Ref<string> = ref("public");


//modifying visibility for the about section 
const switch_about = (signal: boolean) => {
  viewing_about.value = signal;
}

const get_builds = async () => {
  let loaded = false;
  try {
    const response: AxiosResponse = await u_inst.fetch_db_builds();
    if (response.statusText === "OK") {
      u_inst.set_general_build(response.data);
    }
  } catch (error) {
    builds_loaded.value = loaded;
    console.error("Failed to fetch DB builds: ", error);
    return
  }
  const result: boolean = u_inst.health_checker();
  if (!result) {
    builds_loaded.value = loaded;
    return
  }
  loaded = true;
  builds_loaded.value = loaded;
}

interface session_d{
  Client_Session_Token: string,
  Client_ID_Value: number 
}

const get_usr_builds = async () => {
  let loaded = false;
  const s_data: session_d[] = u_inst.retrieve_session_data();
  if(s_data[0]['Client_ID_Value'] !== -1){
    try {
      const response: AxiosResponse = await u_inst.fetch_user_builds(s_data);
      if (response.statusText === "OK") {
        u_inst.set_user_builds(response.data);
      }
    } catch (error) {
      usr_builds_loaded.value = loaded
      console.error("Failed to fetch DB builds: ", error);
      return
    }
    const result: boolean = u_inst.health_checker();
    if (!result) {
      usr_builds_loaded.value = loaded;
      return
    }
    loaded = true;
  } else {
    current_build_view.value = "public";
  }
  usr_builds_loaded.value = loaded;
}


onBeforeMount(() => {
  //loading the session if it exists.
  //if the result is true, then it will hide the account box
  get_builds();
  get_usr_builds();
  u_inst.set_current_view(current_build_view.value);
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

const update_build_view = (text: string) => {
  current_build_view.value = text;
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
    <section class="user_builds">
      <transition 
      @before-enter="before_enter" 
      @enter="on_enter"
      @after-enter="after_enter" 
      @before-leave="before_leave" 
      @leave="on_leave">
        <all-builds v-if="builds_loaded && current_build_view === 'public'"></all-builds>
        <user-builds v-else-if="usr_builds_loaded && current_build_view === 'private'"></user-builds>
      </transition>
      <build-switch v-if="usr_builds_loaded" :update_build_view="update_build_view"></build-switch>
    </section>
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
    padding-top: 10px;
    padding-bottom: 10px;
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
    row-gap: 50px;
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


@media only screen and (min-width: 770px) {
  .page_main {
    >.build_info_section{
      justify-items: center;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .page_main {
    >.build_info_section{
      justify-items: center;
    }
    >.about_section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
      align-items: center;
      row-gap: 30px;
    }
  }
}
</style>
