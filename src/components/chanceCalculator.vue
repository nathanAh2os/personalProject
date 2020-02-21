<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <v-row>
        <h1 class="display-1 font-weight-bold ml-4 mt-2">TFT Tracker</h1>
      </v-row>
    </v-app-bar>
    <v-row class="mt-12">
      <v-col cols="4">
        <v-list class="sideMenu" rounded>
          <!-- <v-subheader>OPTIONS</v-subheader> -->
          <v-list-item-group>
            <v-list-item>
              <v-icon>mdi-calculator</v-icon>Champion Reroll Chances
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

      <v-col>
        <v-row>
          <h1 class="display-1 font-weight-bold">Champion Chance Calculator*</h1>
        </v-row>
        <v-row class="text-center">
          <v-text-field label="Enter Champion Name, e.g. Senna" v-model="myChampion"></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-text-field
            label="Estimated Number of Those Champions On-Board"
            v-model="myFieldChampions"
          ></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-text-field label="Current Xp Level" v-model="levelTiers.level"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Current Round" v-model="currentRound"></v-text-field>
        </v-row>
        <v-row class="text-center">
          <v-btn @click="checkChampionString">Calculate!</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="initialCalculationsDone">
      <v-row>{{this.remainingMessage}}</v-row>
      <v-row>
        Best Case: You have a
        <strong>{{championChanceBC}}%</strong> of getting this champion for every roll!
      </v-row>
      <v-row>
        Worst Case: You have a
        <strong>{{championChanceWC}}%</strong> of getting this champion for every roll!
      </v-row>
      <v-row>
        You would need on average
        <strong>{{numberOfRollsBC}}</strong> (Best Case) or
        <strong>{{numberOfRollsWC}}</strong> (Worst Case)
        rolls to get 1 copy of this champion!
      </v-row>
      <v-row>
        <v-text-field label="How many actual rolls did it take?" v-model="actualRolls"></v-text-field>
      </v-row>
      <v-row>
        <v-btn @click="calculateTrueValue">Record!</v-btn>
      </v-row>
    </div>
    <div v-if="trueCalculationsDone">
      <v-row>You actually got a {{championChanceTrue}}% in getting this champion!</v-row>
    </div>
    <div>
      <GChart type="LineChart" :data="chartData" :options="chartOptions" :events="chartEvents" />
    </div>
    <div>
      <p>*Best case considers if all players bought all of the same tier champions other than your champion.</p>
      <p>Worst case considers if all players have not bought any of the same tier champions.</p>
      <p>Eventually, typical case will be considered once enough information in database has been gathered.</p>
    </div>
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
import { GChart } from "vue-google-charts";

export default {
  name: "login",
  components: {
    GChart
  },
  data() {
    return {
      currentUser: null,
      snackbar: {
        show: false,
        text: "",
        color: "",
        timeout: 5000
      },
      chartData: [["Games", "Best Case", "Worst Case", "True Value"], ["0", 0, 0, 0]],
      chartOptions: {
        chart: {
          title: "Champion Chances Performance",
          subtitle: ""
        }
      },
      chartEvents: {
        select: () => {
          // handle event here
        }
      },
      correlationData: [],
      myChampion: "",
      myFieldChampions: null,
      otherSameTierChampions: null,
      levelTiers: {
        level: null,
        tierOne: null,
        tierTwo: null,
        tierThree: null,
        tierFour: null,
        tierFive: null
      },
      championTier: null,
      poolChampions: null,
      championChanceWC: null,
      championChanceBC: null,
      championChanceTrue: null,
      numberOfRollsBC: null,
      numberOfRollsWC: null,
      finalStringChampion: "",
      myRemainingPoolChampions: null,
      remainingMessage: null,
      initialCalculationsDone: false,
      trueCalculationsDone: false,
      actualRolls: null,
      currentRound: null
    };
  },
  created() {
    store.state.showSignOut = true;
  },
  methods: {
    checkChampionString() {
      var championFound = true;
      //Conver to lowercase, and get rid of any whitespace
      var lowerCaseChampion = this.myChampion.toLowerCase();
      this.finalStringChampion = lowerCaseChampion.replace(/\s+/g, "");
      //Not sure if having such an extensive switch structure is good or not...
      //Look into more efficient means vs switch
      switch (this.finalStringChampion) {
        case "diana":
        case "ivern":
        case "kogmaw":
        case "maokai":
        case "nasus":
        case "ornn":
        case "renekton":
        case "taliyah":
        case "vayne":
        case "vladimir":
        case "warwick":
        case "zyra":
        case "leona":
          this.championTier = 1;
          this.poolChampions = 29;
          this.otherSameTierChampions = 12;
          break;
        case "braum":
        case "jax":
        case "leblanc":
        case "malzahar":
        case "neeko":
        case "reksai":
        case "skarner":
        case "syndra":
        case "thresh":
        case "varus":
        case "volibear":
        case "yasuo":
        case "senna":
          this.championTier = 2;
          this.poolChampions = 22;
          this.otherSameTierChampions = 12;
          break;
        case "aatrox":
        case "azir":
        case "drmundo":
        case "ezreal":
        case "kindred":
        case "nautilus":
        case "nocturne":
        case "qiyana":
        case "sion":
        case "sivir":
        case "soraka":
        case "veigar":
        case "karma":
          this.championTier = 3;
          this.poolChampions = 16;
          this.otherSameTierChampions = 12;
          break;
        case "annie":
        case "ashe":
        case "brand":
        case "janna":
        case "khazix":
        case "malphite":
        case "olaf":
        case "twitch":
        case "yorick":
        case "lucian":
          this.championTier = 4;
          this.poolChampions = 12;
          this.otherSameTierChampions = 9;
          break;
        case "masteryi":
        case "nami":
        case "singed":
        case "taric":
        case "zed":
        case "amumu":
          this.championTier = 5;
          this.poolChampions = 10;
          this.otherSameTierChampions = 5;
          break;
        default:
          this.snackbar.show = true;
          championFound = false;
          this.snackbar.text = "Champion not found!";
          this.snackbar.color = "error";
      }
      if (championFound) {
        this.calculateChampAmount();
      }
    },
    calculateChampAmount() {
      this.myRemainingPoolChampions =
        this.poolChampions - this.myFieldChampions;
      this.remainingMessage =
        "Remaining " +
        this.finalStringChampion +
        " Champions: " +
        this.myRemainingPoolChampions;
      this.calculateChampTier();
    },
    calculateChampTier() {
      if (this.levelTiers.level == 1) {
        this.levelTiers.tierOne = 1;
        this.levelTiers.tierTwo = 0;
        this.levelTiers.tierThree = 0;
        this.levelTiers.tierFour = 0;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 2) {
        this.levelTiers.tierOne = 1;
        this.levelTiers.tierTwo = 0;
        this.levelTiers.tierThree = 0;
        this.levelTiers.tierFour = 0;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 3) {
        this.levelTiers.tierOne = 0.7;
        this.levelTiers.tierTwo = 0.25;
        this.levelTiers.tierThree = 0.05;
        this.levelTiers.tierFour = 0;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 4) {
        this.levelTiers.tierOne = 0.5;
        this.levelTiers.tierTwo = 0.35;
        this.levelTiers.tierThree = 0.15;
        this.levelTiers.tierFour = 0;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 5) {
        this.levelTiers.tierOne = 0.35;
        this.levelTiers.tierTwo = 0.35;
        this.levelTiers.tierThree = 0.25;
        this.levelTiers.tierFour = 0.05;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 6) {
        this.levelTiers.tierOne = 0.25;
        this.levelTiers.tierTwo = 0.35;
        this.levelTiers.tierThree = 0.3;
        this.levelTiers.tierFour = 0.1;
        this.levelTiers.tierFive = 0;
      } else if (this.levelTiers.level == 7) {
        this.levelTiers.tierOne = 0.2;
        this.levelTiers.tierTwo = 0.3;
        this.levelTiers.tierThree = 0.33;
        this.levelTiers.tierFour = 0.15;
        this.levelTiers.tierFive = 0.02;
      } else if (this.levelTiers.level == 8) {
        this.levelTiers.tierOne = 0.15;
        this.levelTiers.tierTwo = 0.2;
        this.levelTiers.tierThree = 0.35;
        this.levelTiers.tierFour = 0.24;
        this.levelTiers.tierFive = 0.06;
      } else if (this.levelTiers.level == 9) {
        this.levelTiers.tierOne = 0.1;
        this.levelTiers.tierTwo = 0.15;
        this.levelTiers.tierThree = 0.3;
        this.levelTiers.tierFour = 0.3;
        this.levelTiers.tierFive = 0.15;
      }
      this.calculateChampChance();
    },
    calculateChampChance() {
      var totalOtherInPoolChampionsWC =
        this.otherSameTierChampions * this.poolChampions;

      var ratioWC =
        (100 / (totalOtherInPoolChampionsWC + this.myRemainingPoolChampions)) *
        this.myRemainingPoolChampions;

      if (this.championTier === 1) {
        this.championChanceWC = this.levelTiers.tierOne * ratioWC;
        this.championChanceBC = this.levelTiers.tierOne * 100;
      } else if (this.championTier === 2) {
        this.championChanceWC = this.levelTiers.tierTwo * ratioWC;
        this.championChanceBC = this.levelTiers.tierTwo * 100;
      } else if (this.championTier === 3) {
        this.championChanceWC = this.levelTiers.tierThree * ratioWC;
        this.championChanceBC = this.levelTiers.tierThree * 100;
      } else if (this.championTier === 4) {
        this.championChanceWC = this.levelTiers.tierFour * ratioWC;
        this.championChanceBC = this.levelTiers.tierFour * 100;
      } else if (this.championTier === 5) {
        this.championChanceWC = this.levelTiers.tierFive * ratioWC;
        this.championChanceBC = this.levelTiers.tierFive * 100;
      }
      this.championChanceWC = parseFloat(this.championChanceWC.toFixed(2));
      this.numberOfRollsBC = Math.round(100 / this.championChanceBC);
      this.numberOfRollsWC = Math.round(100 / this.championChanceWC);
      this.initialCalculationsDone = true;
      var index = this.chartData.length;

      //Push information to graph
      this.chartData.push([
        index,
        this.championChanceBC,
        this.championChanceWC,
        0.0
      ]);
      this.correlationData.push([
        this.chartData.length - 1,
        this.currentRound,
        this.level,
        this.championTier
      ]);
    },
    calculateTrueValue() {
      console.log("calculating true value!");
      this.championChanceTrue = parseFloat(100 / this.actualRolls);
      this.trueCalculationsDone = true;

      //Remove and re-add the data with the true value now included
      this.chartData.pop();
      this.chartData.push([1, this.championChanceBC, this.championChanceWC, this.championChanceTrue]); 
    }
  }
};
</script>

<style>
.headerOne {
  font-size: 12px;
}
.sideMenu {
  min-width: 250px;
  max-width: 300px;
}
</style>