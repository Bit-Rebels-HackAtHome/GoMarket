<template>
  <q-page class="column flex-center">
    <div class="row q-gutter-sm flex-center q-py-sm">
      <div icon="shop" class="finta-chip q-px-sm">
        <span>{{name}}</span>
      </div>
      <div icon="map" class="finta-chip q-px-sm">
        <span>{{address}}</span>
      </div>
    </div>

    <q-list class="row flex-center">
      <q-chip
        class="col-11 row justify-evenly"
        v-for="(h) in 24"
        :key="h+0.1"
        clickable
        v-ripple
        square
        v-show="(h>7 && h<19)"
        color="blue"
        text-color="white"
        @click="prenota(h)"
      >
        <span>ore {{h}}:00</span>
        <q-chip :color="persone[h-8]>0?'yellow':'green'">Prenotati: {{persone[h-8]||0}}</q-chip>
        <q-checkbox color="red" v-model="selected[h-8]" v-show="selected[h-8]" />
      </q-chip>
    </q-list>
  </q-page>
</template>

<script>
import { EventBus } from "./eventBus.js";
import querystring from "querystring";
export default {
  name: "Coda",
  data() {
    console.log(this.$router.market);
    return {
      persone: [],
      name: this.$router.market.name,
      address: this.$router.market.address,
      longitudine: this.$router.market.long,
      latitudine: this.$router.market.lat,
      id: this.$router.market.id,
      selected: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
  },
  mounted() {
    EventBus.$on("nuovo-selezionato", superm => {
      console.log("nuovo selezionato");
      for (var i = 0; i < 10; i++) this.selected.pop();

      for (var i = 0; i < 10; i++) this.selected.push(false);

      this.name = superm.name;
      this.address = superm.address;
      this.longitudine = superm.long;
      this.latitudine = superm.lat;
      this.id = superm.id;

      this.richiediPersone();
    });
  },
  watch: {
    name(n, o) {
      this.richiediPersone();
    }
  },
  methods: {
    richiediPersone() {
      this.$axios
        .get(
          "https://russelpopi.synology.me/api/supermercato.php?idSuper=" +
            this.id
        )
        .then(response => {
          console.log("ok");
        })
        .catch(error => {
          while (this.persone.length) {
            this.persone.pop();
          }
          for (let i = 0; i < 11; i++) {
            this.persone.push(0);
          }
        });
    },
    prenota(h) {
      console.log("prenota");

      const axios_config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      };

      const query = querystring.stringify({
        idSuper: this.id,
        orario: h
      });

      console.log(query);

      if (this.selected[h - 8]) {
        this.$axios
          .post(
            "https://russelpopi.synology.me/api/supermercati/sprenota.php",
            query,
            axios_config
          )
          .then(response => {
            this.selected.splice(h - 8, 1, false);
            EventBus.$emit("nuovaCoda", {
              nome: this.name,
              id: this.id,
              indirizzo: this.address,
              ora: h
            });
          })
          .catch(error => {
            this.selected.splice(h - 8, 1, false);
          });
      } else {
        this.$axios
          .post(
            "https://russelpopi.synology.me/api/supermercati/prenota.php",
            query,
            axios_config
          )
          .then(response => {
            console.log(response);
            this.selected.splice(h - 8, 1, true);
            EventBus.$emit("nuovaCoda", {
              nome: this.name,
              id: this.id,
              indirizzo: this.address,
              ora: h
            });
          })
          .catch(error => {
            this.selected.splice(h - 8, 1, true);
          });
      }
    }
  }
};
</script>

<style scoped>
.finta-chip {
  background-color: #26a69a;
  color: rgb(247, 247, 247);
  width: 90vw;
  border-radius: 4px;
  box-shadow: 2px 2px 3px #ccc;
}
</style>