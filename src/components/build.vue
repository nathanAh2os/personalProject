<template>
  <v-container>
    <div>
      <h1>Calculate a circle made from discrete blocks!</h1>
    </div>
    <v-row class="mt-1">
      <v-col cols="4">
        <v-slider v-model="radius" :min="min" :max="max" :thumb-size="24" thumb-label="always"></v-slider>
        <v-btn @click="calculate">Calculate</v-btn>
      </v-col>
    </v-row>
    <!-- This is where the blocked circle will be displayed -->
    <v-row>
      <v-stage :config="configKonva">
        <v-layer>
          <v-line :config="horizontalGridLayer"></v-line>
        </v-layer>
        <v-layer :config="verticalGridLayer"></v-layer>
        <v-layer>
          <v-circle ref="circle" :config="configCircle"></v-circle>
        </v-layer>
      </v-stage>
    </v-row>
  </v-container>
</template>

<script>
//import firebase from "firebase/app";
//import fb from "@/firebase/initFirebase";
import { store } from "../store";
import Konva from "konva";

export default {
  name: "homepage",
  data() {
    return {
      username: "",
      min: 4,
      max: 64,
      radius: 5,
      configKonva: {
        width: 500,
        height: 500
      },
      configCircle: {
        x: 250,
        y: 250,
        radius: 200,
        stroke: "black",
        strokeWidth: 4,
        pixelSize: 1,
        filters: ""
      },
      horizontalGridLayer: new Konva.Line({
        stroke: "#ddd",
        strokeWidth: 1
      }),
      verticalGridLayer: null
    };
  },
  created() {
    store.state.showSignOut = true;
    store.state.showMenu = true;
    for (var i = 0; i < 4; i++) {
      this.horizontalGridLayer.add(
        new Konva.Line({
          stroke: "#ddd",
          strokeWidth: 1
        })
      );
      this.verticalGridLayer.add(
        new Konva.Line({
          stroke: "#ddd",
          strokeWidth: 1
        })
      );
    }
  },
  mounted() {
    const circle = this.$refs.circle.getNode();
    circle.cache();
    circle.pixelSize(1);
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    }
  },
  watch: {
    radius: function() {
      for (var i = 0; i < this.radius; i++) {
        this.horizontalGridLayer.add(
          new Konva.Line({
            stroke: "#ddd",
            strokeWidth: 1
          })
        );
        this.verticalGridLayer.add(
          new Konva.Line({
            stroke: "#ddd",
            strokeWidth: 1
          })
        );
      }
    }
  },
  methods: {
    calculate() {
      console.log("enter clicked!");
      const circle = this.$refs.circle.getNode();
      circle.cache();
      console.log(circle);
    }
  }
};
</script>

<style scoped>
</style> 