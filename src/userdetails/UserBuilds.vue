<script setup lang="ts">
import { onBeforeMount, onMounted, ref, type Ref, nextTick } from 'vue';
import { universal_store } from '../stores/universal'
const u_inst = universal_store();
const builds: Ref<Array<{
  Build_ID: number,
  Build_Title: string,
  Feat_Slice: Array<{ Name: string, Build_ID: number }>,
  Skill_Slice: Array<{ Name: string, Value: number, Build_ID: number }>,
  Stat_Slice: Array<{ Name: string, Value: number, Build_ID: number }>
}>> = ref(new Array);
const index: Ref<number> = ref(0);
const viewing: Ref<string> = ref("Feats");

onBeforeMount(() => {
  const build_data: any = u_inst.get_user_builds();
  builds.value = build_data;
})

onMounted(()=>{
  let text_nodes: NodeList = document.querySelectorAll('.card_tag');
  for(let i = 0; i < text_nodes.length; i++){
    if(text_nodes[i] !== null){
      const text: string = (text_nodes[i] as HTMLElement).innerText;
      if(text === viewing.value){
        set_base(text_nodes[i] as HTMLElement);
        return;
      }
    }
  }
})

const set_base = (t: HTMLElement) => {
  t.style.transition = '150ms ease-in-out';
  t.style.borderRadius = '5px';
  t.style.border = 'solid var(--orange) 1px';
  t.style.color = 'var(--orange)';
}


const remove_style_for_target = (target: HTMLElement) => {
  target.style.transition = '150ms ease-in-out';
  target.style.color = '';
  target.style.border = ''
  target.style.padding = '';
}

const set_style_for_target = (target: HTMLElement) => {
  target.style.transition = '150ms ease-in-out';
  target.style.color = 'var(--orange)';
  target.style.border = 'solid var(--orange) 2px'
  target.style.padding = '6px';
  target.style.borderRadius = '5px';
}

const clear_styles = () => {
  let parent: HTMLElement | null = document.querySelector('.bcontrols');
  if(parent !== null){
    let nodes: NodeListOf<ChildNode> = parent.childNodes;
    for(let i = 0; i < nodes.length; i++){
      let node: Node = nodes[i];
      if(node !== null && node instanceof HTMLElement){
        node.style.transition = '150ms ease-in-out';
        node.style.border = '';
        node.style.borderRadius = '';
        node.style.color = '';
      }
    }
  }
}

const set_style_on_btn = (target: EventTarget | null) =>{
  clear_styles();
  if(target !== null){
    if(target instanceof HTMLElement){
      let t: HTMLElement = target as HTMLElement;
      t.style.transition = '150ms ease-in-out';
      t.style.borderRadius = '5px';
      t.style.border = 'solid var(--orange) 1px';
      t.style.color = 'var(--orange)';
    }
  }
}

const handle_selection = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    let target: HTMLElement = event.target as HTMLElement;
    set_style_on_btn(target);
    const text: string = (event.target as HTMLElement).innerText;
    switch (text) {
      case "Stats":
        viewing.value = text;
        break;
      case "Skills":
        viewing.value = text;
        break;
      case "Feats":
        viewing.value = text;
        break;
      default:
        break;
    }
  }
}

const next_build = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    let target: HTMLElement = event.target as HTMLElement;
    set_style_for_target(target);
    setTimeout(()=>{
      remove_style_for_target(target);
    }, 150)
  }
  const builds_len: number = builds.value.length;
  let t_index: number = index.value;
  t_index++;
  if (t_index > builds_len - 1) {
    t_index = 0;
  }
  index.value = t_index;
}

const previous_build = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    let target: HTMLElement = event.target as HTMLElement;
    set_style_for_target(target);
    setTimeout(()=>{
      remove_style_for_target(target);
    }, 150)
  }
  const builds_len: number = builds.value.length;
  let t_index: number = index.value;
  t_index--;
  if (t_index < 0) {
    t_index = builds_len - 1;
  }
  index.value = t_index;
}

const before_enter = (el: Element) =>{
  if(el instanceof HTMLElement){
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.opacity = '0';
    html_tag.style.transition = '0.3s ease-in-out';
  }
}

const on_enter = async (el: Element, done: ()=> void) =>{
  if(el instanceof HTMLElement){
    await nextTick();
    let html_tag: HTMLElement = el as HTMLElement;
    void html_tag.offsetWidth;
    html_tag.style.opacity = '1';
  }
  done();
}

const on_leave = async (el: Element, done: ()=> void) =>{
  if(el instanceof HTMLElement){
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.transition = '0.3s ease-in-out';
    html_tag.style.opacity = '0';
  }
  done();
}


const delete_build = () => {
  u_inst.delete_build(index.value);
}

</script>

<template>
  <article class="build_article">
    <div class="build_header">
      <h2>Builds</h2>
    </div>
    <div class="build_container">
      <div class="build_title">
        <h3 class="title_text">{{ builds[index]['Build_Title'] }}</h3>
        <p class="delete_tag" @click="delete_build">Delete</p>
      </div>
      <transition
        :css="false"
        @before-enter="before_enter"
        @enter="on_enter"
        @leave="on_leave"
      >
      <div class="bfeats_container" v-if="viewing === 'Feats'">
        <h3 v-for="(feat, f) in builds[index]['Feat_Slice']" :key="f">
          {{ feat['Name'] }}
        </h3>
      </div>
      <div class="bskills_container" v-else-if="viewing === 'Skills'">
        <div class="skills_loop_cont" v-for="(skill, sk) in builds[index]['Skill_Slice']" :key="sk">
          <h3>{{ skill['Name'] }}</h3>
          <p>{{ skill['Value'] }}</p>
        </div>
      </div>
      <div class="bstats_container" v-else-if="viewing === 'Stats'">
        <div class="stats_loop_cont" v-for="(stat, st) in builds[index]['Stat_Slice']" :key="st">
          <h3>{{ stat['Name'] }}</h3>
          <p>{{ stat['Value'] }}</p>
        </div>
      </div>
    </transition>
    </div>
    <div class="bcontrols">
      <p @click="handle_selection($event)" class="card_tag">Stats</p>
      <p @click="handle_selection($event)" class="card_tag">Skills</p>
      <p @click="handle_selection($event)" class="card_tag">Feats</p>
    </div>
    <div class="bcycler">
      <p @click="previous_build($event)">Prev</p>
      <p @click="next_build($event)">Next</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.build_article {
  display: grid;
  align-items: center;
  text-align: center;
  row-gap: 50px;

  >.build_container {
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 50px;

    >.build_title {
      display:flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap: wrap;
      column-gap: 15px;
      row-gap: 10px;
      
      >.title_text{
        color: var(--white);
      }

      >.delete_tag{
        color: var(--orange);
        border: solid var(--orange) 1px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    >.bstats_container {
      column-gap: 20px;
      row-gap: 20px;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      align-items: center;
      justify-content: space-evenly;
      width: 80%;
      max-width: 475px;

      >h3{
        color: var(--orange);
      }

      >.stats_loop_cont {
        border: solid var(--orange) 1px;
        padding-bottom: 7.5px;
        padding-top: 7.5px;
        padding-left: 8px;
        padding-right: 8px;

      border-radius: 5px;
        display: flex;
        flex-direction: row;
        row-gap: 20px;
        column-gap: 20px;
        justify-content: space-between;

        >h3{
          color: var(--orange);
        }
        >p {}
      }
    }

    >.bskills_container {
      column-gap: 20px;
      row-gap: 20px;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      align-items: center;
      justify-content: space-evenly;
      width: 80%;
      max-width: 475px;



      >.skills_loop_cont {
        border: solid var(--orange) 1px;
        padding-bottom: 7.5px;
        padding-top: 7.5px;
        padding-left: 8px;
        padding-right: 8px;

      border-radius: 5px;
        display: flex;
        flex-direction: row;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: space-between;

        >h3{
          color: var(--orange);
        }
        >p {}
      }
    }

    >.bfeats_container {
      column-gap: 20px;
      row-gap: 20px;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      align-items: center;
      justify-content: space-evenly;
      width: 80%;
      max-width: 475px;


      >h3{
        color: var(--orange);
      }
      >p {}
    }
  }

  >.bcontrols {
    justify-self: center;
    justify-content: space-evenly;
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 10px;

    >p {
      padding: 5px;
    }
  }

  >.bcycler {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 10px;
    justify-self: center;
    justify-content: space-evenly;


    >p {
      transition: 150ms ease-in-out;
      border: solid var(--white) 1px;
      border-radius: 5px;
      padding: 5px;
    }
  }

  >.build_header {
    >h2 {
      color: var(--orange);
    }
  }
}


@media only screen and (min-width: 770px) {
  .build_article {

    >.build_container {

      >.build_title {}

      >.bstats_container {

        >.stats_loop_cont {}
      }

      >.bskills_container {

        >.skills_loop_cont {}
      }

      >.bfeats_container {
      }
    }

  }
}

@media only screen and (min-width: 1024px) {
  .build_article {

    >.build_container {

      >.build_title {}

      >.bstats_container {
        transition: 150ms ease-in-out;
      }

      >.bskills_container {
        transition: 150ms ease-in-out;

      }

      >.bfeats_container {
        transition: 150ms ease-in-out;
        width: none;
      }
    }
    >.bcontrols {

    >p {
      &:hover{
        color: var(--orange);
      }
    }
  }
    >.bcycler{
      
      >p{
        &:hover{
         border: solid var(--orange) 1px;
         color: var(--orange);
        }
       }
      }

  }

}
</style>
