<template>
  <q-page class="flex flex-center">
    <!--
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    -->

    <q-form>
      <q-input
        filled
        v-model="email"
        label="Il tuo indirizzo e-mail"
        hint="pippo@pluto.it"
        lazy-rules
      />

      <q-input filled v-model="password" label="La tua password" />

      <q-input filled v-model="password_ripetuta" label="Inserisci di nuovo la tua password" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
