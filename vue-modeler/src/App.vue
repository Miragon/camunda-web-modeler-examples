<template>
  <div style="height: 100vh" id="app">
    <Modeler/>
  </div>
</template>

<script>
import Modeler from "@/components/Modeler";

export default {
  name: 'App',
  components: {
    Modeler
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
