<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  color: darkslategray;
}
</style>

<script>
import Navbar from "./components/Navbar";
export default {
  components: { Navbar },
};
</script>
