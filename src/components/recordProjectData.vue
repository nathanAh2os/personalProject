<template>
  <v-container>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
//import firebase from "firebase/app";
//import fb from "@/firebase/initFirebase";
import { store } from "../store";

export default {
  name: "homepage",
  data() {
    return {
      username: "",
      snackbar: {
        show: false,
        text: "",
        color: "",
        timeout: 5000
      }
    };
  },
  created() {
    store.state.showSignOut = true;
    store.state.showMenu = true;
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>