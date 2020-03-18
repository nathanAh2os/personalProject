<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-row>
            <v-text-field label="Name your project" v-model="projectName"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Enter your language" v-model="language"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Projected timeline" v-model="language"></v-text-field>
            <v-overflow-btn :items="dropdownTimeline" label="Timeline"></v-overflow-btn>
          </v-row>
          <v-row>
            <v-text-field></v-text-field>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn>Cancel</v-btn>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn>Create</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row class="text-center"></v-row>
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
  name: "createProject",
  data() {
    return {
      username: "",
      projectName: "",
      language: "",
      dropdownTimeline: ["weeks", "months", "years"],
      author: "",
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