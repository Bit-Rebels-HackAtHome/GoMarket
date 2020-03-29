<template>
  <q-page class="column flex-center justify-evenly">
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
        class="col-11"
        v-for="h in 24"
        :key="h+0.1"
        clickable
        v-ripple
        square
        v-show="(h>7 && h<19)"
        color="blue"
        text-color="white"
      >ore {{h}}:00</q-chip>
    </q-list>
  </q-page>
</template>

<script>
import { EventBus } from "./eventBus.js";
export default {
  name: "Coda",
  data() {
    return {
      name: this.$router.primomarket.name,
      address: this.$router.primomarket.address,
      longitudine: this.$router.primomarket.long,
      latitudine: this.$router.primomarket.lat,
      id: this.$router.primomarket.id
    };
  }, 
  mounted() {
    EventBus.$on("nuovo-selezionato", (superm) => {
      console.log('ciao');
        this.name = superm.name;
        this.address = superm.address;
        this.longitudine = superm.long;
        this.latitudine = superm.lat;
        this.id = superm.id;
    });
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