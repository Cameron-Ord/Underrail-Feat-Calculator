<script setup lang="ts">
import { nextTick, onBeforeMount, ref, type Ref } from 'vue';
import { types_state } from '../stores/types_state'
const types_inst = types_state();
const types_array: Ref<Array<string>> = ref(new Array);


const choose_type = (event: MouseEvent | TouchEvent) => {
  if (event.target !== null) {
    const event_target = (event.target as HTMLElement);
    const type_text: string = event_target.innerText;
    const { found: is_found, index: i } = types_inst.check_list(type_text);
    if (is_found) {
      types_inst.remove_from_chosen(i);
      remove_style_for_target(event_target);
    } else {
      types_inst.add_to_chosen(type_text);
      set_style_for_target(event_target);
    }
    types_inst.save_selection();
  }
}

const remove_style_for_target = (target: HTMLElement) => {
  target.style.color = '';
}

const set_style_for_target = (target: HTMLElement) => {
  target.style.color = 'var(--orange)';
}

//setting styles on load, only called once on page load if there is an existing cookie
const style_chosen = (): { result: number } => {
  let type_nodes: NodeList | null = document.querySelectorAll('.type_text');
  if (type_nodes !== null) {
    const chosen_list: Array<string> = types_inst.get_chosen_list();
    for (let n = 0; n < type_nodes.length; n++) {
      const list_node: Node = type_nodes[n];
      for (let c = 0; c < chosen_list.length; c++) {
        const chosen_item: string = chosen_list[c];
        const comparison_node: HTMLElement = (list_node as HTMLElement);
        if (chosen_item === comparison_node.innerText) {
          comparison_node.style.color = 'var(--orange)'
        }
      }
    }
    return { result: 0 };
  } else {
    return { result: -1 };
  }
}

const list_allocation = (): number => {
  types_array.value = types_inst.get_default_list();
  const { result: r } = types_inst.load_chosen_list();
  return r;
}

onBeforeMount(() => {
  const result: number = list_allocation();
  if (result === 0) {
    nextTick(() => {
      const { result: r } = style_chosen();
      if (r < 0) {
        console.log("Failed to style loaded items");
      }
    })
  }
})

</script>

<template>
  <article class="build_types">
    <div class="header_types">
      <h2>Build Type Filtering</h2>
    </div>
    <div class="type_loop_wrapper">
      <div class="type_item" v-for="(type_str, i) in types_array" :key="i">
        <p class="type_text" @click="choose_type($event)">{{ type_str }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.build_types {
  display: grid;
  justify-items: center;
  row-gap: 30px;

  >.header_types {
    display: flex;
    text-align: center;
  }

  >.type_loop_wrapper {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
    justify-content: space-evenly;
    width: 80%;
    overflow-y: auto;
    height: 200px;

    >.type_item {
      text-align: center;
      column-gap: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}

@media only screen and (min-width: 770px) {
  .build_types {
    >.type_loop_wrapper {
      width: 70%;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .build_types {
    >.type_loop_wrapper {
      width: 50%;
    }
  }
}
</style>
