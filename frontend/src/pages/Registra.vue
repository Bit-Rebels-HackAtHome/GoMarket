<template>
  <q-page class="flex flex-center">
    <!--
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    -->

    <q-form ref="loginForm" @submit="onSubmit" class="g-gutter-sm">
      <q-input
        filled
        v-model="email"
        label="Il tuo indirizzo e-mail"
        hint="pippo@pluto.it"
        lazy-rules
        v-bind:rules="Richiesto"
      />

      <q-input filled required v-model="password" type="password" label="La tua password" />

      <q-input
        filled
        v-model="password_ripetuta"
        type="password"
        required
        label="Inserisci di nuovo la tua password"
        v-bind:rules="Richiesto"
      />

      <q-input filled v-model="lat_residenza" type="number" v-bind:rules="Richiesto" />

      <q-input filled v-model="long_residenza" type="number" v-bind:rules="Richiesto" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "Registra",
  data() {
    return {
      email: "",
      password: "",
      password_ripetuta: "",
      lat_residenza: 0.0,
      long_residenza: 0.0
    };
  },
  methods: {
    onSubmit: function(event) {
      console.log("Sono qui");
      this.$store.dispatch("utente/registra", this);
    }
  },
  computed: {
    Richiesto() {
      return [v => !!v || "Il campo non può essere vuoto."];
    }
  }
};
</script>