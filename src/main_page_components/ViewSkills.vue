<template>
    <div class="view_div">
        <h3 @click="send_input(this.$refs.skills)" ref="skills">View Skills</h3>
    </div>
</template>

<script>
    export default {
        methods:{
            send_input(skills_ref){
                const skills_ref_text = skills_ref.textContent.replace(/ /g, "_");
                this.$emit('send_input', skills_ref_text);
                console.log('sent')
            }
        }
    }
</script>

<style lang="scss" scoped>
.view_div{
    display: grid;
    align-items: center;
    justify-items: center;
    >h3{
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom:solid var(--orange) 1px;
        border-top:solid var(--orange) 1px;
        cursor: pointer;
    }
}
</style>