<template>
  <q-page class="column flex-center justify-evenly">
      <q-card class="column">
          <q-chip icon="shop">{{name}}</q-chip>
          <q-chip icon="map">{{address}}</q-chip>
      </q-card>

      <q-list>
        <q-chip
        v-for="h in 24"
        :key="h+0.1"
        clickable
        v-ripple
        square
        :color="(h>7 && h<20)? 'secondary':'red'"
        text-color="white"
        >
                ore : {{h}}:00
        </q-chip>
      </q-list>
  </q-page>
</template>

<script>
export default {
  name: "Coda",
  data(){
      return {
          name : this.$router.market.name,
          address : this.$router.market.address,
          longitudine : this.$router.market.long,
          latitudine : this.$router.market.lat,
          id : this.$router.market.id,
      }
  }
};
</script>