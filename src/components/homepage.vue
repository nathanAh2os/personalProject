<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-btn></v-btn>
        <v-btn></v-btn>
        <v-btn></v-btn>
        <v-btn></v-btn>
      </div>
    </v-app-bar>
    <v-row class="text-center">
      <h1 class="display-1 font-weight-bold">Welcome, {{}}</h1>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome, {{}}</h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-row class="text-center">
          <h1 class="display-2 font-weight-bold mb-3">Game History (placement, compositions, )</h1>
        </v-row>
        <v-row class="text-center">
          <h1 class="display-2 font-weight-bold mb-3">Economy/Gold Tracker</h1>
        </v-row>
        <v-row class="text-center">
          <h1 class="display-2 font-weight-bold mb-3">Level/Xp Levels</h1>
        </v-row>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
//import firebase from "firebase/app";
//import fb from "@/firebase/initFirebase";

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
  }
};
</script>