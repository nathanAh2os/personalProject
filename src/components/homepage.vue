<template>
  <v-container>
    <div>
      <v-row class="mt-12 ml-n12">
        <v-col cols="3">
          <v-list rounded>
            <!-- <v-subheader>OPTIONS</v-subheader> -->
            <v-list-item-group color="primary">
              <v-list-item color="primary" @click="routeChanceCalculator">
                <v-icon>mdi-calculator</v-icon>Champ Reroll Chances
              </v-list-item>
              <v-list-item>
                <v-icon>mdi-hammer-wrench</v-icon>Under Construction
              </v-list-item>
              <v-list-item>
                <v-icon>mdi-hammer-wrench</v-icon>Under Construction
              </v-list-item>
              <v-list-item>
                <v-icon>mdi-hammer-wrench</v-icon>Under Construction
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome, {{currentUser}}</h1>
      </v-col>
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
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    }
  },
  methods: {
    routeChanceCalculator() {
      this.$router.push("chanceCalculator");
    }
  }
};
</script>

<style scoped>
</style>