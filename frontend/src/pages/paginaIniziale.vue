<template>
  <q-page class="column flex-center justify-evenly">
    <div class="column flex-center">
        <q-btn 
        round
        color="primary" 
        size="xl" 
        icon="gps_fixed" />
        <q-chip 
        square>
        Registrati ad una coda
        </q-chip>
    </div>
    <div class="column flex-center">
        <q-btn 
        round 
        color="secondary" 
        size="xl" 
        icon="settings" />
        <q-chip 
        square>
        Impostazioni
        </q-chip>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "paginaIniziale"
};
</script>
