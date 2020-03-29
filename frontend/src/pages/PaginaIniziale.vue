<template>
  <pagina-iniziale-autenticata v-if="$store.state.utente.utente !== null" />
  <pagina-iniziale-non-autenticata v-else />
</template>

<script>
import PaginaInizialeNonAutenticata from "./PaginaInizialeNonAutenticata.vue";
import PaginaInizialeAutenticata from "./PaginaInizialeAutenticata.vue";

export default {
  name: "PaginaIniziale",
  components: { PaginaInizialeNonAutenticata, PaginaInizialeAutenticata }
};
</script>