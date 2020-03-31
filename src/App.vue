<template>
  <v-app>
    <v-row class="topMenu">
      <v-app-bar app color="primary" dark>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1 class="display-1 font-weight-bold ml-4 mt-2">TFT Tracker</h1>
        <p class="headerOne ml-4 mt-6">By Nathan Watters</p>
        <v-col cols="5"></v-col>
        <v-col cols="1">
          <div v-if="showSignOut">
            <v-btn color="blue" right @click="signOut" small class="pa-1">Sign Out</v-btn>
          </div>
        </v-col>
      </v-app-bar>
    </v-row>
    <v-row>
      <v-col cols="3" class="mt-14 ml-0 menu" v-if="showMenu">
        <v-list rounded color="rgba(3, 236, 252, 0.2)">
          <v-subheader>
            <strong>OPTIONS</strong>
          </v-subheader>
          <v-list-item-group color="primary">
            <v-list-item @click="routeChanceCalculator">
              <v-icon>mdi-calculator</v-icon>Champ Reroll Chances
            </v-list-item>
            <v-list-item @click="routeRecordTFTStats">
              <v-icon>mdi-calculator</v-icon>Record TFT Stats
            </v-list-item>
            <v-list-item @click="routeViewTFTStats">
              <v-icon>mdi-calculator</v-icon>View TFT Stats
            </v-list-item>
            <v-list-item @click="routeCreateProject">
              <v-icon>mdi-hammer-wrench</v-icon>Create Project
            </v-list-item>
            <v-list-item @click="routeEditProject">
              <v-icon>mdi-hammer-wrench</v-icon>Edit Existing Project
            </v-list-item>
            <v-list-item @click="routeRecordProjectData">
              <v-icon>mdi-hammer-wrench</v-icon>Record Data
            </v-list-item>
            <v-list-item @click="routeViewProject">
              <v-icon>mdi-hammer-wrench</v-icon>View Existing Project
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="9">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import { store } from "./store";

export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    showSignOut: function() {
      return store.state.showSignOut;
    },
    showMenu: function() {
      return store.state.showMenu;
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          store.state.currentUser = null;
          store.state.showMenu = false;
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch(error => {
          // An error happened.
          console.log(error.code);
          console.log(error.message);
        });
    },
    routeChanceCalculator() {
      this.$router.push("chanceCalculator");
    },
    routeCreateProject() {
      this.$router.push("createProject");
    },
    routeRecordProjectData() {
      this.$router.push("recordProjectData");
    },
    routeViewProject() {
      this.$router.push("viewProject");
    },
    routeEditProject() {
      this.$router.push("editProject");
    },
    routeRecordTFTStats() {
      this.$router.push("recordTFTStats");
    },
    routeViewTFTStats() {
      this.$router.push("viewTFTStats");
    }
  }
};
</script>

<style scoped>
menu {
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
}
.topMenu {
  max-height: 45px;
}
</style>
