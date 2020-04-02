<template>
  <div>
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

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "Entra",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    onSubmit: function(event) {
      console.log(event);
      this.$store.dispatch("utente/entra", this);
      //this.$router.replace("/");
    }
  },

  computed: {
    Richiesto() {
      return [v => !!v || "Il campo non può essere vuoto."];
    }
  }
};
</script>
