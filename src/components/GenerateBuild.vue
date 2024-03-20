<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios'
import { stat_state } from '../stores/stat_state';
import { skill_state } from '../stores/skill_state';
import { types_state } from '../stores/types_state';
import { feats_state } from '../stores/feats_state';
import { login_state } from '../stores/login_manager';
import { ref, type Ref, nextTick } from 'vue';

const is_logged_in: Ref<boolean> = ref(false);
const feats_list_exists: Ref<boolean> = ref(false);
const retrieved_feat_list: Ref<Array<{ Feat: string, Desc: string }>> = ref(new Array())
const log_inst = login_state();
const stat_inst = stat_state();
const skill_inst = skill_state();
const type_inst = types_state();
const feats_inst = feats_state();
const status_text: Ref<string> = ref("");
const status_text_active: Ref<boolean> = ref(false);

const send_data = () => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/calculate`, {
      stats: stat_inst.get_stat_list(),
      skills: skill_inst.get_skill_list(),
      type: type_inst.get_chosen_list(),
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  })
}

const click_effect = (target: HTMLElement) => {
  target.style.transition = '150ms ease-in-out';
  target.style.color = 'var(--white)';
  target.style.border = 'solid var(--white) 2px';
  target.style.borderRadius = '5px'
  target.style.padding = '7px';
}

const release_effect = (target: HTMLElement) => {
  target.style.color = '';
  target.style.border = '';
  target.style.borderRadius = ''
  target.style.padding = '';
}

const generate_list = async (event: TouchEvent | MouseEvent | null) => {

  if (event !== null) {
    if (event.target instanceof HTMLElement) {
      let target: HTMLElement = event.target as HTMLElement;
      click_effect(target);
      setTimeout(() => {
        release_effect(target);
      }, 150);
    }
  }
  console.log("Generating list..")
  const new_list: boolean = feats_inst.reset_feat_list();
  if (!new_list) {
    console.error("Failed to create new list at function entry");
  }
  try {
    const response: AxiosResponse = await send_data();
    if (response.statusText == "OK") {
      console.log("..Response OK")
      const is_set: boolean = feats_inst.set_feats(response.data)
      if (!is_set) {
        feats_list_exists.value = false;
        const new_list: boolean = feats_inst.reset_feat_list();
        if (!new_list) {
          console.error("Failed to create new list at response entry");
        }
        console.error("Feat list values were not set");
        return;
      }
      const result: Array<{ Feat: string, Desc: string }> | null = feats_inst.get_feats();
      if (result === null || result.length === 0) {
        feats_list_exists.value = false;
        const new_list: boolean = feats_inst.reset_feat_list();
        if (!new_list) {
          console.error("Failed to create new list after response entry");
        }
        console.error("Feat values do not exist with correct properties");
        return;
      }
      console.log("Assigning result..")
      is_logged_in.value = log_inst.get_login_status();
      retrieved_feat_list.value = result;
      feats_list_exists.value = true;
      feats_inst.reset_chosen();
      feats_inst.reset_chosen_styles();
    }
  } catch (error) {
    feats_list_exists.value = false;
    const new_list: boolean = feats_inst.reset_feat_list();
    if (!new_list) {
      console.error("Failed to create new list at promise failure");
    }
    console.error("Failed to resolve HTTP promise: ", error);
    return
  }
}

const get_build_title = (): { input: string, result: number } => {
  const input_tag: HTMLInputElement | null = document.querySelector('.build_name_input');
  if (input_tag !== null && input_tag.value.length !== 0) {
    return { input: input_tag.value, result: 0 };
  }
  return { input: "", result: -1 };
}

const send_save_message = (title_input: string) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios.post(`${import.meta.env.VITE_APP_BASE_DOMAIN}/api/savebuild`, {
      stats: stat_inst.get_stat_list(),
      skills: skill_inst.get_flattened_list(),
      feats: feats_inst.get_chosen_feats(),
      title: title_input,
      client_id: log_inst.get_client_id(),
      session_token: log_inst.get_client_token(),
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  })
}

const commit_build = async (event: TouchEvent | MouseEvent | null) => {
  if (event !== null) {
    if (event.target instanceof HTMLElement) {
      let target: HTMLElement = event.target as HTMLElement;
      click_effect(target);
    }
  }
  console.log("Saving build..");
  const title_obj: { input: string, result: number } = get_build_title();
  if (title_obj['result'] !== -1) {
    const response: AxiosResponse = await send_save_message(title_obj.input);
    status_text.value = response['data'];
    status_text_active.value = true;
  }
}

const handle_select_feat = (event: TouchEvent | MouseEvent) => {
  if (event.target !== null) {
    const event_target = (event.target as HTMLElement);
    const feat_text: string = event_target.innerText;
    const result: { found: boolean, index: number } = feats_inst.check_if_chosen(feat_text);
    if (result['found'] === true) {
      feats_inst.remove_from_chosen(result['index']);
      remove_style_for_target(event_target);
    } else if (result['found'] === false) {
      feats_inst.add_to_chosen(feat_text);
      set_style_for_target(event_target);
    }
  }
}

const remove_style_for_target = (target: HTMLElement) => {
  target.style.transition = '125ms ease-in-out';
  target.style.color = '';
  target.style.border = '';
  target.style.borderRadius = ''
  target.style.padding = '';
}

const set_style_for_target = (target: HTMLElement) => {
  target.style.transition = '125ms ease-in-out';
  target.style.color = 'var(--orange)';
  target.style.border = 'solid var(--orange) 1px';
  target.style.borderRadius = '5px'
  target.style.padding = '5px';
}

const before_enter = (el: Element) => {
  if (el instanceof HTMLElement) {
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.opacity = '0';
    html_tag.style.transition = '0.3s ease-in-out';
  }
}

const on_enter = async (el: Element, done: () => void) => {
  if (el instanceof HTMLElement) {
    await nextTick();
    let html_tag: HTMLElement = el as HTMLElement;
    void html_tag.offsetWidth;
    html_tag.style.opacity = '1';
  }
  done();
}

const on_leave = async (el: Element, done: () => void) => {
  if (el instanceof HTMLElement) {
    let html_tag: HTMLElement = el as HTMLElement;
    html_tag.style.transition = '0.3s ease-in-out';
    html_tag.style.opacity = '0';
  }
  done();
}

</script>

<template>
  <article class="generator_article">
    <div class="generate_btn_div">
      <p @click="generate_list($event)" class="generate_btn">Generate</p>
    </div>
    <transition :css="false" @before-enter="before_enter" @enter="on_enter" @leave="on_leave">
      <div v-if="feats_list_exists" class="feat_list_div">
        <div class="feat_container" v-for="(feat, f) in retrieved_feat_list" :key="f">
          <p @click="handle_select_feat($event)" class="gen_feat_text">{{ feat['Feat'] }}</p>
        </div>
      </div>
    </transition>
    <transition :css="false" @before-enter="before_enter" @enter="on_enter" @leave="on_leave">
      <div class="build_saver" v-if="feats_list_exists && is_logged_in">
        <input type="text" class="build_name_input" placeholder="build name..">
        <p class="submit_tag" @click="commit_build($event)">Submit</p>
        <p class="status_text" v-if="status_text_active">{{ status_text }}</p>
      </div>
    </transition>
  </article>
</template>

<style lang="scss" scoped>
.generator_article {
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 30px;
  text-align: center;

  >.build_saver {
    display: flex;
    row-gap: 25px;
    flex-direction: column;
    align-items: center;

    >.class_name_input {}

    >.submit_tag {
      cursor: pointer;
      transition: 100ms ease-in-out;
      color: var(--orange);
      padding: 5px;
      border-radius: 5px;
      border: solid var(--orange) 1px;
    }

    >.status_text {}
  }


  >.generate_btn_div {
    display: flex;
    flex-wrap: wrap;

    >.generate_btn {
      transition: 100ms ease-in-out;
      color: var(--orange);
      padding: 5px;
      border-radius: 5px;
      border: solid var(--orange) 1px;
    }

  }

  >.feat_list_div {
    text-align: center;
    width: 80%;
    max-width: 475px;
    row-gap: 20px;
    column-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    transition: 150ms ease-in-out;
    padding: 20px;

    >.feat_container {}
  }
}



@media only screen and (min-width: 770px) {
  .generator_article {
    >.feat_list_div {}
  }
}

@media only screen and (min-width: 1024px) {
  .generator_article {
    >.build_saver {

      >.class_name_input {}

      >.submit_tag {
        &:hover {
          color: var(--white);
          border: solid var(--white) 1px;
        }
      }

      >.status_text {}
    }


    >.feat_list_div {


      >.feat_container {
        >.gen_feat_text {

          &:hover {
            transition: 125ms ease-in-out;
            color: var(--transp_orange);
            cursor: pointer;
          }
        }
      }

    }

    >.generate_btn_div {
      >.generate_btn {
        &:hover {
          color: var(--white);
          border: solid var(--white) 1px;
        }
      }
    }
  }

}
</style>
