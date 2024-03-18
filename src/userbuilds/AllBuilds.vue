<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
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
  const build_data: any = u_inst.get_general_builds();
  builds.value = build_data;
})


const remove_style_for_target = (target: HTMLElement) => {
  target.style.color = '';
  target.style.border = ''
  target.style.padding = '';
}

const set_style_for_target = (target: HTMLElement) => {
  target.style.color = 'var(--orange)';
  target.style.border = 'solid var(--orange) 2px'
  target.style.padding = '6px';
}

const handle_selection = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    let target: HTMLElement = event.target as HTMLElement;
    set_style_for_target(target);
    setTimeout(()=>{
      remove_style_for_target(target);
    }, 150);
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
  }
  const builds_len: number = builds.value.length;
  let t_index: number = index.value;
  t_index--;
  if (t_index < 0) {
    t_index = builds_len - 1;
  }
  index.value = t_index;
}
</script>

<template>
  <article class="build_article">
    <div class="build_header">
      <h2>Builds</h2>
    </div>
    <div class="build_container">
      <div class="build_title">
        <p>{{ builds[index]['Build_Title'] }}</p>
      </div>
      <div class="bfeats_container" v-if="viewing === 'Feats'">
        <h3 v-for="(feat, f) in builds[index]['Feat_Slice']" :key="f">
          {{ feat['Name'] }}
        </h3>
      </div>
      <div class="bskills_container" v-if="viewing === 'Skills'">
        <div class="skills_loop_cont" v-for="(skill, sk) in builds[index]['Skill_Slice']" :key="sk">
          <h3>{{ skill['Name'] }}</h3>
          <p>{{ skill['Value'] }}</p>
        </div>
      </div>
      <div class="bstats_container" v-if="viewing === 'Stats'">
        <div class="stats_loop_cont" v-for="(stat, st) in builds[index]['Stat_Slice']" :key="st">
          <h3>{{ stat['Name'] }}</h3>
          <p>{{ stat['Value'] }}</p>
        </div>
      </div>
    </div>
    <div class="bcontrols">
      <p @click="handle_selection($event)">Stats</p>
      <p @click="handle_selection($event)">Skills</p>
      <p @click="handle_selection($event)">Feats</p>
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
  row-gap: 25px;

  >.build_container {
    display: grid;
    align-items: center;
    justify-items: center;
    row-gap: 20px;

    >.build_title {}

    >.bstats_container {
      row-gap: 20px;
      display: flex;
      flex-direction: column;
      width: 80%;

      >.stats_loop_cont {
        display: flex;
        flex-direction: row;
        row-gap: 20px;
        column-gap: 20px;
        justify-content: space-between;

        >p {}
      }
    }

    >.bskills_container {
      row-gap: 20px;
      display: flex;
      flex-direction: column;
      width: 80%;

      >.skills_loop_cont {
        display: flex;
        flex-direction: row;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: space-between;

        >p {}
      }
    }

    >.bfeats_container {

      display: flex;
      flex-wrap: wrap;
      width: 80%;
      justify-content: space-evenly;
      row-gap: 20px;
      column-gap: 10px;

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
      transition: 150ms ease-in-out;
      border: solid var(--white) 1px;
      border-radius: 5px;
      padding: 5px;
      &:hover{
        border: solid var(--orange) 1px;
        color: var(--orange);
      }
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
    >h2 {}
  }
}


@media only screen and (min-width: 770px) {
  .build_article {

    >.build_container {

      >.build_title {}

      >.bstats_container {
        width: 70%;
        max-width: 400px;

        >.stats_loop_cont {}
      }

      >.bskills_container {
        width: 70%;
        max-width: 400px;

        >.skills_loop_cont {}
      }

      >.bfeats_container {
        width: 70%;
        max-width: 600px;
      }
    }

  }
}

@media only screen and (min-width: 1024px) {
  .build_article {

    >.build_container {

      >.build_title {}

      >.bstats_container {
        width: 50%;
        max-width: 500px;
      }

      >.bskills_container {
        width: 50%;
        max-width: 500px;

      }

      >.bfeats_container {
        width: 50%;
        max-width: 700px;
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
