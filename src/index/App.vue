<template>
    <a class="list" v-for="item in list" :key="item" :href="`/${item}.html`">
        {{ item }}
    </a>
    <img src="../assets/logo.png" alt="" />
</template>
<script>
import modules from "./tool/list";
export default {
    name: "App",
    data() {
        return {
            list: modules,
        };
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    a {
        display: block;
    }
}
</style>