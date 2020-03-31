<template>
  <v-container>
    <div>
      <v-row>
        <h1 class="display-1 font-weight-bold mt-12">Correlation Data</h1>
      </v-row>
      <div class="mt-2">
        <v-row>
          <strong>Placement 5-8 History</strong>
        </v-row>
        <v-row>
          <GChart
            type="ScatterChart"
            :data="chartLosingPlacementData"
            :options="chartPlacementHistoryOptions"
            class="graphFormat"
          />
        </v-row>
      </div>
      <div>
        <v-row>
          <strong>Placement 1-4 History</strong>
        </v-row>
        <v-row>
          <GChart
            type="ComboChart"
            :data="chartWinningPlacementData"
            :options="chartPlacementHistoryOptions"
            class="graphFormat"
          />
        </v-row>
      </div>
    </div>
    <div>
      <v-row>
        <strong>Overall Best Economy Practice</strong>
      </v-row>
      <v-row>
        <GChart
          type="ComboChart"
          :data="chartOverallHistoryData"
          :options="chartPlacementHistoryOptions"
          class="graphFormat"
        />
      </v-row>
    </div>
    <v-row>*We are going to make a weighted system corresponding to each place (1-8)</v-row>
    <v-row></v-row>Separate graphs for each placement, to show average economy history for each placement
    <v-row></v-row>Final graph to show overall best economy history, taking into account weighted averages
  </v-container>
</template>

<script>
//import firebase from "firebase/app";
import fb from "@/firebase/initFirebase";
import { store } from "../store";

export default {
  name: "createProject",
  data() {
    return {
      averageLosingEconomyHistory: [],
      averageWinningEconomyHistory: [],
      chartWinningPlacementData: [
        ["Games", "Placement", "Average Gold Amount"],
        ["", 0, 0]
      ],
      chartLosingPlacementData: [
        ["Games", "Placement", "Average Gold Amount"],
        ["", 0, 0]
      ],
      chartPlacementHistoryOptions: {
        hAxis: { title: "Average Gold Amount", minValue: 0, maxValue: 15 },
        vAxis: { title: "Rounds" },
        legend: "none"
      },
      chartOverallHistoryData: {},
      goldHistory: []
    };
  },
  created() {
    //We will have to render a lot of information initially on this component,
    //Is it bad to have a lot of logic/information in the created lifecycle?
    //Also, work on making this more efficient
    store.state.showSignOut = true;
    store.state.showMenu = true;

    //We don't want repeating code for calculating each placement, so put the code into
    //a function with placement as a passing parameter

    this.calculatePlacementData();
  },
  computed: {
    currentUser: function() {
      return store.state.currentUser;
    },
    rounds: function() {
      return store.state.rounds;
    },
    placement: function() {
      return store.state.placements;
    }
  },
  methods: {
    calculatePlacementData() {
      console.log("viewPlacementHistory() called!");
      fb.collection("RecordedGameData")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let loseCounter = 0;
            let winCounter = 0;
            if (doc.data().placement > 4) {
              //Average out economyHistory from all the placement 5-8 games
              for (var i = 0; i < doc.data().economyHistory.length; i++) {
                if (loseCounter === 0) {
                  this.averageLosingEconomyHistory[
                    i
                  ] = doc.data().economyHistory[i];
                } else {
                  this.averageLosingEconomyHistory[i] +=
                    doc.data().economyHistory[i] / loseCounter;
                }
              }
              loseCounter++;
            } else {
              for (var a = 0; a < doc.data().economyHistory.length; a++) {
                if (winCounter === 0) {
                  this.averageWinningEconomyHistory[
                    a
                  ] = doc.data().economyHistory[a];
                } else {
                  this.averageWinningEconomyHistory[a] +=
                    doc.data().economyHistory[a] / winCounter;
                }
              }
              winCounter++;
            }
          });
        })
        .catch(err => {
          this.$emit("error", err);
        })
        .finally(() => {
          console.log("FINALLY CONGLOMERATING PLACEMENT DATA");
          for (var j in this.averageLosingEconomyHistory) {
            this.chartLosingPlacementData.push([
              this.rounds[j],
              null,
              this.averageLosingEconomyHistory[j]
            ]);
          }
        });
    },
    viewCorrelationData() {
      console.log("viewCorrelationData() called!");
      //We need to get the averages of gold amount, gold spent for each game
    }
  }
};
</script>

<style scoped>
.graphFormat {
  min-width: 500px;
}
</style>