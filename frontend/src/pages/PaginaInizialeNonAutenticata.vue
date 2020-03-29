<template>
  <q-page class="column flex-center justify-evenly">
    <q-card>
      <q-tabs v-model="tab" class="bg-primary text-white shadow-2">
        <q-tab name="registra" label="Registrati" />
        <q-tab name="entra" label="Entra" />
      </q-tabs>

      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="registra">
          <registra />
        </q-tab-panel>
        <q-tab-panel name="entra">
          <entra />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import Entra from "./Entra.vue";
import Registra from "./Registra.vue";

export default {
  data: function() {
    return {
      tab: "registra"
    };
  },

  name: "PaginaInizialeNonAutenticata",
  components: { Entra, Registra }
};
</script>