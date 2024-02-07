<script setup lang="ts">
import { ref, type Ref } from 'vue';
const signing_up: Ref<boolean> = ref(true);
const clicked_query: Ref<boolean> = ref(false);

const option_picker=(target: EventTarget | null)=>{
    const html_target = target as HTMLElement;
    const text = html_target.textContent
    switch (text) {
        case "Login":
            clicked_query.value = true
            signing_up.value = false;
            break;
        case "Signup":
            clicked_query.value = true;
            signing_up.value = true;
            break;
        case "Back":
            clicked_query.value = false;
            signing_up.value = true;
            break;
        default:
            break;
    }
}
</script>

<template>
    <div class="account">
        <article v-if="!clicked_query" class="query_box">
            <p @click="option_picker($event.target)">Login</p>
            <p @click="option_picker($event.target)">Signup</p>
        </article>
        <article class="box" v-if="clicked_query">
            <div class="input_box">
                <input class="usr" placeholder="username.." type="text">
                <input class="pw" placeholder="password.." type="password">
            </div>
            <div class="options_box">
                <p v-if="signing_up">Signup</p>
                <p v-if="clicked_query" @click="option_picker($event.target)">Back</p>
                <p v-if="!signing_up">Login</p>
            </div>
        </article>
    </div>
</template>

<style lang="scss" scoped></style>