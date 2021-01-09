<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li v-if="!isAnonymous"><a href="#" @click="logOut">Log out</a></li>
    </ul>
  </nav>
</template>

<style>
nav ul {
  padding: 0;
  list-style-type: none;
  text-align: center;
  background-color: black;
  margin: 0;
}

nav ul li {
  padding-left: -1em;
  display: inline-block;
  height: 1.5em;
}

nav ul li a {
  text-decoration: none;
  padding: 0.2em 1em;
  color: white;
  background-color: black;
}

nav ul li a:hover {
  color: black;
  background-color: white;
}
</style>

<script>
import { auth } from "../modules/firebase";
export default {
  name: "nav-bar",
  data() {
    return {};
  },
  computed: {
    isAnonymous() {
      return this.$store.state.isAnonymous;
    },
  },
  methods: {
    async logOut() {
      await auth.signOut();
      this.$router.replace("/login");
    },
  },
};
</script>
