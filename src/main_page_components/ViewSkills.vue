<template>
    <h3 @click="send_input(this.$refs.skills)" ref="skills">View Skills</h3>
</template>

<script>
    export default {
        methods:{
            send_input(skills_ref){
                const skills_ref_text = skills_ref.textContent.replace(/ /g, "_");
                this.$emit('send_input', skills_ref_text);
            }
        }
    }
</script>

<style lang="scss" scoped>
h3{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7.5px;
    padding-right: 7.5px;
    border: solid var(--orange) 1px;
    border-radius: 10px;
    cursor: pointer;
}

@media only screen and (min-width: 770px){

}

@media only screen and (min-width: 1024px){

}
</style>