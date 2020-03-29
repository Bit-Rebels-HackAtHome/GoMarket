<template>
  <q-page class="column flex-center justify-evenly">
    <div class="row">
      <q-checkbox class="col-12" v-model="avvisami" label="avvisami quando è il mio turno"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Impostazioni",
  data(){
      return{
         avvisami:false
      }
  }
};
</script>
